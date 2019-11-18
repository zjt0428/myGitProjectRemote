package com.knight.emms.web.action;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.SettleProject;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.SettleProjectService;
import com.knight.system.service.CodeService;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class SettleProjectAction extends ExportBaseAction<SettleProject> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private SettleProject settleProject;
	
	@Getter
	@Setter
	private Long settleId;
	
	@Resource
	private SettleProjectService settleProjectService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	@Resource
	private CodeService codeService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SettleProject> list = settleProjectService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String load() {
		String filterName = "nameEqualFilter";
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("name","relateModule");
		map.put("value",Constant.SETTLE_PROJECT);
		SettleProject c = settleProjectService.getByFilter(settleId,filterName,map);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新项目结算")
	public String save() {
		settleProjectService.saveCreate(settleProject);
		return SUCCESS;
	}
	
	@ActionLog(description = "提交项目结算")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleProject p = settleProjectService.get(new Long(id));
			settleProjectService.save(p);
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除项目结算")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	SettleProject P = settleProjectService.get(new Long(id));
    		if (Constant.DISENABLED.equals(P.getSettleProjectState())) {
		    P.setSettleProjectState(Constant.ENABLED);
        	   settleProjectService.remove(P);
        }
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");		
		for (String id : ids) {
			SettleProject settleProject = settleProjectService.get(new Long(id));
			if (Constant.DISENABLED.equals(settleProject.getSettleProjectState())) {
				settleProjectService.effective(settleProject);
			}
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleProject settleProject = settleProjectService.get(new Long(id));
			if (Constant.ENABLED.equals(settleProject.getSettleProjectState())) {
				settleProjectService.loseEffective(settleProject);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "打印项目结算单")
	public String printForm() {
		SettleProject b = settleProjectService.get(settleId);
		
		return "printForm";
	}
	
	@ActionLog(description = "费用项目")
	public String caculate() {
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String rentalRate = getRequest().getParameter("rentalRate");
		
		List<Map<String,Object>> list  = this.caculation(contractId,startDate,endDate,rentalRate);
		for(Map<String,Object> map : list){
			map.put("currentSettleAmount", new BigDecimal((Double) list.get(6).get("amount")).setScale(2, BigDecimal.ROUND_HALF_UP));
		}
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "租赁费用清单")
	public String rentFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String settleProjectId = getRequest().getParameter("settleProjectId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleProjectId)) {
			SettleProject sp = settleProjectService.get(new Long(settleProjectId));
			detailCaculateTime = sp.getDetailCaculateTime();
		}
		List<Map<String, Object>> 	amountList = settleProjectService.queryByScript("settle.rent_fee_detail", startDate, endDate, contractId, detailCaculateTime);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "安拆费用清单")
	public String installFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		List<Map<String, Object>> 	amountList = settleProjectService.queryByScript("settle.install_fee_detail",startDate,endDate,contractId);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "汽吊费用清单")
	public String autocraneFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		List<Map<String, Object>> 	amountList = settleProjectService.queryByScript("settle.autocrane_fee_detail",startDate,endDate,contractId);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "丢失费用清单")
	public String lostFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		List<Map<String, Object>> 	amountList = settleProjectService.queryByScript("settle.lost_fee_detail",startDate,endDate,contractId);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "其他费用清单")
	public String otherFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
