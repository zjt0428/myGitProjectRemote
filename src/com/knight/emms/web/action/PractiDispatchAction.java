package com.knight.emms.web.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.PractiDispatch;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.FormApproveService;
import com.knight.emms.service.PractiDispatchService;
import com.knight.emms.service.ProjectService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.CodeService;
import com.knight.system.service.FileAttachService;

import lombok.Getter;
import lombok.Setter;

public class PractiDispatchAction extends ExportBaseAction<PractiDispatch> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private PractiDispatch practiDispatch;

	@Setter
	@Getter
	private Long dispatchId;

	@Resource
	private PractiDispatchService practiDispatchService;

	@Resource
	private FileAttachService fileAttachService;

	@Resource
	private FormApproveService formApproveService;

	@Resource
	private ProjectService projectService;
	
	@Resource
	private CodeService codeService;
	
	private SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Override
	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex)
			throws Exception {
		switch (headerIndex) {
			case 2:
				return ((Practitioner) value).getPractiName();
			case 3:
				return ((Practitioner) value).getCorpInfo().getCorpName();
			case 4:
				return ((Practitioner) value).getDepartment().getDepName();
			case 5:
				return ((Practitioner) value).getMobile();
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> calist = practiDispatchService.queryByScript("practiDispatch.equip_dispatch_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<calist.size();i++) {
				sb.append(String.valueOf(calist.get(i).get("DISPATCH_ID"))+",");
			}
			if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_dispatchId_L_EQ", sa);
			}else {
				return SUCCESS;
			}
		}
		List<PractiDispatch> list = practiDispatchService.queryTranslateAll(filter);
		for(PractiDispatch pd : list) {
			pd.getPractitioner().setClarificaStatusName(codeService.getValue("PRACTI_DISCLOSE_STATE", pd.getPractitioner().getClarificaStatus()));
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		practiDispatch = practiDispatchService.getTranslateFull(dispatchId);
		StringBuffer sb = new StringBuffer("{\"success\":true,\"data\":[");
		sb.append(GsonUtil.toJson(practiDispatch, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新派工信息")
	public String save() {
		if (practiDispatch.getDispatchId() == null) {
			practiDispatch.setApplyforState(Status.PractiDispatchApplyForState.waitSubmit);
			practiDispatch.setUserId(ApplicationContainer.getCurrentUserId());
			practiDispatch.setUserName(ApplicationContainer.getCurrentUser().getFullname());
			practiDispatch.setCreateTime(sd.format(new Date()));
//			practiDispatchService.saveSerialModel(practiDispatch);
			practiDispatchService.save(practiDispatch);
			super.isCreateFileAttach = true;
		} else {
			PractiDispatch p = practiDispatchService.get(practiDispatch.getDispatchId());
			practiDispatch.setDispatchSerial(p.getDispatchSerial());
			practiDispatch.setUserId(p.getUserId());
			practiDispatch.setUserName(p.getUserName());
			practiDispatch.setCreateTime(p.getCreateTime());
			practiDispatch.setApplyforState(p.getApplyforState());
			practiDispatch.setDelFlag(p.getDelFlag());
			practiDispatchService.merge(practiDispatch);
		}
		super.createFileAttach(practiDispatch.getDispatchId());
		this.jsonString = "{\"success\":true,\"applyforId\":" + practiDispatch.getApplyforId() + "}";
		return SUCCESS;
	}


	@ActionLog(description = "删除派工信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiDispatch c = practiDispatchService.get(new Long(id));
			if (Status.DispatchApplyfor.waitSubmit.equals(c.getApplyforState()) || Status.DispatchApplyfor.rejected.equals(c.getApplyforState())) {
				c.setDelFlag(Constant.DISENABLED);
				practiDispatchService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交派工信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			practiDispatchService.submitDispatch(new Long(id));
		}
		return SUCCESS;
	}
	
}
