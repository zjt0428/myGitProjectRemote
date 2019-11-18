/**
 *====================================================
 * 文件名称: EquipHitchAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipHitch;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Project;
import com.knight.emms.service.EquipHitchService;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: EquipHitchAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:03:44
 */
public class EquipHitchAction extends ExportBaseAction<EquipHitch> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipHitch equipHitch;

	@Getter
	@Setter
	private Long hitchId;

	@Resource
	private EquipHitchService equipHitchService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		if (headerIndex == 3) {
			return ((Equipment) value).getRecordId();
		}
		if (headerIndex == 4) {
			return ((Equipment) value).getExwSerial();
		}
		if (headerIndex == 5) {
			return ((Project) value).getProjectName();
		}

		return null;
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipHitch> list = equipHitchService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "加载故障隐患信息")
	public String load() {
		EquipHitch c = equipHitchService.getTranslate(hitchId);
		if (c.getDepartment() == null) {
			c.setUserId(ApplicationContainer.getCurrentUserId());
			c.setUserName(ApplicationContainer.getCurrentUser().getFullname());
			c.setDepartment(ApplicationContainer.getCurrentUser().getDepartment());
			c.setProvidedDate(DateUtil.getCurrentLinkDateStr());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, DateUtil.LINK_DISPLAY_DATE, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存故障隐患信息")
	public String save() {
		if (equipHitch.getHitchId() != null) {
			EquipHitch e = equipHitchService.editLoad(equipHitch);
			equipHitch.setRelateId(e.getRelateId());
			equipHitch.setRelateSerial(e.getRelateSerial());
			equipHitch.setRelateModule(e.getRelateModule());
			equipHitch.setProjectId(e.getProjectId());
			equipHitch.setProject(null);
			equipHitch.setEquipId(e.getEquipId());
			equipHitch.setEquipment(null);
		} else {
			this.isCreateFileAttach = true;
		}
		equipHitch.setUserId(null);
		equipHitch.setUserName(null);
		equipHitch.setDepartment(null);
		equipHitch.setProvidedDate(null);
		equipHitch.setHandleDate(null);
		equipHitch.setHandleDescription(null);
		equipHitch.setHandleMans(null);
		equipHitch.setHandleResult(null);
		equipHitch.setStatus(Status.HandleResult.untreated);
		equipHitch.setApplyforState(Status.Applyfor.waitSubmit);
		equipHitchService.saveOrMergeForEdit(equipHitch);
		createFileAttach(equipHitch.getHitchId());
		return SUCCESS;
	}

	@ActionLog(description = "处理故障隐患信息")
	public String handle() {
		EquipHitch e = equipHitchService.editLoad(equipHitch);
		equipHitch.setRelateId(e.getRelateId());
		equipHitch.setRelateSerial(e.getRelateSerial());
		equipHitch.setRelateModule(e.getRelateModule());
		equipHitch.setProjectId(e.getProjectId());
		equipHitch.setProject(null);
		equipHitch.setEquipId(e.getEquipId());
		equipHitch.setEquipment(null);
		equipHitch.setStatus(Status.HandleResult.untreated);
		equipHitch.setApplyforState(Status.Applyfor.waitSubmit);
		equipHitchService.saveOrMergeForEdit(equipHitch);
		this.jsonString = "{success:true,applyforId:" + equipHitch.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除故障隐患信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipHitchService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交故障隐患信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipHitch e = equipHitchService.get(new Long(id));
			if (StringUtils.isBlank(e.getHandleDate()) || StringUtils.isBlank(e.getHandleMans()) || StringUtils.isBlank(e.getHandleResult())) {
				throw new BusinessException("处理结果信息未填写完整!");
			}
			e.setApplyforState(Status.Applyfor.waitApprove);
			equipHitchService.save(e);
		}
		return SUCCESS;
	}

}
