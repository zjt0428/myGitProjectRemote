/**
 *====================================================
 * 文件名称: EquipMaintSchemaAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.EquipMaintSchema;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.LogisticsBacksport;
import com.knight.emms.service.EquipInstallService;
import com.knight.emms.service.EquipMaintSchemaService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.support.SchemaSupport;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipMaintSchemaAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:06:01
 */
public class EquipMaintSchemaAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipMaintSchema equipMaintSchema;

	@Getter
	@Setter
	private Long maintSchemaId;

	@Resource
	private EquipMaintSchemaService equipMaintSchemaService;

	@Resource
	private EquipInstallService equipInstallService;
	@Resource
	private EquipmentService equipmentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipMaintSchema> list = equipMaintSchemaService.queryTranslateAll(filter);
			for (EquipMaintSchema l : list) {
				CodeServiceImpl.translate(l.getEquipment());
			}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipMaintSchema p = equipMaintSchemaService.getTranslate(maintSchemaId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新保养方案信息")
	public String save() {
		if (equipMaintSchema.getMaintSchemaId() == null) {
			equipMaintSchema.setDelFlag(Constant.ENABLED);
		} else {
			EquipMaintSchema p = equipMaintSchemaService.get(equipMaintSchema.getMaintSchemaId());
			equipMaintSchema.setFlowId(p.getFlowId());
			equipMaintSchema.setRelateId(p.getRelateId());
			equipMaintSchema.setRelateModule(p.getRelateModule());
			equipMaintSchema.setRelateSerial(p.getRelateSerial());
			equipMaintSchema.setEquipment(p.getEquipment());
			//equipMaintSchema.setEquipDiary(p.getEquipDiary());
			equipMaintSchema.setDelFlag(p.getDelFlag());
		}		
		equipMaintSchema.setMaintTimes(0);
		equipMaintSchema.setCycleTimes(1);
		equipMaintSchema.setCycleDaysTimes(0);
		equipMaintSchema.setActive(Constant.DISENABLED);
		SchemaSupport.caculateSchemaNextDate(equipMaintSchema);
		equipMaintSchemaService.saveOrUpdate(equipMaintSchema);
		return SUCCESS;
	}

	@ActionLog(description = "批量新增保养方案信息")
	public String saveBatch() {
		equipMaintSchema.setDelFlag(Constant.ENABLED);
		equipMaintSchema.setMaintTimes(0);
		equipMaintSchema.setCycleTimes(1);
		equipMaintSchema.setCycleDaysTimes(0);
		equipMaintSchema.setActive(Constant.DISENABLED);
		SchemaSupport.caculateSchemaNextDate(equipMaintSchema);
		for (String equipId : equipMaintSchema.getRelateIds().split(",")) {
			Equipment equipment = equipmentService.get(new Long(equipId));
			EquipMaintSchema inspectSchema = equipMaintSchema.clone();
			inspectSchema.setEquipment(equipment);
			equipMaintSchemaService.saveOrUpdate(inspectSchema);
		}
	/*	for (String installId : equipMaintSchema.getRelateIds().split(",")) {
			EquipInstall equipInstall = equipInstallService.get(new Long(installId));
			EquipMaintSchema inspectSchema = equipMaintSchema.clone();
			inspectSchema.setFlowId(equipInstall.getEquipFlow().getFlowId());
			//inspectSchema.setEquipDiary(equipInstall.getEquipFlow().getEquipDiary());
			equipMaintSchemaService.saveOrUpdate(inspectSchema);
		}*/
		return SUCCESS;
	}

	@ActionLog(description = "删除保养方案信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipMaintSchema p = equipMaintSchemaService.get(new Long(id));
			p.setActive(Constant.DISENABLED);
			p.setDelFlag(Constant.DISENABLED);
			equipMaintSchemaService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交保养方案信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipMaintSchema p = equipMaintSchemaService.get(new Long(id));
			p.setActive(Constant.ENABLED);
			equipMaintSchemaService.save(p);
			if (p.getNextFormTime().getTime() <= DateUtil.setEndDay(new Date()).getTime()) {
				equipMaintSchemaService.createWaitEquipMaint(p);
			}
		}
		return SUCCESS;
	}

}
