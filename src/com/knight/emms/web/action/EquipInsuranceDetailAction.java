/**
 *====================================================
 * 文件名称: equipInsuranceAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.EquipInsuranceDetail;
import com.knight.emms.service.EquipInsuranceDetailService;

/**
 * @ClassName: equipInsuranceAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:39:39
 */
public class EquipInsuranceDetailAction extends ExportBaseAction<EquipInsuranceDetail> {

	private static final long serialVersionUID = 1L;

	
	private EquipInsuranceDetail equipInsuranceDetail;
	
	private Long insureId;

	@Resource
	private EquipInsuranceDetailService equipInsuranceDetailService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> calist = equipInsuranceDetailService.queryByScript("equipdoc.equip_insureance_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<calist.size();i++) {
				sb.append(String.valueOf(calist.get(i).get("INSURE_ID"))+",");
			} if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_insureId_L_EQ", sa);
			}else {
				return SUCCESS;
			}
		}
		List<EquipInsuranceDetail> list = equipInsuranceDetailService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipInsuranceDetail c = equipInsuranceDetailService.getTranslate(insureId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/*@ActionLog(description = "新增或更新保险信息")*/
	/*public String save() {
		equipInsurance.setInsureProgram(StringUtils.join(getRequest().getParameterValues("equipInsurance.insureProgram"), ","));
		if (equipInsurance.getProject().getPractiId() == null) {
			equipInsurance.setProject(null);
		}
		if (equipInsurance.getInsureId() == null) {
			equipInsurance.setDelFlag(Constant.ENABLED);
			equipInsuranceService.save(equipInsurance);
		} else {
			equipInsurance p = equipInsuranceService.get(equipInsurance.getInsureId());
			equipInsurance.setDelFlag(p.getDelFlag());
			equipInsurance.setInsureClaimSet(p.getInsureClaimSet());
			equipInsuranceService.merge(equipInsurance);
		}
		return SUCCESS;
	}
*/
	/*@ActionLog(description = "更新保险理赔信息")
	public String saveClaim() {
		String insureClaims = getRequest().getParameter("insureClaims");
		Set<InsureClaim> contractEquipSet = GsonUtil.fromJson(insureClaims, new TypeToken<Set<InsureClaim>>() {});
		if (contractEquipSet.isEmpty()) {
			return SUCCESS;
		}
		equipInsurance p = equipInsuranceService.get(insureId);
		for (InsureClaim ic : contractEquipSet) {
			ic.setInsureId(p.getInsureId());
			ic.setInsureSerial(p.getInsureSerial());
			ic.setEquipId(p.getEquipment().getEquipId());
		}
		equipInsuranceService.saveOrMergeClaim(contractEquipSet);
		return SUCCESS;
	}

	@ActionLog(description = "删除保险理赔信息")
	public String multiDelClaim() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInsuranceService.deleteClaim(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除保险信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInsurance p = equipInsuranceService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			equipInsuranceService.save(p);
		}
		return SUCCESS;
	}
*/

}