//		String calMethod = getRequest().getParameter("calMethod");
		List<Map<String, Object>> 	amountList = settleProjectService.queryByScript("settle.other_fee_detail",startDate,endDate,contractId);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "批量保存项目结算")
	public String multiSave() {
		String contractIds = getRequest().getParameter("contractIds");
		String[] ids = contractIds.replace("[","").replace("]","").split(",");
		for(String id : ids){
			SettleProject sp = new SettleProject();
			ContractLease	ctl =	contractLeaseService.get(new Long(id));
			sp.setSettleMan(settleProject.getSettleMan());
			sp.setSettleDate(settleProject.getSettleDate());
			sp.setStartDate(settleProject.getStartDate());
			sp.setEndDate(settleProject.getEndDate());
			sp.setSettleTitle(settleProject.getSettleTitle());
			sp.setContractId(ctl.getContractId());
			sp.setContractSerial(ctl.getContractNo());
			String cName = codeService.getValue("contractCategory",ctl.getContractCategory());
			sp.setContractCategory(cName);
			sp.setProjectName(ctl.getProjectName());
			sp.setTaxModeName(ctl.getTaxMode());
			sp.setDepName(ctl.getCompetentDepartment());
//			sp.setTaxRate(ctl.getApplicableTaxRate()==null?new BigDecimal(0):ctl.getApplicableTaxRate());
			BigDecimal bd=new BigDecimal(ctl.getCollectionRatio()==null?"0":ctl.getCollectionRatio());   
			bd=bd.setScale(2, BigDecimal.ROUND_HALF_UP);   
			sp.setRentalRate(bd);
			List<Map<String,Object>> 	list =	this.caculation(ctl.getContractId(),settleProject.getStartDate(),settleProject.getEndDate(),ctl.getCollectionRatio());
			sp.setCurrentSettleAmount(new BigDecimal((Double) list.get(6).get("amount")).setScale(2, BigDecimal.ROUND_HALF_UP));
			sp.setSettleProjectDetails(list.toString());
			settleProjectService.saveCreate(sp);
		}
		return SUCCESS;
	}
	
	private List<Map<String,Object>> caculation(Long contractId,String startDate,String endDate,String rentalRate){
		List<Map<String,Object>> list  = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> amountList = new ArrayList<Map<String,Object>>();
		//租赁费用
		amountList = null;
		amountList = settleProjectService.queryByScript("settle.current_rent_amount",startDate,endDate,contractId);
		double currentRentAmount =((BigDecimal) amountList.get(0).get("currentRentAmount"))==null? 0 : ((BigDecimal) amountList.get(0).get("currentRentAmount")).doubleValue();
		//安拆费用
		amountList = new ArrayList<Map<String,Object>>();
		amountList = settleProjectService.queryByScript("settle.current_install_fee", startDate,endDate,contractId);
		double installFee =((BigDecimal) amountList.get(0).get("totalAmount"))==null? 0 : ((BigDecimal) amountList.get(0).get("totalAmount")).doubleValue();  
		//汽吊费用 
		amountList = new ArrayList<Map<String,Object>>();
		amountList = settleProjectService.queryByScript("settle.current_autocrane_fee",startDate,endDate,contractId);
		double autocraneFee =((BigDecimal) amountList.get(0).get("totalAmount"))==null? 0 : ((BigDecimal) amountList.get(0).get("totalAmount")).doubleValue();  
		//丢损费用
		amountList = new ArrayList<Map<String,Object>>();
		amountList = settleProjectService.queryByScript("settle.current_lost_fee", startDate,endDate,contractId);
		double lostFee =((BigDecimal) amountList.get(0).get("totalAmount"))==null? 0 :((BigDecimal) amountList.get(0).get("totalAmount")).doubleValue();  
		//其他费用+
		amountList = new ArrayList<Map<String,Object>>();
		amountList = settleProjectService.queryByScript("settle.current_other_fee", startDate,endDate,contractId,"0");
		double otherPlusFee =((BigDecimal) amountList.get(0).get("totalAmount"))==null? 0 : ((BigDecimal) amountList.get(0).get("totalAmount")).doubleValue();    
		//其他费用-
		amountList = new ArrayList<Map<String,Object>>();
		amountList = settleProjectService.queryByScript("settle.current_other_fee", startDate,endDate,contractId,"1");
		double otherMinusFee =((BigDecimal) amountList.get(0).get("totalAmount"))==null? 0 : ((BigDecimal) amountList.get(0).get("totalAmount")).doubleValue();  
		//现场装车附件运输费
		amountList = new ArrayList<Map<String,Object>>();
		amountList = settleProjectService.queryByScript("settle.tranDistributionbution_amount", startDate,endDate,contractId);
		double tranDistributionFee =((BigDecimal) amountList.get(0).get("totalAmount"))==null? 0 : ((BigDecimal) amountList.get(0).get("totalAmount")).doubleValue();  
		
		double rentalAmount = currentRentAmount*(new Double(rentalRate==null||rentalRate.equals("")?"0":rentalRate));
		double rentalAmount2 = new BigDecimal(rentalAmount ).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
		Map<String,Object> map = null;
		map = new HashMap<String, Object>();
		map.put("item", "租赁费用（+）");
		map.put("amount", currentRentAmount);
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "安拆费用（+）");
		map.put("amount", installFee);
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "汽吊费用（+）");
		map.put("amount", autocraneFee);
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "丢损费用（+）");
		map.put("amount", lostFee);
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "其他费用（+）");
		map.put("amount", otherPlusFee-otherMinusFee+tranDistributionFee);
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "优惠费用");
		map.put("amount", new DecimalFormat("#.00").format(rentalAmount));
		list.add(map);
//		map = new HashMap<String, Object>();
//		map.put("item", "其他费用（-）");
//		map.put("amount", otherMinusFee);
//		list.add(map);
		map = new HashMap<String, Object>();
		double amount2 = new BigDecimal(currentRentAmount+installFee+autocraneFee+lostFee+otherPlusFee-rentalAmount2-otherMinusFee+tranDistributionFee).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
		map.put("item", "本期结算合计");
		map.put("amount", amount2);
		list.add(map);
		
		return list;
	}
	
//	@Action(description = "导出信息")
//	public String exportBefore() {
//		String[] headers = getRequest().getParameterValues("headers");
//		String[] datafields =  getRequest().getParameterValues("datafields");
//		String[] values =  getRequest().getParameterValues("values");
//		Map<String,String[]>  map = getRequest().getParameterMap();
//		System.out.println(map);
//		for(Entry<String, String[]> mm : map.entrySet()){
//			if(mm.getKey().equals("headers")){
//				mm.setValue(headers);
//			}
//			if(mm.getKey().equals("datafields")){
//				mm.setValue(datafields);
//			}
//		}
//		getRequest().setAttribute("headers", headers);
//		getRequest().setAttribute("datafields", datafields);
//		getRequest().setAttribute("values", values);
//		return super.exportValue();
//	}
}
