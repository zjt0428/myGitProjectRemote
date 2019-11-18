/**
 *====================================================
 * 文件名称: ConstructOperationAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月6日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ConstructOperation;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Project;
import com.knight.emms.service.ConstructOperationService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ConstructOperationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月6日 上午11:18:15
 */
public class ConstructOperationAction extends ExportBaseAction<ConstructOperation> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ConstructOperation constructOperation;

	@Getter
	@Setter
	private Long constructId;

	@Resource
	private ConstructOperationService constructOperationService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 2:
			return ((Equipment) value).getRecordId();
		case 3:
			return CodeServiceImpl.fastValue("equipGeneric", ((Equipment) value).getEquipGeneric());
		case 4:
			return ((Project) value).getProjectName();
		case 5:
			return ((Project) value).getAddress();
		case 16:
			return CodeServiceImpl.fastValue("equipSpecific", ((Equipment) value).getEquipSpecific());
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ConstructOperation> list = constructOperationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listWithSet() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ConstructOperation> list = constructOperationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,GsonUtil.SINCE_VERSION_20,false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ConstructOperation p = constructOperationService.getTranslateAll(constructId);
		if (p.getEquipment() == null) {
			p.setEquipment(new Equipment());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新施工作业信息")
	public String save() {
		if (constructOperation.getEquipment() != null && constructOperation.getEquipment().getEquipId() == null) {
			constructOperation.setEquipment(null);
		}
		if (constructOperation.getConstructId() == null) {
			constructOperation.setStatus(Status.AppConstruct.closed);
			constructOperation.setFinishedAmount(BigDecimal.ZERO);
			constructOperation.setFundStatus(Status.Fund.payment);
			constructOperation.setRemainderAmount(constructOperation.getSummary().subtract(constructOperation.getFinishedAmount()));
			super.isCreateFileAttach = true;
		} else {
			ConstructOperation p = constructOperationService.getTranslate(constructOperation.getConstructId());
			constructOperation.setFinishedAmount(p.getFinishedAmount());
			constructOperation.setRemainderAmount(constructOperation.getSummary().subtract(p.getFinishedAmount()));
			constructOperation.setStatus(p.getStatus());
			constructOperation.setConstructSerial(p.getConstructSerial());
			constructOperation.setFundStatus(p.getFundStatus());
		}
		constructOperationService.saveOrMergeForEdit(constructOperation);
		createFileAttach(constructOperation.getConstructId());
		return SUCCESS;
	}

	@ActionLog(description = "删除施工作业任务信息")
	public String multiDelTask() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			constructOperationService.deleteTask(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除施工作业信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			constructOperationService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "施工作业生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ConstructOperation p = constructOperationService.get(new Long(id));
			if (Status.AppConstruct.waitingBegin.equals(p.getStatus())) {
				constructOperationService.effective(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "施工作业失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ConstructOperation p = constructOperationService.get(new Long(id));
			if (Status.AppConstruct.closed.equals(p.getStatus())) {
				constructOperationService.loseEffective(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		constructOperation = constructOperationService.get(constructId);
		CodeServiceImpl.translate(constructOperation.getEquipment());
		return getRequest().getParameter("formpage");
	}
}
