package com.knight.emms.web.action;

import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.SettleMaterials;
import com.knight.emms.service.ContractMaterialsService;
import com.knight.emms.service.SettleMaterialsService;
import com.knight.system.service.CodeService;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class SettleMaterialsAction extends ExportBaseAction<SettleMaterials> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private SettleMaterials settleMaterials;
	
	@Getter
	@Setter
	private Long settleId;
	
	@Resource
	private SettleMaterialsService settleMaterialsService;
	
	@Resource
	private ContractMaterialsService contractMaterialsService;
	
	@Resource
	private CodeService codeService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SettleMaterials> list = settleMaterialsService.queryTranslateAll(filter);
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
		map.put("value",Constant.SETTLE_MATERIALS);
		SettleMaterials c = settleMaterialsService.getByFilter(settleId,filterName,map);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新周材结算")
	public String save() {
		settleMaterialsService.saveCreate(settleMaterials);
		return SUCCESS;
	}
	
	@ActionLog(description = "提交周材结算")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleMaterials p = settleMaterialsService.get(new Long(id));
			settleMaterialsService.save(p);
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除周材结算")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	SettleMaterials P = settleMaterialsService.get(new Long(id));
    		if (Constant.DISENABLED.equals(P.getStatus())) {
    			P.setStatus(Constant.DISENABLED);
    			P.setDelFlag(Constant.DISENABLED);
    			settleMaterialsService.save(P);
    		}
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");		
		for (String id : ids) {
			SettleMaterials settleMaterials = settleMaterialsService.get(new Long(id));
			if (Constant.DISENABLED.equals(settleMaterials.getStatus())) {
				settleMaterialsService.effective(settleMaterials);
			}
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			SettleMaterials settleMaterials = settleMaterialsService.get(new Long(id));
			if (Constant.ENABLED.equals(settleMaterials.getStatus())) {
				settleMaterialsService.loseEffective(settleMaterials);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "打印周材结算单")
	public String printForm() {
		SettleMaterials b = settleMaterialsService.get(settleId);
		
		return "printForm";
	}
	
	@ActionLog(description = "费用项目")
	public String caculate() {
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String rentalRate = getRequest().getParameter("rentalRate");
		String tranportCaculateType = getRequest().getParameter("tranportCaculateType"); //算头不算尾
		String backOff = getRequest().getParameter("backOff"); //倒扣租金    是：0，否：1
		int days = 1;
		if("0".equals(tranportCaculateType)||"1".equals(tranportCaculateType)) {
			days = 1;
		}else if("2".equals(tranportCaculateType)) {
			days = 2;
		}else if("3".equals(tranportCaculateType)) {
			days = 0;
		}
		
		List<Map<String,Object>> list  = this.caculation(contractId,startDate,endDate,rentalRate,days,backOff);
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
		String tranportCaculateType = getRequest().getParameter("tranportCaculateType"); //算头不算尾
		String settleMaterialsId = getRequest().getParameter("settleMaterialsId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleMaterialsId)) {
			SettleMaterials sm = settleMaterialsService.get(new Long(settleMaterialsId));
			detailCaculateTime = sm.getDetailCaculateTime();
		}
		
		int days = 1;
		if("0".equals(tranportCaculateType)||"1".equals(tranportCaculateType)) {
			days = 1;
		}else if("2".equals(tranportCaculateType)) {
			days = 2;
		}else if("3".equals(tranportCaculateType)) {
			days = 0;
		}
		List<Map<String, Object>> 	amountList = settleMaterialsService.queryByScript("settle.materials_current_rent_detail", startDate, endDate, contractId, days, detailCaculateTime);
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "丢失赔偿费用清单")
	public String lostCompensation(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String settleMaterialsId = getRequest().getParameter("settleMaterialsId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleMaterialsId)) {
			SettleMaterials sm = settleMaterialsService.get(new Long(settleMaterialsId));
			detailCaculateTime = sm.getDetailCaculateTime();
		}
		List<Map<String, Object>> 	amountList = settleMaterialsService.queryByScript("settle.lost_compensation_detail", startDate, endDate, contractId, detailCaculateTime);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "损坏赔偿费用清单")
	public String damageFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String settleMaterialsId = getRequest().getParameter("settleMaterialsId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleMaterialsId)) {
			SettleMaterials sm = settleMaterialsService.get(new Long(settleMaterialsId));
			detailCaculateTime = sm.getDetailCaculateTime();
		}
		List<Map<String, Object>> 	amountList = settleMaterialsService.queryByScript("settle.compensation_damage_detail", startDate, endDate, contractId, detailCaculateTime);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "装卸费用清单")
	public String handingFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String settleMaterialsId = getRequest().getParameter("settleMaterialsId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleMaterialsId)) {
			SettleMaterials sm = settleMaterialsService.get(new Long(settleMaterialsId));
			detailCaculateTime = sm.getDetailCaculateTime();
		}
		List<Map<String, Object>> 	amountList = settleMaterialsService.queryByScript("settle.handing_fee_detail", startDate, endDate, contractId, detailCaculateTime);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "包装费用清单")
	public String packageFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String settleMaterialsId = getRequest().getParameter("settleMaterialsId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleMaterialsId)) {
			SettleMaterials sm = settleMaterialsService.get(new Long(settleMaterialsId));
			detailCaculateTime = sm.getDetailCaculateTime();
		}
		List<Map<String, Object>> 	amountList = settleMaterialsService.queryByScript("settle.package_fee_detail", startDate, endDate, contractId, detailCaculateTime);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	//TODO
	@ActionLog(description = "报停费用清单")
	public String ceaseReportFee(){
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String settleMaterialsId = getRequest().getParameter("settleMaterialsId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleMaterialsId)) {
			SettleMaterials sm = settleMaterialsService.get(new Long(settleMaterialsId));
			detailCaculateTime = sm.getDetailCaculateTime();
		}
		List<Map<String, Object>> 	amountList = settleMaterialsService.queryByScript("settle.cease_report_fee_detail",startDate,endDate,contractId, detailCaculateTime);
		
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
		String settleMaterialsId = getRequest().getParameter("settleMaterialsId");
		String detailCaculateTime = null;
		if(StringUtils.isNotBlank(settleMaterialsId)) {
			SettleMaterials sm = settleMaterialsService.get(new Long(settleMaterialsId));
			detailCaculateTime = sm.getDetailCaculateTime();
		}
		List<Map<String, Object>> amountList = settleMaterialsService.queryByScript("settle.materials_other_fee_detail",startDate,endDate,contractId, detailCaculateTime);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
//	
	@ActionLog(description = "批量保存或更新周材结算")
	public String multiSave() {
		Long startTime = System.currentTimeMillis();
		String contractIds = getRequest().getParameter("contractIds");
		String backOff = getRequest().getParameter("backOff");
		String[] ids = contractIds.replace("[","").replace("]","").split(",");
		int days = 1;
		int count = 0;
		StringBuffer str = new StringBuffer("批量新增").append(ids.length).append("个合同，");
		try {
			for(String id : ids){
				SettleMaterials sp =  new SettleMaterials();
				ContractMaterials	cm =	contractMaterialsService.getTranslateFull(new Long(id));
				
				if("0".equals(cm.getTranportCaculateType())||"1".equals(cm.getTranportCaculateType())) {
					days = 1;
				}else if("2".equals(cm.getTranportCaculateType())) {
					days = 2;
				}else if("3".equals(cm.getTranportCaculateType())) {
					days = 0;
				}
				sp.setSettleMan(settleMaterials.getSettleMan());
				sp.setSettleDate(settleMaterials.getSettleDate());
				sp.setStartDate(settleMaterials.getStartDate());
				sp.setEndDate(settleMaterials.getEndDate());
				sp.setSettleTitle(settleMaterials.getSettleTitle());
				sp.setBackOff(settleMaterials.getBackOff());
				sp.setContractmaId(cm.getContractmaId());
				sp.setContractSerial(cm.getContractSerial());
				sp.setContractTheme(cm.getContractTheme());
				sp.setPaEntName(cm.getPaEntName());
				sp.setPbEntName(cm.getPbEntName());
				sp.setContractCategoryName(cm.getContractCategoryName());
				sp.setTranportCaculateType(cm.getTranportCaculateType());
				sp.setTranportCaculateTypeName(cm.getTranportCaculateTypeName());
				sp.setProjectName(cm.getProjectName());
				sp.setTaxCaculateTypeName(cm.getTaxCaculateTypeName());
				sp.setSettleDepName(cm.getCompetentDepartment());
				sp.setTaxRate(cm.getTaxRate()==null?new BigDecimal(0):cm.getTaxRate());
				sp.setRentalRate(cm.getRentalRate()==null?new BigDecimal(0):cm.getRentalRate());
				List<Map<String,Object>> list = this.caculation(cm.getContractmaId(),settleMaterials.getStartDate(),
						settleMaterials.getEndDate(),sp.getRentalRate().toString(),days,backOff);
				sp.setSettledAmount(new BigDecimal(list.get(8).get("amount").toString()).setScale(2, BigDecimal.ROUND_HALF_UP));
				sp.setSettleFeeDetails(list.toString());
				settleMaterialsService.saveCreate(sp);
				count++;
			}
		} catch(Exception e) {
			str.append("成功").append(count).append("个;失败").append(ids.length-count).append("个");
			throw new BusinessException(str.toString());
		} 
		
		Long endTime = System.currentTimeMillis();
		if(endTime-startTime>30000&&(count+"").equals(ids.length+"")) {
			str.append("成功").append(count).append("个");
			try {
				OutputStream out = getResponse().getOutputStream();
				out.write(("{\"success\":true,\"msg\":\"" + str + "\"}").getBytes("UTF-8"));
				out.flush();
				out.close();
			} catch (Exception e) {
				logger.error("", e);
			}
		}
		return SUCCESS;
	}
	
	private List<Map<String,Object>> caculation(Long contractId,String startDate,String endDate,String rentalRate,Integer days,String backOff){
		List<Map<String,Object>> list  = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> amountList = new ArrayList<Map<String,Object>>();
		//租赁费用 (+)√
		amountList = null;
		String sql="";
		if("1".equals(backOff)) {//否
			sql = "settle.materials_current_rent_amount";
		}else if("0".equals(backOff)) {//是
			sql = "settle.materials_current_rent_amount_backOff";
		}else{
			throw new BusinessException("【倒扣租金】 取值异常！");
		}
		amountList = settleMaterialsService.queryByScript(sql,startDate,endDate,contractId,days);
		double currentRentAmount = (BigDecimal)( amountList.get(0).get("totalAmount"))==null? 0 :((BigDecimal)amountList.get(0).get("totalAmount")).doubleValue();
		//丢失赔偿 (+)√
		amountList = null;
		amountList = settleMaterialsService.queryByScript("settle.lost_compensation", startDate,endDate,contractId);
		double lostCompensationFee = ((Double) amountList.get(0).get("totalAmount"))==null? 0 : (Double) amountList.get(0).get("totalAmount");  
		//损坏赔偿 (+)√
		amountList = null;
		amountList = settleMaterialsService.queryByScript("settle.damage_fee",startDate,endDate,contractId);
		double damageFee =((Double) amountList.get(0).get("totalAmount"))==null? 0 : (Double) amountList.get(0).get("totalAmount");  
		//装卸费用(+)√
		amountList = null;
		amountList = settleMaterialsService.queryByScript("settle.package_fee", startDate,endDate,contractId,"1","卸车费");
		double handingFee =((Double) amountList.get(0).get("totalAmount"))==null? 0 :((Double) amountList.get(0).get("totalAmount"));  
		//包装费用(+)√
		amountList = null;
		amountList = settleMaterialsService.queryByScript("settle.package_fee", startDate,endDate,contractId,"3","打包费");
		double packageFee =((Double) amountList.get(0).get("totalAmount"))==null? 0 : ((Double) amountList.get(0).get("totalAmount"));    
		//报停费用- 
		amountList = null;
		amountList = settleMaterialsService.queryByScript("settle.cease_report_fee", startDate,endDate,contractId);
		double ceaseReportFee =((BigDecimal) amountList.get(0).get("totalAmount"))==null? 0 : ((BigDecimal) amountList.get(0).get("totalAmount")).doubleValue();  
		//其他费用- √
		amountList = null;
		amountList = settleMaterialsService.queryByScript("settle.materials_other_fee", startDate,endDate,contractId);
		double otherMinusFee =((Double) amountList.get(0).get("totalAmount"))==null? 0 : ((Double) amountList.get(0).get("totalAmount"));  
		
		double rentalAmount = currentRentAmount*(new Double(rentalRate==null||rentalRate.equals("")?"0":rentalRate));
		Map<String,Object> map = null;
		map = new HashMap<String, Object>();
		map.put("item", "租赁费用（+）");
		map.put("amount", new DecimalFormat("#.##").format(currentRentAmount));
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "丢失赔偿（+）");
		map.put("amount", new DecimalFormat("#.##").format(lostCompensationFee));
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "损坏赔偿（+）");
		map.put("amount", new DecimalFormat("#.##").format(damageFee));
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "装卸费用（+）");
		map.put("amount", new DecimalFormat("#.##").format(handingFee));
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "包装费用（+）");
		map.put("amount", new DecimalFormat("#.##").format(packageFee));
		list.add(map);
		map = new HashMap<String, Object>();
		//TODO 报停模块未完成
		map.put("item", "报停费用（-）");
		map.put("amount", new DecimalFormat("#.##").format(ceaseReportFee));
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "优惠费用（-）");
		map.put("amount", new DecimalFormat("#.##").format(rentalAmount));
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "其他费用（+）");
		map.put("amount", new DecimalFormat("#.##").format(otherMinusFee));
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "本期结算合计");
		String totalAmount = new DecimalFormat("#.00").format(currentRentAmount+lostCompensationFee+damageFee+handingFee
				+packageFee-ceaseReportFee-rentalAmount+otherMinusFee);
		map.put("amount",totalAmount);
		list.add(map);
		return list;
	}
}
