/**
 *====================================================
 * 文件名称: SupplierAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Supplier;
import com.knight.emms.model.SupplierAccount;
import com.knight.emms.model.SupplierLinker;
import com.knight.emms.service.SupplierService;

/**
 * @ClassName: SupplierAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:33:31
 */
public class SupplierAction extends ExportBaseAction<Supplier> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Supplier supplier;

	@Getter
	@Setter
	private Long supplierId;

	@Resource
	private SupplierService supplierService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Supplier> list = supplierService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listAccount() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SupplierAccount> list = supplierService.queryAccountTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listLinker() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SupplierLinker> list = supplierService.queryLinkerTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Supplier p = supplierService.getTranslate(supplierId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新供应商信息")
	public String save() {
		if (supplier.getSupplierId() == null) {
			supplier.setStatus(Status.Archives.enabled);
			supplier.setDelFlag(Constant.ENABLED);
		} else {
			Supplier p = supplierService.get(supplier.getSupplierId());
			supplier.setStatus(p.getStatus());
			supplier.setDelFlag(p.getDelFlag());
		}
		supplierService.saveOrUpdate(supplier);
		return SUCCESS;
	}

	@ActionLog(description = "删除供应商联系信息")
	public String multiDelLinker() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			supplierService.deletedLinker(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除供应商帐户信息")
	public String multiDelAccount() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			supplierService.deletedAccount(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除供应商信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Supplier p = supplierService.get(new Long(id));
			p.setStatus(Status.Archives.cancel);
			p.setDelFlag(Constant.DISENABLED);
			supplierService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "注销供应商信息")
	public String multiCancel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Supplier p = supplierService.get(new Long(id));
			p.setStatus(Status.Archives.cancel);
			supplierService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "恢复供应商信息")
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Supplier p = supplierService.get(new Long(id));
			p.setStatus(Status.Archives.enabled);
			supplierService.save(p);
		}
		return SUCCESS;
	}

}
