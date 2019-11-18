/**
 *====================================================
 * 文件名称: SettleContractAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.xwork.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.model.ContractCostitem;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.OperatorSalaryStatement;
import com.knight.emms.model.OtherExpenseStatement;
import com.knight.emms.model.SafetyMonitorSettleStatement;
import com.knight.emms.model.SettleComponBrief;
import com.knight.emms.model.SettleContract;
import com.knight.emms.model.SettleContractRecord;
import com.knight.emms.model.SettleEquipBrief;
import com.knight.emms.model.SettleItemBrief;
import com.knight.emms.service.AdvanceReceiveService;
import com.knight.emms.service.CloseSettleLogService;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.SettleContractRecordService;
import com.knight.emms.service.SettleContractService;
import com.knight.emms.support.SettleContractMath;
import com.knight.emms.web.model.SettleBuildingNumItem;
import com.knight.emms.web.model.SettleSpecificItem;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: SettleContractAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午5:12:07
 */
public class SettleContractAction extends ExportBaseAction<SettleContract> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private SettleContract settleContract;

	@Setter
	@Getter
	private Long settleId;

	@Resource
	private SettleContractService settleContractService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	@Resource
	private AdvanceReceiveService advanceReceiveService;
	
	@Resource
	private CloseSettleLogService closeSettleLogService;
	@Resource
	private SettleContractRecordService settleContractRecordService;
	

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 10:
			SettleContract settle = (SettleContract) model;
			return settle.getSettleAmount().subtract(settle.getFinishedAmount()).toString();
		case 11:
			if (Constant.ENABLED.equals(value)) {
				return "已生效";
			}
			return "未生效";
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> calist = settleContractService.queryByScript("dispatch.equip_settle_contract_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<calist.size();i++) {
				sb.append(String.valueOf(calist.get(i).get("SETTLE_ID"))+",");
			} if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_settleId_L_EQ", sa);
			}else {
				return SUCCESS;
			}
		}
		List<SettleContract> list = settleContractService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		SettleContract c = settleContractService.getTranslateAll(settleId);
		c.getSettleComponBriefSet();
		c.getSettleEquipBriefSet();
		c.setArrearsAmount(c.getSettleAmount().subtract(c.getFinishedAmount()));
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新结算信息")
	public String save() {
		String contractIds = getRequest().getParameter("contractIds");
		if (settleContract.getSettleId() == null) {
			if (Type.Fund.receive.equals(settleContract.getFundType())) { // 收款
				settleContract.setFundStatus(Status.Fund.receive);
			} else if (Type.Fund.payment.equals(settleContract.getFundType())) { // 付款
				settleContract.setFundStatus(Status.Fund.payment);
			}
		    ContractLease cl = contractLeaseService.get(settleContract.getContractId());
			cl.setSettleMonthDate(DateUtil.getCurrentMonthStr());
			contractLeaseService.update(cl);
			settleContract.setFinishedAmount(BigDecimal.ZERO);
			settleContract.setBalanceAmount(settleContract.getSettleAmount().subtract(settleContract.getFinishedAmount()));
			settleContract.setEffective(Constant.DISENABLED);
			settleContract.setDelFlag(Constant.ENABLED);
			super.isCreateFileAttach = true;
		} else {
			SettleContract p = settleContractService.get(settleContract.getSettleId());
			if (!Constant.DISENABLED.equals(p.getEffective())) {
				throw new BusinessException("结算单已经打印,无法修改!");
			}
			settleContract.setFinishedAmount(p.getFinishedAmount());
			settleContract.setBalanceAmount(settleContract.getSettleAmount().subtract(settleContract.getFinishedAmount()));
			settleContract.setSettleSerial(p.getSettleSerial());
			settleContract.setFundStatus(p.getFundStatus());
			settleContract.setEffective(p.getEffective());
			settleContract.setDelFlag(p.getDelFlag());
		}
		settleContractService.saveOrMergeEdit(settleContract);
		if(StringUtils.isNotBlank(contractIds)) {
			settleContractService.saveCombine(settleContract, contractIds);
		}
		createFileAttach(settleContract.getSettleId());
		return SUCCESS;
	}

	@ActionLog(description = "删除结算设备信息")
	public String multiDelEquipBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			settleContractService.deleteEquipBrief(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算零配件信息")
	public String multiDelComponBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			settleContractService.deleteComponBrief(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算其他费用信息")
	public String multiDelItemBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			settleContractService.deleteItemBrief(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除结算其他费用信息")
	public String multiDelOperatorSalary() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			settleContractService.deleteOperatorSalary(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除结算其他费用信息")
	public String multiDelSafetyMonitor() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			settleContractService.deleteSafetyMonitor(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除结算其他费用信息")
	public String multiDelOtherExpense() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			settleContractService.deleteOtherExpense(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleContract p = settleContractService.get(new Long(id));
			settleContractService.isCloseSettle(p);
			if (Constant.DISENABLED.equals(p.getEffective())) {
				p.setDelFlag(Constant.DISENABLED);
				settleContractService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "结算生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleContract p = settleContractService.get(new Long(id));
//			settleContractService.hedgingAdvanceReceive(p);
			//收款管理多收的钱，对冲至结算单
			/*List<Map<String, Object>> list1 = settleContractService.queryByScript("fund.get_accumulated_amount", p.getContractId());
			Map<String, Object> accumulated = list1.get(0);
			List<Map<String, Object>> list2 = settleContractService.queryByScript("fund.get_already_amount", p.getContractId());
			Map<String, Object> already = list2.get(0);
			String accumulatedAmount =  accumulated.get("accumulatedAmount")==null?"0.00":accumulated.get("accumulatedAmount").toString();//应收
			String receiveAmount = already.get("receiveAmount")==null?"0.00":already.get("receiveAmount").toString();//已收
			BigDecimal b1 = new BigDecimal(accumulatedAmount);
			BigDecimal b2 = new BigDecimal(receiveAmount);
			if(b2.compareTo(b1)==1){								//已收 > 应收
				if(b2.subtract(b1).compareTo(p.getSettleAmount())==1){//（已收-应收）>本期结算金额
					p.setFinishedAmount(p.getSettleAmount());
					p.setFundStatus(Status.Fund.received);
				}else{
					p.setFinishedAmount(b2.subtract(b1));
					p.setFundStatus(Status.Fund.receiving);
				}
			}
			p.setBalanceAmount(p.getSettleAmount().subtract(p.getFinishedAmount()));	*/		//剩余金额 = 应收 - 已收
			
			if (Constant.DISENABLED.equals(p.getEffective())) {
				settleContractService.effective(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "结算失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleContract p = settleContractService.get(new Long(id));
			if (Constant.ENABLED.equals(p.getEffective())) {
				settleContractService.loseEffective(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印结算信息")
	public String print() {
		settleContract = settleContractService.getTranslate(settleId);
		String type = getRequest().getParameter("type");
		if ("one".equals(type)) { // 日期拆分
			// 设备清单分组
			Map<String, List<SettleEquipBrief>> sebsm = SettleContractMath.groupSettleResource(settleContract.getSettleEquipBriefSet());
			getRequest().setAttribute("settleEquipBrief", sebsm);
			// 零配件清单分组
			Map<String, List<SettleComponBrief>> scbsm = SettleContractMath.groupSettleResource(settleContract.getSettleComponBriefSet());
			getRequest().setAttribute("settleComponBrief", scbsm);
			getRequest().setAttribute("settleItemBrief", settleContract.getSettleItemBriefSet());
			return "SettleContractPageOne";
		} else if ("two".equals(type)) { // 规格分组
			Map<String, SettleSpecificItem> settleSpecificItemMap = new HashMap<String, SettleSpecificItem>();
			BigDecimal totalAmount = BigDecimal.ZERO;
			for (SettleEquipBrief brief : settleContract.getSettleEquipBriefSet()) {
				totalAmount = totalAmount.add(brief.getSummary());
				SettleSpecificItem item = null;
				if (settleSpecificItemMap.containsKey(brief.getSpecificKey())) {
					item = settleSpecificItemMap.get(brief.getSpecificKey());
				} else {
					item = new SettleSpecificItem();
					settleSpecificItemMap.put(brief.getSpecificKey(), item);
				}
				item.addSettleEquipBrief(brief);
			}
			for (SettleComponBrief brief : settleContract.getSettleComponBriefSet()) {
				totalAmount = totalAmount.add(brief.getSummary());
				SettleSpecificItem item = null;
				if (settleSpecificItemMap.containsKey(brief.getSpecificKey())) {
					item = settleSpecificItemMap.get(brief.getSpecificKey());
				} else {
					item = new SettleSpecificItem();
					settleSpecificItemMap.put(brief.getSpecificKey(), item);
				}
				item.addSettleComponBrief(brief);
			}
			getRequest().setAttribute("settleSpecificItems", settleSpecificItemMap.values());
			BigDecimal itemAmount = BigDecimal.ZERO;
			BigDecimal itemDeductAmount = BigDecimal.ZERO;
			for (SettleItemBrief brief : settleContract.getSettleItemBriefSet()) {
				totalAmount = totalAmount.add(brief.getSummary());
				itemAmount = itemAmount.add(brief.getSummary());
				itemDeductAmount = itemDeductAmount.add(brief.getDeductRent());
			}
			getRequest().setAttribute("itemAmount", itemAmount);
			getRequest().setAttribute("itemDeductAmount", itemDeductAmount);
			getRequest().setAttribute("totalAmount", totalAmount);
			getRequest().setAttribute("bigTotalAmount", BigDecimalUtil.parserDigAmount(totalAmount));
			return "SettleContractPageTwo";
		} else { // 设备分组
			Map<String, SettleBuildingNumItem> settleBuildingNumItemMap = new HashMap<String, SettleBuildingNumItem>();
			BigDecimal totalAmount = BigDecimal.ZERO;
			for (SettleEquipBrief brief : settleContract.getSettleEquipBriefSet()) {
				totalAmount = totalAmount.add(brief.getSummary());
				SettleBuildingNumItem item = settleBuildingNumItemMap.get(brief.getBuildingNum());
				if (item == null) {
					item = new SettleBuildingNumItem();
					settleBuildingNumItemMap.put(brief.getBuildingNum(), item);
				}
				item.addSettleEquipBrief(brief);
			}
			for (SettleComponBrief brief : settleContract.getSettleComponBriefSet()) {
				totalAmount = totalAmount.add(brief.getSummary());
				SettleBuildingNumItem item = settleBuildingNumItemMap.get(brief.getBuildingNum());
				if (item == null) {
					item = new SettleBuildingNumItem();
					settleBuildingNumItemMap.put(brief.getBuildingNum(), item);
				}
				item.addSettleComponBrief(brief);
			}
			for (SettleItemBrief brief : settleContract.getSettleItemBriefSet()) {
				totalAmount = totalAmount.add(brief.getSummary());
				SettleBuildingNumItem item = settleBuildingNumItemMap.get(brief.getBuildingNum());
				if (item == null) {
					item = new SettleBuildingNumItem();
					settleBuildingNumItemMap.put(brief.getBuildingNum(), item);
				}
				item.addSettleItemBrief(brief);
			}
			getRequest().setAttribute("totalAmount", totalAmount);
			getRequest().setAttribute("digTotalAmount", BigDecimalUtil.parserDigAmount(totalAmount));
			getRequest().setAttribute("settleBuildingNumItems", settleBuildingNumItemMap.values());
			if ("four".equals(type)){
				getRequest().setAttribute("currentTime", DateUtil.getCurrentLinkDateStr());
				return "SettleContractPageFour";
			}
			return "SettleContractPageThree";
		}
	}

	public String refreshSum() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleContract p = settleContractService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				settleContractService.refreshSum(p);
				settleContractService.save(p);
			}
		}
		return SUCCESS;
	}
	
	public String display() {
		List<Map<String, Object>> settleList = settleContractService.queryByScript("fund.settle_portlet");
		getRequest().setAttribute("displayList", settleList);
		return "display";
	}

	public String getContractCostitems(){
        Set<ContractCostitem> contractCostitems = settleContractService.getContractCostitems(new Long(getRequest().getParameter("contractId")));
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(contractCostitems, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }

	public String prints() {
		List<Map<String,Object>> printList = new ArrayList<Map<String,Object>>();
		String settleIds = getRequest().getParameter("settleIds");
		String[] settleIdArr = settleIds.split(",");
		for(String settleId : settleIdArr) {
			SettleContract settleContract = settleContractService.getTranslate(new Long(settleId));
			ContractLease cl = contractLeaseService.get(settleContract.getContractId());
			String settleDate = DateUtil.changeObj2DateStr(settleContract.getSettleDate(), DateUtil.CN_DISPLAY_DATE);
			String titleDate = (DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE_MONTH));
			List<Map<String, Object>> set = settleContractService.queryByScript("settle.get_settle_relate_equip", settleContract.getSettleId());
			BigDecimal totalSummaryEquip = BigDecimal.ZERO;			//结算清单小计
			BigDecimal totalSummaryItem = BigDecimal.ZERO;				//进出场小计
			BigDecimal totalCostTotal = BigDecimal.ZERO;						//人员工资小计
			BigDecimal totalSummarySafety = BigDecimal.ZERO;			//安全监控小计
			BigDecimal totalSummaryCompon = BigDecimal.ZERO;		//零配件小计
			BigDecimal totalSummaryOther = BigDecimal.ZERO;			//其他费用小计
			BigDecimal totalFoodAllowance = BigDecimal.ZERO;			//伙食补贴小计
			BigDecimal totalAmount = BigDecimal.ZERO;						//总的小计
			for(Map<String, Object> map : set) {
				//月租金（设备结算）
				for(SettleEquipBrief seb : settleContract.getSettleEquipBriefSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(seb.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(seb.getEquipId()))) {
						map.put("buildingNum", seb.getBuildingNum());
						map.put("contractNo", cl.getContractNo());
						map.put("interval", seb.getStartSettleDate()+"至"+seb.getEndSettleDate());
						map.put("quantityEquip",seb.getQuantity());
						map.put("rentStandard",seb.getRentStandard());
						map.put("summaryEquip",seb.getSummary());
						totalSummaryEquip = totalSummaryEquip.add(seb.getSummary());
						String activateDate = null;
						List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", seb.getContractId(), seb.getEquipId());
						if(list.size()>0){
							activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
						}
						map.put("activateDate", activateDate);
						String settleDays = settleContractService.getActivateMonths(seb.getStartSettleDate(), seb.getEndSettleDate());
						map.put("settleDays", settleDays);
					}
				}
				//进出场等费用
				for(SettleItemBrief sib : settleContract.getSettleItemBriefSet()) {
					if(map.get("equipId").equals(sib.getEquipId())) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", sib.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", sib.getContractId(), sib.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("quantityItem", sib.getQuantity());
						map.put("unitpriceItem", sib.getUnitprice());
						map.put("summaryItem", sib.getSummary());
						totalSummaryItem = totalSummaryItem.add(sib.getSummary());
					}
				}
				//操作人员
				for(OperatorSalaryStatement oss : settleContract.getOperatorSalaryStatementSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(oss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(oss.getEquipId()))) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", oss.getBuildingNum());
						}
						map.put("quantityOperator", 1);
						map.put("unitpriceOperator", oss.getSalary());
						map.put("costTotal", oss.getCostTotal());
						map.put("foodAllowance", oss.getFoodAllowance());
						if((map.get("interval") == null)) {
							map.put("interval", oss.getStartSettleDate()+"至"+oss.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", oss.getContractId(), oss.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(oss.getStartSettleDate(), oss.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						totalCostTotal = totalCostTotal.add(oss.getCostTotal());
						BigDecimal foodAllowance = oss.getFoodAllowance()==null?BigDecimal.ZERO:oss.getFoodAllowance();
						totalFoodAllowance = totalFoodAllowance.add(foodAllowance);
					}
				}
				//安全监控
				for(SafetyMonitorSettleStatement sss : settleContract.getSafetyMonitorSettleStatementSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(sss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(sss.getEquipId()))) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", sss.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", sss.getStartSettleDate()+"至"+sss.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", sss.getContractId(), sss.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(sss.getStartSettleDate(), sss.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("quantitySafety", sss.getQuantity());
						map.put("unitpriceSafety", sss.getRentStandard());
						map.put("summarySafety", sss.getSummary());
						totalSummarySafety = totalSummarySafety.add(sss.getSummary());
					}
				}
				//加节
				for(SettleComponBrief scb : settleContract.getSettleComponBriefSet()) {
					if(map.get("equipId").equals(scb.getEquipId())) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", scb.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", scb.getStartSettleDate()+"至"+scb.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", scb.getContractId(), scb.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(scb.getStartSettleDate(), scb.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("quantityCompon", scb.getQuantity());
						map.put("unitpriceCompon", scb.getRentStandard());
						map.put("summaryCompon", scb.getSummary());
						totalSummaryCompon = totalSummaryCompon.add(scb.getSummary());
					}
				}
				//其他费用
				for(OtherExpenseStatement oes : settleContract.getOtherExpenseStatementSet()) {
					if(map.get("equipId").equals(oes.getEquipId())) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", oes.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", oes.getContractId(), oes.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("quantityOther", oes.getNumber());
						map.put("unitpriceOther", oes.getPrice());
						map.put("summaryOther", oes.getAmount());
						totalSummaryOther = totalSummaryOther.add(oes.getAmount());
					}
				}
			}
			Collections.sort(set, new Comparator<Map<String, Object>>() {
				public int compare(Map<String, Object> map1, Map<String, Object> map2) {
					if(map1.get("activateDate")==null || map2.get("activateDate")==null){
						return 0;
					}
					//替换中文
					Integer a = Integer.valueOf(map1.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", "")); 
					Integer b = Integer.valueOf(map2.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", ""));
					return a.compareTo(b);
				}
			});
			totalAmount = totalAmount.add(totalSummaryEquip).add(totalSummaryItem).add(totalCostTotal).add(totalSummarySafety).add(totalSummaryCompon).add(totalSummaryOther);
			Map<String, Object> printMap = new HashMap<String, Object>();
			printMap.put("settleContract", settleContract);
			printMap.put("number", set.size());
			printMap.put("contractNo", cl.getContractNo());
			printMap.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
			printMap.put("settleDate", settleDate);
			printMap.put("titleDate", titleDate);
			printMap.put("settleEquipBrief", set);
			printMap.put("totalSummaryEquip", totalSummaryEquip);
			printMap.put("totalSummaryItem", totalSummaryItem);
			printMap.put("totalCostTotal", totalCostTotal);
			printMap.put("totalSummarySafety", totalSummarySafety);
			printMap.put("totalSummaryCompon", totalSummaryCompon);
			printMap.put("totalSummaryOther", totalSummaryOther);
			printMap.put("totalFoodAllowance", totalFoodAllowance);
			printMap.put("totalAmount", totalAmount);
			printList.add(printMap);
		}
		getRequest().setAttribute("printList", printList);
		
//		getRequest().setAttribute("number", set.size());
//		getRequest().setAttribute("contractNo", cl.getContractNo());
//		getRequest().setAttribute("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
//		getRequest().setAttribute("settleDate", settleDate);
//		getRequest().setAttribute("titleDate", titleDate);
//		getRequest().setAttribute("settleEquipBrief", set);
//		getRequest().setAttribute("totalSummaryEquip", totalSummaryEquip);
//		getRequest().setAttribute("totalSummaryItem", totalSummaryItem);
//		getRequest().setAttribute("totalCostTotal", totalCostTotal);
//		getRequest().setAttribute("totalSummarySafety", totalSummarySafety);
//		getRequest().setAttribute("totalSummaryCompon", totalSummaryCompon);
//		getRequest().setAttribute("totalSummaryOther", totalSummaryOther);
//		getRequest().setAttribute("totalFoodAllowance", totalFoodAllowance);
		return "statementForm";
	}
	
	public String getAccumulatedAmount() {
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String currMonth = DateUtil.getCurrentLinkDateStr().substring(0, 7);
		List<Map<String, Object>> list = settleContractService.queryByScript("fund.get_accumulated_amount", contractId,currMonth);
		StringBuffer buff = new StringBuffer("{success:true,'result':");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String getAlreadyAmount() {
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String currMonth = DateUtil.getCurrentLinkDateStr().substring(0, 7);
		List<Map<String, Object>> list = settleContractService.queryByScript("fund.get_already_amount", contractId,currMonth);
		StringBuffer buff = new StringBuffer("{success:true,'result':");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String judgeOldest() {
		String contractId = getRequest().getParameter("contractId");
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_contractId_L_EQ", contractId);
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_effective_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_fundType_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_fundStatus_S_NEQ", Status.Fund.received);
		filter.addSorted("settleId", QueryFilter.ORDER_ASC);
		List<SettleContract> list = settleContractService.getAll(filter);
		SettleContract sc = list.get(0);
		if(settleId.compareTo(sc.getSettleId())>0) {
			this.jsonString = "{success:true,'result': '请先对之前的结算单进行收款'}";
		}else if(settleId.compareTo(sc.getSettleId())<0){
			this.jsonString = "{success:true,'result': '请选择尚未完成回款的结算单'}";
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "关账")
	public String close() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleContract p = settleContractService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getClosedStatus())) {
				p.setClosedStatus(Constant.ENABLED);
				settleContractService.update(p);
			}
		}
		return SUCCESS;
	}
	
	public String printFive(){
		List<Map<String,Object>> printList = new ArrayList<Map<String,Object>>();
		String settleIds = getRequest().getParameter("settleIds");
		String[] settleIdArr = settleIds.split(",");
		for(String settleId : settleIdArr) {
			SettleContract settleContract = settleContractService.getTranslate(new Long(settleId));
			ContractLease cl = contractLeaseService.get(settleContract.getContractId());
			String titleDate = (DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE_MONTH));
			List<Map<String, Object>> set = settleContractService.queryByScript("settle.get_settle_relate_equip", settleContract.getSettleId());
			BigDecimal totalSummaryEquip = BigDecimal.ZERO;
			BigDecimal totalSummaryItem = BigDecimal.ZERO;
			BigDecimal totalSalary = BigDecimal.ZERO;
			BigDecimal totalSummarySafety = BigDecimal.ZERO;
			BigDecimal totalSummaryCompon = BigDecimal.ZERO;
			BigDecimal totalSummaryOther = BigDecimal.ZERO;
			BigDecimal totalFoodAllowance = BigDecimal.ZERO;
			BigDecimal totalCostTotalOperator = BigDecimal.ZERO;
			BigDecimal totalAmount = BigDecimal.ZERO;
			for(Map<String, Object> map : set) {
				//月租金（设备结算）
				for(SettleEquipBrief seb : settleContract.getSettleEquipBriefSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(seb.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(seb.getEquipId()))) {
						map.put("equipId", seb.getEquipId());
						map.put("buildingNum", seb.getBuildingNum());
						String activateDate = null;
						List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", seb.getContractId(), seb.getEquipId());
						if(list.size()>0){
							activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
						}
						map.put("activateDate", activateDate);
						map.put("interval", seb.getStartSettleDate()+"至"+seb.getEndSettleDate());
						map.put("quantityEquip",seb.getQuantity());
						map.put("rentStandard",seb.getRentStandard());
						map.put("summaryEquip",seb.getSummary());
						totalSummaryEquip = totalSummaryEquip.add(seb.getSummary());
					}
				}
				//进出场等费用
				for(SettleItemBrief sib : settleContract.getSettleItemBriefSet()) {
					if(map.get("equipId").equals(sib.getEquipId())) {
						if((map.get("equipId") == null)){
							map.put("equipId", sib.getEquipId());
						}
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", sib.getBuildingNum());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", sib.getContractId(), sib.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("interval") == null)) {
							map.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
						}
						map.put("quantityItem", sib.getQuantity());
						map.put("unitpriceItem", sib.getUnitprice());
						map.put("summaryItem", sib.getSummary());
						totalSummaryItem = totalSummaryItem.add(sib.getSummary());
					}
				}
				//操作人员
				for(OperatorSalaryStatement oss : settleContract.getOperatorSalaryStatementSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(oss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(oss.getEquipId()))) {
						if((map.get("equipId") == null)){
							map.put("equipId", oss.getEquipId());
						}
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", oss.getBuildingNum());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", oss.getContractId(), oss.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("interval") == null)) {
							map.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
						}
						map.put("quantityOperator", 1);
						map.put("unitpriceOperator", oss.getSalary());
						map.put("summaryOperator", oss.getSummary());//本期金额（不含伙食补贴）
						map.put("foodAllowance", oss.getFoodAllowance());
						map.put("costTotal", oss.getCostTotal());
						totalCostTotalOperator = totalCostTotalOperator.add(oss.getCostTotal());
						totalSalary = totalSalary.add(oss.getSummary());
						BigDecimal foodAllowance = oss.getFoodAllowance()==null?BigDecimal.ZERO:oss.getFoodAllowance();
						totalFoodAllowance = totalFoodAllowance.add(foodAllowance);
					}
				}
				//加节
				for(SettleComponBrief scb : settleContract.getSettleComponBriefSet()) {
					if(map.get("equipId").equals(scb.getEquipId())) {
						totalSummaryCompon = totalSummaryCompon.add(scb.getSummary());
					}
				}
				//安全监控
				for(SafetyMonitorSettleStatement sss : settleContract.getSafetyMonitorSettleStatementSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(sss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(sss.getEquipId()))) {
						totalSummarySafety = totalSummarySafety.add(sss.getSummary());
					}
				}
				//其他费用
				for(OtherExpenseStatement oes : settleContract.getOtherExpenseStatementSet()) {
					if(map.get("equipId").equals(oes.getEquipId())) {
						totalSummaryOther = totalSummaryOther.add(oes.getAmount());
					}
				}
			}
			Collections.sort(set, new Comparator<Map<String, Object>>() {
				public int compare(Map<String, Object> map1, Map<String, Object> map2) {
					if(map1.get("activateDate")==null || map2.get("activateDate")==null){
						return 0;
					}
					Integer a = Integer.valueOf(map1.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", "")); 
					Integer b = Integer.valueOf(map2.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", ""));
					return a.compareTo(b);
				}
			});
			totalAmount = totalSummaryEquip.add(totalSummaryItem).add(totalSalary).add(totalFoodAllowance).add(totalSummarySafety).add(totalSummaryOther).add(totalSummaryCompon);
			Map<String, Object> printMap = new HashMap<String, Object>();
			printMap.put("settleContract", settleContract);
			printMap.put("titleDate", titleDate);
			printMap.put("settleEquipBrief", set);
			printMap.put("contractNo", cl.getContractNo());
			printMap.put("totalSummaryEquip", totalSummaryEquip);
			printMap.put("totalSummaryItem", totalSummaryItem);
			printMap.put("totalSalary", totalSalary);
			printMap.put("totalSummarySafety", totalSummarySafety);
			printMap.put("totalSummaryCompon", totalSummaryCompon);
			printMap.put("totalSummaryOther", totalSummaryOther);
			printMap.put("totalFoodAllowance", totalFoodAllowance);
			printMap.put("totalCostTotalOperator", totalCostTotalOperator);
			printMap.put("totalAmount", totalAmount);
			printList.add(printMap);
		}
		getRequest().setAttribute("printList", printList);
		
//		getRequest().setAttribute("titleDate", titleDate);
//		getRequest().setAttribute("settleEquipBrief", set);
//		getRequest().setAttribute("totalSummaryEquip", totalSummaryEquip);
//		getRequest().setAttribute("totalSummaryItem", totalSummaryItem);
//		getRequest().setAttribute("totalSalary", totalSalary);
//		getRequest().setAttribute("totalSummarySafety", totalSummarySafety);
//		getRequest().setAttribute("totalSummaryCompon", totalSummaryCompon);
//		getRequest().setAttribute("totalSummaryOther", totalSummaryOther);
//		getRequest().setAttribute("totalFoodAllowance", totalFoodAllowance);
//		getRequest().setAttribute("totalCostTotalOperator", totalCostTotalOperator);
		return "SettleContractPageFive";
	}
	
	public String printSix(){
		List<Map<String,Object>> printList = new ArrayList<Map<String,Object>>();
		String settleIds = getRequest().getParameter("settleIds");
		String[] settleIdArr = settleIds.split(",");
		for(String settleId : settleIdArr) {
			SettleContract settleContract = settleContractService.getTranslate(new Long(settleId));
			String settleDate = DateUtil.changeObj2DateStr(settleContract.getSettleDate(), DateUtil.CN_DISPLAY_DATE);
			ContractLease cl = contractLeaseService.get(settleContract.getContractId());
			String titleDate = (DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE_MONTH));
			List<Map<String, Object>> set = settleContractService.queryByScript("settle.get_settle_relate_equip", settleContract.getSettleId());
			BigDecimal totalSummaryEquip = BigDecimal.ZERO;
			BigDecimal totalSummaryItem = BigDecimal.ZERO;
			BigDecimal totalCostTotalOperator = BigDecimal.ZERO;
			BigDecimal totalCostSafety = BigDecimal.ZERO;
			BigDecimal totalInstallFee = BigDecimal.ZERO;
			BigDecimal totalSummarySafety = BigDecimal.ZERO;
			BigDecimal totalSummaryCompon = BigDecimal.ZERO;
			BigDecimal totalSummaryOther = BigDecimal.ZERO;
			BigDecimal totalAmount = BigDecimal.ZERO;
			for(Map<String, Object> map : set) {
				//月租金（设备结算）
				for(SettleEquipBrief seb : settleContract.getSettleEquipBriefSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(seb.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(seb.getEquipId()))) {
						map.put("buildingNum", seb.getBuildingNum());
						String activateDate = null;
						List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", seb.getContractId(), seb.getEquipId());
						if(list.size()>0){
							activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
						}
						map.put("activateDate", activateDate);
						String startSettleDate = DateUtil.changeObj2DateStr(seb.getStartSettleDate(), DateUtil.CN_DISPLAY_DATE);
						String endSettleDate = DateUtil.changeObj2DateStr(seb.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE);
						map.put("interval", startSettleDate+"~"+endSettleDate);
						String settleDays = settleContractService.getActivateMonths(seb.getStartSettleDate(), seb.getEndSettleDate());
						map.put("settleDays", settleDays);
						map.put("quantityEquip",seb.getQuantity());
						map.put("rentStandard",seb.getRentStandard());
						map.put("summaryEquip",seb.getSummary());
						totalSummaryEquip = totalSummaryEquip.add(seb.getSummary());
					}
				}
				//进出场等费用
				for(SettleItemBrief sib : settleContract.getSettleItemBriefSet()) {
					if(map.get("equipId").equals(sib.getEquipId())) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", sib.getBuildingNum());
						}
						if(map.get("activateDate")== null){
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", sib.getContractId(), sib.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if(map.get("interval") == null){
							String startSettleDate = DateUtil.changeObj2DateStr(settleContract.getStartSettleDate(), DateUtil.CN_DISPLAY_DATE);
							String endSettleDate = DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE);
							map.put("interval", startSettleDate+"~"+endSettleDate);
						}
						if(map.get("settleDays") == null){
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("summaryItem", sib.getSummary());
						totalSummaryItem = totalSummaryItem.add(sib.getSummary());
					}
				}
				//操作人员
				for(OperatorSalaryStatement oss : settleContract.getOperatorSalaryStatementSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(oss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(oss.getEquipId()))) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", oss.getBuildingNum());
						}
						if(map.get("activateDate")== null){
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", oss.getContractId(), oss.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if(map.get("interval") == null){
							String startSettleDate = DateUtil.changeObj2DateStr(settleContract.getStartSettleDate(), DateUtil.CN_DISPLAY_DATE);
							String endSettleDate = DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE);
							map.put("interval", startSettleDate+"~"+endSettleDate);
						}
						if(map.get("settleDays") == null){
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("costTotal", oss.getCostTotal());
						totalCostTotalOperator = totalCostTotalOperator.add(oss.getCostTotal());
					}
				}
				//加节
				for(SettleComponBrief scb : settleContract.getSettleComponBriefSet()) {
					if(map.get("equipId").equals(scb.getEquipId())) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", scb.getBuildingNum());
						}
						if(map.get("activateDate")== null){
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", scb.getContractId(), scb.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if(map.get("interval") == null){
							String startSettleDate = DateUtil.changeObj2DateStr(settleContract.getStartSettleDate(), DateUtil.CN_DISPLAY_DATE);
							String endSettleDate = DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE);
							map.put("interval", startSettleDate+"~"+endSettleDate);
						}
						if(map.get("settleDays") == null){
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("summaryCompon", scb.getSummary());
						totalSummaryCompon = totalSummaryCompon.add(scb.getSummary());
					}
				}
				//其他费用
				for(OtherExpenseStatement oes : settleContract.getOtherExpenseStatementSet()) {
					if(map.get("equipId").equals(oes.getEquipId())) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", oes.getBuildingNum());
						}
						if(map.get("activateDate")== null){
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", oes.getContractId(), oes.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if(map.get("interval") == null){
							String startSettleDate = DateUtil.changeObj2DateStr(settleContract.getStartSettleDate(), DateUtil.CN_DISPLAY_DATE);
							String endSettleDate = DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE);
							map.put("interval", startSettleDate+"~"+endSettleDate);
						}
						if(map.get("settleDays") == null){
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						map.put("summaryOther", oes.getAmount());
						totalSummaryOther = totalSummaryOther.add(oes.getAmount());
					}
				}
			}
			Set<Map<String, Object>> safetySet = new HashSet<Map<String,Object>>();
			for(Map<String, Object> map : set){
				safetySet.add(map);
			}
			//安全监控
			Set<Map<String, Object>> safetySet2 = new HashSet<Map<String,Object>>();
			Map<String, Object> smap = null;
			for(Map<String, Object> map : safetySet){
				for(SafetyMonitorSettleStatement sss : settleContract.getSafetyMonitorSettleStatementSet()) {
					smap = new HashMap<String, Object>();
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(sss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(sss.getEquipId()))) {
						smap.put("buildingNum", sss.getBuildingNum());
						String activateDate = null;
						List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", settleContract.getContractId(), sss.getEquipId());
						if(list.size()>0){
							activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
						}
						smap.put("activateDate", activateDate);
						String startSettleDate = DateUtil.changeObj2DateStr(sss.getStartSettleDate(), DateUtil.CN_DISPLAY_DATE);
						String endSettleDate = DateUtil.changeObj2DateStr(sss.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE);
						smap.put("interval", startSettleDate+"~"+endSettleDate);
						String settleDays = settleContractService.getActivateMonths(sss.getStartSettleDate(), sss.getEndSettleDate());
						smap.put("settleDays", settleDays);
						smap.put("quantitySafety", sss.getQuantity());
						smap.put("unitpriceSafety", sss.getRentStandard());
						smap.put("summarySafety", sss.getSummary());//租赁费小计
						smap.put("installFee", sss.getInstallFee());
						BigDecimal summarySafety = sss.getSummary()==null?BigDecimal.ZERO:sss.getSummary();
						BigDecimal installFee = sss.getInstallFee()==null?BigDecimal.ZERO:sss.getInstallFee();
						BigDecimal costSafety = summarySafety.subtract(installFee);
						smap.put("costSafety", costSafety);//本期金额(不包含安装费)
						totalCostSafety = totalCostSafety.add(costSafety);
						totalInstallFee = totalInstallFee.add(installFee);
						totalSummarySafety = totalSummarySafety.add(sss.getSummary());
						safetySet2.add(smap);
					}
				}
			}
			Collections.sort(set, new Comparator<Map<String, Object>>() {
				public int compare(Map<String, Object> map1, Map<String, Object> map2) {
					if(map1.get("activateDate")==null || map2.get("activateDate")==null){
						return 0;
					}
					Integer a = Integer.valueOf(map1.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", "")); 
					Integer b = Integer.valueOf(map2.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", ""));
					return a.compareTo(b);
				}
			});
			totalAmount = totalSummaryEquip.add(totalSummaryItem).add(totalCostTotalOperator).add(totalSummarySafety).add(totalSummaryOther);
			Map<String, Object> printMap = new HashMap<String, Object>();
			printMap.put("settleContract", settleContract);
			printMap.put("settleDate", settleDate);
			printMap.put("titleDate", titleDate);
			printMap.put("contractNo", cl.getContractNo());
			printMap.put("settleEquipBrief", set);
			printMap.put("safetyMonitorSettle", safetySet2);
			printMap.put("totalSummaryEquip", totalSummaryEquip);
			printMap.put("totalSummaryItem", totalSummaryItem);
			printMap.put("totalCostTotalOperator", totalCostTotalOperator);
			printMap.put("totalSummarySafety", totalSummarySafety);
			printMap.put("totalSummaryCompon", totalSummaryCompon);
			printMap.put("totalSummaryOther", totalSummaryOther);
			printMap.put("totalCostSafety", totalCostSafety);
			printMap.put("totalInstallFee", totalInstallFee);
			printMap.put("totalAmount", totalAmount);
			printList.add(printMap);
		}
		getRequest().setAttribute("printList", printList);
		
//		getRequest().setAttribute("settleDate", settleDate);
//		getRequest().setAttribute("titleDate", titleDate);
//		getRequest().setAttribute("settleEquipBrief", set);
//		getRequest().setAttribute("safetyMonitorSettle", safetySet2);
//		getRequest().setAttribute("totalSummaryEquip", totalSummaryEquip);
//		getRequest().setAttribute("totalSummaryItem", totalSummaryItem);
//		getRequest().setAttribute("totalCostTotalOperator", totalCostTotalOperator);
//		getRequest().setAttribute("totalSummarySafety", totalSummarySafety);
//		getRequest().setAttribute("totalCostSafety", totalCostSafety);
//		getRequest().setAttribute("totalInstallFee", totalInstallFee);
//		getRequest().setAttribute("totalSummaryOther", totalSummaryOther);
//		getRequest().setAttribute("totalSummaryCompon", totalSummaryCompon);
		return "SettleContractPageSix";
	}
	
	public String equipList(){
		String id = getRequest().getParameter("Q_settleId_L_EQ");
//		String projectName = getRequest().getParameter("Q_projectName_S_LK");
//		String contractNo = getRequest().getParameter("Q_contractNo_S_LK");
//		String paEntName = getRequest().getParameter("Q_paEntName_S_LK");
//		String pbEntName = getRequest().getParameter("Q_pbEntName_S_LK");
//		String startDate = getRequest().getParameter("Q_signingTime_S_GE");
//		String endDate = getRequest().getParameter("Q_signingTime_S_LE");
		List<Map<String,Object>>  list = new ArrayList<Map<String,Object>>();
		if(StringUtils.isNotBlank(id)){
			list = contractLeaseService.queryByScript("dispatch.settle_contract_equip_list",new Long(id));
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String printSeven(){
		List<Map<String,Object>> printList = new ArrayList<Map<String,Object>>();
		String settleIds = getRequest().getParameter("settleIds");
		String[] settleIdArr = settleIds.split(",");
		for(String settleId : settleIdArr) {
			SettleContract settleContract = settleContractService.getTranslate(new Long(settleId));
			ContractLease cl = contractLeaseService.get(settleContract.getContractId());
			String settleDate = DateUtil.changeObj2DateStr(settleContract.getSettleDate(), DateUtil.CN_DISPLAY_DATE);
			String titleDate = (DateUtil.changeObj2DateStr(settleContract.getEndSettleDate(), DateUtil.CN_DISPLAY_DATE_MONTH));
			List<Map<String, Object>> set = settleContractService.queryByScript("settle.get_settle_relate_equip", settleContract.getSettleId());
			BigDecimal totalAfterTaxEquip = BigDecimal.ZERO;//设备不含税总金额
			BigDecimal totalAfterTaxItem = BigDecimal.ZERO;//进出场不含税总金额
			BigDecimal totalAfterTaxOperator = BigDecimal.ZERO;//操作人员不含税总金额
			BigDecimal totalAfterTaxSafety = BigDecimal.ZERO;//安全监控不含税总金额
			BigDecimal totalAfterTaxCompon = BigDecimal.ZERO;//加节不含税总金额
			BigDecimal totalAfterTaxOther = BigDecimal.ZERO;//其他费用不含税总金额
			BigDecimal totalTaxes = BigDecimal.ZERO;//总税金
			BigDecimal totalAmount = BigDecimal.ZERO;
			for(Map<String, Object> map : set) {
				//月租金（设备结算）
				for(SettleEquipBrief seb : settleContract.getSettleEquipBriefSet()) {
					System.out.println((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(seb.getEquipDiaryId())));
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(seb.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(seb.getEquipId()))) {
						map.put("buildingNum", seb.getBuildingNum());
						map.put("contractNo", cl.getContractNo());
						map.put("interval", seb.getStartSettleDate()+"至"+seb.getEndSettleDate());
						map.put("quantityEquip",seb.getQuantity());
						map.put("rentStandard",seb.getRentStandard());
						BigDecimal noTax = BigDecimal.ZERO;//不含税
						String t = seb.getTaxRate().replace("%", "");
						Double f = Double.valueOf(t)/100+1;
						BigDecimal taxRates = new BigDecimal(f.toString());
						noTax = seb.getRentStandard().divide(taxRates,2,RoundingMode.HALF_UP);
						map.put("noTax", noTax);
						map.put("taxRate", seb.getTaxRate());//税率
						map.put("taxes", seb.getTaxes());//本期总税金
						BigDecimal afterTaxAmount = new BigDecimal(seb.getAfterTaxAmount());
						map.put("afterTaxAmountEquip", afterTaxAmount);
						totalAfterTaxEquip = totalAfterTaxEquip.add(afterTaxAmount);
						BigDecimal taxes = new BigDecimal(seb.getTaxes());
						totalTaxes = totalTaxes.add(taxes);
						String activateDate = null;
						List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", seb.getContractId(), seb.getEquipId());
						if(list.size()>0){
							activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
						}
						map.put("activateDate", activateDate);
						String settleDays = settleContractService.getActivateMonths(seb.getStartSettleDate(), seb.getEndSettleDate());
						map.put("settleDays", settleDays);
					}
				}
				//进出场等费用
				for(SettleItemBrief sib : settleContract.getSettleItemBriefSet()) {
					if(map.get("equipId").equals(sib.getEquipId())/*map.get("id").equals(sib.getSiBriefId()) && "SettleItemBrief".equals(map.get("module"))*/) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", sib.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", sib.getContractId(), sib.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						BigDecimal taxes1 = new BigDecimal(map.get("taxes")==null?"0":map.get("taxes").toString());
						BigDecimal taxes2 = new BigDecimal(sib.getTaxes());
						BigDecimal taxes = taxes2.add(taxes1);
						map.put("taxes", taxes);
						totalTaxes = totalTaxes.add(taxes2);
						BigDecimal afterTaxAmount = new BigDecimal(sib.getAfterTaxAmount());
						map.put("afterTaxAmountItem", afterTaxAmount);//其他费不含税金额
						totalAfterTaxItem = totalAfterTaxItem.add(afterTaxAmount);
					}
				}
				//操作人员
				for(OperatorSalaryStatement oss : settleContract.getOperatorSalaryStatementSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(oss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(oss.getEquipId()))) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", oss.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", oss.getStartSettleDate()+"至"+oss.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", oss.getContractId(), oss.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(oss.getStartSettleDate(), oss.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						BigDecimal taxes1 = new BigDecimal(map.get("taxes")==null?"0":map.get("taxes").toString());
						BigDecimal taxes2 = new BigDecimal(oss.getTaxes());
						BigDecimal taxes = taxes2.add(taxes1);
						map.put("taxes", taxes);
						totalTaxes = totalTaxes.add(taxes2);
						BigDecimal afterTaxAmount = new BigDecimal(oss.getAfterTaxAmount());
						map.put("afterTaxAmountOperator", afterTaxAmount);
						totalAfterTaxOperator = totalAfterTaxOperator.add(afterTaxAmount);
					}
				}
				//安全监控
				for(SafetyMonitorSettleStatement sss : settleContract.getSafetyMonitorSettleStatementSet()) {
					if((map.get("equipDiaryId")!=null && map.get("equipDiaryId").equals(sss.getEquipDiaryId()))
							|| (map.get("equipDiaryId")==null && map.get("equipId").equals(sss.getEquipId()))) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", sss.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", sss.getStartSettleDate()+"至"+sss.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", sss.getContractId(), sss.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(sss.getStartSettleDate(), sss.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						BigDecimal taxes1 = new BigDecimal(map.get("taxes")==null?"0":map.get("taxes").toString());
						BigDecimal taxes2 = new BigDecimal(sss.getTaxes());
						BigDecimal taxes = taxes2.add(taxes1);
						map.put("taxes", taxes);
						totalTaxes = totalTaxes.add(taxes2);
						BigDecimal afterTaxAmount = new BigDecimal(sss.getAfterTaxAmount());
						map.put("afterTaxAmountSafety", afterTaxAmount);
						totalAfterTaxSafety = totalAfterTaxSafety.add(afterTaxAmount);
					}
				}
				//加节
				for(SettleComponBrief scb : settleContract.getSettleComponBriefSet()) {
					if(map.get("equipId").equals(scb.getEquipId())/* map.get("id").equals(scb.getScBriefId()) && "SettleComponBrief".equals(map.get("module"))*/) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", scb.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", scb.getStartSettleDate()+"至"+scb.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", scb.getContractId(), scb.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(scb.getStartSettleDate(), scb.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						BigDecimal taxes1 = new BigDecimal(map.get("taxes")==null?"0":map.get("taxes").toString());
						BigDecimal taxes2 = new BigDecimal(scb.getTaxes());
						BigDecimal taxes = taxes2.add(taxes1);
						map.put("taxes", taxes);
						totalTaxes = totalTaxes.add(taxes2);
						BigDecimal afterTaxAmount = new BigDecimal(scb.getAfterTaxAmount());
						map.put("afterTaxAmountCompon",afterTaxAmount);
						
						totalAfterTaxCompon = totalAfterTaxCompon.add(afterTaxAmount);
					}
				}
				//其他费用
				for(OtherExpenseStatement oes : settleContract.getOtherExpenseStatementSet()) {
					if(map.get("equipId").equals(oes.getEquipId())) {
						if((map.get("buildingNum") == null)) {
							map.put("buildingNum", oes.getBuildingNum());
						}
						if((map.get("interval") == null)) {
							map.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
						}
						if((map.get("activateDate") == null)) {
							String activateDate = null;
							List<Map<String, Object>> list = settleContractService.queryByScript("settle.get_equip_activateDate", oes.getContractId(), oes.getEquipId());
							if(list.size()>0){
								activateDate = DateUtil.changeObj2DateStr(list.get(0).get("activateDate"), DateUtil.CN_DISPLAY_DATE);
							}
							map.put("activateDate", activateDate);
						}
						if((map.get("settleDays") == null)) {
							String settleDays = settleContractService.getActivateMonths(settleContract.getStartSettleDate(), settleContract.getEndSettleDate());
							map.put("settleDays", settleDays);
						}
						BigDecimal taxes1 = new BigDecimal(map.get("taxes")==null?"0":map.get("taxes").toString());
						BigDecimal taxes2 = new BigDecimal(oes.getTaxes());
						BigDecimal taxes = taxes2.add(taxes1);
						map.put("taxes", taxes);
						totalTaxes = totalTaxes.add(taxes2);
						BigDecimal afterTaxAmount = new BigDecimal(oes.getAfterTaxAmount());
						map.put("afterTaxAmountOther",afterTaxAmount);
						totalAfterTaxOther = totalAfterTaxOther.add(afterTaxAmount);
					}
				}
			}
			Collections.sort(set, new Comparator<Map<String, Object>>() {
	            public int compare(Map<String, Object> map1, Map<String, Object> map2) {
	            	if(map1.get("activateDate")==null || map2.get("activateDate")==null){
	            		return 0;
	            	}
	                Integer a = Integer.valueOf(map1.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", "")); 
	                Integer b = Integer.valueOf(map2.get("activateDate").toString().replaceAll("[\u4e00-\u9fa5]", ""));
	                return a.compareTo(b);
	            }
	        });
			totalAmount =totalAmount.add(totalAfterTaxEquip).add(totalAfterTaxItem).add(totalAfterTaxOperator).add(totalAfterTaxSafety).add(totalAfterTaxCompon).add(totalAfterTaxOther).add(totalTaxes);
			Map<String, Object> printMap = new HashMap<String, Object>();
			printMap.put("settleContract", settleContract);
			printMap.put("contractNo",  cl.getContractNo());
			printMap.put("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
			printMap.put("settleDate", settleDate);
			printMap.put("titleDate", titleDate);
			printMap.put("settleEquipBrief", set);
			printMap.put("totalAfterTaxEquip", totalAfterTaxEquip);
			printMap.put("totalAfterTaxItem", totalAfterTaxItem);
			printMap.put("totalAfterTaxOperator", totalAfterTaxOperator);
			printMap.put("totalAfterTaxSafety", totalAfterTaxSafety);
			printMap.put("totalAfterTaxCompon", totalAfterTaxCompon);
			printMap.put("totalAfterTaxOther", totalAfterTaxOther);
			printMap.put("totalTaxes", totalTaxes);
			printMap.put("totalAmount", totalAmount);
			printList.add(printMap);
		}
		getRequest().setAttribute("printList", printList);
		
//		getRequest().setAttribute("contractNo", cl.getContractNo());
//		getRequest().setAttribute("interval", settleContract.getStartSettleDate()+"至"+settleContract.getEndSettleDate());
//		getRequest().setAttribute("settleDate", settleDate);
//		getRequest().setAttribute("titleDate", titleDate);
//		getRequest().setAttribute("settleEquipBrief", set);
//		getRequest().setAttribute("totalAfterTaxEquip", totalAfterTaxEquip);
//		getRequest().setAttribute("totalAfterTaxItem", totalAfterTaxItem);
//		getRequest().setAttribute("totalAfterTaxOperator", totalAfterTaxOperator);
//		getRequest().setAttribute("totalAfterTaxSafety", totalAfterTaxSafety);
//		getRequest().setAttribute("totalAfterTaxCompon", totalAfterTaxCompon);
//		getRequest().setAttribute("totalAfterTaxOther", totalAfterTaxOther);
//		getRequest().setAttribute("totalTaxes", totalTaxes);
		return "SettleContractPageSeven";
	}
	
	public String update(){
		SettleContract p = settleContractService.get(settleContract.getSettleId());
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_settleId_L_GT", p.getSettleId()+"");
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
//		filter.addConjunctFilter("Q_effective_S_EQ", Constant.ENABLED);
//		filter.addConjunctFilter("Q_fundType_S_EQ", Constant.ENABLED);
//		filter.addConjunctFilter("Q_closedStatus_S_EQ", Constant.DISENABLED);
		filter.addConjunctFilter("Q_contractNo_S_EQ", p.getContractNo());
		filter.addConjunctFilter("Q_paEntName_S_EQ", p.getPaEntName());
		filter.addConjunctFilter("Q_projectName_S_EQ", p.getProjectName());
		filter.addConjunctFilter("Q_pbEntName_S_EQ", p.getPbEntName());
		filter.getPagingBean().setLimitSize(false);//查询全部
		List<SettleContract> list = settleContractService.getAll(filter);
		if(list!=null && list.size()>0){
			throw new BusinessException("存在下游结算单，无法修改！");
		}
		settleContract.setFinishedAmount(BigDecimal.ZERO);
		settleContract.setBalanceAmount(settleContract.getSettleAmount().subtract(settleContract.getFinishedAmount()));
		settleContract.setSettleSerial(p.getSettleSerial());
		settleContract.setFundStatus(p.getFundStatus());
		settleContract.setEffective(p.getEffective());
		settleContract.setDelFlag(p.getDelFlag());
		settleContractService.updateAmount(settleContract,p);
		return SUCCESS;
	}
	public void printRecord() {
		String settleIds = getRequest().getParameter("settleIds");
		SettleContractRecord settleContractRecord = new SettleContractRecord();
		settleContractRecord.setSettleId(Long.valueOf(settleIds));
		settleContractRecord.setUserId(ApplicationContainer.getCurrentUserId());
		settleContractRecord.setUserName(ApplicationContainer.getCurrentUser().getUsername());
		settleContractRecord.setCreateTime(DateUtil.getCurrentLinkTimeStr());
		settleContractRecordService.save(settleContractRecord);
	}
	public String recordlist() {
		QueryFilter filter = new QueryFilter();
		String a = getRequest().getParameter("Q_settle_L_EQ");
		filter.addConjunctFilter("Q_settleId_L_EQ", a);
		List<SettleContractRecord> list = settleContractRecordService.getAll(filter);
		for(SettleContractRecord s : list) {
			CodeServiceImpl.translate(s.getSettleContract());
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
}
