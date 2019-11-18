/**
 *====================================================
 * 文件名称: SettleContractServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.AdvanceReceiveDao;
import com.knight.emms.dao.AmountReceiveDao;
import com.knight.emms.dao.ClosedSettleInfoDao;
import com.knight.emms.dao.CombineSettleContractDao;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.LaborSettleDao;
import com.knight.emms.dao.OperatorSalaryStatementDao;
import com.knight.emms.dao.OtherExpenseStatementDao;
import com.knight.emms.dao.SafetyMonitorSettleStatementDao;
import com.knight.emms.dao.SettleComponBriefDao;
import com.knight.emms.dao.SettleContractDao;
import com.knight.emms.dao.SettleEquipBriefDao;
import com.knight.emms.dao.SettleItemBriefDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.domain.FundReceiveVoucherService;
import com.knight.emms.model.AdvanceReceive;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.AmountReceive;
import com.knight.emms.model.CombineSettleContract;
import com.knight.emms.model.ContractCostitem;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.LaborSettle;
import com.knight.emms.model.OperatorSalaryStatement;
import com.knight.emms.model.OtherExpenseStatement;
import com.knight.emms.model.SafetyMonitorSettleStatement;
import com.knight.emms.model.SettleComponBrief;
import com.knight.emms.model.SettleContract;
import com.knight.emms.model.SettleEquipBrief;
import com.knight.emms.model.SettleItemBrief;
import com.knight.emms.service.InstalmentService;
import com.knight.emms.service.ReceivementService;
import com.knight.emms.service.SettleContractService;
import com.knight.emms.support.FundPlanSupport;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: SettleContractServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午5:10:23
 */
public class SettleContractServiceImpl extends BaseBusinessModelServiceImpl<SettleContract> implements SettleContractService, FundReceiveVoucherService, FundPaymentVoucherService, ExportService {

	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private SettleContractDao settleContractDao;

	@Resource
	private SettleEquipBriefDao settleEquipBriefDao;

	@Resource
	private SettleComponBriefDao settleComponBriefDao;
	
	@Resource
	private AppUserService appUserService;

	@Resource
	private SettleItemBriefDao settleItemBriefDao;

	@Resource
	private EquipDiaryDao equipDiaryDao;

	@Resource
	private ContractLeaseDao contractLeaseDao;

	@Resource
	private InstalmentService instalmentService;

	@Resource
	private ReceivementService receivementService;
	
	@Resource
	private AmountReceiveDao amountReceiveDao;
	
	@Resource
	private OperatorSalaryStatementDao operatorSalaryStatementDao;
	
	@Resource
	private SafetyMonitorSettleStatementDao safetyMonitorSettleStatementDao;
	
	@Resource
	private OtherExpenseStatementDao otherExpenseStatementDao;
	
	@Resource
	private CombineSettleContractDao combineSettleContractDao;
	
	@Resource
	private AdvanceReceiveDao advanceReceiveDao;
	
	@Resource
	private ClosedSettleInfoDao closedSettleInfoDao;
	
	@Resource
	private LaborSettleDao laborSettleDao;
	
	public SettleContractServiceImpl(SettleContractDao dao) {
		super(dao);
		this.settleContractDao = dao;
	}

	public SettleContract getTranslateAll(Long settleId) {
		SettleContract settle = settleContractDao.get(settleId);
		CodeServiceImpl.translate(settle, settleContractDao.getPersistantStruct());
		settle.getSettleComponBriefSet();
		for(SettleEquipBrief se : settle.getSettleEquipBriefSet()){
			CodeServiceImpl.translate(se.getEquipment());
		}
		for(SettleItemBrief si : settle.getSettleItemBriefSet()){
			CodeServiceImpl.translate(si.getEquipment());
		}
		for(OperatorSalaryStatement os : settle.getOperatorSalaryStatementSet()){
			CodeServiceImpl.translate(os.getEquipment());
		}
		for(OtherExpenseStatement os : settle.getOtherExpenseStatementSet()){
			CodeServiceImpl.translate(os.getEquipment());
		}
		for(SafetyMonitorSettleStatement os : settle.getSafetyMonitorSettleStatementSet()){
			CodeServiceImpl.translate(os.getEquipment());
		}
		CodeServiceImpl.translate(settle.getInstalmentSet(), instalmentService.getPersistantStruct());
		CodeServiceImpl.translate(settle.getReceivementSet(), receivementService.getPersistantStruct());
		return settle;
	}

