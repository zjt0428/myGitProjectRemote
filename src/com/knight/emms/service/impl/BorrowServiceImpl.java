/**
 *====================================================
 * 文件名称: BorrowServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-12			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.BorrowAcceptanceDao;
import com.knight.emms.dao.BorrowComponentDao;
import com.knight.emms.dao.BorrowDao;
import com.knight.emms.dao.BorrowEquipDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.domain.FundReceiveVoucherService;
import com.knight.emms.domain.SchedularDispatchDomain;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.AmountReceive;
import com.knight.emms.model.Borrow;
import com.knight.emms.model.BorrowAcceptance;
import com.knight.emms.model.BorrowComponent;
import com.knight.emms.model.BorrowEquip;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.Instalment;
import com.knight.emms.model.Receivement;
import com.knight.emms.service.BorrowService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.service.EquipDiaryService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.InstalmentService;
import com.knight.emms.service.ReceivementService;
import com.knight.emms.support.FundPlanSupport;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: BorrowServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-12 上午11:07:27
 */
public class BorrowServiceImpl extends BusinessFlowServiceImpl<Borrow> implements BorrowService, FundReceiveVoucherService, FundPaymentVoucherService {

	private BorrowDao borrowDao;

	@Resource
	private CodeService codeService;

	@Resource
	private BorrowComponentDao borrowComponentDao;

	@Resource
	private BorrowEquipDao borrowEquipDao;

	@Resource
	private BorrowAcceptanceDao borrowAcceptanceDao;

	@Resource
	private InstalmentService instalmentService;

	@Resource
	private ReceivementService receivementService;

	@Resource
	private ComponDiaryService componDiaryService;

	@Resource
	private EquipDiaryService equipDiaryService;

	@Resource
	private SchedularDispatchDomain dispatchSchedularDomain;

	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private BorrowEquipDao borrowEquipdao;
	
	@Resource
	private EquipmentService equipmentService;
	
	@Resource
	private BorrowService borrowService;

	public BorrowServiceImpl(BorrowDao dao) {
		super(dao);
		this.borrowDao = dao;
		passAcceptStateMap.put(Status.BorrowApplyfor.waitRenewaccept, Status.BorrowApplyfor.waitRenewapprove);
		rejectAcceptStateMap.put(Status.BorrowApplyfor.waitRenewaccept, Status.BorrowApplyfor.waitReturn);

		passApproveStateMap.put(Status.BorrowApplyfor.waitRenewapprove, Status.BorrowApplyfor.waitReturn);
		rejectApproveStateMap.put(Status.BorrowApplyfor.waitRenewapprove, Status.BorrowApplyfor.waitReturn);
	}

	public Borrow getTranslateFull(Long borrowId) {
		Borrow p = borrowDao.get(borrowId);
		CodeServiceImpl.translate(p, getPersistantStruct());
		for (BorrowComponent c : p.getBorrowComponentSet()) {
			CodeServiceImpl.translate(c, borrowComponentDao.getPersistantStruct());
		}
		for (BorrowEquip c : p.getBorrowEquipSet()) {
			CodeServiceImpl.translate(c, borrowEquipDao.getPersistantStruct());
		}
		for (Instalment c : p.getInstalmentSet()) {
			CodeServiceImpl.translate(c, instalmentService.getPersistantStruct());
		}
		for (Receivement c : p.getReceivementSet()) {
			CodeServiceImpl.translate(c, receivementService.getPersistantStruct());
		}
		for (BorrowAcceptance c : p.getBorrowAcceptanceSet()) {
			CodeServiceImpl.translate(c, borrowAcceptanceDao.getPersistantStruct());
		}
		return p;
	}

	public List<BorrowComponent> queryComponentAll(QueryFilter filter) {
		filter.getPagingBean().setPageSize(1000);
		List<BorrowComponent> compons = borrowComponentDao.getAll(filter);
		for (BorrowComponent c : compons) {
			CodeServiceImpl.translate(c, borrowComponentDao.getPersistantStruct());
		}
		return compons;
	}

	public List<BorrowEquip> queryEquipAll(QueryFilter filter) {
		filter.getPagingBean().setPageSize(1000);
		List<BorrowEquip> equips = borrowEquipDao.getAll(filter);
		for (BorrowEquip c : equips) {
			CodeServiceImpl.translate(c, borrowEquipDao.getPersistantStruct());
		}
		return equips;
	}

	@Override
	public void saveOrMergeForEdit(Borrow borrow) {
		if (borrow.getBorrowId() == null) {
			borrowDao.saveSerialModel(borrow);
		}
		borrow.setSubBorrow();
		borrowDao.merge(borrow);
		if (Type.Fund.payment.equals(borrow.getBorrowType())) { // 借入类型-付款
			borrow.setInstalmentSet(FundPlanSupport.createInstalment(borrow));
			instalmentService.saveOrMeger(borrow.getInstalmentSet());
		} else if (Type.Fund.receive.equals(borrow.getBorrowType())) { // 借出类型-收款
			borrow.setReceivementSet(FundPlanSupport.createReceivement(borrow));
			receivementService.saveOrMeger(borrow.getReceivementSet());
		}
	}

