package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.BaldetailDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.TakeStockDao;
import com.knight.emms.model.Baldetail;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.model.TakeStock;
import com.knight.emms.service.MaterialsStoreService;
import com.knight.emms.service.TakeStockService;

import lombok.SneakyThrows;

@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class TakeStockServiceImpl extends BusinessFlowServiceImpl<TakeStock> implements TakeStockService{
	
	private TakeStockDao takeStockDao;
	
	@Resource
	private MaterialsStoreService materialsStoreService;
	
	/** 周材入库记录表 */
	@Resource
	private MaterialsInStockDao materialsInStockDao;
	
	/** 周材出库记录表 */
	@Resource
	private MaterialsOutStockDao materialsOutStockDao;
	
	@Resource
	private BaldetailDao baldetailDao;
	
	public TakeStockServiceImpl(TakeStockDao dao) {
		super(dao);
		this.takeStockDao = dao;
	}

	@Override
	public TakeStock getTranslateFull(Long takeStockId) {
		TakeStock t = takeStockDao.get(takeStockId);
		return t;
	}
	
	@Override
	public List<TakeStock> queryTranslateAllFull(QueryFilter filter) {
		List<TakeStock> list = takeStockDao.getAll(filter);
		return list;
	}

	public void creatSerial(TakeStock takeStock){
		if(takeStock.getTakeStockId() == null){
			String seq = takeStockDao.createNextSerial(takeStock);
			takeStock.setInvoicesSerial(seq);
		}
	}
	@Override
	public void saveCreate(TakeStock takeStock) {
		takeStockDao.save(takeStock);
	}

	@Override
	public void saveOrMergeForEdit(TakeStock t) {
	}

	@Override
	public void saveOrUpdate(TakeStock takeStock) {
	}
	
	/**审批通过后对盘盈，盘亏出入库处理以及对库存相应增减*/
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		TakeStock tk = super.passFlowApproveApplication(formApprove);
		takeStockDao.save(tk);
		//根据盘盈，盘亏对库存做调整
		for(Baldetail bd : tk.getBaldetailSet()){
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", tk.getStoreId() + "");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", bd.getLocationId() + "");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", bd.getSpecificationsId() + "");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			if(list.size()>0){
				ms = list.get(0);
				Integer i1 = Integer.valueOf(bd.getFirmofferInventory()) - Integer.valueOf(bd.getBookInventory());//实盘库存-账面库存
				if(i1 > 0){
					//盈亏量(实盘库存-账面库存)为正数，则库存增加,按照入库类型处理，入库类型为盘盈入库
					Integer i2 = Integer.valueOf(ms.getQuantity()) + i1;
					ms.setQuantity(i2.toString());
					materialsStoreService.merge(ms);
					// 同步至周材入库记录表生成记录值
					this.addMaterialsIn(tk,bd,i1);
					logger.info("已同步至周材入库记录表并生成记录值!");
				}else if(i1 < 0){
					//盈亏量(实盘库存-账面库存)为负数，则库存减少,按照出库类型处理，出库类型为盘亏出库
					Integer i2 = Integer.valueOf(ms.getQuantity()) + i1;
					ms.setQuantity(i2.toString());
					materialsStoreService.merge(ms);
					// 同步至周材出库记录表生成记录值
					this.addMaterialsOut(tk,bd,i1);
					logger.info("已同步至周材出库记录表并生成记录值!");
				}
			}else if (list.size() == 0) {
				throw new BusinessException("调出的仓库，库位不存在周材：" + bd.getSpecifications());
			}
		}
	}
	
	/**
	 * 同步至周材入库记录表生成记录值
	 * @param TakeStock
	 * @author xnz
	 * @Date 2017/12/28
	 */
	public void addMaterialsIn(TakeStock takeStock,Baldetail baldetail,Integer i1) {
		if (baldetail != null) {
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setDepotId(takeStock.getStoreId());
				materialsInStock.setDepotName(takeStock.getStoreName());
				materialsInStock.setLocationId(baldetail.getLocationId());
				materialsInStock.setLocationName(baldetail.getLocationName());
				materialsInStock.setSerial(takeStock.getInvoicesSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(takeStock.getTakeStockDate(), "yyyy-MM-dd"));
				materialsInStock.setInType("盘盈入库");
				materialsInStock.setRelateBusiness("盘点管理");
				materialsInStock.setRemark(takeStock.getRemark());
				materialsInStock.setCommodity(baldetail.getCommodity());
				materialsInStock.setSpecifications(baldetail.getSpecifications());
				materialsInStock.setQuantity(i1.toString());
				materialsInStock.setAuxiliaryQuantity(baldetail.getAuxiliaryQuantity());
				materialsInStock.setUnit(baldetail.getFirstUnitConversion());
				materialsInStockDao.save(materialsInStock);
		}
	}
	
	/**
	 * 同步至周材出库记录表生成记录值
	 * @param TakeStock
	 * @author xnz
	 * @Date 2017/12/28
	 */
	public void addMaterialsOut(TakeStock takeStock,Baldetail baldetail,Integer i1) {
		if (baldetail != null) {
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(takeStock.getStoreId());
				materialsOutStock.setDepotName(takeStock.getStoreName());
				materialsOutStock.setLocationId(baldetail.getLocationId());
				materialsOutStock.setLocationName(baldetail.getLocationName());
				materialsOutStock.setSerial(takeStock.getInvoicesSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(takeStock.getTakeStockDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("盘亏出库");
				materialsOutStock.setRelateBusiness("盘点管理");
				materialsOutStock.setRemark(takeStock.getRemark());
				materialsOutStock.setCommodity(baldetail.getCommodity());
				materialsOutStock.setSpecifications(baldetail.getSpecifications());
				Integer i = (-1)*i1;
				materialsOutStock.setQuantity(i.toString());
				materialsOutStock.setAuxiliaryQuantity(baldetail.getAuxiliaryQuantity());
				materialsOutStock.setUnit(baldetail.getFirstUnitConversion());
				materialsOutStockDao.save(materialsOutStock);
		}
	}
	
	@Override
	public void deletedDetail(Long baldetailId) {
		baldetailDao.remove(baldetailId);
	}
}