	public void saveOrMergeEdit(SettleContract settleContract) {
		isCloseSettle(settleContract);
		if (settleContract.getSettleId() == null) {
			settleContractDao.saveSerialModel(settleContract);
		}
		settleContract.setSubSettleContract();
//		if (settleContract.getTaxRate() != null && settleContract.getSettleAmount() != null) {
//			if(settleContract.getTaxRate().contains("%")) {
//				BigDecimal bd = new BigDecimal(settleContract.getTaxRate().replace("%", ""));
//				bd = bd.divide(new BigDecimal(100));
//				settleContract.setTaxAmount(settleContract.getSettleAmount().multiply(bd));
//			}
//		}
		settleContractDao.merge(settleContract);
		if (Type.Fund.receive.equals(settleContract.getFundType())) { // 收款
			settleContract.setReceivementSet(FundPlanSupport.createReceivement(settleContract));
			receivementService.saveOrMeger(settleContract.getReceivementSet());
		} else if (Type.Fund.payment.equals(settleContract.getFundType())) { // 付款
			settleContract.setInstalmentSet(FundPlanSupport.createInstalment(settleContract));
			instalmentService.saveOrMeger(settleContract.getInstalmentSet());
		}
	}

	public void deleteEquipBrief(Long seBriefId) {
		SettleEquipBrief seb = settleEquipBriefDao.get(seBriefId);
		SettleContract sc = settleContractDao.get(seb.getSettleId());
		isCloseSettle(sc);
		settleEquipBriefDao.remove(seBriefId);
	}

	public void deleteComponBrief(Long scBriefId) {
		SettleComponBrief scb = settleComponBriefDao.get(scBriefId);
		SettleContract sc = settleContractDao.get(scb.getSettleId());
		isCloseSettle(sc);
		settleComponBriefDao.remove(scBriefId);
	}

	public void deleteItemBrief(Long siBriefId) {
		SettleItemBrief sib = settleItemBriefDao.get(siBriefId);
		SettleContract sc = settleContractDao.get(sib.getSettleId());
		isCloseSettle(sc);
		settleItemBriefDao.remove(siBriefId);
	}

	//多个合同合并结算时，在计算合同金额时按各个合同分开计算
	public Map<Long, BigDecimal> splitCalculate(SettleContract sc) {
		isCloseSettle(sc);
		Map<Long, BigDecimal> map = new HashMap<Long, BigDecimal>();
		for(SettleEquipBrief seb : sc.getSettleEquipBriefSet()) {
			if(map.containsKey(seb.getContractId())) {
				BigDecimal bd = map.get(seb.getContractId());
				map.put(seb.getContractId(), bd.add(seb.getSummary()));
			} else {
				map.put(seb.getContractId(), seb.getSummary());
			}
		}
		for(SettleComponBrief scb : sc.getSettleComponBriefSet()) {
			if(map.containsKey(scb.getContractId())) {
				BigDecimal bd = map.get(scb.getContractId());
				map.put(scb.getContractId(), bd.add(scb.getSummary()));
			} else {
				map.put(scb.getContractId(), scb.getSummary());
			}
		}
		for(SettleItemBrief sib : sc.getSettleItemBriefSet()) {
			if(map.containsKey(sib.getContractId())) {
				BigDecimal bd = map.get(sib.getContractId());
				map.put(sib.getContractId(), bd.add(sib.getSummary()));
			} else {
				map.put(sib.getContractId(), sib.getSummary());
			}
		}
		for(OperatorSalaryStatement oss : sc.getOperatorSalaryStatementSet()) {
			if(map.containsKey(oss.getContractId())) {
				BigDecimal bd = map.get(oss.getContractId());
				map.put(oss.getContractId(), bd.add(oss.getSummary()));
			} else {
				map.put(oss.getContractId(), oss.getSummary());
			}
		}
		for(SafetyMonitorSettleStatement sms : sc.getSafetyMonitorSettleStatementSet()) {
			if(map.containsKey(sms.getContractId())) {
				BigDecimal bd = map.get(sms.getContractId());
				map.put(sms.getContractId(), bd.add(sms.getSummary()));
			} else {
				map.put(sms.getContractId(), sms.getSummary());
			}
		}
		for(OtherExpenseStatement oes : sc.getOtherExpenseStatementSet()) {
			if(map.containsKey(oes.getContractId())) {
				BigDecimal bd = map.get(oes.getContractId());
				map.put(oes.getContractId(), bd.add(oes.getAmount()));
			} else {
				map.put(oes.getContractId(), oes.getAmount());
			}
		}
		return map;
	}
	
