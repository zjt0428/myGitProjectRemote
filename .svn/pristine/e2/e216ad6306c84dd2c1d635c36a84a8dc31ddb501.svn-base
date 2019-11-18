
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.AllocationProject;
import com.knight.emms.service.AllocationProjectService;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: AllocationProjectAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class AllocationProjectAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AllocationProject allocationProject;

	@Setter
	@Getter
	private Long allocationId;

	@Resource
	private AllocationProjectService allocationProjectService;
	
	@Resource
	private ContractJoinUserService contractJoinUserService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//项目用户只显示相关联的 项目调入 和项目调出 的数据
		List<AllocationProject> list = new ArrayList<AllocationProject>();
		if("2".equals(ApplicationContainer.getCurrentUser().getUserType())) {
			String contractIds = contractJoinUserService.concatGrantedContractId(ApplicationContainer.getCurrentUserId());
			list = allocationProjectService.queryList(contractIds, filter);
		} else {
			list = allocationProjectService.queryTranslateAll(filter);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		allocationProject = allocationProjectService.getTranslateFull(allocationId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(allocationProject, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新项目调拨信息")
	public String save() {
		if (allocationProject.getAllocationId() == null) {
			allocationProjectService.saveCreate(allocationProject);
		} else {
			AllocationProject p = allocationProjectService.editLoad(allocationProject);
			allocationProject.setAllocationSerial(p.getAllocationSerial());
			allocationProject.setApplyforState(p.getApplyforState());
			allocationProject.setDelFlag(p.getDelFlag()); 
			allocationProject.setSubAllocation();
			allocationProjectService.merge(allocationProject);
		}
		this.jsonString = "{success:true,applyforId:" + allocationProject.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除调拨清单信息")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			allocationProjectService.deletedDetail(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交项目调拨信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			allocationProjectService.submitAllocation(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除调拨信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AllocationProject c = allocationProjectService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(c.getApplyforState())) {
				c.setDelFlag(Constant.DISENABLED);
				allocationProjectService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印项目调拨")
	public String printForm() {
		AllocationProject ap = allocationProjectService.getTranslateFull(allocationId);
		ap.setAllocationDate(DateUtil.changeObj2DateStr(ap.getAllocationDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("allocationProject", ap);
		return "printForm";
	}
}
