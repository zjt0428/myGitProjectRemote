/**
 *====================================================
 * 文件名称: ReimburseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
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
import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Reimburse;
import com.knight.emms.service.ReimburseService;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;

/**
 * @ClassName: ReimburseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:34:20
 */
public class ReimburseAction extends ExportBaseAction<Reimburse> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Reimburse reimburse;

	@Setter
	@Getter
	private Long reimburseId;

	@Resource
	private ReimburseService reimburseService;

	@Resource
	private AppUserService appUserService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Reimburse> list = reimburseService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Reimburse cert = reimburseService.getTranslateFull(reimburseId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(cert, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新提成信息")
	public String save() {
		reimburse.setReimburseDate(DateUtil.changeObj2DateStr(reimburse.getReimburseMonth(), DateUtil.LINK_DISPLAY_DATE));
		if (reimburse.getReimburseId() == null) {
			reimburse.setApplyforState(Status.Applyfor.waitSubmit);
			reimburse.setDelFlag(Constant.ENABLED);
		} else {
			Reimburse p = reimburseService.editLoad(reimburse);
			reimburse.setReimburseSerial(p.getReimburseSerial());
			reimburse.setApplyforState(p.getApplyforState());
			reimburse.setDelFlag(p.getDelFlag());
		}
		reimburseService.saveOrMergeForEdit(reimburse);
		setFileAttach(reimburse.getReimburseId());
		this.jsonString = "{success:true,applyforId:" + reimburse.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除提成人员信息")
	public String multiDelTicket() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			reimburseService.deletedTicket(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除提成信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Reimburse c = reimburseService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(c.getApplyforState())) {
				c.setDelFlag(Constant.DISENABLED);
				reimburseService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交提成信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Reimburse p = reimburseService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				reimburseService.save(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		reimburse = reimburseService.getTranslateFull(reimburseId);
		AppUser appUser = appUserService.get(reimburse.getUserId());
		getRequest().setAttribute("appUser", appUser);
		getRequest().setAttribute("bigAskforAmount", BigDecimalUtil.parserDigAmount(reimburse.getAskforAmount()));
		return getRequest().getParameter("formpage");
	}

}
