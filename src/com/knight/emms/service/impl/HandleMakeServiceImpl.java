/**
 *====================================================
 * 文件名称: HandleMakeServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月03日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ConsumeProductDao;
import com.knight.emms.dao.HandleMakeDao;
import com.knight.emms.dao.MakeProductDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.model.ConsumeProduct;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.HandleMake;
import com.knight.emms.model.MakeProduct;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.service.BaseDepotService;
import com.knight.emms.service.BaseLocationService;
import com.knight.emms.service.HandleMakeService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.MaterialsStoreService;

import lombok.SneakyThrows;

/**
 * @ClassName: HandleMakeServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年11月03日
 */
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class HandleMakeServiceImpl extends BusinessFlowServiceImpl<HandleMake> implements HandleMakeService {

	private HandleMakeDao handleMakeDao;
	
	@Resource
	private MakeProductDao makeProductDao;
	
	@Resource
	private ConsumeProductDao consumeProductDao;
	
	@Resource
	private MaterialsStoreService materialsStoreService;
	
	@Resource
	private BaseDepotService baseDepotService;
	
	@Resource
	private BaseLocationService baseLocationService;
	
	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	/** 周材出库记录表 */
	@Autowired
	private MaterialsOutStockDao materialsOutStockDao;
	
	/** 周材入库记录表 */
	@Autowired
	private MaterialsInStockDao materialsInStockDao;
	
	public HandleMakeServiceImpl(HandleMakeDao dao) {
		super(dao);
		this.handleMakeDao = dao;
	}

	@Override
	public void delMake(Long productId) {
		makeProductDao.remove(productId);
	}
	
	@Override
	public void delConsume(Long consumeId) {
		consumeProductDao.remove(consumeId);
	}
	
	@Override
	public void saveOrMergeForEdit(HandleMake handleMake) {
		if(handleMake.getHandleId()==null){
			String seq = handleMakeDao.createNextSerial(handleMake);
			handleMake.setHandleSerial(seq);
			handleMake.setSubHandleMake();
			handleMakeDao.save(handleMake);
		}else{
			handleMake.setSubHandleMake();
			handleMakeDao.merge(handleMake);
		}
	}
	
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		HandleMake handleMake = super.passFlowApproveApplication(formApprove);
	
		/**调整库存*/
		for(ConsumeProduct cp : handleMake.getConsumeProductSet()){
			//减少周材库存T_MATERIALS_STORE
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ",handleMake.getApplyMake().getStoreId()+"");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ",cp.getExitLocationId()+"");//出库库位
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", cp.getSpecificationsId()+"");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			if(list.size()>0){
				ms = list.get(0);
				Integer i = Integer.valueOf(ms.getQuantity()) - Integer.valueOf(cp.getConsumeQuantity()==null?"0":cp.getConsumeQuantity());//库存-耗用数量
				if(i<0) {
					throw new BusinessException("耗用数量大于库存数量，审批失败");
				}
				ms.setQuantity(i.toString());
			} else {
				throw new BusinessException("找不到【"+cp.getCommodity()+cp.getSpecifications()+"】的仓库周材库存，无法审批通过！");
			}
			materialsStoreService.merge(ms);
		}
		for(MakeProduct mp : handleMake.getMakeProductSet()){
			//增加周材库存T_MATERIALS_STORE
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ",handleMake.getApplyMake().getStoreId()+"");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ",mp.getEnterLocationId()+"");//入库库位
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", mp.getSpecificationsId()+"");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			if(list.size()>0){
				ms = list.get(0);
				Integer i = Integer.valueOf(ms.getQuantity()) + Integer.valueOf(mp.getMakeQuantity()==null? "0" : mp.getMakeQuantity());//库存+制作数量
				ms.setQuantity(i.toString());
			} else {
				ms.setBaseDepot(baseDepotService.get(handleMake.getApplyMake().getStoreId()));
				ms.setBaseLocation(baseLocationService.get(mp.getEnterLocationId()));
				ms.setMaterialsSpecifications(materialsSpecificationsService.get(mp.getSpecificationsId()));
				Integer i = (Integer.valueOf(mp.getMakeQuantity()==null?"0":mp.getMakeQuantity()));
				ms.setQuantity(i.toString());
			}
			materialsStoreService.merge(ms);
		}
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(handleMake);
		logger.info("已同步至周材出库记录表并生成记录值!");
		// 同步至周材入库记录表生成记录值
		this.addMaterialsIn(handleMake);
		logger.info("已同步至周材入库记录表并生成记录值!");
		handleMakeDao.save(handleMake);
	}
	
	/**
	 * 同步至周材出库记录表生成记录值
	 * @param handleMake
	 * @author 陈光毅
	 * @Date 2017/12/06
	 */
	public void addMaterialsOut(HandleMake handleMake) {
		Set<?> set = handleMake.getConsumeProductSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				ConsumeProduct consumeProduct = (ConsumeProduct) object;
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(handleMake.getApplyMake().getStoreId());
				materialsOutStock.setDepotName(handleMake.getApplyMake().getStoreName());
				materialsOutStock.setLocationId(consumeProduct.getExitLocationId());
				materialsOutStock.setLocationName(consumeProduct.getExitLocationName());
				materialsOutStock.setSerial(handleMake.getHandleSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(handleMake.getFillDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("制作出库");
				materialsOutStock.setRelateBusiness("制作处理");
				materialsOutStock.setRemark(handleMake.getRemarks());
				materialsOutStock.setCommodity(consumeProduct.getCommodity());
				materialsOutStock.setSpecifications(consumeProduct.getSpecifications());
				materialsOutStock.setQuantity(consumeProduct.getConsumeQuantity());
				materialsOutStock.setAuxiliaryQuantity(String.valueOf(new java.text.DecimalFormat("#.00").format(
						Double.valueOf(consumeProduct.getConsumeQuantity()) * Double.valueOf(
								consumeProduct.getAuxiliaryQuantity()))));
				materialsOutStock.setUnit(consumeProduct.getMeasurementUnit());
				materialsOutStockDao.save(materialsOutStock);
			}
		}
	}
	
	/**
	 * 同步至周材入库记录表生成记录值
	 * @param handleMake 
	 * @author 陈光毅
	 * @Date 2017/12/07
	 */
	private void addMaterialsIn(HandleMake handleMake) {
		Set<?> set = handleMake.getMakeProductSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				MakeProduct makeProduct = (MakeProduct) object;
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setDepotId(handleMake.getApplyMake().getStoreId());
				materialsInStock.setDepotName(handleMake.getApplyMake().getStoreName());
				materialsInStock.setLocationId(makeProduct.getEnterLocationId());
				materialsInStock.setLocationName(makeProduct.getEnterLocationName());
				materialsInStock.setSerial(handleMake.getHandleSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(handleMake.getFillDate(), "yyyy-MM-dd"));
				materialsInStock.setInType("制作入库");
				materialsInStock.setRelateBusiness("制作处理");
				materialsInStock.setRemark(handleMake.getRemarks());
				materialsInStock.setCommodity(makeProduct.getCommodity());
				materialsInStock.setSpecifications(makeProduct.getSpecifications());
				materialsInStock.setQuantity(makeProduct.getMakeQuantity());
				materialsInStock.setAuxiliaryQuantity(String.valueOf(new java.text.DecimalFormat("#.00").format(
						Double.valueOf(makeProduct.getMakeQuantity()) * Double.valueOf(
								makeProduct.getAuxiliaryQuantity()))));
				materialsInStock.setUnit(makeProduct.getMeasurementUnit());
				materialsInStockDao.save(materialsInStock);
			}
		}
	}
}
