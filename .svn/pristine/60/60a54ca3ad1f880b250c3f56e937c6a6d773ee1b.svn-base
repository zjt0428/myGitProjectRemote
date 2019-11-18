
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ChargeHandleDao;
import com.knight.emms.dao.ReturnTempStoreDao;
import com.knight.emms.dao.TemporaryReturnDao;
import com.knight.emms.dao.TemporaryReturnDetailDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.ReturnTempStore;
import com.knight.emms.model.TemporaryReturn;
import com.knight.emms.model.TemporaryReturnDetail;
import com.knight.emms.service.TemporaryReturnService;


/**
 * @ClassName: TemporaryReturnServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenzj
 * @date 2018年3月26日14:47:18
 */
public class TemporaryReturnServiceImpl extends BusinessFlowServiceImpl<TemporaryReturn> implements TemporaryReturnService{
	
	@Resource
	private TemporaryReturnDao temporaryReturnDao;
	
	@Resource
	private TemporaryReturnDetailDao temporaryReturnDetailDao;
	
	@Resource
	private ChargeHandleDao chargeHandleDao;
	
	@Resource
	private ReturnTempStoreDao returnTempStoreDao;

	public TemporaryReturnServiceImpl(TemporaryReturnDao dao) {
		super(dao);
		temporaryReturnDao = dao;
	}

	public void saveOrMergeForEdit(TemporaryReturn temporaryReturn) {
		if (temporaryReturn.getReturnId() == null) {
			temporaryReturnDao.saveSerialModel(temporaryReturn);
		}
		temporaryReturn.setSubTemporaryReturn();
		temporaryReturnDao.merge(temporaryReturn);
	}

	@Override
	public void deleteDetail(Long detailId) {
		temporaryReturnDetailDao.remove(detailId);
	}

	@Override
	public void deleteHandle(Long handleId) {
		chargeHandleDao.remove(handleId);		
	}

	@Override
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		TemporaryReturn tr = super.passFlowApproveApplication(formApprove);
		temporaryReturnDao.save(tr);
		
		//减去库存数量
		for(TemporaryReturnDetail trd : tr.getTemporaryReturnDetailSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_depotId_L_EQ",tr.getDepotId()+"");
			filter.addConjunctFilter("Q_contractId_L_EQ",tr.getContractMaterials().getContractmaId()+"");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", trd.getSpecificationsId()+"");
			List<ReturnTempStore> list = returnTempStoreDao.getAll(filter);
			ReturnTempStore rts = new ReturnTempStore();
			if(list.size()==1) {
				rts = list.get(0);
				Integer num =Integer.valueOf(rts.getQuantity())-Integer.valueOf(trd.getReturnQuantity());
				if(num<0) {
					throw new BusinessException("退货数量大于暂存数量，请修改");
				}
				rts.setQuantity(num.toString());
			} else if(list.size()==0) {
				throw new BusinessException("暂存仓库不存在  仓库："+tr.getDepotName()+"周材:"+trd.getCommodity()+trd.getSpecifications()+"的记录");
			} else {
				throw new BusinessException("暂存仓库存在多条重复记录，仓库："+tr.getDepotName()+"周材:"+trd.getCommodity()+trd.getSpecifications());
			}
			returnTempStoreDao.merge(rts);
		}
	}
	
}