	public void deletedComponent(Long borrowComponId) {
		borrowComponentDao.remove(borrowComponId);
	}

	public void deletedEquip(Long borrowEquipId) {
		borrowEquipDao.remove(borrowEquipId);
	}

	public void passApproveApplication(FormApprove formApprove) {
		Borrow t = borrowDao.get(formApprove.getRelateId());
		String applyforState = t.getApplyforState();
		super.passFlowApproveApplication(t);
		if (Status.BorrowApplyfor.waitRenewapprove.equals(applyforState)) {
			t.setRemark(t.getRemark() + "\r\n归还日期由[" + t.getReturnDate() + "]延长至[" + t.getRenewDate() + "]");
			t.setReturnDate(t.getRenewDate());
		} else if (Status.BorrowApplyfor.waitApprove.equals(applyforState)) {
			componDiaryService.startBorrowComponDiary(t, t.getBorrowComponentSet());
			equipDiaryService.startBorrowEquipDiary(t, t.getBorrowEquipSet());
		}
		if("1".equals(formApprove.getApproveOpinion())){
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_borrowId_L_EQ",String.valueOf(formApprove.getRelateId()));
			Borrow p = borrowService.getTranslateFull(formApprove.getRelateId());
			List<BorrowEquip> list = borrowEquipdao.getAll(filter);
			if(list != null && list.size()>0) {
				for(BorrowEquip b : list) {
					Equipment e = equipmentService.get(b.getEquipId());
					e.setStatus(Status.EquipCompon.inused);
					e.setBusinessStatus(Status.EquipBusiness.activate);
					e.setProjectName(p.getAddress());
					equipmentService.save(e);
				}
			}
		}
		borrowDao.save(t);
	}

