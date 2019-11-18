
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
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
public class EquipInsuranceClaimAction  extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipInsuranceClaimRecord equipInsuranceClaimRecord;
	
	@Getter
	@Setter
	private EquipInsuranceDetail equipInsuranceDetail;

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
		List<EquipInsuranceClaimRecord> list = equipInsuranceClaimService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	public String detaillist() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipInsuranceClaimRecord> list = equipInsuranceClaimService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		equipInsuranceClaimRecord = equipInsuranceClaimService.get(insureId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(equipInsuranceClaimRecord, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新保险信息")
	public String save() {
		if(equipInsuranceClaimRecord.getClaimId()==null) {
			equipInsuranceClaimRecord.setDelFlag(Constant.ENABLED);
			equipInsuranceClaimService.save(equipInsuranceClaimRecord);
		}else {
				equipInsuranceClaimService.merge(equipInsuranceClaimRecord);	
		}
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
	    
	@ActionLog(description = "提交项目调拨信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInsuranceService.submitDepot(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除设备理赔信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInsuranceClaimRecord c = equipInsuranceClaimService.get(new Long(id));
				c.setDelFlag(Constant.DISENABLED);
				equipInsuranceClaimService.save(c);
			
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "查看保险单下设备的合同")
	public String contractList(){
		String id = getRequest().getParameter("Q_insureId_L_EQ");
		String projectName = getRequest().getParameter("Q_projectName_S_LK");
		String contractNo = getRequest().getParameter("Q_contractNo_S_LK");
		String paEntName = getRequest().getParameter("Q_paEntName_S_LK");
		String pbEntName = getRequest().getParameter("Q_pbEntName_S_LK");
		String startDate = getRequest().getParameter("Q_signingTime_S_GE");
		String endDate = getRequest().getParameter("Q_signingTime_S_LE");
		List<Map<String,Object>>  list = new ArrayList<Map<String,Object>>();
		if(StringUtils.isNotBlank(id)){
			list = contractLeaseService.queryByScript("dispatch.equip_insurance_contract_info",new Long(id),projectName,contractNo,paEntName,pbEntName,startDate,endDate);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String print() {
		String id = getRequest().getParameter("insureId");
		List<Map<String,Object>>  list = new ArrayList<Map<String,Object>>();
		if(StringUtils.isNotBlank(id)){
			list = contractLeaseService.queryByScript("dispatch.equip_insurance_contract_count",new Long(id));
		}
		getRequest().setAttribute("equipInsurance", list);
		getRequest().setAttribute("totalPremium", list.get(0).get("TOTAL_PREMIUM"));
		getRequest().setAttribute("premium", list.get(0).get("EQUIP_NUM"));
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
		double sp = 0.000;
		if (equipId != null) {
			List<Map<String, Object>> irlist = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_detail", equipId);
			List<Map<String, Object>> irlist1 = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_info", equipId);
			for (Map<String, Object> m : irlist1) {
				String sumPremium = String.valueOf(m.get("premium"));
				sp += Double.valueOf(sumPremium);
			}
			Map<String, Object> map = irlist.get(0);
			map.put("totalPremium", sp);
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
			List<Map<String, Object>> irlist = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_detail", equipId);
			List<Map<String, Object>> irlist1 = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_record_info", equipId);
			for (Map<String, Object> m : irlist1) {
				String sumPremium = String.valueOf(m.get("premium"));
				sp += Double.valueOf(sumPremium);
			}
			Map<String, Object> map = irlist.get(0);
			map.put("totalPremium", sp);
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
}
