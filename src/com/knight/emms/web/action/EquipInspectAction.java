/**
 *====================================================
 * 文件名称: EquipInspectAction.java
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

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.EquipInspectSchema;
import com.knight.emms.model.Project;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipInspectService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.support.UploadTerminalFileParser;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipInspectAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:38:50
 */
public class EquipInspectAction extends ExportBaseAction<EquipInspect> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipInspect equipInspect;

	@Getter
	@Setter
	private Long inspectId;

	@Resource
	private EquipInspectService equipInspectService;

	@Resource
	private EquipFlowService equipFlowService;

	@Resource
	private ProjectService projectService;

	@Resource
	private FileAttachService fileAttachService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 4:
			return ((EquipInspectSchema) value).getEquipDiary().getEquipSerial();
		case 5:
			return CodeServiceImpl.fastValue("equipGeneric", ((EquipInspectSchema) value).getEquipDiary().getEquipGeneric());
		case 6:
			return CodeServiceImpl.fastValue("equipSpecific", ((EquipInspectSchema) value).getEquipDiary().getEquipSpecific());
		case 7:
			return ((EquipInspectSchema) value).getEquipDiary().getExwSerial();
		case 8:
			return CodeServiceImpl.fastValue("equipSource", ((EquipInspectSchema) value).getEquipDiary().getEquipSource());
		case 9:
			return ((EquipInspectSchema) value).getEquipDiary().getProjectName();
		case 10:
			return CodeServiceImpl.fastValue("city", ((EquipInspectSchema) value).getEquipDiary().getCity());
		case 11:
			return CodeServiceImpl.fastValue("county", ((EquipInspectSchema) value).getEquipDiary().getCounty());
		default:
			return null;
		}
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> calist = equipInspectService.queryByScript("equipdoc.equip_inspect_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<calist.size();i++) {
				sb.append(String.valueOf(calist.get(i).get("INSPECT_ID"))+",");
			}
			if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_inspectId_L_EQ", sa);
			}else {
				return SUCCESS;
			}
		}
		List<EquipInspect> list = equipInspectService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipInspect p = equipInspectService.getTranslateFull(inspectId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存巡检信息")
	public String save() {
		EquipInspect e = equipInspectService.get(equipInspect.getInspectId());
		equipInspect.setEquipInspectSchema(e.getEquipInspectSchema());
//		equipInspect.setInspectRectify(e.getInspectRectify());
		equipInspect.setCycleTimes(e.getCycleTimes());
		equipInspect.setThisEndCycleDate(e.getThisEndCycleDate());
		equipInspect.setStatus(e.getStatus());
		equipInspect.setRepairStatus(e.getRepairStatus());
		equipInspect.setSubEquipInspect();
		equipInspectService.merge(equipInspect);
		this.jsonString = "{success:true,applyforId:" + e.getInspectId() + "}";
		return SUCCESS;
	}

	public String upload() {
		Long fileId = new Long(getRequest().getParameter("fileId"));
		FileAttach fileAttach = fileAttachService.get(fileId);
		try {
			List<EquipInspect> list = UploadTerminalFileParser.parserEquipInspectFile(fileAttach.getFilePath());
			if (!list.isEmpty()) {
				equipInspectService.saveUpload(list);
			}
		} catch (Exception e) {
			if (e instanceof BusinessException) {
				throw (BusinessException) e;
			}
			throw new BusinessException("上传调度信息文件解析异常!", e);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除巡检内容")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInspectService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除巡检内容")
	public String multiReset() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInspectService.clean(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除巡检明细")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInspectService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除巡检费用")
	public String multiDelCost() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInspectService.deleteCost(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交巡检报告信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInspectService.submit(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印巡检报告信息")
	public String print() {
		equipInspect = equipInspectService.getTranslateFull(inspectId);
		Project project = projectService.get(equipInspect.getEquipInspectSchema().getEquipDiary().getProjectId());
		getRequest().setAttribute("project", project);
		return getRequest().getParameter("formpage");
	}

}
