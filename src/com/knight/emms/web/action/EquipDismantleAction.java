/**
 *====================================================
 * 文件名称: EquipDismantleAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.IndisNotice;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.service.EquipDismantleService;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.IndisNoticeService;
import com.knight.emms.service.IndisSchemaService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipDismantleAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:38:09
 */
public class EquipDismantleAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipDismantle equipDismantle;

	@Getter
	@Setter
	private Long dismantleId;

	@Resource
	private EquipDismantleService equipDismantleService;

	@Resource
	private IndisSchemaService indisSchemaService;

	@Resource
	private IndisNoticeService indisNoticeService;

    @Resource
    private EquipFlowService equipFlowService;
    @Resource
	private EquipmentService equipmentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipDismantle> list = equipDismantleService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipDismantleStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipDismantle p = equipDismantleService.getTranslateFull(dismantleId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipDismantleStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新拆卸信息")
	public String save() {
		long time = (equipDismantle.getEnddisDate().getTime() - equipDismantle.getStartdisDate().getTime()) / (1000 * 60 * 60);
		equipDismantle.setSpendTime(time);
		if (equipDismantle.getDismantleId() == null) {
			if ((Boolean) ApplicationContainer.getSystemParam("schemaNoticeSwitch")) {
                EquipFlow ef = equipFlowService.getTranslateFull(equipDismantle.getEquipFlow().getFlowId());
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_DISMANTLE);
				filter.addConjunctFilter("Q_equipment.equipId_L_EQ", ef.getEquipId() + "");
				filter.addConjunctFilter("Q_project.projectId_L_EQ", ef.getDispatch().getProjectId() + "");
				filter.addConjunctFilter("Q_contractLease.contractId_L_EQ", ef.getContractId() + "");
				List<IndisSchema> s = indisSchemaService.getAll(filter);
				if (s.isEmpty()) {
					throw new BusinessException("该设备未做拆卸方案");
				}
				filter = new QueryFilter();
				filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_DISMANTLE);
				filter.addConjunctFilter("Q_indisSchema.equipment.equipId_L_EQ", ef.getEquipId() + "");
				filter.addConjunctFilter("Q_indisSchema.project.projectId_L_EQ", ef.getDispatch().getProjectId() + "");
				filter.addConjunctFilter("Q_indisSchema.contractLease.contractId_L_EQ", ef.getContractId() + "");
				List<IndisNotice> n = indisNoticeService.getAll(filter);
				if (n.isEmpty()) {
					throw new BusinessException("该设备未做拆卸告知");
				}
			}
			equipDismantle.setApplyforState(Status.EquipFlowApplyfor.waitSubmit);
			equipDismantle.setDelFlag(Constant.ENABLED);
			super.isCreateFileAttach = true;
		} else {
			EquipDismantle p = equipDismantleService.editLoad(equipDismantle);
			equipDismantle.setEquipFlow(p.getEquipFlow());
			equipDismantle.setDismantleSerial(p.getDismantleSerial());
			equipDismantle.setApplyforState(p.getApplyforState());
			equipDismantle.setDelFlag(p.getDelFlag());
		}
		
		equipDismantleService.saveOrMergeForEdit(equipDismantle);
		createFileAttach(equipDismantle.getDismantleId());
		this.jsonString = "{success:true,applyforId:" + equipDismantle.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除拆卸信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipDismantleService.delete(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交拆卸信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipDismantleService.submitDismantle(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交调度拆卸信息")
	public String multiDispatch() {
		Date currentTime = new Date();
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipDismantle p = equipDismantleService.get(new Long(id));
			if (Status.EquipFlow.dismantled.equals(p.getEquipFlow().getFlowState()) && currentTime.getTime() < p.getEnddisDate().getTime()) {
				p.setApplyforState(Status.EquipFlowApplyfor.waitDispatch);
				equipDismantleService.save(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		equipDismantle = equipDismantleService.getTranslateFull(dismantleId);
		return getRequest().getParameter("formpage");
	}

}
