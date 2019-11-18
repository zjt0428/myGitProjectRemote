/**
 *====================================================
 * 文件名称: AutocraneAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年1月20日			chenxy(创建:创建文件)
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
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.Autocrane;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Project;
import com.knight.emms.service.AutocraneExpenseService;
import com.knight.emms.service.AutocraneService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: AutocraneAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年1月20日 下午7:12:09
 */
public class AutocraneAction extends ExportBaseAction<Autocrane> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Autocrane autocrane;

	@Getter
	@Setter
	private Long autocraneId;

	@Resource
	private AutocraneService autocraneService;

	@Getter
	@Setter
	private AutocraneExpenseService autocraneExpenseService;

	@Override
	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 2:
			return ((Project) value).getProjectName();
		case 3:
			return ((Project) value).getAddress();
		case 4:
			return ((Equipment) value).getRecordId();
		case 5:
			return ((Equipment) value).getExwSerial();
		case 6:
			return CodeServiceImpl.fastValue("equipSpecific", ((Equipment) value).getEquipSpecific());
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Autocrane> list = autocraneService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Autocrane p = autocraneService.getTranslateFull(autocraneId);
		if (p.getEquipment() == null) {
			p.setEquipment(new Equipment());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新汽吊信息")
	public String save() {
		if (autocrane.getEquipment() != null && autocrane.getEquipment().getEquipId() == null) {
			autocrane.setEquipment(null);
		}
		if (autocrane.getProject() != null && autocrane.getProject().getProjectId() == null) {
			autocrane.setProject(null);
		}
		if (autocrane.getAutocraneId() == null) {
			autocrane.setPaymentAmount(BigDecimal.ZERO);
//			autocrane.setBalanceAmount(BigDecimal.ZERO);
			autocrane.setEffective(Constant.DISENABLED);
			super.isCreateFileAttach = true;
		} else {
			Autocrane p = autocraneService.get(autocrane.getAutocraneId());
			autocrane.setAutocraneSerial(p.getAutocraneSerial());
			autocrane.setEffective(p.getEffective());
		}
		autocraneService.saveOrMergeForEdit(autocrane);
		super.createFileAttach(autocrane.getAutocraneId());
		return SUCCESS;
	}

	@ActionLog(description = "删除汽吊费用信息")
	public String multiDelExpense() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			autocraneExpenseService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除汽吊信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			autocraneService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "汽吊生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Autocrane p = autocraneService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				p.setEffective(Constant.ENABLED);
				autocraneService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "汽吊失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Autocrane p = autocraneService.get(new Long(id));
			if (Constant.ENABLED.equals(p.getEffective())) {
				p.setEffective(Constant.DISENABLED);
				autocraneService.save(p);
			}
		}
		return SUCCESS;
	}
}