	public void acceptance(BorrowAcceptance acc, String accMethod) {
		Borrow t = borrowDao.get(acc.getBorrowId());
		boolean finishedFlag = true;
		Set<BorrowComponent> accComponents = GsonUtil.fromJson(acc.getBorrowComponents(), new TypeToken<Set<BorrowComponent>>() {});
		Map<Long, BorrowComponent> accBorrowComponents = new HashMap<Long, BorrowComponent>();
		if (accComponents != null) {
			for (BorrowComponent bc : accComponents) {
				accBorrowComponents.put(bc.getBorrowComponId(), bc);
			}
		}
		for (BorrowComponent bc : t.getBorrowComponentSet()) {
			if (Status.BorrowAcc.unreturn.equals(bc.getStatus()) || Status.BorrowAcc.damage.equals(bc.getStatus())) {
				if (!accBorrowComponents.containsKey(bc.getBorrowComponId())) {
					finishedFlag = false;
					continue;
				}
				if (Status.BorrowAcc.damage.equals(accMethod)) {
					finishedFlag = false;
				}
				bc.setStatus(accMethod);
				bc.setUserId(acc.getUserId());
				bc.setUserName(acc.getUserName());
				if (Status.BorrowAcc.returned.equals(accMethod)) {
					BorrowComponent b = accBorrowComponents.get(bc.getBorrowComponId());
					if(b.getReturnDate()!=null){
						bc.setReturnDate(b.getReturnDate());
					}else{
						bc.setReturnDate(DateUtil.getCurrentLinkDateStr());
					}
					if(b.getReturnCounts()!=null){
						if(bc.getReturnCounts()==null){
							bc.setReturnCounts(0);
						}
						bc.setBorrowCounts(bc.getBorrowCounts()-b.getReturnCounts());
						bc.setReturnCounts(b.getReturnCounts()+bc.getReturnCounts());
					}
					bc.setReturnStoreId(accBorrowComponents.get(bc.getBorrowComponId()).getReturnStoreId());
					componDiaryService.overBorrowComponDiary(t, bc, b);
				} else if (Status.BorrowAcc.lose.equals(accMethod)) {
					componDiaryService.loseBorrowComponDiary(t, bc);
				}
				borrowComponentDao.save(bc);
			}
			if(bc.getBorrowCounts() != 0) {
				finishedFlag=false;
				bc.setStatus(Status.BorrowAcc.unreturn);
			}
		}
		Set<BorrowEquip> accEquipments = GsonUtil.fromJson(acc.getBorrowEquips(), new TypeToken<Set<BorrowEquip>>() {});
		Map<Long, BorrowEquip> accBorrowEquipments = new HashMap<Long, BorrowEquip>();
		if (accEquipments != null) {
			for (BorrowEquip be : accEquipments) {
				accBorrowEquipments.put(be.getBorrowEquipId(), be);
			}
		}
		for (BorrowEquip be : t.getBorrowEquipSet()) {
			if (Status.BorrowAcc.unreturn.equals(be.getStatus()) || Status.BorrowAcc.damage.equals(be.getStatus())) {
				if (!accBorrowEquipments.containsKey(be.getBorrowEquipId())) {
					finishedFlag = false;
					continue;
				}
				if (Status.BorrowAcc.damage.equals(accMethod)) {
					finishedFlag = false;
				}
				be.setStatus(accMethod);
				be.setUserId(acc.getUserId());
				be.setUserName(acc.getUserName());
				if (Status.BorrowAcc.returned.equals(accMethod)) {
					BorrowEquip b = accBorrowEquipments.get(be.getBorrowEquipId());
					if(b.getReturnDate()!=null){
						be.setReturnDate(b.getReturnDate());
					}else{
						be.setReturnDate(DateUtil.getCurrentLinkDateStr());
					}
					be.setReturnStoreId(accBorrowEquipments.get(be.getBorrowEquipId()).getReturnStoreId());
					equipDiaryService.overBorrowEquipDiary(t, be);
				} else if (Status.BorrowAcc.lose.equals(accMethod)) {
					equipDiaryService.loseBorrowEquipDiary(t, be);
				}
				borrowEquipDao.save(be);
			}
		}
		borrowAcceptanceDao.save(acc);
		if (finishedFlag) {
			t.setApplyforState(Status.BorrowApplyfor.finished);
		}
		String message = null;
		if (Status.BorrowAcc.lose.equals(accMethod)) {
			// 预计赔付到账时间保存至借用主表(取最大时间-统计使用)
			long a = Long.parseLong(acc.getRefundPlanDate().replaceAll("[^0-9]", ""));
			long b = StringUtils.isBlank(t.getSquareAccDate()) ? 0 : Long.parseLong(t.getSquareAccDate().replaceAll("[^0-9]", ""));
			if (a > b) {
				t.setSquareAccDate(acc.getRefundPlanDate());
			}
			if (Type.Fund.payment.equals(t.getBorrowType())) { // 借入类型-报损(付款)
				t.setInstalments(acc.getInstalments());
				t.setInstalmentSet(FundPlanSupport.createInstalment(t, "报损(付款)"));
				instalmentService.saveOrMeger(t.getInstalmentSet());
				if (t.getInstalmentSet() != null && !t.getInstalmentSet().isEmpty()) {
					t.setFundStatus(Status.Fund.payment);
				}
			} else if (Type.Fund.receive.equals(t.getBorrowType())) { // 借出类型-报损(收款)
				t.setReceivements(acc.getReceivements());
				t.setReceivementSet(FundPlanSupport.createReceivement(t, "报损(收款)"));
				receivementService.saveOrMeger(t.getReceivementSet());
				if (t.getReceivementSet() != null && !t.getReceivementSet().isEmpty()) {
					t.setFundStatus(Status.Fund.receive);
				}
			}
			// 遗失通知
			message = "借用单号:" + t.getBorrowSerial() + ",主题 " + t.getBorrowTheme() + " 已于 " + acc.getProvidedDate() + "归还验收为不合格或遗失,总计赔偿额为" + acc.getCompensateAmount() + "元，款项计划到账时间为" + acc.getRefundPlanDate() + ",请跟进办理进度.";
		} else if (Status.BorrowAcc.damage.equals(accMethod)) {
			// 损坏通知
			message = "借用单号:" + t.getBorrowSerial() + ",主题 " + t.getBorrowTheme() + " 已于 " + acc.getProvidedDate() + "归还验收不合格，现已办理报损维修处理，预计报损维修完成时间为" + acc.getArrivalPlanDate() + ",请跟进办理进度.";
		} else if (Status.BorrowAcc.returned.equals(accMethod)) {
			// 归还通知
			message = "借用单号:" + t.getBorrowSerial() + ",主题 " + t.getBorrowTheme() + " 已于 " + acc.getProvidedDate() + "归还，并已验收合格.";
		}

		// 消息通知
		if (message != null) {
			List<Map<String,Object>> list = borrowDao.queryByScript("remaind.borrow_acc", t.getBorrowId(), message);
			for(Map<String,Object> map:list){
				BusinessMessage bm = new BusinessMessage();
				bm.setReceiveTel((String)map.get("REMAIND_TEL"));
				bm.setMessage((String)map.get("MESSAGE"));
				bm.setSenderName("借用归还消息");
				businessMessageService.sendOnce(bm);
			}
		}
		borrowDao.save(t);
	}

	// ====================================================================================//
	public BigDecimal getRelatePaymentAmount(Long borrowId) {
		BigDecimal damagesout = instalmentService.queryForDefaultObjectByScript("amount.relate_instalment_amount", BigDecimal.class, BigDecimal.ZERO, borrowId, SystemConstant.MODULE_BORROW);
		return damagesout;
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long borrowId, String status) {
		Borrow b = borrowDao.get(borrowId);
		b.setFundStatus(status);
		borrowDao.save(b);
	}

	public BigDecimal getRelateReceiveAmount(Long borrowId) {
		BigDecimal damagesin = receivementService.queryForDefaultObjectByScript("amount.relate_receivement_amount", BigDecimal.class, BigDecimal.ZERO, borrowId, SystemConstant.MODULE_BORROW);
		return damagesin;
	}

	public void saveRelateAmountReceiveStatus(AmountReceive amountReceive, Long borrowId, String status) {
		Borrow b = borrowDao.get(borrowId);
		b.setFundStatus(status);
		borrowDao.save(b);
	}

}
