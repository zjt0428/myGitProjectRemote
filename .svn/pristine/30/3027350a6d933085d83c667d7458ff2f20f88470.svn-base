/**
 *====================================================
 * 文件名称: LeaseSettlementAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月30日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.LeaseContract;
import com.knight.emms.model.LeaseSettlement;
import com.knight.emms.service.LeaseContractService;
import com.knight.emms.service.LeaseSettlementService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LeaseSettlementAction
 * @Description: 租借结算
 * @author 陈光毅
 * @date 2017年8月30日
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({ @Result(name = "success", location = "/jsonString.jsp") })
@Controller("LeaseSettlementAction")
@Scope("prototype")
public class LeaseSettlementAction extends ExportBaseAction<LeaseSettlement> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long settlementId;

	@Getter
	@Setter
	private LeaseSettlement leaseSettlement;

	@Resource
	private LeaseSettlementService leaseSettlementService;
	
	@Resource
	private LeaseContractService leaseContractService;

	@Action("listLeaseSettlement")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LeaseSettlement> list = leaseSettlementService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@Action("loadLeaseSettlement")
	public String load() {
		LeaseSettlement s = leaseSettlementService.getTranslate(settlementId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(s, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@Action("saveLeaseSettlement")
	public String save() {
		if (leaseSettlement.getSettlementId() == null) {
			leaseSettlement.setStatus("0");
			leaseSettlement.setDelFlag(Constant.ENABLED);
			leaseSettlementService.saveSerialModel(leaseSettlement);
			leaseSettlement.setSubLeaseSettlement();
		} else {
			leaseSettlement.setStatus(leaseSettlement.getStatus());
			leaseSettlement.setDelFlag(leaseSettlement.getDelFlag());
			leaseSettlement.setSubLeaseSettlement();
		}
		createFileAttach(leaseSettlement.getSettlementId());
		leaseSettlementService.merge(leaseSettlement);
		this.jsonString = "{success:true,applyforId:" + leaseSettlement.getApplyforId() + "}";
		return SUCCESS;
	}

	@Action("multiDelLeaseSettlement")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseSettlement ls = leaseSettlementService.get(new Long(id));
			if("0".equals(ls.getStatus())) {
				ls.setDelFlag(Constant.DISENABLED);
				leaseSettlementService.update(ls);
			}else {
				throw new BusinessException("状态非法，不能删除!");
			}
		}
		return SUCCESS;
	}

	@Action("multiSubmitLeaseSettlement")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseSettlement s = leaseSettlementService.getTranslate(new Long(id));
			if ("0".equals(s.getStatus())) {
				s.setStatus("2");
				leaseSettlementService.update(s);
			} else {
				throw new BusinessException("提交状态非法！");
			}
		}
		return SUCCESS;
	}
	
	@Action("multiDelListLeaseSettlement")
	public String multiDelList() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseSettlementService.delList(new Long(id));
		}
		return SUCCESS;
	}
	
	@Action("initialInventoryLeaseSettlement")
	public String initialInventory() {
		String startDate = getRequest().getParameter("startDate");
		String leaseId = getRequest().getParameter("leaseId");
		List<Map<String, Object>> list = leaseSettlementService.queryByScript("settle.initialInventory_materials",startDate,leaseId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("multiSaveLeaseSettlement")
	public String multiSave() {
		String leaseIds = getRequest().getParameter("leaseIds");
		String[] ids = leaseIds.replace("[","").replace("]","").split(",");
		int days = 1;
		for(String id : ids){
			LeaseSettlement ls = new LeaseSettlement();
			LeaseContract lc =	leaseContractService.getTranslate(new Long(id));
			if("0".equals(lc.getAccountingMethod())||"1".equals(lc.getAccountingMethod())) {
				days = 1;
			}else if("2".equals(lc.getAccountingMethod())) {
				days = 2;
			}else if("3".equals(lc.getAccountingMethod())) {
				days = 0;
			}
			ls.setUserId(leaseSettlement.getUserId());
			ls.setUserName(leaseSettlement.getUserName());
			ls.setFillDate(leaseSettlement.getFillDate());
			ls.setStartDate(leaseSettlement.getStartDate());
			ls.setEndDate(leaseSettlement.getEndDate());
			ls.setSettlementTheme(leaseSettlement.getSettlementTheme());
			ls.setLeaseContract(lc);
			ls.setProject(lc.getProject());
			ls.setLessor(lc.getLeaseUnit());
			ls.setTenantry(lc.getLesseeUnit());
			ls.setSettlement(lc.getAccountingMethodName());
			ls.setStatus("0");
			ls.setDelFlag(Constant.ENABLED);
			//TODO 已付金额，已结算金额
			ls.setAlreadyPaymentAmount("0");
			ls.setAlreadySettlementAmount("0");
			ls.setCurrentSettlementAmount("0");
			ls.setInsideSettlementAmount("0");
			
			//获取--租借结算清单
			List<Map<String,Object>> settlementList = leaseSettlementService.queryByScript("settle.batch_settlement_list", leaseSettlement.getStartDate(),
					leaseSettlement.getEndDate(),lc.getLeaseId(),days);
			ls.setSettlementLists(settlementList.toString());
			BigDecimal  rentAmount = this.calculateAmount(settlementList,"amount");
			
			//获取--租借丢失清单
			List<Map<String,Object>> leasedLostDetailList = leaseSettlementService.queryByScript("materials.leasedLostDetail_by_leasedId", 
					lc.getLeaseId(),leaseSettlement.getStartDate(),leaseSettlement.getEndDate());
			ls.setLeasedLostDetails(leasedLostDetailList.toString());
			BigDecimal  lostAmount = this.calculateAmount(leasedLostDetailList,"amount");
			
			//获取--租借其他业务清单
			List<Map<String, Object>> leaseOtherFeeDetailList = leaseSettlementService.queryByScript("settle.lease_other_fee_detail",leaseSettlement.getStartDate(),
					leaseSettlement.getEndDate(),lc.getLeaseId());
			ls.setLeaseOtherBusinessDetails(leaseOtherFeeDetailList.toString());
			BigDecimal otherAmount = BigDecimal.ZERO;
			if(leaseOtherFeeDetailList.size()>0) {
				for(Map<String, Object> m : leaseOtherFeeDetailList) {
					String amount = m.get("amount").toString();
					if("相加".equals(m.get("calculationMethod"))) {
						otherAmount = otherAmount.add(new BigDecimal(amount));
					}else if("相减".equals(m.get("calculationMethod"))) {
						otherAmount = otherAmount.subtract(new BigDecimal(amount));
					}
				}
			}
			
			//获取--租借报停清单+内部报停清单
			List<Map<String, Object>> leaseBlockUpDetailList = leaseSettlementService.queryByScript("settle.lease_block_up_detail",leaseSettlement.getStartDate(),
					leaseSettlement.getEndDate(),lc.getLeaseId());
			ls.setLeaseSettlementBlockUps(leaseBlockUpDetailList.toString());
			ls.setLeaseSettlementInsideBlockUps(leaseBlockUpDetailList.toString());
			BigDecimal blockUpAmount = this.calculateAmount(leaseBlockUpDetailList,"settledAmount");
			BigDecimal insideBlockUpAmount = this.calculateAmount(leaseBlockUpDetailList,"insideAmount");
			
			BigDecimal insideAmount = BigDecimal.ZERO;
			if(settlementList.size()!=0) {
				//获取--内部结算清单
				for(Map<String, Object> map : settlementList) {
					map.put("dailyRent",map.get("dailyRent_inside"));
					map.put("amount",map.get("amount_inside"));
				}
				ls.setInsideSettlementLists(settlementList.toString());
				insideAmount = this.calculateAmount(settlementList,"amount");
			}
			//计算--本期结算金额
			BigDecimal total = rentAmount.add(lostAmount).add(otherAmount).subtract(blockUpAmount).setScale(2,BigDecimal.ROUND_HALF_UP);
			//计算--内部结算金额
			BigDecimal insideTotal = insideAmount.subtract(insideBlockUpAmount).setScale(2,BigDecimal.ROUND_HALF_UP);
			ls.setCurrentSettlementAmount(total.toString());
			ls.setInsideSettlementAmount(insideTotal.toString());
			leaseSettlementService.saveSerialModel(ls);
			ls.setSubLeaseSettlement();
			createFileAttach(ls.getSettlementId());
			leaseSettlementService.merge(ls);
		}
		return SUCCESS;
	}
	
	public BigDecimal calculateAmount(List<Map<String,Object>> list, String keyword) {
		BigDecimal total = BigDecimal.ZERO;
		if(list.size()>0) {
			for(Map<String, Object> map : list) {
				String amount = map.get(keyword).toString();
				total = total.add(new BigDecimal(amount));
			}
		}
		return total;
	}
	
	@Action("getRelateIdsLeaseSettlement")
	public String getRelateIds() {
		String leaseIds = getRequest().getParameter("leaseIds");
		List<Map<String,Object>>	 list = leaseSettlementService.queryByScript("materials.get_relateId", leaseIds);
		StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	//【租借结算】获取相关的租借其他业务
	@Action("getOtherFeeLeaseSettlement")
	public String otherFee(){
		Long leaseId = new Long(getRequest().getParameter("leaseId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		List<Map<String, Object>> amountList = leaseSettlementService.queryByScript("settle.lease_other_fee_detail",startDate,endDate,leaseId);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	//【租借结算】获取相关的租借报停
	@Action("getLeaseBlockUpDetailLeaseSettlement")
	public String getLeaseBlockUpDetail(){
		Long leaseId = new Long(getRequest().getParameter("leaseId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		List<Map<String, Object>> amountList = leaseSettlementService.queryByScript("settle.lease_block_up_detail",startDate,endDate,leaseId);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("exportGridStoreLeaseSettlement")
	public String exportGridStore() {
		return super.exportGridData();
	}
}
