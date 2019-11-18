/**
 *====================================================
 * 文件名称: EquipInstallAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.xwork.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.StringUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.IndisNotice;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.DispatchService;
import com.knight.emms.service.EquipDiaryService;
import com.knight.emms.service.EquipInstallService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.IndisNoticeService;
import com.knight.emms.service.IndisSchemaService;
import com.knight.emms.service.ProjectService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipInstallAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:39:02
 */
public class EquipInstallAction extends ExportBaseAction<EquipInstall> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipInstall equipInstall;

	@Getter
	@Setter
	private Long installId;

	@Resource
	private EquipInstallService equipInstallService;

	@Resource
	private ProjectService projectService;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private EquipmentService equipmentService;

	@Resource
	private IndisSchemaService indisSchemaService;

	@Resource
	private IndisNoticeService indisNoticeService;

	@Resource
	private EquipDiaryService equipDiaryService;
	
	@Resource
	private DispatchService dispatchService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 1:
			return ((EquipFlow) value).getEquipDiary().getBuildingNum();
		case 2:
			return CodeServiceImpl.fastValue("FLOW_STATE", ((EquipFlow) value).getFlowState());
		case 3:
			return ((EquipFlow) value).getEquipDiary().getRecordId();
		case 4:
			return ((EquipFlow) value).getEquipDiary().getExwSerial();
		case 5:
			return CodeServiceImpl.fastValue("equipGeneric", ((EquipFlow) value).getEquipDiary().getEquipGeneric());
		case 6:
			return ((EquipFlow) value).getEquipDiary().getProjectName();
		case 7:
			return ((EquipFlow) value).getEquipDiary().getAddress();
		case 11:
			return ((EquipFlow) value).getEquipDiary().getEquipSpecificName();
		default:
			return null;
		}
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		String applyforState = this.getRequest().getParameter("applyforState");
		if (applyforState != null && !"".equals(applyforState)) {
			filter.addConjunctFilter("Q_applyforState_S_EQ", "3");
		}
		List<EquipInstall> list = equipInstallService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipInstallStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		equipInstall = equipInstallService.getTranslateFull(installId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(equipInstall, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipInstallStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String loadCompondiarySet() {
		equipInstall = equipInstallService.getTranslateFull(installId);
		List list = equipInstallService.loadCompondiarySet(equipInstall);
		StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新安装信息")
	public String save() {
		long time = (equipInstall.getEndinDate().getTime() - equipInstall.getStartinDate().getTime()) / (1000 * 60 * 60);
		equipInstall.setSpendTime(time);
		if (equipInstall.getInstallId() == null) {
			if ((Boolean) ApplicationContainer.getSystemParam("schemaNoticeSwitch")) {
				DispatchEquip dispatchEquip = dispatchService.getDispatchEquipment(equipInstall.getEquipFlow().getDispatchEquipId());
				Dispatch dispatch = dispatchService.get(dispatchEquip.getDispatchId());
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_INSTALL);
				filter.addConjunctFilter("Q_equipment.equipId_L_EQ", dispatchEquip.getEquipId() + "");
				filter.addConjunctFilter("Q_project.projectId_L_EQ", dispatch.getProjectId() + "");
				List<IndisSchema> s = indisSchemaService.getAll(filter);
				if (s.isEmpty()) {
					throw new BusinessException("该设备未做安装方案");
				}
				filter = new QueryFilter();
				filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_INSTALL);
				filter.addConjunctFilter("Q_indisSchema.equipment.equipId_L_EQ", dispatchEquip.getEquipId() + "");
				filter.addConjunctFilter("Q_indisSchema.project.projectId_L_EQ", dispatch.getProjectId() + "");
				List<IndisNotice> n = indisNoticeService.getAll(filter);
				if (n.isEmpty()) {
					throw new BusinessException("该设备未做安装告知");
				}
			}
			equipInstall.setBuildingNum(equipInstall.getEquipFlow().getEquipDiary().getBuildingNum());
			equipInstall.setApplyforState(Status.EquipFlowApplyfor.waitSubmit);
			equipInstall.setDelFlag(Constant.ENABLED);
			equipInstallService.saveOrMergeForEdit(equipInstall);
		} else {
			EquipInstall p = equipInstallService.getTranslate(equipInstall.getInstallId());
			p.setKnotCounts(equipInstall.getKnotCounts());
			p.setWallAttacheQty(equipInstall.getWallAttacheQty());
			p.setInstallHeight(equipInstall.getInstallHeight());
			p.setInstallFees(equipInstall.getInstallFees());
			p.setAutocraneUnits(equipInstall.getAutocraneUnits());
			p.setAutocraneFees(equipInstall.getAutocraneFees());
			p.setInstallDismantelTeams(equipInstall.getInstallDismantelTeams());
			equipInstallService.merge(p);
			if (getRequest().getParameter("jj") != null && getRequest().getParameter("jj").equals("true")) {
				if ((Boolean) ApplicationContainer.getSystemParam("schemaNoticeSwitch")) {
					QueryFilter filter = new QueryFilter();
					filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_EMPLOY);
					filter.addConjunctFilter("Q_equipment.equipId_L_EQ", p.getEquipFlow().getEquipId() + "");
					filter.addConjunctFilter("Q_project.projectId_L_EQ", p.getEquipFlow().getDispatch().getProjectId() + "");
					List<IndisSchema> s = indisSchemaService.getAll(filter);
					if (s.isEmpty()) {
						throw new BusinessException("该设备未做附墙方案");
					}
				}
				String jackOrdrop = "jack";
				if(getRequest().getParameter("drop") != null && getRequest().getParameter("drop").equals("true")){
					jackOrdrop = "drop";
				}
				p.setJjCompons(equipInstall.getJjCompons());
				equipInstallService.setJjCompon(p,jackOrdrop);
			} else {
				equipInstall.setEquipFlow(p.getEquipFlow());
				equipInstall.setInstallSerial(p.getInstallSerial());
				equipInstall.setApplyforState(p.getApplyforState());
				equipInstall.setDelFlag(p.getDelFlag());
				equipInstallService.saveOrMergeForEdit(equipInstall);
			}
		}
		this.jsonString = "{success:true,applyforId:" + equipInstall.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除安装信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInstallService.delete(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交安装信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInstallService.submitInstall(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交调度安装信息")
	public String multiDispatch() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInstall p = equipInstallService.get(new Long(id));
			if (Status.EquipFlow.installed.equals(p.getEquipFlow().getFlowState())) { // 安装中状态的流程设备
				p.setApplyforState(Status.EquipFlowApplyfor.waitDispatch);
				equipInstallService.save(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		equipInstall = equipInstallService.getTranslateFull(installId);
		CodeServiceImpl.translate(equipInstall.getEquipFlow().getEquipDiary());
		return getRequest().getParameter("formpage");
	}

	public String editBuildNo() {
		String installId = getRequest().getParameter("installId");
		String newBuildNum = getRequest().getParameter("newBuildingNum");
		String newCurrentInstallHeight = getRequest().getParameter("newCurrentInstallHeight");
		String newBrachium = getRequest().getParameter("newBrachium");
		BigDecimal newB = null;
		if(newBrachium != null && newBrachium.trim().length() != 0) {
			newB = new BigDecimal(newBrachium);
		}else {
			newB = new BigDecimal("0");
		}
		EquipInstall p = equipInstallService.get(Long.parseLong(installId));
		EquipDiary ed = p.getEquipFlow().getEquipDiary();
		ed.setBuildingNum(newBuildNum.trim());
		equipDiaryService.merge(ed);
		// Dispatch disp = p.getEquipFlow().getDispatch();
		p.setBuildingNum(newBuildNum.trim());
		p.setCurrentInstallHeight(newCurrentInstallHeight.trim());
		p.setBrachium(newB);
		equipInstallService.merge(p);
		return SUCCESS;
	}
}
