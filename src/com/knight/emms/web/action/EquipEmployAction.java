/**
 *====================================================
 * 文件名称: EquipEmployAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipDetect;
import com.knight.emms.model.EquipEmploy;
import com.knight.emms.service.EquipDetectService;
import com.knight.emms.service.EquipEmployService;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: EquipEmployAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:38:40
 */
public class EquipEmployAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipEmploy equipEmploy;

	@Getter
	@Setter
	private Long employId;

	@Resource
	private EquipEmployService equipEmployService;

	@Resource
	private EquipDetectService equipDetectService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipEmploy> list = equipEmployService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipEmployStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		equipEmploy = equipEmployService.getTranslateFull(employId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(equipEmploy, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipEmployStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新使用信息")
	public String save() {
		if (equipEmploy.getEmployId() == null) {
			equipEmploy.setApplyforState(Status.EquipFlowApplyfor.waitSubmit);
			equipEmploy.setDelFlag(Constant.ENABLED);
		} else {
			EquipEmploy p = equipEmployService.editLoad(equipEmploy);
			equipEmploy.setEmployDate(p.getEmployDate());
			equipEmploy.setEquipFlow(p.getEquipFlow());
			equipEmploy.setEmploySerial(p.getEmploySerial());
			equipEmploy.setApplyforState(p.getApplyforState());
			equipEmploy.setDelFlag(p.getDelFlag());
		}
		equipEmployService.saveOrMergeForEdit(equipEmploy);
		this.jsonString = "{success:true,applyforId:" + equipEmploy.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除使用信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipEmployService.delete(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交使用信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipEmployService.submitEmploy(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交调度使用信息")
	public String multiDispatch() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipEmploy p = equipEmployService.get(new Long(id));
			if (Status.EquipFlow.employed.equals(p.getEquipFlow().getFlowState())) { // 使用中的流程设备
				p.setApplyforState(Status.EquipFlowApplyfor.waitDispatch);
				equipEmployService.save(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		equipEmploy = equipEmployService.getTranslateFull(employId);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_relateId_L_EQ", equipEmploy.getEquipFlow().getInstallId().toString());
		filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_INSTALL);
		filter.addSorted("detectId", "desc");
		filter.getPagingBean().setPageSize(1);
		List<EquipDetect> all = equipDetectService.getAll(filter);
		if (all.isEmpty()) {
			getRequest().setAttribute("equipDetect", new EquipDetect());
		} else {
			getRequest().setAttribute("equipDetect", all.get(0));
		}
		return getRequest().getParameter("formpage");
	}
}
