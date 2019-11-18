/**
 *====================================================
 * 文件名称: CustomerAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.AmountReceive;
import com.knight.emms.model.ComponIntoStore;
import com.knight.emms.model.ContractArrange;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.Customer;
import com.knight.emms.model.CustomerAccount;
import com.knight.emms.model.CustomerLinker;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.LogisticsTransport;
import com.knight.emms.model.Project;
import com.knight.emms.model.SettleContract;
import com.knight.emms.service.AmountReceiveService;
import com.knight.emms.service.ContractArrangeService;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.CustomerService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.service.SettleContractService;
import com.knight.system.constant.SystemConstant;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: CustomerAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:33:31
 */
public class CustomerAction extends ExportBaseAction<Customer> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Customer customer;

	@Getter
	@Setter
	private Long customerId;

	@Resource
	private CustomerService customerService;
	@Resource
	private ProjectService projectService;
	@Resource
	private ContractArrangeService contractArrangeService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	@Resource
	private SettleContractService settleContractService;
	@Resource
	private AmountReceiveService amountReceiveService;
	

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Customer> list = customerService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listAccount() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<CustomerAccount> list = customerService.queryAccountTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listLinker() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<CustomerLinker> list = customerService.queryLinkerTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Customer p = customerService.getTranslate(customerId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新客户信息")
	public String save() {
		if (customer.getCustomerId() == null) {
			customer.setStatus(Status.Archives.enabled);
			customer.setDelFlag(Constant.ENABLED);
		} else {
			Customer p = customerService.get(customer.getCustomerId());
			customer.setStatus(p.getStatus());
			customer.setDelFlag(p.getDelFlag());
		}
		customerService.saveOrUpdate(customer);
		return SUCCESS;
	}

	@ActionLog(description = "删除客户联系信息")
	public String multiDelLinker() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			customerService.deletedLinker(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除客户帐户信息")
	public String multiDelAccount() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			customerService.deletedAccount(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除客户信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Customer p = customerService.get(new Long(id));
			p.setStatus(Status.Archives.cancel);
			p.setDelFlag(Constant.DISENABLED);
			customerService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "注销客户信息")
	public String multiCancel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Customer p = customerService.get(new Long(id));
			p.setStatus(Status.Archives.cancel);
			customerService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "恢复客户信息")
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Customer p = customerService.get(new Long(id));
			p.setStatus(Status.Archives.enabled);
			customerService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "修改客户名称")
	public String change() {
		String customerName = getRequest().getParameter("customerName");
		String id = getRequest().getParameter("ids");
		if(StringUtils.isNotBlank(id) && StringUtils.isNotBlank(customerName)){
			customerService.changeCustomerName(Long.valueOf(id), customerName);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "添加关联客户信息")
	public String addBranch() {
		String customerId = getRequest().getParameter("customerId");
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Customer p = customerService.get(new Long(id));
			p.setParentId(Long.valueOf(customerId));
			customerService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除关联客户信息")
	public String delBranch() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Customer p = customerService.get(new Long(id));
			p.setParentId(null);
			customerService.save(p);
		}
		return SUCCESS;
	}
}
