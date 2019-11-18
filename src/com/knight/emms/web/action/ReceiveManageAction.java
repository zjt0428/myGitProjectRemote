package com.knight.emms.web.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ReceiveManage;
import com.knight.emms.model.ReceiveManageDetail;
import com.knight.emms.service.ProjectService;
import com.knight.emms.service.ReceiveManageService;

import lombok.Getter;
import lombok.Setter;

public class ReceiveManageAction extends ExportBaseAction<ReceiveManage> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ReceiveManage receiveManage;
	
	@Resource
	private ProjectService projectService;

	@Getter
	@Setter
	private Long receiveId;

	@Resource
	private ReceiveManageService receiveManageService;

	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ReceiveManage> list = receiveManageService.queryTranslateAll(filter);
//        for(ReceiveManage p :list){
//            QueryFilter filterProject = new QueryFilter();
//            filterProject.addConjunctFilter("Q_projectName_S_EQ",p.getProjectName());
//            Project pro = projectService.getAll(filterProject).get(0);
//            p.setProject(pro);
//        }
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ReceiveManage p = receiveManageService.getTranslateFull(receiveId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新领用信息")
	public String save() {
		if (receiveManage.getReceiveId() == null) {
			receiveManage.setStatus(Status.Pickup.waiting);
			receiveManage.setApplyforState(Status.Applyfor.waitSubmit);
			receiveManage.setDelFlag(Constant.ENABLED);
		} else {
			ReceiveManage p = receiveManageService.editLoad(receiveManage);
			receiveManage.setReceiveSerial(p.getReceiveSerial());
			receiveManage.setStatus(p.getStatus());
			receiveManage.setApplyforState(p.getApplyforState());
			receiveManage.setDelFlag(p.getDelFlag());
		}
		receiveManageService.saveOrMergeForEdit(receiveManage);
		this.jsonString = "{success:true,applyforId:" + receiveManage.getApplyforId() + "}";
		return SUCCESS;
	}
	
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			receiveManageService.deletedDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除领用信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ReceiveManage p = receiveManageService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setDelFlag(Constant.DISENABLED);
				receiveManageService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "提交领用信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ReceiveManage p = receiveManageService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				receiveManageService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "归还领用周材")
	public String returnMaterials() {
		Set<ReceiveManageDetail> receiveManageDetailSet = GsonUtil.fromJson(getRequest().getParameter("returnMaterials"), new TypeToken<Set<ReceiveManageDetail>>() {});
		Map<Long, ReceiveManageDetail> receiveManageDetails = new HashMap<Long, ReceiveManageDetail>();
		if (receiveManageDetailSet != null) {
			for (ReceiveManageDetail p : receiveManageDetailSet) {
				receiveManageDetails.put(p.getDetailId(), p);
			}
		}
		receiveManageService.returnMaterials(receiveId, receiveManageDetails);
		return SUCCESS;
	}
}
