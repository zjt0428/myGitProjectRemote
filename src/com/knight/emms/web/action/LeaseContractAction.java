/**
 *====================================================
 * 文件名称: LeaseContractAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月15日		chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
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

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.LeaseContract;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.emms.service.ContractMaterialsService;
import com.knight.emms.service.LeaseContractService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LeaseContractAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017年8月15日 下午5:12:52
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({@Result(name = "success", location = "/jsonString.jsp")})
@Controller("LeaseContractAction")
@Scope("prototype")
public class LeaseContractAction extends ExportBaseAction<LeaseContract> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long leaseId;
	
	@Getter
	@Setter
	private LeaseContract leaseContract;
	
	@Resource
	private LeaseContractService leaseContractService;

	@Resource
	private ContractMaterialsService contractMaterialsService;
	
	@Resource
	private ContractJoinUserService contractJoinUserService;
	
	@Action("listLeaseContract")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		String province= getRequest().getParameter("province");
		String city= getRequest().getParameter("city");
		String county= getRequest().getParameter("county");
		if(province!=null||city!=null||county!=null) {
			String address = contractMaterialsService.concatAddress(province, city, county);
			if(address!=""){
				filter.addConjunctFilter("Q_[project.address]_S_LK", address);
			}
		}
		if("2".equals(ApplicationContainer.getCurrentUser().getUserType())) {
			String contractIds = contractJoinUserService.concatGrantedContractId(ApplicationContainer.getCurrentUserId());
			filter.addValuesDisjunctFilter("Q_contractId_L_EQ", contractIds);
		}
		List<LeaseContract> list = leaseContractService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("loadLeaseContract")
	public String load() {
		LeaseContract l = leaseContractService.getTranslate(leaseId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(l, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/** 新增或更新合同信息 */
	@Action("saveLeaseContract")
	public String save() {
		leaseContractService.saveOrMergeForEdit(leaseContract);
		createFileAttach(leaseContract.getLeaseId());
		this.jsonString = "{success:true,applyforId:" + leaseContract.getApplyforId() + "}";
		return SUCCESS;
	}
	
	/** 删除合同信息 */
	@Action("multiDelLeaseContract")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseContract lc = leaseContractService.get(new Long(id));
			if ("0".equals(lc.getStatus())) {
				lc.setDelFlag(Constant.DISENABLED);
				leaseContractService.update(lc);
			} else {
				throw new BusinessException("删除状态非法！");
			}
		}
		return SUCCESS;
	}
	
	/** 删除租借清单 */
	@Action("multiDelInventoryLeaseContract")
	public String multiDelInventory() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseContractService.delInventory(new Long(id));
		}
		return SUCCESS;
	}
	
	/** 删除价格设定 */
	@Action("multiDelPriceLeaseContract")
	public String multiDelPrice() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseContractService.delPrice(new Long(id));
		}
		return SUCCESS;
	}
	
	/** 删除损坏赔偿 */
	@Action("multiDelSpoiledLeaseContract")
	public String multiDelSpoiled() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseContractService.delSpoiled(new Long(id));
		}
		return SUCCESS;
	}
	
	// 删除报废赔偿
	@Action("multiDelCompensationLeaseContract")
	public String multiDelCompensation() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseContractService.delCompensation(new Long(id));
		}
		return SUCCESS;
	}
	
	/** 删除费用单价设置 */
	@Action("multiDelExpenseLeaseContract")
	public String multiDelExpense() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseContractService.delExpense(new Long(id));
		}
		return SUCCESS;
	}
	
	/** 提交合同信息 */
	@Action("multiSubmitLeaseContract")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseContract L = leaseContractService.get(new Long(id));
			if ("0".equals(L.getStatus())) {
				L.setStatus("1");
				leaseContractService.merge(L);
			} else {
				throw new BusinessException("提交申请状态不合法!");
			}
		}
		return SUCCESS;
	}
	
	@Action("invalidLeaseContract")
	public String invalid() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseContract lc = leaseContractService.get(new Long(id));
			lc.setStatus(Status.ContractMaterialsApplyfor.invalid);
			leaseContractService.update(lc);
		}
		return SUCCESS;
	}
	
	@Action("getMaterialsLeaseContract")
	public String getMaterials() {
		String leaseId = getRequest().getParameter("leaseId");
		List<Map<String,Object>> list = leaseContractService.queryByScript("materials.leaseContract_materials", leaseId);
		StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
