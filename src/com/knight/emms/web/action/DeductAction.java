/**
 *====================================================
 * 文件名称: DeductAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Deduct;
import com.knight.emms.service.DeductService;

/**
 * @ClassName: DeductAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:33:11
 */
public class DeductAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Deduct deduct;

	@Setter
	@Getter
	private Long deductId;

	@Resource
	private DeductService deductService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Deduct> list = deductService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Deduct cert = deductService.getTranslateFull(deductId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(cert, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String listUnpickup() {
		Date deductPassDate = DateUtil.changeStrToDate(getRequest().getParameter("deductPassDate"));
		List<Map<String, Object>> unpickupList = deductService.queryByScript("fund.deduction_unpickup", deductPassDate);
		Map<Long, BigDecimal> deducts = new HashMap<Long, BigDecimal>(unpickupList.size());
		for (Map<String, Object> p : unpickupList) {
			deducts.put((Long) p.get("PRACTI_ID"), (BigDecimal) p.get("REWARD"));
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(deducts, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新提成信息")
	public String save() {
		if (deduct.getDeductId() == null) {
			deduct.setApplyforState(Status.Applyfor.waitSubmit);
			deduct.setDelFlag(Constant.ENABLED);
		} else {
			Deduct p = deductService.editLoad(deduct);
			deduct.setDeductSerial(p.getDeductSerial());
			deduct.setApplyforState(p.getApplyforState());
			deduct.setDelFlag(p.getDelFlag());
		}
		deductService.saveOrMergeForEdit(deduct);
		this.jsonString = "{success:true,applyforId:" + deduct.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除提成人员信息")
	public String multiDelPracti() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			deductService.deletedPracti(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除提成信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Deduct c = deductService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(c.getApplyforState())) {
				c.setDelFlag(Constant.DISENABLED);
				deductService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交提成信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Deduct p = deductService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				deductService.save(p);
			}
		}
		return SUCCESS;
	}

}
