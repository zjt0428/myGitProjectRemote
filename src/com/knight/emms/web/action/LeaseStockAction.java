/**
 *====================================================
 * 文件名称: LeaseStockAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：租借库存
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

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
import com.knight.core.web.action.AnnotationAction;
import com.knight.emms.model.LeaseStock;
import com.knight.emms.service.LeaseStockService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LeaseStockAction
 * @Description: 租借库存
 * @author 陈光毅
 * @date 2017年11月20日
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({@Result(name = "success", location = "/jsonString.jsp")})
@Controller("LeaseStockAction")
@Scope("prototype")
public class LeaseStockAction extends AnnotationAction {
	
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long stockId;
	
	@Getter
	@Setter
	private LeaseStock leaseStock;
	
	@Resource
	private LeaseStockService leaseStockService;
	
	@Action("listLeaseStock")
	public String list () {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LeaseStock> list = leaseStockService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("loadLeaseStock")
	public String load () {
		LeaseStock s = leaseStockService.get(stockId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(s, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	//根据丢失赔偿时间获取项目周材库存
	@Action("getLeaseStoreByCompensationDateLeaseStock")
	public String getLeaseStoreByCompensationDate() {
		String compensationDate = getRequest().getParameter("compensationDate");
		String contractId = getRequest().getParameter("contractId");
		String leaseId = getRequest().getParameter("leaseId");
		List<Map<String,Object>> list = leaseStockService.queryByScript("materials.get_lease_store_by_compensationDate", contractId,leaseId,compensationDate);
		StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
