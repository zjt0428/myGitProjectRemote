package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ApplicationDetailDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.OtherMaterialStockDao;
import com.knight.emms.model.ApplicationDetail;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.model.OtherMaterialStock;
import com.knight.emms.service.MaterialsStoreService;
import com.knight.emms.service.OtherMaterialStockService;

import lombok.SneakyThrows;
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class OtherMaterialStockServiceImpl extends BusinessFlowServiceImpl<OtherMaterialStock> implements OtherMaterialStockService{

	@Resource
	private OtherMaterialStockDao otherMaterialStockDao;
	
	@Resource
	private MaterialsStoreService materialsStoreService;
	
	/** 周材入库记录表 */
	@Resource
	private MaterialsInStockDao materialsInStockDao;
	
	/** 周材出库记录表 */
	@Resource
	private MaterialsOutStockDao materialsOutStockDao;
	
	
	@Resource
	private ApplicationDetailDao applicationDetailDao;
	
	public OtherMaterialStockServiceImpl(OtherMaterialStockDao dao) {
		super(dao);
		this.otherMaterialStockDao = dao;
	}

	@Override
	public void creatSerial(OtherMaterialStock otherMaterialStock) {
		if(otherMaterialStock.getOtherMaterialStockId() == null){
			String seq = otherMaterialStockDao.createNextSerial(otherMaterialStock);
			otherMaterialStock.setOmsSerial(seq);
		}
	}

	@Override
	public void saveOrMergeForEdit(OtherMaterialStock t) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void deletedDetail(Long applicationDetailId) {
		applicationDetailDao.remove(applicationDetailId);
	}
	
	/**审批通过的其他出入库处理对应处理类型影响库存*/
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		OtherMaterialStock os = super.passFlowApproveApplication(formApprove);
	
		//根据处理类型对库存做调整
		for(ApplicationDetail ad : os.getApplicationDetailSet()){
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", os.getStoreId() + "");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", ad.getLocationId() + "");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", ad.getSpecificationsId() + "");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			if(list.size()>0){
				ms = list.get(0);
				if(os.getHandleType().equals("0")){//处理类型为出库处理，则库存-数量
					if(Integer.valueOf(ad.getNumber()) > 0){
						Integer i = Integer.valueOf(ms.getQuantity()) - Integer.valueOf(ad.getNumber()==null?"0":ad.getNumber());
						if(i<0) {
							throw new BusinessException("出库数量大于库存数量，审批失败");
						}
						ms.setQuantity(i.toString());
						materialsStoreService.merge(ms);
						// 同步至周材出库记录表生成记录值
						this.addMaterialsOut(os,ad);
						logger.info("已同步至周材出库记录表并生成记录值!");
					}else if(Integer.valueOf(ad.getNumber()) < 0){
						throw new BusinessException("数量不能为负数");
					}
				}else if(os.getHandleType().equals("1")){//处理类型为入库处理，则库存+数量
					if(Integer.valueOf(ad.getNumber()) > 0){
						Integer i = Integer.valueOf(ms.getQuantity()) + Integer.valueOf(ad.getNumber()==null?"0":ad.getNumber());
						ms.setQuantity(i.toString());
						materialsStoreService.merge(ms);
						// 同步至周材入库记录表生成记录值
						this.addMaterialsIn(os,ad);
						logger.info("已同步至周材入库记录表并生成记录值!");
					}else if(Integer.valueOf(ad.getNumber()) < 0){
						throw new BusinessException("数量不能为负数");
					}
				}
			}else if (list.size() == 0) {
				throw new BusinessException("调出的仓库，库位不存在周材：" + ad.getSpecifications());
			}
		}
		otherMaterialStockDao.save(os);
	}
	
	/**
	 * 同步至周材出库记录表生成记录值
	 * @param OtherMaterialStock
	 * @author xnz
	 * @Date 2018/01/03
	 */
	@SneakyThrows(RuntimeException.class)
	public void addMaterialsOut(OtherMaterialStock otherMaterialStock,ApplicationDetail applicationDetail) {
		if (applicationDetail != null) {
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(otherMaterialStock.getStoreId());
				materialsOutStock.setDepotName(otherMaterialStock.getStoreName());
				materialsOutStock.setLocationId(applicationDetail.getLocationId());
				materialsOutStock.setLocationName(applicationDetail.getLocationName());
				materialsOutStock.setSerial(otherMaterialStock.getOmsSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(otherMaterialStock.getHandleDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("其他出库");
				materialsOutStock.setRelateBusiness("其他出入库处理");
				materialsOutStock.setRemark(otherMaterialStock.getRemark());
				materialsOutStock.setCommodity(applicationDetail.getCommodity());
				materialsOutStock.setSpecifications(applicationDetail.getSpecifications());
				materialsOutStock.setQuantity(applicationDetail.getNumber());
				materialsOutStock.setAuxiliaryQuantity(applicationDetail.getSupplementNum());
				materialsOutStock.setUnit(applicationDetail.getUnit());
				materialsOutStockDao.save(materialsOutStock);
		}
	}
	
	/**
	 * 同步至周材入库记录表生成记录值
	 * @param OtherMaterialStock
	 * @author xnz
	 * @Date 2018/01/03
	 */
	@SneakyThrows(RuntimeException.class)
	public void addMaterialsIn(OtherMaterialStock otherMaterialStock,ApplicationDetail applicationDetail) {
		if (applicationDetail != null) {
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setDepotId(otherMaterialStock.getStoreId());
				materialsInStock.setDepotName(otherMaterialStock.getStoreName());
				materialsInStock.setLocationId(applicationDetail.getLocationId());
				materialsInStock.setLocationName(applicationDetail.getLocationName());
				materialsInStock.setSerial(otherMaterialStock.getOmsSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(otherMaterialStock.getHandleDate(), "yyyy-MM-dd"));
				materialsInStock.setInType("其他入库");
				materialsInStock.setRelateBusiness("其他出入库处理");
				materialsInStock.setRemark(otherMaterialStock.getRemark());
				materialsInStock.setCommodity(applicationDetail.getCommodity());
				materialsInStock.setSpecifications(applicationDetail.getSpecifications());
				materialsInStock.setQuantity(applicationDetail.getNumber());
				materialsInStock.setAuxiliaryQuantity(applicationDetail.getSupplementNum());
				materialsInStock.setUnit(applicationDetail.getUnit());
				materialsInStockDao.save(materialsInStock);
		}
	}

}
