/**
 *====================================================
 * 文件名称: ReturnGoodsAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月25日		陈光毅(创建:创建文件)
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

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.ReturnGoods;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.emms.service.ReturnGoodsService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ReturnGoodsAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月25日
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({@Result(name = "success", location = "/jsonString.jsp")})
@Controller("ReturnGoodsAction")
@Scope("prototype")
public class ReturnGoodsAction extends ExportBaseAction<ReturnGoods> {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long returnId;
	
	@Getter
	@Setter
	private ReturnGoods returnGoods;
	
	@Resource
	private ReturnGoodsService returnGoodsService;
	
	@Resource
	private ContractJoinUserService contractJoinUserService;
	
	@Action("listReturnGoods")
	public String list () {
		QueryFilter filter = new QueryFilter(getRequest());
		String includeSet = getRequest().getParameter("includeSet");
		if("2".equals(ApplicationContainer.getCurrentUser().getUserType())) {
			String contractIds = contractJoinUserService.concatGrantedContractId(ApplicationContainer.getCurrentUserId());
			filter.addValuesDisjunctFilter("Q_leaseContract.contractId_L_EQ", contractIds);
		}
		List<ReturnGoods> list = returnGoodsService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		boolean excludesFieldsWithoutExpose = true;
		if("Y".equals(includeSet)) {
			excludesFieldsWithoutExpose = false;
		}
		buff.append(GsonUtil.toJson(list, excludesFieldsWithoutExpose));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("loadReturnGoods")
	public String load () {
		ReturnGoods r = returnGoodsService.getTranslate(returnId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(r, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@com.knight.core.log.ActionLog(description = "保存或更新退货管理")
	@Action("saveReturnGoods")
	public String save () {
		if (returnGoods.getReturnId() == null) {
			returnGoods.setStatus("0");
			returnGoods.setDelFlag(Constant.ENABLED);
			returnGoodsService.saveSerialModel(returnGoods);
			returnGoods.setSubReturnGoods();
		} else {
			returnGoods.setDelFlag(Constant.ENABLED);
			returnGoods.setSubReturnGoods();
		}
		createFileAttach(returnGoods.getReturnId());
		returnGoodsService.merge(returnGoods);
		this.jsonString = "{success:true,applyforId:" + returnGoods.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@com.knight.core.log.ActionLog(description = "提交退货管理")
	@Action("multiSubmitReturnGoods")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ReturnGoods r = returnGoodsService.getTranslate(new Long(id));
			if (r.getStatus().equals("0")) {
				r.setStatus("1");
			} else {
				throw new BusinessException("状态非法,无法提交申请!");
			}
			returnGoodsService.merge(r);
		}
		return SUCCESS;
	}
	
	@com.knight.core.log.ActionLog(description = "删除退货管理")
	@Action("multiDelReturnGoods")
	public String multiDel () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ReturnGoods r = returnGoodsService.getTranslate(new Long(id));
			if (r.getStatus().equals("0")) {
				r.setDelFlag(Constant.DISENABLED);
				returnGoodsService.update(r);
			} else {
				throw new BusinessException("状态非法,无法删除所选信息!");
			}
		}
		return SUCCESS;
	}
	
	@com.knight.core.log.ActionLog(description = "删除退货管理清单")
	@Action("multiDelListReturnGoods")
	public String multiDelList () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			returnGoodsService.delList(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "退货管理打印单")
	@Action(value="printFormReturnGoods",results={@Result(name = "printForm", location = "/pages/print/materials/ReturnGoodsForm.jsp")})
	public String printForm() {
		ReturnGoods p = returnGoodsService.getTranslate(returnId);
		p.setReturnDate(DateUtil.changeObj2DateStr(p.getReturnDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("returnGoods", p);
		return "printForm";
	}
}
