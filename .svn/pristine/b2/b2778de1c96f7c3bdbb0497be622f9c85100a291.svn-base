
package com.knight.emms.web.action;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipInsurance;
import com.knight.emms.model.EquipInsuranceDetail;
import com.knight.emms.model.PractiInsurance;
import com.knight.emms.model.PractiInsuranceClaimRecord;
import com.knight.emms.model.PractiInsuranceDetail;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.PractiInsuranceClaimRecordService;
import com.knight.emms.service.PractiInsuranceDetailService;
import com.knight.emms.service.PractiInsuranceService;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: PractiInsuranceAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class PractiInsuranceAction  extends ExportBaseAction<PractiInsurance> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private PractiInsurance practiInsurance;
	
	@Getter
	@Setter
	private PractiInsuranceDetail practiInsuranceDetail;
	
	@Getter
	@Setter
	private PractiInsuranceClaimRecord practiInsuranceClaimRecord;

	@Setter
	@Getter
	private Long insureId;
	
	@Resource
	private ContractLeaseService contractLeaseService;

	@Resource
	private PractiInsuranceService practiInsuranceService;
	
	@Resource
	private PractiInsuranceDetailService practiInsuranceDetailService;
	
	@Resource
	private PractiInsuranceClaimRecordService practiInsuranceClaimService;
	
	@Resource
	private CodeService codeService;
	
	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
/*		String yn = getRequest().getParameter("expire");
		if("1".equals(yn)) {
			Date cd = new Date();
	    	Calendar calendar = Calendar.getInstance();
	    	calendar.setTime(cd); // 设置为当前时间
	    	calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) + 1); // 设置为上一个月      +为后一个月  0 为本月
	    	cd= calendar.getTime();
	    	String dateStr = new SimpleDateFormat("yyyy-MM-dd").format(cd);
		    filter.addConjunctFilter("Q_endInsureDate_S_GE", DateUtil.getCurrentLinkDateStr());
		    filter.addConjunctFilter("Q_endInsureDate_S_LE", dateStr);
		}*/
		List<PractiInsurance> list = practiInsuranceService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	


	public String save(){
		if(practiInsurance.getInsureId() == null){
			practiInsurance.setDelFlag(Constant.ENABLED);
			practiInsurance.setEffective(Status.InsureEffective.ineffective);
		}else {
			PractiInsurance pi = practiInsuranceService.get(practiInsurance.getInsureId());
			practiInsurance.setDelFlag(pi.getDelFlag());
			practiInsurance.setEffective(pi.getEffective());
		}
		practiInsuranceService.saveOrMergeFor(practiInsurance);
		return SUCCESS;
	}
	
	/**加载保险信息*/
	public String load(){
		practiInsurance = practiInsuranceService.getTranslateFull(insureId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(practiInsurance, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "删除保险信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiInsurance c = practiInsuranceService.get(new Long(id));
			if (!Status.InsureEffective.effective.equals(c.getEffective())) {
				c.setDelFlag(Constant.DISENABLED);
				practiInsuranceService.save(c);
			}
		}
		return SUCCESS;
	}
	
	/**生效保险信息*/
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiInsurance c = practiInsuranceService.get(new Long(id));
			practiInsuranceService.multiEffective(c.getInsureId());
		}
		return SUCCESS;
	}
	
	/**失效保险信息*/
	public String loseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiInsurance c = practiInsuranceService.get(new Long(id));
			practiInsuranceService.multiLoseEffective(c.getInsureId());
		}
		return SUCCESS;
	}
	/**保险相关人员信息*/
	public String detailList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PractiInsuranceDetail> list = practiInsuranceDetailService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	/**员工管理的保险管理*/
	public String practiDetailList(){
		QueryFilter filter = new QueryFilter(getRequest());
		String practiId = getRequest().getParameter("practiId");
		String insureStatusName = null;
		List<Map<String, Object>> list = practiInsuranceService.queryByScript("terminal.practi_insurance_detail", practiId);
		for(Map<String,Object> m : list){
			insureStatusName = codeService.getValue("INSURE_STATUS", m.get("insureStatus").toString());
			m.put("insureStatusName", insureStatusName);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	/**员工管理的投保记录*/
	public String insureRecordList(){
		QueryFilter filter = new QueryFilter(getRequest());
		String practiId = getRequest().getParameter("practiId");
		List<Map<String, Object>> list = practiInsuranceService.queryByScript("terminal.practi_insurance_record", practiId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	/**员工管理的理赔记录*/
	public String claimRecordList(){
		QueryFilter filter = new QueryFilter(getRequest());
		String practiId = getRequest().getParameter("practiId");
		List<Map<String, Object>> list = practiInsuranceService.queryByScript("terminal.practi_claims_record", practiId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	/**人员保险的添加理赔前调查*/
	public String addClaimDetail(){
		QueryFilter filter = new QueryFilter(getRequest());
		String detailId = getRequest().getParameter("detailId");
		List<Map<String, Object>> list = practiInsuranceService.queryByScript("terminal.practi_claims_survey", detailId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "保存或更新人员理赔信息")
	public String saveClaim(){
		practiInsuranceClaimService.saveOrMergeFor(practiInsuranceClaimRecord);
		return SUCCESS;
	}
	
	/**人员保险相关合同*/
	public String contractList(){
		String id = getRequest().getParameter("Q_insureId_L_EQ");
		String projectName = getRequest().getParameter("Q_projectName_S_LK");
		String applyforState = getRequest().getParameter("Q_applyforState_S_EQ");
		String contractNo = getRequest().getParameter("Q_contractNo_S_LK");
		String paEntName = getRequest().getParameter("Q_paEntName_S_LK");
		String pbEntName = getRequest().getParameter("Q_pbEntName_S_LK");
		String startDate = getRequest().getParameter("Q_signingTime_S_GE");
		String endDate = getRequest().getParameter("Q_signingTime_S_LE");
		List<Map<String,Object>>  list = new ArrayList<Map<String,Object>>();
		String applyforStateName = null;
		if(StringUtils.isNotBlank(id)){
			list = contractLeaseService.queryByScript("terminal.practi_insurance_contract_info",new Long(id),projectName,applyforState,contractNo,paEntName,pbEntName,startDate,endDate);
			for(Map<String,Object> m : list){
				applyforStateName = codeService.getValue("CONTRACT_APPLYFOR_STATUS", m.get("applyforState").toString());
				m.put("applyforStateName", applyforStateName);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	/**人员保险明细中理赔明细*/
	public String claimDetail(){
		QueryFilter filter = new QueryFilter(getRequest());
		Long detailId = Long.valueOf(getRequest().getParameter("insureId"));
		List<Map<String, Object>> list = practiInsuranceService.queryByScript("terminal.practi_insurance_claims_record", detailId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	/**人员保险删除*/
	public String multiDelDetail(){
			String[] ids = getRequest().getParameterValues("ids");
			for (String id : ids) {
				practiInsuranceService.delDetail(new Long(id));
			}
			return SUCCESS;
	}
	/**人员保险删除*/
	public String insuranceDetailList(){
		String insureId = getRequest().getParameter("insureId");
		String practiName = getRequest().getParameter("practiName");
		String idCard = getRequest().getParameter("idCard");
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_practitioner.practiName_S_LK", practiName);
		filter.addConjunctFilter("Q_practitioner.idCard_S_LK", idCard);
		filter.addConjunctFilter("Q_insureId_L_EQ", insureId);
		List<PractiInsuranceDetail> list = practiInsuranceDetailService.getTranslateFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
}
