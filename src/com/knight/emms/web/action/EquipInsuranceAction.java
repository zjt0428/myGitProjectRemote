
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
import com.knight.emms.model.EquipInsuranceClaimRecord;
import com.knight.emms.model.EquipInsuranceDetail;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.EquipInsuranceClaimService;
import com.knight.emms.service.EquipInsuranceDetailService;
import com.knight.emms.service.EquipInsuranceService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: AllocationDepotAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class EquipInsuranceAction  extends ExportBaseAction<EquipInsurance> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipInsurance equipInsurance;
	
	@Getter
	@Setter
	private EquipInsuranceDetail equipInsuranceDetail;
	
	@Getter
	@Setter
	private EquipInsuranceClaimRecord equipInsuranceClaimRecord;

	@Setter
	@Getter
	private Long insureId;
	
	@Resource
	private ContractLeaseService contractLeaseService;

	@Resource
	private EquipInsuranceService equipInsuranceService;
	
	@Resource
	private EquipInsuranceDetailService equipInsuranceDetailService;
	
	@Resource
	private EquipInsuranceClaimService equipInsuranceClaimService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		String yn = getRequest().getParameter("expire");
		if("1".equals(yn)) {
			Date cd = new Date();
	    	Calendar calendar = Calendar.getInstance();
	    	calendar.setTime(cd); // 设置为当前时间
	    	calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) + 1); // 设置为上一个月      +为后一个月  0 为本月
	    	cd= calendar.getTime();
	    	String dateStr = new SimpleDateFormat("yyyy-MM-dd").format(cd);
		    filter.addConjunctFilter("Q_endInsureDate_S_GE", DateUtil.getCurrentLinkDateStr());
		    filter.addConjunctFilter("Q_endInsureDate_S_LE", dateStr);
		}
		List<EquipInsurance> list = equipInsuranceService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	public String detaillist() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipInsuranceDetail> list = equipInsuranceDetailService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		equipInsurance = equipInsuranceService.getTranslateFull(insureId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(equipInsurance, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新保险信息")
	public String save() {
		if (equipInsurance.getInsureId() == null) {
			equipInsurance.setDelFlag(Constant.ENABLED);
			equipInsurance.setEffective(Status.InsureEffective.ineffective);
		}else {
			EquipInsurance ei = equipInsuranceService.get(equipInsurance.getInsureId());
			equipInsurance.setEffective(ei.getEffective());
			equipInsurance.setDelFlag(ei.getDelFlag());
		}
		equipInsuranceService.saveOrMergeFor(equipInsurance);
		return SUCCESS;
	}
	
	@ActionLog(description = "查看保险下的设备")
	public String detailList(){
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipInsuranceDetail> list = equipInsuranceDetailService.getTranslateFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "提交保险信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInsuranceService.submitDepot(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除保险信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInsurance c = equipInsuranceService.get(new Long(id));
			if (Status.InsureEffective.ineffective.equals(c.getEffective())) {
				c.setDelFlag(Constant.DISENABLED);
				equipInsuranceService.save(c);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "生效保险信息")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInsurance c = equipInsuranceService.get(new Long(id));
			if (Constant.DISENABLED.equals(c.getEffective())) {
				equipInsuranceService.multiEffective(c.getInsureId());
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "失效保险信息")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInsurance c = equipInsuranceService.get(new Long(id));
			if (!Constant.DISENABLED.equals(c.getEffective())) {
				equipInsuranceService.multiLoseEffective(c.getInsureId());
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "查看保险单下设备的合同")
	public String contractList(){
		String id = getRequest().getParameter("Q_insureId_L_EQ");
		String applyforState = getRequest().getParameter("Q_applyforState_S_EQ");
		String projectName = getRequest().getParameter("Q_projectName_S_LK");
		String contractNo = getRequest().getParameter("Q_contractNo_S_LK");
		String paEntName = getRequest().getParameter("Q_paEntName_S_LK");
		String pbEntName = getRequest().getParameter("Q_pbEntName_S_LK");
		String startDate = getRequest().getParameter("Q_signingTime_S_GE");
		String endDate = getRequest().getParameter("Q_signingTime_S_LE");
		List<Map<String,Object>>  list = new ArrayList<Map<String,Object>>();
		if(StringUtils.isNotBlank(id)){
			list = contractLeaseService.queryByScript("dispatch.equip_insurance_contract_info",new Long(id),projectName,applyforState,contractNo,paEntName,pbEntName,startDate,endDate);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String print() {
		String id = getRequest().getParameter("detailIds");
		List<Map<String,Object>>  list = new ArrayList<Map<String,Object>>();
		Double sp = 0.000;
		if(StringUtils.isNotBlank(id)){
			list = contractLeaseService.queryByScript("dispatch.equip_insurance_contract_count",id);
			for(Map<String,Object> m : list){
				String totalPremium = String.valueOf(m.get("PREMIUM")==null?0:m.get("PREMIUM"));
				sp += Double.valueOf(totalPremium);
			}
		}
		System.out.println(sp);
		System.out.println(list.size());
		getRequest().setAttribute("totalPremium", sp);
		getRequest().setAttribute("premium", list.size());
		getRequest().setAttribute("equipInsurance", list);
		getRequest().setAttribute("newDate", DateUtil.getCurrentLinkTimeStr());
		return "EquipInsurance";
	}
	
	public String multiDelDetail(){
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInsuranceService.delDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	public String loadRecordList() {
		QueryFilter filter = new QueryFilter(getRequest());
		String equipId = getRequest().getParameter("equipId");
		String detailId = getRequest().getParameter("detailId");
		double sp = 0.000;
		if (equipId != null) {
			List<Map<String, Object>> irlist = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_detail", detailId);
			List<Map<String, Object>> irlist1 = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_info", equipId);
			List<Map<String, Object>> irlist2 = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_claim_amount", equipId);
			for (Map<String, Object> m : irlist1) {
				String sumPremium = String.valueOf(m.get("premium")==null?0:m.get("premium"));
				sp += Double.valueOf(sumPremium);
			}
			Map<String, Object> map = irlist.get(0);
			map.put("totalPremium", sp);
			map.put("claimAmount", irlist2.get(0).get("claimAmount"));
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff.append(GsonUtil.toJson(map));
			buff.append("}");
			this.jsonString = buff.toString();
		}
		return SUCCESS;
	}

	public String loadRecordDetailList() {
		QueryFilter filter = new QueryFilter(getRequest());
		String equipId = getRequest().getParameter("equipId");
		double sp = 0.000;
		if (equipId != null) {
			List<Map<String, Object>> irlist = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_detail_manager", equipId);
			List<Map<String, Object>> irlist1 = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_info", equipId);
			List<Map<String, Object>> irlist2 = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_claim_amount", equipId);
			for (Map<String, Object> m : irlist1) {
				String sumPremium = String.valueOf(m.get("premium")==null?0:m.get("premium"));
				sp += Double.valueOf(sumPremium);
			}
			Map<String, Object> map = irlist.get(0);
			map.put("totalPremium", sp);
			map.put("claimAmount", irlist2.get(0).get("claimAmount"));
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff.append(GsonUtil.toJson(irlist));
			buff.append("}");
			this.jsonString = buff.toString();
		}
		return SUCCESS;
	}
	
	public String insureRecordList() {
		QueryFilter filter = new QueryFilter(getRequest());
		String equipId = getRequest().getParameter("equipId");
		if (equipId != null) {
			List<Map<String, Object>> irlist = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_info", equipId);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff.append(GsonUtil.toJson(irlist));
			buff.append("}");
			this.jsonString = buff.toString();
		}
		return SUCCESS;
	}

	public String claimRecordList() {
		QueryFilter filter = new QueryFilter(getRequest());
		String equipId = getRequest().getParameter("equipId");
		if (equipId != null) {
			List<Map<String, Object>> crlist = equipInsuranceClaimService.queryByScript("equipdoc.equip_insureance_claim_info", equipId);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff.append(GsonUtil.toJson(crlist));
			buff.append("}");
			this.jsonString = buff.toString();
		}
		return SUCCESS;
	}
	
	public String selectClaimList() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_applyforState_S_EQ", "3");
		List<EquipInsurance> list = equipInsuranceService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String findInsureListBeforeAddClaim() {
		QueryFilter filter = new QueryFilter(getRequest());
		String detailId = getRequest().getParameter("detailId");
		List<Map<String, Object>> list = equipInsuranceClaimService.queryByScript("equipdoc.equip_insureance_claim_info_before_add", detailId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String claimDetail(){
		QueryFilter filter = new QueryFilter(getRequest());
		Long detailId = Long.valueOf(getRequest().getParameter("insureId"));
		List<Map<String, Object>> list = equipInsuranceClaimService.queryByScript("equipdoc.equip_insureance_claim_detail", detailId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
