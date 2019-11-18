/**
 *====================================================
 * 文件名称: EquipInspectSchemaAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInspectSchema;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipInspectSchemaService;
import com.knight.emms.service.EquipInstallService;
import com.knight.emms.support.SchemaSupport;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipInspectSchemaAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:05:08
 */
public class EquipInspectSchemaAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipInspectSchema equipInspectSchema;

	@Getter
	@Setter
	private Long inspectSchemaId;

	@Resource
	private EquipInspectSchemaService equipInspectSchemaService;

	@Resource
	private EquipInstallService equipInstallService;
	
	@Resource
	private EquipFlowService equipFlowService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> calist = equipInspectSchemaService.queryByScript("equipdoc.equip_inspect_schema_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<calist.size();i++) {
				sb.append(String.valueOf(calist.get(i).get("INSPECT_SCHEMA_ID"))+",");
			}
			if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_inspectSchemaId_L_EQ", sa);
			}else {
				return SUCCESS;
			}
		}
		List<EquipInspectSchema> list = equipInspectSchemaService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipInspectSchema p = equipInspectSchemaService.getTranslate(inspectSchemaId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新巡检方案信息")
	public String save() {
		if (equipInspectSchema.getInspectSchemaId() == null) {
			equipInspectSchema.setDelFlag(Constant.ENABLED);
		} else {
			EquipInspectSchema p = equipInspectSchemaService.get(equipInspectSchema.getInspectSchemaId());
			equipInspectSchema.setFlowId(p.getFlowId());
			equipInspectSchema.setRelateId(p.getRelateId());
			equipInspectSchema.setRelateModule(p.getRelateModule());
			equipInspectSchema.setRelateSerial(p.getRelateSerial());
			equipInspectSchema.setEquipDiary(p.getEquipDiary());
			equipInspectSchema.setDelFlag(p.getDelFlag());
		}
		equipInspectSchema.setInspectTimes(0);
		equipInspectSchema.setCycleTimes(1);		//频次（巡检管理）
		equipInspectSchema.setCycleDaysTimes(0);
		equipInspectSchema.setActive(Constant.DISENABLED);
		equipInspectSchema.setCycleDays(0);
//		SchemaSupport.caculateSchemaNextDate(equipInspectSchema);
		equipInspectSchemaService.caculateSchemaDate(equipInspectSchema, equipInspectSchema.getGeneratedOpportunity(), DateUtil.getCurrentDate());
		
		equipInspectSchemaService.saveOrUpdate(equipInspectSchema);
		return SUCCESS;
	}

	@ActionLog(description = "批量新增巡检方案信息")
	public String saveBatch() {
		equipInspectSchema.setDelFlag(Constant.ENABLED);
		equipInspectSchema.setInspectTimes(0);
		equipInspectSchema.setCycleTimes(1);
		equipInspectSchema.setCycleDaysTimes(0);
		equipInspectSchema.setActive(Constant.DISENABLED);
//		SchemaSupport.caculateSchemaNextDate(equipInspectSchema);
		equipInspectSchema.setCycleDays(0);
		equipInspectSchemaService.caculateSchemaDate(equipInspectSchema, equipInspectSchema.getGeneratedOpportunity(), DateUtil.getCurrentDate());
		StringBuffer sb = new StringBuffer("{success:true,activeId:[");
//		if (SystemConstant.MODULE_EQUIP_EMPLOY.equals(equipInspectSchema.getRelateModule())) {
		for (String installId : equipInspectSchema.getRelateIds().split(",")) {
			EquipInstall equipInstall = equipInstallService.get(new Long(installId));
			EquipInspectSchema inspectSchema = equipInspectSchema.clone();
//				inspectSchema.setRelateId(equipInstall.getEquipFlow().getgetEmployId());
//				inspectSchema.setRelateSerial(equipInstall.getEmploySerial());
			inspectSchema.setFlowId(equipInstall.getEquipFlow().getFlowId());
			inspectSchema.setEquipDiary(equipInstall.getEquipFlow().getEquipDiary());
			equipInspectSchemaService.saveOrUpdate(inspectSchema);
			sb.append(inspectSchema.getInspectSchemaId()).append(",");
		}
//		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]}");
		setJsonString(sb.toString());	
		return SUCCESS;
	}

	@ActionLog(description = "删除巡检方案信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInspectSchema p = equipInspectSchemaService.get(new Long(id));
			p.setActive(Constant.DISENABLED);
			p.setDelFlag(Constant.DISENABLED);
			EquipFlow equipFlow = equipFlowService.get(p.getFlowId());
			equipFlow.setEmployInspectSchemaId(null);
			equipFlowService.save(equipFlow);
			equipInspectSchemaService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交巡检方案信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInspectSchema p = equipInspectSchemaService.get(new Long(id));
			p.setActive(Constant.ENABLED);
			p.setActivateTime(DateUtil.getCurrentLinkTimeStr());
			equipInspectSchemaService.save(p);
			/*if (p.getNextFormTime().getTime() <= DateUtil.setEndDay(new Date()).getTime()) {
				equipInspectSchemaService.createWaitEquipInspect(p);
			}*/
			if(Constant.GENERATE_NOW.equals(p.getGeneratedOpportunity())) {
				equipInspectSchemaService.createWaitEquipInspect(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "巡检计划失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipInspectSchema p = equipInspectSchemaService.get(new Long(id));
			if (Constant.ENABLED.equals(p.getActive())) {
				p.setActive(Constant.DISENABLED);
				equipInspectSchemaService.update(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "查找巡检计划的现场安装信息")
	public String queryInstall(){
		String flowId = getRequest().getParameter("flowId");
		List<Map<String,Object>> list = equipInspectSchemaService.queryByScript("store.equipInstall_inspect_list", flowId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(list, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	} 
	
}