	public void effective(SettleContract settleContract) {
		isCloseSettle(settleContract);
		for (SettleEquipBrief settleEquip : settleContract.getSettleEquipBriefSet()) {
			if (settleEquip.getEquipDiaryId() == null) {
				continue;
			}
			EquipDiary ed = equipDiaryDao.get(settleEquip.getEquipDiaryId());
			if (ed == null) {
				continue;
			}
			ed.setLastSettleDate(settleEquip.getEndSettleDate());
			equipDiaryDao.save(ed);
		}
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_settleContract.settleId_L_EQ", settleContract.getSettleId().toString());
		
		//为了防止各种不规范操作引起的数据错误，合同金额、应收款的展现改为动态计算获取，不再赋值  2019-10-23 lxx
		
//		List<CombineSettleContract> list = combineSettleContractDao.getAll(filter);
		/*if(list != null && list.size()>0) {
//			Map<Long, BigDecimal> map= splitCalculate(settleContract);
			for(CombineSettleContract csc : list) {
				ContractLease cl = csc.getContractLease();
//				if(map.containsKey(cl.getContractId())) {
					cl.setContractAmount(cl.getContractAmount().add(settleContract.getSettleAmount()));
					cl.setDebitReceivable(cl.getDebitReceivable().add(settleContract.getSettleAmount()));
					contractLeaseDao.save(cl);
//				}
			}
		}else {
			// 合同金额累加
			ContractLease cl = contractLeaseDao.get(settleContract.getContractId());
			//合同金额
			cl.setContractAmount(cl.getContractAmount().add(settleContract.getSettleAmount()));
			//应收款
			cl.setDebitReceivable(cl.getDebitReceivable().add(settleContract.getSettleAmount()));
			contractLeaseDao.save(cl);
		}*/
		settleContract.setEffective(Constant.ENABLED);
		refreshSum(settleContract);
		settleContractDao.save(settleContract);
	}

