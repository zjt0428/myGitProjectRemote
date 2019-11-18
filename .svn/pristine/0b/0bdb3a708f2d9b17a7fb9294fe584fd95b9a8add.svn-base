/**
 *====================================================
 * 文件名称: EquipRepairAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipRepair;
import com.knight.emms.model.EquipRepairCompon;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Project;
import com.knight.emms.service.EquipRepairService;
import com.knight.emms.service.EquipmentService;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipRepairAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:06:59
 */
public class EquipRepairAction extends ExportBaseAction<EquipRepair> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipRepair equipRepair;

	@Getter
	@Setter
	private Long repairId;

	@Resource
	private EquipRepairService equipRepairService;

	@Resource
	private AppUserService appUserService;
	
	@Resource
	private EquipmentService equipmentService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		if (headerIndex == 4) {
			return CodeServiceImpl.fastValue("equipSpecific", ((Equipment) value).getEquipSpecific());
		}
		if (headerIndex == 7) {
			return ((Equipment) value).getRecordId();
		}
		if (headerIndex == 8) {
			return ((Equipment) value).getExwSerial();
		}
		if (headerIndex == 9) {
			return ((Project) value).getProjectName();
		}
		return null;
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipRepair> list = equipRepairService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipRepair p = equipRepairService.getTranslateFull(repairId);
		if (p.getProject() == null) {
			p.setProject(new Project());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新维修信息")
	public String save() {
		if (equipRepair.getProject() == null || equipRepair.getProject().getProjectId() == null) {
			equipRepair.setProject(null);
		}
		if (equipRepair.getRepairId() != null) {
			EquipRepair p = equipRepairService.get(equipRepair.getRepairId());
			equipRepair.setRepairSerial(p.getRepairSerial());			
			equipRepair.setProject(p.getProject());
			Equipment equipment = equipmentService.get(p.getEquipment().getEquipId());
			equipment.setBusinessStatus(Status.EquipBusiness.disenable);
			equipRepair.setEquipment(equipment);
			equipmentService.merge(equipment);
		}
		equipRepair.setApplyforState(Status.Applyfor.waitSubmit);
		equipRepair.setStatus(Status.HandleResult.untreated);
		Equipment equipment = equipmentService.get(equipRepair.getEquipment().getEquipId());
		equipment.setBusinessStatus(Status.EquipBusiness.disenable);
		equipRepair.setEquipment(equipment);
		equipmentService.merge(equipment);
		equipRepairService.saveOrMergeForEdit(equipRepair);
		this.jsonString = "{success:true,applyforId:" + equipRepair.getApplyforId() + "}";
		return SUCCESS;
	}

	public String dealwith() {
		EquipRepair p = equipRepairService.get(equipRepair.getRepairId());
		p.setRepairAmount(equipRepair.getRepairAmount());
		p.setSchemaName(equipRepair.getSchemaName());
		p.setRemark(equipRepair.getRemark());
		p.setRenewalDescription(equipRepair.getRenewalDescription());
		p.setRepairResult(equipRepair.getRepairResult());
		p.setApplyforState(Status.Applyfor.waitApprove);
		p.setStatus(Status.HandleResult.processed);
		p.setEquipRepairNewCompons(equipRepair.getEquipRepairNewCompons());
		p.setEquipRepairLocations(equipRepair.getEquipRepairLocations());
		p.setEquipRepairOldCompons(equipRepair.getEquipRepairOldCompons());
		p.setEquipRepairVehicles(equipRepair.getEquipRepairVehicles());
		p.setTowerCraneDispatchAllocates(equipRepair.getTowerCraneDispatchAllocates());
		p.setLiftDispatchAllocates(equipRepair.getLiftDispatchAllocates());
		p.setRepairDate(equipRepair.getRepairDate());
		p.setRenewalDate(equipRepair.getRenewalDate());
		equipRepairService.saveOrMergeForEdit(p);
		return SUCCESS;
	}

	@ActionLog(description = "删除维修信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipRepairService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交维修信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipRepair p = equipRepairService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitAccept);
			equipRepairService.save(p);
		}
		return SUCCESS;
	}

	public String print() {
		equipRepair = equipRepairService.getTranslateFull(repairId);
		BigDecimal totlePresentValue = BigDecimal.ZERO;
		int totleCounts = 0;
		for (EquipRepairCompon compon : equipRepair.getEquipRepairNewComponSet()) {
			totlePresentValue = totlePresentValue.add(compon.getComponent().getPresentValue());
			totleCounts += compon.getCounts();
		}
		getRequest().setAttribute("totlePresentValue", totlePresentValue);
		getRequest().setAttribute("totleCounts", totleCounts);

		AppUser appUser = appUserService.get(equipRepair.getUserId());
		getRequest().setAttribute("appUser", appUser);
		return getRequest().getParameter("formpage");
	}

}
