/**
 *====================================================
 * 文件名称: GoodsRecipientAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月20日		陈光毅(创建:创建文件)
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
import com.knight.emms.model.GoodsRecipient;
import com.knight.emms.model.RecycleManage;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.emms.service.GoodsRecipientService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: GoodsRecipientAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月20日
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({@Result(name = "success", location = "/jsonString.jsp")})
@Controller("GoodsRecipientAction")
@Scope("prototype")
public class GoodsRecipientAction extends ExportBaseAction<GoodsRecipient> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long recipientId;
	
	@Getter
	@Setter
	private GoodsRecipient goodsRecipient;
	
	@Resource
	private GoodsRecipientService goodsRecipientService;
	
	@Resource
	private ContractJoinUserService contractJoinUserService;
	
	@Action("listGoodsRecipient")
	public String list () {
		QueryFilter filter = new QueryFilter(getRequest());
		String includeSet = getRequest().getParameter("includeSet");
		if("2".equals(ApplicationContainer.getCurrentUser().getUserType())) {
			String contractIds = contractJoinUserService.concatGrantedContractId(ApplicationContainer.getCurrentUserId());
			filter.addValuesDisjunctFilter("Q_leaseContract.contractId_L_EQ", contractIds);
		}
		List<GoodsRecipient> list = goodsRecipientService.queryTranslateAll(filter);
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
	
	@Action("loadGoodsRecipient")
	public String load () {
		GoodsRecipient g = goodsRecipientService.getTranslate(recipientId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(g, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新收货管理")
	@Action("saveGoodsRecipient")
	public String save () {
		if (goodsRecipient.getRecipientId() == null) {
			goodsRecipient.setStatus("0");
			goodsRecipient.setDelFlag(Constant.ENABLED);
			goodsRecipientService.saveSerialModel(goodsRecipient);
			goodsRecipient.setSubGoodsRecipient();
		} else {
			goodsRecipient.setStatus(goodsRecipient.getStatus());
			goodsRecipient.setDelFlag(Constant.ENABLED);
			goodsRecipient.setSubGoodsRecipient();
		}
		createFileAttach(goodsRecipient.getRecipientId());
		goodsRecipientService.merge(goodsRecipient);
		this.jsonString = "{success:true,applyforId:" + goodsRecipient.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "删除收货管理")
	@Action("multiDelGoodsRecipient")
	public String multiDel () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			GoodsRecipient g = goodsRecipientService.getTranslate(new Long(id));
			if (g.getStatus().equals("0")) {
				g.setDelFlag(Constant.DISENABLED);
				goodsRecipientService.update(g);
			} else {
				throw new BusinessException("删除状态非法！");
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "提交收货管理")
	@Action("multiSubmitGoodsRecipient")
	public String multiSubmit () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			GoodsRecipient g = goodsRecipientService.getTranslate(new Long(id));
			if (g.getStatus().equals("0")) {
				g.setStatus("1");
			} else {
				throw new BusinessException("提交状态非法！");
			}
			goodsRecipientService.merge(g);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除收货管理清单")
	@Action("multiDelListGoodsRecipient")
	public String multiDelList () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			goodsRecipientService.delList(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "收货管理打印单")
	@Action(value="printFormGoodsRecipient",results={@Result(name = "printForm", location = "/pages/print/materials/GoodsRecipientForm.jsp")})
	public String printForm() {
		GoodsRecipient p = goodsRecipientService.getTranslate(recipientId);
		p.setDeliveryDate(DateUtil.changeObj2DateStr(p.getDeliveryDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("goodsRecipient", p);
		return "printForm";
	}
}