	public void loseEffective(SettleContract settleContract) {
		isCloseSettle(settleContract);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_relateId_L_EQ", settleContract.getSettleId()+"");
		filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_SETTLE_CONTRACT);
//		List<AmountReceive> list = amountReceiveDao.getAll(filter);
//		if(list.size()>0) {
//			throw new BusinessException("存在下游单据，无法失效！");
//		}
		QueryFilter filter2 = new QueryFilter();
		filter2.addConjunctFilter("Q_settleContract.settleId_L_EQ", settleContract.getSettleId().toString());
//		List<CombineSettleContract> list2 = combineSettleContractDao.getAll(filter2);
//		if(list2 != null && list2.size()>0) {
//			Map<Long, BigDecimal> map= splitCalculate(settleContract);
//			for(CombineSettleContract csc : list2) {
//				ContractLease cl = csc.getContractLease();
//				if(map.containsKey(cl.getContractId())) {
//					cl.setContractAmount(cl.getContractAmount().subtract(map.get(cl.getContractId())));
//					cl.setDebitReceivable(cl.getDebitReceivable().subtract(map.get(cl.getContractId())));
//					contractLeaseDao.save(cl);
//				}
//			}
//		}else {
//			// 合同金额累减
//			ContractLease cl = contractLeaseDao.get(settleContract.getContractId());
//			cl.setContractAmount(cl.getContractAmount().subtract(settleContract.getSettleAmount()));
//			cl.setDebitReceivable(cl.getDebitReceivable().subtract(settleContract.getSettleAmount()));
//			contractLeaseDao.save(cl);
//		}
		settleContract.setEffective(Constant.DISENABLED);
		settleContractDao.save(settleContract);
	}

	// ====================================================================================//
	public BigDecimal getRelatePaymentAmount(Long settled) {
		SettleContract settleContract = settleContractDao.get(settled);
		return settleContract.getSettleAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long settled, String status) {
		SettleContract b = settleContractDao.get(settled);
		isCloseSettle(b);
		b.setFinishedAmount(amountPayment.getHasPaymentAmount());
		b.setFundStatus(status);
		settleContractDao.save(b);
	}

	public BigDecimal getRelateReceiveAmount(Long settled) {
		SettleContract settleContract = settleContractDao.get(settled);
		return settleContract.getSettleAmount();
	}

	//结算金额的冲减
	public BigDecimal calculate(AmountReceive amountReceive,SettleContract sc, BigDecimal currentReceiveAmount) {
		if(sc.getBalanceAmount().compareTo(currentReceiveAmount) == -1) {
			BigDecimal tempAmount = currentReceiveAmount.subtract(sc.getBalanceAmount());
			sc.setFinishedAmount(sc.getSettleAmount());
			sc.setBalanceAmount(BigDecimal.ZERO);
			sc.setFundStatus(Status.Fund.received);
			BigDecimal summaryReceived = sc.getSummaryReceived();
			sc.setSummaryReceived(summaryReceived.add(currentReceiveAmount));
			sc.setArrears(sc.getSummaryReceivable().subtract(sc.getSummaryReceived()));
			settleContractDao.save(sc);
			return tempAmount;
		}else {
			sc.setFinishedAmount(sc.getFinishedAmount().add(currentReceiveAmount));
			BigDecimal summaryReceived = BigDecimal.ZERO;
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_projectId_L_EQ", sc.getProjectId()+"");
			filter.addConjunctFilter("Q_relateModule_S_EQ", amountReceive.getRelateModule());
			filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
			filter.addConjunctFilter("Q_applyforState_S_EQ", "3");
			List<AmountReceive> list = amountReceiveDao.getAll(filter);
			for(AmountReceive ar : list){
				summaryReceived = summaryReceived.add(ar.getReceiveAmount());
			}
			sc.setSummaryReceived(summaryReceived);
			sc.setArrears(sc.getSummaryReceivable().subtract(sc.getSummaryReceived()));
			sc.setBalanceAmount(sc.getBalanceAmount().subtract(currentReceiveAmount));
			sc.setFundStatus(Status.Fund.receiving);
			settleContractDao.save(sc);
			return BigDecimal.ZERO;
		}
	}
	
	public void saveRelateAmountReceiveStatus(AmountReceive amountReceive, Long settleId, String status) {
		SettleContract b = settleContractDao.get(settleId);
		isCloseSettle(b);
		if(b.getBalanceAmount().compareTo(amountReceive.getReceiveAmount())==1) {
			b.setFinishedAmount(b.getFinishedAmount().add(amountReceive.getReceiveAmount()));
			b.setBalanceAmount(b.getBalanceAmount().subtract(amountReceive.getReceiveAmount()));
			b.setFundStatus(Status.Fund.receiving);
			settleContractDao.save(b);
		}else if(b.getBalanceAmount().compareTo(amountReceive.getReceiveAmount())==0) {
			b.setFinishedAmount(b.getSettleAmount());
			b.setBalanceAmount(BigDecimal.ZERO);
			b.setFundStatus(Status.Fund.received);
			settleContractDao.save(b);
//		if(Status.Fund.receiving.equals(status) || amountReceive.getRelateAmount().compareTo(amountReceive.getHasReceiveAmount()) == 0) {
//			if(amountReceive.getRelateAmount().compareTo(amountReceive.getHasReceiveAmount())==-1){//业务应收金额    < 已收金额
//				b.setFinishedAmount(amountReceive.getHasReceiveAmount().add(b.getFinishedAmount()));
//			}else if(amountReceive.getRelateAmount().compareTo(amountReceive.getHasReceiveAmount()) == 0){
//				b.setFinishedAmount(amountReceive.getHasReceiveAmount());
//			}else if(amountReceive.getHasReceiveAmount().add(b.getFinishedAmount()).compareTo(amountReceive.getRelateAmount())==1){//（已收+本期结算已收）> 计划业务金额
//				b.setFinishedAmount(amountReceive.getRelateAmount());
//			}else if(amountReceive.getHasReceiveAmount().add(b.getFinishedAmount()).compareTo(amountReceive.getRelateAmount())==-1){
//				b.setFinishedAmount(amountReceive.getHasReceiveAmount().add(b.getFinishedAmount()));
//			}
//			b.setFinishedAmount(amountReceive.getHasReceiveAmount());                                         //已收金额
//			b.setBalanceAmount(amountReceive.getRelateAmount().subtract(amountReceive.getHasReceiveAmount()));//业务计划收款-已经收款
//			b.setFundStatus(status);
//			BigDecimal summaryReceived = b.getSummaryReceived()==null?BigDecimal.ZERO:b.getSummaryReceived();
//			b.setSummaryReceived(summaryReceived.add(amountReceive.getReceiveAmount()));
//			b.setArrears(b.getSummaryReceivable().subtract(b.getSummaryReceived()));
//			settleContractDao.save(b);
		}else {//已回款
			b.setFinishedAmount(b.getFinishedAmount().add(amountReceive.getReceiveAmount()));
			b.setBalanceAmount(b.getBalanceAmount().subtract(amountReceive.getReceiveAmount()));
			b.setFundStatus(Status.Fund.received);
			settleContractDao.save(b);
		}
		//当前结算单之后的结算单的累计已收加
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_settleId_L_GE", settleId+"");
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_effective_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_fundType_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_closedStatus_S_EQ", Constant.DISENABLED);
		filter.addConjunctFilter("Q_contractNo_S_EQ", b.getContractNo());
		filter.addConjunctFilter("Q_paEntName_S_EQ", b.getPaEntName());
		filter.addConjunctFilter("Q_projectName_S_EQ", b.getProjectName());
		filter.addConjunctFilter("Q_pbEntName_S_EQ", b.getPbEntName());
		filter.getPagingBean().setLimitSize(false);//查询全部
		List<SettleContract> list = settleContractDao.getAll(filter);
		for(SettleContract sc : list) {
			sc.setSummaryReceived(sc.getSummaryReceived().add(amountReceive.getReceiveAmount()));
			sc.setReceivedAmount(sc.getReceivedAmount().add(amountReceive.getReceiveAmount()));
			sc.setArrears(sc.getArrears().subtract(amountReceive.getReceiveAmount()));
			settleContractDao.update(sc);
		}
	}
	
	@Override
	public Set<ContractCostitem> getContractCostitems(Long contractId) {
		ContractLease c = contractLeaseDao.get(contractId);
		return c.getContractCostitemSet();
	}

	@Override
	public void deleteOperatorSalary(Long statementId) {
		OperatorSalaryStatement oss = operatorSalaryStatementDao.get(statementId);
		SettleContract sc = settleContractDao.get(oss.getSettleId());
		isCloseSettle(sc);
		operatorSalaryStatementDao.remove(statementId);
	}

	@Override
	public void deleteSafetyMonitor(Long statementId) {
		SafetyMonitorSettleStatement sss = safetyMonitorSettleStatementDao.get(statementId);
		SettleContract sc = settleContractDao.get(sss.getSettleId());
		isCloseSettle(sc);
		safetyMonitorSettleStatementDao.remove(statementId);
	}

	@Override
	public void deleteOtherExpense(Long statementId) {
		OtherExpenseStatement oes = otherExpenseStatementDao.get(statementId);
		SettleContract sc = settleContractDao.get(oes.getSettleId());
		isCloseSettle(sc);
		otherExpenseStatementDao.remove(statementId);
	}

	@Override
	public void saveCombine(SettleContract  sc, String contractIds) {
		isCloseSettle(sc);
		String[]  strs = contractIds.split(",");
		for(String contractId : strs) {
			CombineSettleContract csc  = new CombineSettleContract();
			csc.setSettleContract(sc);
			ContractLease cl  = new ContractLease();
			cl.setContractId(new Long(contractId));
			csc.setContractLease(cl);
			combineSettleContractDao.save(csc);
		}
	}
	
	@Override
	public void hedgingAdvanceReceive(SettleContract sc) {
		isCloseSettle(sc);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_applyforState_S_EQ", Status.Applyfor.passed);
		filter.addConjunctFilter("Q_settleId_L_NULL", Constant.ENABLED);
		filter.addConjunctFilter("Q_contractLease.contractNo_S_EQ", sc.getContractNo());
		filter.addConjunctFilter("Q_contractLease.projectName_S_EQ", sc.getProjectName());
		filter.addConjunctFilter("Q_contractLease.paEnt_L_EQ", sc.getPaEnt()+"");
		filter.addConjunctFilter("Q_contractLease.pbEnt_L_EQ", sc.getPbEnt()+"");
		List<AdvanceReceive> list = advanceReceiveDao.getAll(filter);
		if(list != null && list.size()>0) {
			BigDecimal bd = BigDecimal.ZERO;
			for(AdvanceReceive ar : list) {
				if(ar.getAdvanceReceiveAmount() != null) {
					bd = bd.add(ar.getAdvanceReceiveAmount());
				}
				ar.setSettleId(sc.getSettleId());
				advanceReceiveDao.update(ar);
			}
			sc.setFinishedAmount(bd);
			sc.setBalanceAmount(sc.getSettleAmount().subtract(sc.getFinishedAmount()));
			sc.setSummaryReceived(sc.getSummaryReceived().add(bd));
			sc.setReceivedAmount(sc.getReceivedAmount().add(bd));
			if(BigDecimal.ZERO.compareTo(sc.getBalanceAmount())==1) {
				sc.setFundStatus(Status.Fund.received);
			}else {
				sc.setFundStatus(Status.Fund.receiving);
			}
		}
	}
	
	public void isCloseSettle(SettleContract settleContract){
		String providedDate = settleContract.getProvidedDate().substring(0,7);
		String startSettleDate = settleContract.getStartSettleDate().substring(0,7);
		List<Map<String, Object>> list = closedSettleInfoDao.queryByScript("settle.close_settle_by_months",providedDate,startSettleDate);
		if(list!=null && list.size()>0){
			throw new BusinessException("结算单的填报时间和结算时间处于关账期间，无法操作！");
		}
	}
	
	public void editClosedStatus(String months,String closeStatus){
		settleContractDao.updateScirpt("settle.update_close_status", months,closeStatus);
		System.out.println("结算单的关账状态更新完成！");
		List<Map<String,Object>> list = settleContractDao.queryByScript("settle.update_close_status_list", months);
		AppUser ap =  appUserService.get(ApplicationContainer.getCurrentUserId());
		for(Map<String,Object> map : list){
			SettleContract sc = settleContractDao.get(new Long(map.get("SETTLE_ID").toString()));
			for(OperatorSalaryStatement o : sc.getOperatorSalaryStatementSet()){
				LaborSettle ls = new LaborSettle();
				ls.setSettleId(sc.getSettleId());
				ls.setApplyforState(Status.Applyfor.waitSubmit);
				ls.setContractNo(sc.getContractNo());
				ls.setPaEnt(sc.getPaEnt());
				ls.setPaModule(sc.getPaModule());
				ls.setPaEntName(sc.getPaEntName());
				ls.setPbEnt(sc.getPbEnt());
				ls.setPbModule(sc.getPbModule());
				ls.setPbEntName(sc.getPbEntName());
				ls.setStartSettleDate(sc.getStartSettleDate());
				ls.setEndSettleDate(sc.getEndSettleDate());
				ls.setLeaseProjectHead(sc.getMaterialPractiName());
				ls.setCostTotal(o.getCostTotal());
				ls.setUserId(ApplicationContainer.getCurrentUserId());
				ls.setUserName(ApplicationContainer.getCurrentUser().getUsername());
				ls.setDepartment(ApplicationContainer.getCurrentUser().getDepartment());
				ls.setPayState(Status.payState.unfinished);
				ls.setAfterTaxAmount(new BigDecimal(o.getAfterTaxAmount()));
				ls.setCreateDate(DateUtil.getCurrentLinkTimeStr());
				ls.setStatementId(o.getStatementId());
				ls.setEquipId(o.getEquipId());
				ls.setDelFlag(Constant.ENABLED);
				ls.setProjectName(sc.getProjectName());
				laborSettleDao.saveSerialModel(ls);
				ls = null;
			}
			sc = null;
		}
	}

	@Override
	public String getActivateMonths(String startDate, String endDate) {
		// TODO Auto-generated method stub
				String s = startDate.substring(8, 10);
				String e = endDate.substring(8,10);
				
				Calendar cal1 = Calendar.getInstance();
				Calendar cal2 = Calendar.getInstance();
				
				Date startDates = DateUtil.changeStrToDate(startDate,DateUtil.LINK_DISPLAY_DATE);
				Date endDates = DateUtil.changeStrToDate(endDate,DateUtil.LINK_DISPLAY_DATE);
				cal1.setTime(startDates);
				int startyear = cal1.get(Calendar.YEAR);
				int startmonth = cal1.get(Calendar.MONTH)+1;
				int startday = cal1.get(Calendar.DATE);
				int lastDay1 = cal1.getActualMaximum(Calendar.DAY_OF_MONTH);
				
				cal2.setTime(endDates);
				int endyear = cal2.get(Calendar.YEAR);
				int endmonth = cal2.get(Calendar.MONTH)+1;
				int endday = cal2.get(Calendar.DATE);
				int lastDay2 = cal2.getActualMaximum(Calendar.DAY_OF_MONTH);
						
		        int yearInterval = startyear - endyear;
		        if (startmonth < endmonth || startmonth == endmonth && startday < endday) {
		            yearInterval--;
		        }
		        int monthInterval = (startmonth + 12) - endmonth;
		        if (startday < endday) {
		            monthInterval--;
		        }
		        monthInterval %= 12;
		        int monthsDiff = Math.abs(yearInterval * 12 + monthInterval);
		        if(s.equals("01") && e.equals(String.valueOf(lastDay2))){
		        	return monthsDiff+"个月0天";
				}else if(!s.equals("01") && e.equals(String.valueOf(lastDay2))){
					int days = lastDay1-Integer.valueOf(s)+1;
					return String.valueOf(monthsDiff-1)+"个月"+days+"天";
				}else if(s.equals("01") && !e.equals(String.valueOf(lastDay2))){
					return String.valueOf(monthsDiff-1)+"个月"+Long.valueOf(e)+"天";
				}else if(!s.equals("01") && !e.equals(String.valueOf(lastDay2))){
					int days = lastDay1-Integer.valueOf(s)+Integer.valueOf(e)+1;
					if(days==30 || days==31){
						return String.valueOf(monthsDiff)+"个月0天";
					}else if(days>31){
						days = days-31;
						return String.valueOf(monthsDiff-1)+"个月"+days+"天";
					}else if(days<30){
						return String.valueOf(monthsDiff-1)+"个月"+days+"天";
					}
				}else if(s.equals(e)){
					return monthsDiff+"个月0天";
				}
		        return null;
	}
	
	@Override
	public void updateAmount(SettleContract settleContract,SettleContract p){
		isCloseSettle(settleContract);
		settleContract.setSubSettleContract();
		for (SettleEquipBrief settleEquip : settleContract.getSettleEquipBriefSet()) {
			if (settleEquip.getEquipDiaryId() == null) {
				continue;
			}
			EquipDiary ed = equipDiaryDao.get(settleEquip.getEquipDiaryId());
			if (ed == null) {
				continue;
			}
			ed.setLastSettleDate(settleEquip.getEndSettleDate());
			equipDiaryDao.save(ed);
		}
		
		//合并结算的合同重新计算
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_settleContract.settleId_L_EQ", settleContract.getSettleId().toString());
		List<CombineSettleContract> list = combineSettleContractDao.getAll(filter);
		if(list != null && list.size()>0) {
			Map<Long, BigDecimal> map= splitCalculate(p);
			for(CombineSettleContract csc : list) {
				ContractLease cl = csc.getContractLease();
				if(map.containsKey(cl.getContractId())) {
					cl.setContractAmount(cl.getContractAmount().subtract(map.get(cl.getContractId())));
					cl.setDebitReceivable(cl.getDebitReceivable().subtract(map.get(cl.getContractId())));
					contractLeaseDao.save(cl);
				}
			}
			Map<Long, BigDecimal> map2= splitCalculate(settleContract);
			for(CombineSettleContract csc : list) {
				ContractLease cl = csc.getContractLease();
				if(map.containsKey(cl.getContractId())) {
					cl.setContractAmount(cl.getContractAmount().add(map2.get(cl.getContractId())));
					cl.setDebitReceivable(cl.getDebitReceivable().add(map2.get(cl.getContractId())));
					contractLeaseDao.save(cl);
				}
			}
		}else {
			// 合同金额累减
			ContractLease cl = contractLeaseDao.get(settleContract.getContractId());
			cl.setContractAmount(cl.getContractAmount().subtract(settleContract.getSettleAmount()));
			cl.setDebitReceivable(cl.getDebitReceivable().subtract(settleContract.getSettleAmount()));
			cl.setContractAmount(cl.getContractAmount().add(settleContract.getSettleAmount()));
			cl.setDebitReceivable(cl.getDebitReceivable().add(settleContract.getSettleAmount()));
			contractLeaseDao.save(cl);
		}
		
		//关联的收款单重新计算
		QueryFilter filter2 = new QueryFilter();
		filter2.addConjunctFilter("Q_relateId_L_EQ", settleContract.getSettleId()+"");
		filter2.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_SETTLE_CONTRACT);
		filter2.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter2.addSorted("relateId", QueryFilter.ORDER_ASC);
		List<AmountReceive> amountReceives = amountReceiveDao.getAll(filter2);
		if(amountReceives!=null && amountReceives.size()>0){
			for(AmountReceive ar : amountReceives){
				ar.setRelateAmount(settleContract.getSettleAmount());
				if(Status.Applyfor.passed.equals(ar.getApplyforState())){
					saveRelateAmountReceiveStatus(ar,settleContract.getSettleId(),"1");
					if(settleContract.getBalanceAmount().compareTo(ar.getReceiveAmount())==1) {
						settleContract.setFinishedAmount(settleContract.getFinishedAmount().add(ar.getReceiveAmount()));
						settleContract.setBalanceAmount(settleContract.getBalanceAmount().subtract(ar.getReceiveAmount()));
						settleContract.setFundStatus(Status.Fund.receiving);
					}else if(settleContract.getBalanceAmount().compareTo(ar.getReceiveAmount())==0) {
						settleContract.setFinishedAmount(settleContract.getSettleAmount());
						settleContract.setBalanceAmount(BigDecimal.ZERO);
						settleContract.setFundStatus(Status.Fund.received);
					}else {//已回款
						settleContract.setFinishedAmount(settleContract.getFinishedAmount().add(ar.getReceiveAmount()));
						settleContract.setBalanceAmount(settleContract.getBalanceAmount().subtract(ar.getReceiveAmount()));
						settleContract.setFundStatus(Status.Fund.received);
					}
				}
			}
		}
		settleContractDao.merge(settleContract);
	}
	
	/**
	 * 刷新结算单的累计应收、已收、尚欠款
	 * @param settleContract
	 */
	public void refreshSum(SettleContract settleContract) {
		String currMonth = settleContract.getStartSettleDate().substring(0, 7);
		//获取合同最新累计已收
		List<Map<String, Object>> list1 = settleContractDao.queryByScript("fund.get_already_amount", settleContract.getContractId(),currMonth);
		if(list1.size()>0) {
			BigDecimal bd = new BigDecimal(list1.get(0).get("receiveAmount").toString());
			settleContract.setSummaryReceived(bd);
		}
		//获取合同最新累计应收
		List<Map<String, Object>> list2 = settleContractDao.queryByScript("fund.get_accumulated_amount", settleContract.getContractId(),currMonth);
		if(list2.size()>0) {
			BigDecimal bd = new BigDecimal(list2.get(0).get("accumulatedAmount").toString());
			settleContract.setSummaryReceivable(bd.add(settleContract.getSettleAmount()));
		}
		//重算尚欠款
		settleContract.setArrears(settleContract.getSummaryReceivable().subtract(settleContract.getSummaryReceived()));
		//更新合同的累计数据刷新时间
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_settleContract.settleId_L_EQ", settleContract.getSettleId().toString());
		List<CombineSettleContract> list3 = combineSettleContractDao.getAll(filter);
		if(list3 != null && list3.size()>0) {
			Map<Long, BigDecimal> map= splitCalculate(settleContract);
			for(CombineSettleContract csc : list3) {
				ContractLease cl = csc.getContractLease();
				if(map.containsKey(cl.getContractId())) {
					cl.setSumRefreshTime(DateUtil.getCurrentLinkTimeStr());
					contractLeaseDao.save(cl);
				}
			}
		}else {
			ContractLease cl = contractLeaseDao.get(settleContract.getContractId());
			cl.setSumRefreshTime(DateUtil.getCurrentLinkTimeStr());
			contractLeaseDao.save(cl);
		}
	}
}
