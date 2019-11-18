/**
 *====================================================
 * 文件名称: ApplyMakeAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;
import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ApplyMake;
import com.knight.emms.service.ApplyMakeService;

/**
 * @ClassName: ApplyMakeAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author xuenz
 * @date 
 */
public class ApplyMakeAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ApplyMake applyMake;

	@Getter
	@Setter
	private Long applyMakeId;

	@Resource
	private ApplyMakeService applyMakeService;

	@Resource
	private CodeService codeService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ApplyMake> list = applyMakeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ApplyMake c = applyMakeService.getTranslate(applyMakeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新制作申请信息")
	public String save() {
		if (applyMake.getApplyMakeId() == null) {
			applyMake.setApplyforState(Status.Applyfor.waitSubmit);
			applyMake.setDelFlag(Constant.ENABLED);
			applyMakeService.saveOrMergeForEdit(applyMake);
			setFileAttach(applyMake.getApplyMakeId());
		} else {
			ApplyMake a = applyMakeService.editLoad(applyMake); 
			applyMake.setDelFlag(a.getDelFlag());
			applyMake.setApplyforState(a.getApplyforState());
			applyMakeService.saveOrMergeForEdit(applyMake);
		}
		this.jsonString = "{success:true,applyforId:" + applyMake.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除制作申请")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ApplyMake applyMake = applyMakeService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(applyMake.getApplyforState())) {
				applyMakeService.remove(applyMake);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除关联制作产品")
	public String multiDelProductMake() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			applyMakeService.deleteProductMake(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交制作申请")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ApplyMake p = applyMakeService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				applyMakeService.save(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		applyMake = applyMakeService.getTranslate(applyMakeId);
		getRequest().setAttribute("applyMake", applyMake);
		return getRequest().getParameter("formpage");
	}

}
