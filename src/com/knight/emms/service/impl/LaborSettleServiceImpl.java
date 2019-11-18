/**
 *====================================================
 * 文件名称: ContractLeaseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;



import javax.annotation.Resource;

import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.LaborPayDao;
import com.knight.emms.dao.LaborSettleDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LaborPay;
import com.knight.emms.model.LaborSettle;
import com.knight.emms.model.SettleContract;
import com.knight.emms.service.LaborSettleService;
import com.knight.emms.service.SettleContractService;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: LaborSettleServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:31:32
 */
public class LaborSettleServiceImpl extends BusinessFlowServiceImpl<LaborSettle> implements LaborSettleService {

	public LaborSettleServiceImpl(BaseBusinessModelDao<LaborSettle> dao) throws RuntimeException {
		super(dao);
	}

	@Resource
	private LaborSettleDao laborSettleDao;
	
	@Resource
	private LaborPayDao laborPayDao;
	
	@Resource
	private CodeService codeService;
	
	@Resource
	private SettleContractService settleContractService;
	
	@Override
	public void saveOrMergeForEdit(LaborSettle laborSettle) {
		if(laborSettle.getLaborSettId() == null){
			String seq = laborSettleDao.createNextSerial(laborSettle);
			laborSettle.getLaborSettSerial();
			laborSettleDao.save(laborSettle);
		}
		laborSettleDao.merge(laborSettle);
	}

	@Override
	public LaborSettle getTranslateAll(Long laborSettId) {
		LaborSettle laborSettle = laborSettleDao.get(laborSettId);
		CodeServiceImpl.translate(laborSettle.getSettleContract());
		CodeServiceImpl.translate(laborSettle.getEquipment());
		CodeServiceImpl.translate(laborSettle);
//		SettleContract sc = settleContractService.getTranslateAll(laborSettle.getSettleId());
//		laborSettle.setSettleContract(sc);
		return laborSettle;
	}
	
	public void passApproveApplication(FormApprove formApprove) {
		LaborSettle ls = super.passFlowApproveApplication(formApprove);
		LaborPay lp = new LaborPay();
//		lp.setLaborPaySerial(ls.getLaborSettSerial());
		lp.setContractNo(ls.getContractNo());
		lp.setPaEnt(ls.getPaEnt());
		lp.setPaModule(ls.getPaModule());
		lp.setPaEntName(ls.getPaEntName());
		lp.setStartSettleDate(ls.getStartSettleDate());
		lp.setEndSettleDate(ls.getEndSettleDate());
		lp.setEquipId(ls.getEquipId());
		lp.setLaborSettId(ls.getLaborSettId());
		lp.setRate(ls.getSettleContract().getTaxRate());
		lp.setCreateDate(DateUtil.getCurrentLinkTimeStr());
		lp.setPayState(Status.payState.unpaid);
		lp.setCopeAmount(ls.getCostTotal());
		lp.setProjectName(ls.getProjectName());
		lp.setDelFlag(Constant.ENABLED);
		lp.setLeaseProjectHead(ls.getLeaseProjectHead());
		lp.setAfterTaxAmount(ls.getAfterTaxAmount());
		laborPayDao.saveSerialModel(lp);
		ls.setPayState(Status.payState.unpaid);
		laborSettleDao.update(ls);
	}
	
}
