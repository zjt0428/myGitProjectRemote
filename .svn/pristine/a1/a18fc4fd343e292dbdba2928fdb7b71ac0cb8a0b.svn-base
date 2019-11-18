package com.knight.emms.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.ScrapHandleDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.model.ScrapDetail;
import com.knight.emms.model.ScrapHandle;
import com.knight.emms.service.MaterialsStoreService;
import com.knight.emms.service.ScrapHandleService;

import lombok.SneakyThrows;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:39:56
* 类说明
*/
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class ScrapHandleServiceImpl extends BusinessFlowServiceImpl<ScrapHandle> implements ScrapHandleService {

	private ScrapHandleDao scrapHandleDao;
	
	/** 周材出库记录表 */
	@Autowired
	private MaterialsOutStockDao materialsOutStockDao;
	
	@Resource
	private MaterialsStoreService materialsStoreService;
	
	public ScrapHandleServiceImpl(ScrapHandleDao dao) {
		super(dao);
		this.scrapHandleDao = dao;
	}

	@Override
	public List<ScrapHandle> queryTranslateAllFull(QueryFilter filter) {
		List<ScrapHandle> list = scrapHandleDao.getAll(filter);
		return list;
	}
	
	@Override
	public ScrapHandle getTranslateFull(Long scrapId) {
		ScrapHandle r = scrapHandleDao.get(scrapId);
		return r;
	}

	@Override
	public void saveOrUpdate(ScrapHandle scrapHandle) {
		
		scrapHandleDao.save(scrapHandle);
		
	}
	
	@Override
	public void saveCreate(ScrapHandle scrapHandle) {
		scrapHandle.setSubScrapHandle();
		if(scrapHandle.getHandleId()==null){
			String seq = scrapHandleDao.createNextSerial(scrapHandle);
			scrapHandle.setScrapSerial(seq);
			scrapHandleDao.save(scrapHandle);
		}else{
			scrapHandleDao.merge(scrapHandle);
		}
		
	}

	@Override
	public void saveOrMergeForEdit(ScrapHandle t) {
	}
	
	@Override
	public ScrapHandle getByFilter(Long scrapId,String filterName,Map<String,Object> map){
		return scrapHandleDao.getByFilter(scrapId, filterName,map);
	}

	@Override
	public List<ScrapHandle> findByFilter(QueryFilter filter,String filterName,Map<String,Object> map){
		return scrapHandleDao.findByFilter(filter, filterName,map);
	}
	
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		ScrapHandle scrapHandle = super.passFlowApproveApplication(formApprove);
		scrapHandleDao.save(scrapHandle);
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(scrapHandle);
		logger.info("已同步至周材出库记录表并生成记录值!");
		this.subMaterialsStore(scrapHandle);
	}
	
	/**
	 * @Title addMaterialsOut
	 * @Description 同步至周材出库记录表生成记录值
	 * @author 陈光毅
	 * @date 2017年12月06日
	 * @param scrapHandle
	 * @return void
	 * @version v1.0
	 */
	public void addMaterialsOut(ScrapHandle scrapHandle) {
		Set<?> set = scrapHandle.getScrapDetailSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				ScrapDetail scrapDetail = (ScrapDetail) object;
				if(Constant.SCRAP_HANDLE.equals(scrapDetail.getRelateModule())) {
					MaterialsOutStock materialsOutStock = new MaterialsOutStock();
					materialsOutStock.setDepotId(scrapHandle.getStoreId());
					materialsOutStock.setDepotName(scrapHandle.getStoreName());
					materialsOutStock.setLocationId(scrapHandle.getLocationId());
					materialsOutStock.setLocationName(scrapHandle.getStorageLocation());
					materialsOutStock.setSerial(scrapHandle.getScrapSerial());
					materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(scrapHandle.getApplyDate(), "yyyy-MM-dd"));
					materialsOutStock.setOutType("报废处理");
					materialsOutStock.setRelateBusiness("报废管理");
					materialsOutStock.setRemark(scrapHandle.getRemark());
					materialsOutStock.setCommodity(scrapDetail.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
					materialsOutStock.setSpecifications(scrapDetail.getMaterialsSpecifications().getSpecifications());
					materialsOutStock.setQuantity(scrapDetail.getScrapNum());
					materialsOutStock.setAuxiliaryQuantity(String.valueOf(new java.text.DecimalFormat("#.00").format(
							Double.valueOf(scrapDetail.getScrapNum()) * Double.valueOf(scrapDetail.getMaterialsSpecifications()
									.getSecondConvertedQuantity()))));
					materialsOutStock.setUnit(scrapDetail.getMaterialsSpecifications().getFirstUnitConversion());
					materialsOutStockDao.save(materialsOutStock);
				}
			}
		}
	}
	
	//减掉基地库存
	public void subMaterialsStore(ScrapHandle scrapHandle) {
		Set<ScrapDetail> set = scrapHandle.getScrapDetailSet();
		if(set.size()>0) {
			for(ScrapDetail sd : set) {
				if(Constant.SCRAP_HANDLE.equals(sd.getRelateModule())) {
					QueryFilter filter = new QueryFilter();
					filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ",scrapHandle.getStoreId()+"");
					filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ",scrapHandle.getLocationId()+"");//出库库位
					filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", sd.getMaterialsSpecifications().getSpecificationsId()+"");
					List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
					if(list.size()==1) {
						MaterialsStore ms = list.get(0);
						Integer i = Integer.valueOf(ms.getQuantity()) - Integer.valueOf(sd.getScrapNum()==null?"0":sd.getScrapNum());
						if(i<0) {
							throw new BusinessException("报废数量大于库存数量，审批失败");
						}
						ms.setQuantity(i.toString());
						materialsStoreService.merge(ms);
					}else if(list.size()>1) {
						throw new BusinessException("基地仓库存在重复周材！");
					}else {
						throw new BusinessException("基地仓库不存在【"+sd.getMaterialsSpecifications().getMaterialsCommodity().getCommodity()
								+sd.getMaterialsSpecifications().getSpecifications()+"】，无法审批通过！");
					}
				}
			}
		}
	}
}
