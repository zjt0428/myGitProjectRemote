
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.emms.dao.*;
import com.knight.emms.model.*;
import com.knight.emms.service.*;
import com.knight.system.model.Department;
import com.knight.system.service.DepartmentService;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceAbstract;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

/**
 * @ClassName: DepotTransfersServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class DepotTransfersServiceImpl extends BusinessFlowServiceAbstract<DepotTransfers> implements DepotTransfersService {

	private DepotTransfersDao depotTransfersDao;

	@Resource
	private TransfersDetailDao transfersDetailDao;

	@Resource
	private TransfersEquipDetailDao transfersEquipDetailDao;
	
	@Resource
	private StoreJoinComponentService storeJoinComponentService;

	@Resource
	private EquipmentService equipmentService;

	@Resource
	private DepartmentService departmentService;
	
	public DepotTransfersServiceImpl(DepotTransfersDao dao) {
		super(dao);
		this.depotTransfersDao = dao;
	}

	@Override
	public void saveCreate(DepotTransfers depotTransfers) {
//		depotTransfers.setDelFlag(Constant.ENABLED);
		depotTransfers.setApplyforState(Status.Applyfor.waitSubmit);
		depotTransfersDao.saveSerialModel(depotTransfers);
		depotTransfers.setSubAllocation();
		depotTransfersDao.save(depotTransfers);
	}
	
	@Override
	public DepotTransfers getTranslateFull(Long depottId) {
		DepotTransfers d = depotTransfersDao.get(depottId);
		CodeServiceImpl.translate(d, getPersistantStruct());
		return d;
	}

	@Override
	public void deletedDetail(Long tdetailId) {
		transfersDetailDao.remove(tdetailId);
	}

	@Override
	public void deleteEquipDetail(Long edetailId) {
		transfersEquipDetailDao.remove(edetailId);
	}

	@Override
	public void submitDepot(Long depottId) {
		DepotTransfers p = depotTransfersDao.get(depottId);
		if (!Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
			throw new BusinessException("项目调拨方案[" + p.getTransfersNum() + "]状态不合法,无法提交!");
		}
		p.setApplyforState(Status.Applyfor.waitApprove);
		depotTransfersDao.save(p);
	}
	
	/** 审批通过后对应的仓库库存数量根据调入,调出库位做调整 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		DepotTransfers ap = super.passFlowApproveApplication(formApprove);
		Long depId = null;
		if(ap.getDepartment().getPath().length()>9){
			depId = Long.valueOf(ap.getDepartment().getPath().substring(5,7));
		}else{
			depId = ap.getDepartment().getDepId();
		}
		Department d = departmentService.get(depId);
		//仓库设备调整
		for(TransfersEquipDetail ae : ap.getTransfersEquipDetailSet()){
			Equipment e = equipmentService.get(ae.getEquipId());
			e.setDepartment(d);
			e.setStoreId(ap.getInDepotId());
			e.setStoreName(ap.getInDepotName());
			equipmentService.merge(e);
		}

		// 仓库周材库存调整
		for (TransfersDetail ad : ap.getTransfersDetailSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_storeHouse.storeId_L_EQ", ap.getOutDepotId() + "");
			filter.addConjunctFilter("Q_component.componId_L_EQ", ad.getSpecificationsId() + "");
			List<StoreJoinComponent> list = storeJoinComponentService.queryTranslateAll(filter);
			StoreJoinComponent ms = new StoreJoinComponent();
			QueryFilter filter2 = new QueryFilter();
			filter2.addConjunctFilter("Q_storeHouse.storeId_L_EQ", ap.getInDepotId() + "");
			filter2.addConjunctFilter("Q_component.componId_L_EQ", ad.getSpecificationsId() + "");
			List<StoreJoinComponent> list2 = storeJoinComponentService.queryTranslateAll(filter2);
			StoreJoinComponent ms2 = new StoreJoinComponent();
			StoreHouse sh = new StoreHouse();
			Component com = new Component();
			if (list.size() > 0 && list2.size() > 0) {
				ms = list.get(0);
				ms2 = list2.get(0);
				Integer i = (int)ms.getCounts() - Integer.valueOf(ad.getTransfersCounts()==null? "0" :ad.getTransfersCounts());
				Integer i2 = (int)ms2.getCounts() + Integer.valueOf(ad.getTransfersCounts()==null? "0" :ad.getTransfersCounts());
				if(i<0){
					throw new BusinessException("调拨数量大于库存数量，审批失败");
				}
				ms.setCounts(i);
				ms2.setCounts(i2);
			} else if (list.size() == 0) {
				throw new BusinessException("调出的仓库，库位不存在周材：");
			} else if (list.size() > 0 && list2.size() == 0) {
				ms = list.get(0);
				Integer i = (int)ms.getCounts() - Integer.valueOf(ad.getTransfersCounts()==null? "0" :ad.getTransfersCounts());//调出库位库存-调拨数量
				if(i<0){
					throw new BusinessException("调拨数量大于库存数量，审批失败");
				}
				ms.setCounts(i);
				Integer i2 = Integer.valueOf(ad.getTransfersCounts()==null? "0" :ad.getTransfersCounts());
				ms2.setCounts(i2);
				sh.setStoreId(ap.getInDepotId());
				ms2.setStoreHouse(sh);
				com.setComponId(ad.getSpecificationsId());
				ms2.setComponent(com);
			}
			storeJoinComponentService.merge(ms);
			storeJoinComponentService.merge(ms2);
		}
	}
}
