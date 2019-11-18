/**
 *====================================================
 * 文件名称: LeasePaymentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年9月04日		陈光毅(创建:创建文件)
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

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.LeasePayment;
import com.knight.emms.service.LeasePaymentService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LeasePaymentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年9月04日
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({@Result(name = "success", location = "/jsonString.jsp")})
@Controller("LeasePaymentAction")
@Scope("prototype")
public class LeasePaymentAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long paymentId;
	
	@Getter
	@Setter
	private LeasePayment leasePayment;
	
	@Resource
	private LeasePaymentService leasePaymentService;
	
	@Action("listLeasePayment")
	public String list () {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LeasePayment> list = leasePaymentService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("loadLeasePayment")
	public String load() {
		LeasePayment p = leasePaymentService.getTranslate(paymentId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@Action("saveLeasePayment")
	public String save() {
		if (leasePayment.getPaymentId() == null) {
			leasePayment.setStatus("0");
			leasePayment.setSubLeasePayment();
			leasePaymentService.saveSerialModel(leasePayment);
			leasePaymentService.save(leasePayment);
		} else {
			leasePayment.setSubLeasePayment();
			leasePaymentService.merge(leasePayment);
		}
		return SUCCESS;
	}
	
	@Action("multiDelLeasePayment")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leasePaymentService.remove(new Long(id));
		}
		return SUCCESS;
	}
	
	@Action("multiDelInfoLeasePayment")
	public String multiDelInfo() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leasePaymentService.delInfo(new Long(id));
		}
		return SUCCESS;
	}
}
