package com.knight.emms.web.action;

import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.CeaseReport;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.SettleMaterials;
import com.knight.emms.model.CeaseReport;
import com.knight.emms.service.CeaseReportService;
import com.knight.emms.service.ContractMaterialsService;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class CeaseReportAction extends ExportBaseAction<CeaseReport> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private CeaseReport ceaseReport;
	
	@Getter
	@Setter
	private Long ceaseId;
	
	@Resource
	private CeaseReportService ceaseReportService;
	
	@Resource
	private ContractMaterialsService contractMaterialsService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<CeaseReport> list = ceaseReportService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String load() {
		CeaseReport c = ceaseReportService.getTranslateFull(ceaseId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新报停申请")
	public String save() {
		ceaseReport.setStatus(Constant.DISENABLED);
		ceaseReport.setDelFlag(Constant.ENABLED);
		ceaseReportService.saveOrUpdate(ceaseReport);
		return SUCCESS;
	}
	
	private List<Map<String,Object>> caculation(String startDate,String endDate,Long contractId,int days,String backOff) {
		ContractMaterials cm = contractMaterialsService.getTranslateFull(contractId);
		String sql="";
		if("1".equals(backOff)) {//否
			sql = "settle.materials_current_rent_amount";
		}else if("0".equals(backOff)) {//是
			sql = "settle.materials_current_rent_amount_backOff";
		}else{
			throw new BusinessException("【倒扣租金】 取值异常！");
		}
		List<Map<String,Object>> list = ceaseReportService.queryByScript(sql,startDate,endDate,contractId,days);
		BigDecimal ceaseReportFee = (BigDecimal)list.get(0).get("totalAmount")==null? BigDecimal.ZERO :(BigDecimal)list.get(0).get("totalAmount");
		BigDecimal rentalAmount = ceaseReportFee.multiply(cm.getRentalRate()==null? BigDecimal.ZERO :cm.getRentalRate());
		BigDecimal totalAmount = ceaseReportFee.subtract(rentalAmount);
		List<Map<String,Object>> list2  = new ArrayList<Map<String,Object>>();
		Map<String,Object> map = null;
		map = new HashMap<String, Object>();
		map.put("item", "报停费用");
		map.put("amount", new DecimalFormat("#.##").format(ceaseReportFee));
		list2.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "优惠费用");
		map.put("amount", new DecimalFormat("#.##").format(rentalAmount));
		list2.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "本期结算合计");
		map.put("amount", new DecimalFormat("#.##").format(totalAmount));
		list2.add(map);
		return list2;
	}
	
	@ActionLog(description = "费用项目")
	public String caculate() {
		Long contractId = new Long(getRequest().getParameter("contractId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String tranportCaculateType = getRequest().getParameter("tranportCaculateType"); //算头不算尾
		String backOff = getRequest().getParameter("backOff"); //倒扣租金    否：1，是：0
		int days = 1;
		if("0".equals(tranportCaculateType)||"1".equals(tranportCaculateType)) {
			days = 1;
		}else if("2".equals(tranportCaculateType)) {
			days = 2;
		}else if("3".equals(tranportCaculateType)) {
			days = 0;
		}
		List<Map<String,Object>> list = this.caculation(startDate,endDate,contractId,days,backOff);
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "删除报停申请")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	CeaseReport P = ceaseReportService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
        	ceaseReportService.update(P);
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");		
		for (String id : ids) {
			CeaseReport ceaseReport = ceaseReportService.get(new Long(id));
			if (Constant.DISENABLED.equals(ceaseReport.getStatus())) {
				ceaseReport.setStatus(Constant.ENABLED);
				ceaseReportService.save(ceaseReport);
			}
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			CeaseReport ceaseReport = ceaseReportService.get(new Long(id));
			if (Constant.ENABLED.equals(ceaseReport.getStatus())) {
				ceaseReport.setStatus(Constant.DISENABLED);
				ceaseReportService.save(ceaseReport);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "打印报停申请单")
	public String printForm() {
		CeaseReport b = ceaseReportService.getTranslateFull(ceaseId);

//		b.setApplyDate(DateUtil.changeObj2DateStr(b.getApplyDate(), DateUtil.CN_DISPLAY_DATE));
	
		getRequest().setAttribute("ceaseReport", b);
		
		return "printForm";
	}
	
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
				CeaseReport cr =  new CeaseReport();
				ContractMaterials	cm =	contractMaterialsService.getTranslateFull(new Long(id));
				if("0".equals(cm.getTranportCaculateType())||"1".equals(cm.getTranportCaculateType())) {
					days = 1;
				}else if("2".equals(cm.getTranportCaculateType())) {
					days = 2;
				}else if("3".equals(cm.getTranportCaculateType())) {
					days = 0;
				}
				cr.setStatus(Constant.DISENABLED);
				cr.setDelFlag(Constant.ENABLED);
				cr.setApplyDate(ceaseReport.getApplyDate());
				cr.setStartDate(ceaseReport.getStartDate());
				cr.setEndDate(ceaseReport.getEndDate());
				cr.setCeaseTitle(ceaseReport.getCeaseTitle());
				cr.setBackOff(ceaseReport.getBackOff());
				cr.setUserId(ceaseReport.getUserId());
				cr.setUserName(ceaseReport.getUserName());
				cr.setContractMaterials(cm);
				cr.setTranportCaculateType(cm.getTranportCaculateType());
				cr.setCaculateRule(ceaseReport.getCaculateRule());
				List<Map<String,Object>> list = this.caculation(ceaseReport.getStartDate(),ceaseReport.getEndDate(),cm.getContractmaId(),days,backOff);
				cr.setSettledAmount(list.get(2).get("amount").toString());
				cr.setCeaseReportDetails((list.toString()));
				ceaseReportService.saveOrUpdate(cr);
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
}
