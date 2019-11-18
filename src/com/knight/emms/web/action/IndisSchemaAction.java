/**
 *====================================================
 * 文件名称: IndisSchemaAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.service.IndisSchemaService;
import com.knight.system.model.Department;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: IndisSchemaAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:40:44
 */
public class IndisSchemaAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private IndisSchema indisSchema;

	@Getter
	@Setter
	private Long schemaId;

	@Resource
	private IndisSchemaService indisSchemaService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<IndisSchema> list = indisSchemaService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		IndisSchema c = indisSchemaService.getTranslateFull(schemaId);
		if (c.getDepartment() == null) {
			c.setDepartment(new Department());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新安拆方案")
	public String save() {
		if (indisSchema.getSchemaId() == null) {
			indisSchema.setApplyforState(Status.Applyfor.waitSubmit);
			super.isCreateFileAttach = true;
		} else {
			IndisSchema p = indisSchemaService.editLoad(indisSchema);
			indisSchema.setApplyforState(p.getApplyforState());
			indisSchema.setApplyforUserId(p.getApplyforUserId());
		}
		indisSchemaService.saveOrMergeForEdit(indisSchema);
		createFileAttach(indisSchema.getSchemaId());
		this.jsonString = "{success:true,applyforId:" + indisSchema.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "提交安拆方案")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			IndisSchema indisSchema = indisSchemaService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(indisSchema.getApplyforState())) {
				indisSchemaService.submit(indisSchema);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "一键评审信息")
	public String contractLeaseApproval() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {   
			IndisSchema indisSchema = indisSchemaService.get(new Long(id));
			if (Status.Applyfor.waitAccept.equals(indisSchema.getApplyforState())) { 
				indisSchema.setApplyforState(Status.Applyfor.passed);
				indisSchemaService.save(indisSchema);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除安拆方案")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			IndisSchema indisSchema = indisSchemaService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(indisSchema.getApplyforState())) {
				indisSchemaService.delete(indisSchema);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除安拆方案人员")
	public String multiDelPracti() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			indisSchemaService.deletePracti(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		indisSchema = indisSchemaService.getTranslateFull(schemaId);
		return getRequest().getParameter("formpage");
	}

}
