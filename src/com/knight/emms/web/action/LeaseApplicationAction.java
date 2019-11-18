/**
 *====================================================
 * 文件名称: LeaseApplicationAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月18日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.LeaseApplication;
import com.knight.emms.service.LeaseApplicationService;

/**
 * @ClassName: LeaseApplicationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月18日
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({@Result(name = "success", location = "/jsonString.jsp")})
@Controller("LeaseApplicationAction")
@Scope("prototype")
public class LeaseApplicationAction extends ExportBaseAction<LeaseApplication> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long applicationId;
	
	@Getter
	@Setter
	private LeaseApplication leaseApplication;
	
	@Resource
	private LeaseApplicationService leaseApplicationService;
	
	@Action("listLeaseApplication")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LeaseApplication> list = leaseApplicationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("loadLeaseApplication")
	public String load() {
		LeaseApplication l = leaseApplicationService.getTranslate(applicationId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(l, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	// 新增或更新租借申请
	@Action("saveLeaseApplication")
	public String save() {
		if (leaseApplication.getApplicationId() == null) {
			leaseApplication.setStatus("0");
			leaseApplicationService.saveSerialModel(leaseApplication);
			leaseApplication.setSubLeaseApplication();
		} else {
			leaseApplication.setSubLeaseApplication();
		}
		createFileAttach(leaseApplication.getApplicationId());
		leaseApplicationService.merge(leaseApplication);
		this.jsonString = "{success:true,applyforId:" + leaseApplication.getApplyforId() + "}";
		return SUCCESS;
	}
	
	// 删除租借申请
	@Action("multiDelLeaseApplication")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseApplicationService.remove(new Long(id));
		}
		return SUCCESS;
	}
	
	// 删除租借清单
	@Action("multiDelLeaseLeaseApplication")
	public String multiDelLease() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseApplicationService.removeLease(new Long(id));
		}
		return SUCCESS;
	}
	
	// 提交申请
	@Action("multiSubmitLeaseApplication")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseApplication l = leaseApplicationService.getTranslate(new Long(id));
			if (l.getStatus().equals("0")) {
				l.setStatus("1");
			} else {
				throw new BusinessException("状态非法,无法提交申请!");
			}
			leaseApplicationService.merge(l);
		}	
		return SUCCESS;
	}
}
