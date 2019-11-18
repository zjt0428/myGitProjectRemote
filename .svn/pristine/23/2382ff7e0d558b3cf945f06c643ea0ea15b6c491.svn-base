/**
 *====================================================
 * 文件名称: EquipMaintAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.DateUtil;
import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.EquipMaint;
import com.knight.emms.model.EquipMaintSchema;
import com.knight.emms.model.Pickup;
import com.knight.emms.model.PickupComponent;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.EquipMaintService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

/**
 * @ClassName: EquipMaintAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:39:13
 */
public class EquipMaintAction extends ExportBaseAction<EquipMaint> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipMaint equipMaint;

	@Getter
	@Setter
	private Long maintId;

	@Resource
	private EquipMaintService equipMaintService;
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private CorpInfoService corpInfoService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 3:
			return ((EquipMaintSchema) value).getMaintTypeName();
		case 4:
			return ((EquipMaintSchema) value).getEquipment().getRecordId();
		case 5:
			return ((EquipMaintSchema) value).getEquipment().getProjectName();
		default:
			return null;
		}
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipMaint> list = equipMaintService.queryTranslateFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipMaint p = equipMaintService.getTranslateFull(maintId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新保养信息")
	public String save() {
		EquipMaint e = equipMaintService.get(equipMaint.getMaintId());
		equipMaint.setEquipMaintSchema(e.getEquipMaintSchema());
		//equipMaint.setEquipment(e.getEquipment());
		equipMaint.setCycleTimes(e.getCycleTimes());
		equipMaint.setThisEndCycleDate(e.getThisEndCycleDate());
		equipMaint.setStatus(e.getStatus());
		equipMaint.setRepairStatus(e.getRepairStatus());
		equipMaint.setSubEquipMaint();
		if(e.getCorpId()==null){
			if(equipMaint.getCorpId()!=null){
			CorpInfo corp = corpInfoService.getTranslateFull((long)Integer.parseInt(equipMaint.getCorpId()));
			List<String> tels = new ArrayList<String>();
			tels.add(corp.getDutymanTel1());
			tels.add(corp.getCapitalTel());
			tels.add(corp.getMarketTel());
			tels.add(corp.getTechnologyTel());
			tels.add(corp.getMaintenanceTel());
			tels.add(corp.getEngineeringTel());
			tels.add(corp.getSecurityTel());
			String projectName = equipMaint.getEquipMaintSchema().getEquipment().getProjectName();
			String exwSerial =  equipMaint.getEquipMaintSchema().getEquipment().getExwSerial();
			Date maintDate = equipMaint.getMaintDate();
			String msg = "预发往"+projectName+"的"+exwSerial+"编号设备已于"+ DateUtil.changeDateToStr(equipMaint.getMaintDate(),DateUtil.LINK_DISPLAY_DATE)+"完成出仓前整机保养工作，请悉知！";
			for(int i=0;i<tels.size();i++){
				if(tels.get(i)!=null){
			BusinessMessage bm = new BusinessMessage();
            bm.setReceiveTel(tels.get(i));
            bm.setMessage(msg);
            bm.setSenderName("保养管理消息");
            businessMessageService.sendOnce(bm);
				}
			}
			}
		
		
		}
		equipMaintService.merge(equipMaint);
		this.jsonString = "{success:true,applyforId:" + e.getMaintId() + "}";
	
		return SUCCESS;
	}

	@ActionLog(description = "删除保养信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipMaintService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除保养内容")
	public String multiReset() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipMaint e = equipMaintService.get(new Long(id));
			e.setEquipMaintDetailSet(null);
			e.setMaintDate(null);
			e.setMaintPepoles(null);
			e.setMaintResult(null);
			equipMaintService.save(e);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交保养信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipMaintService.submit(new Long(id));
		}
		return SUCCESS;
	}
	@ActionLog(description = "打印")
	public String print() {
		EquipMaint p = equipMaintService.getTranslateFull(maintId);
		getRequest().setAttribute("equipMaint", p);
		return "printEquipMaint";
	}

	@ActionLog(description = "例行保养打印")
	public String comPrint() {
		EquipMaint p = equipMaintService.getTranslateFull(maintId);
		getRequest().setAttribute("equipMaint", p);
		return "comPrintEquipMaint";
	}
}
