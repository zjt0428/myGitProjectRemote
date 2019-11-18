/**
 *====================================================
 * 文件名称: MoneyBackAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-16			chenxy(创建:创建文件)
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
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.MoneyBack;
import com.knight.emms.service.InstalmentService;
import com.knight.emms.service.MoneyBackService;
import com.knight.emms.service.ReceivementService;

/**
 * @ClassName: MoneyBackAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-16 下午5:41:13
 */
public class MoneyBackAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private MoneyBack moneyBack;

	@Getter
	@Setter
	private Long backId;

	@Resource
	private MoneyBackService moneyBackService;

	@Resource
	private InstalmentService instalmentService;

	@Resource
	private ReceivementService receivementService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MoneyBack> list = moneyBackService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		MoneyBack p = moneyBackService.get(backId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新还款信息")
	public String save() {
		if (moneyBack.getBackId() == null) {
			moneyBack.setApplyforState(Status.Applyfor.waitSubmit);
			moneyBack.setDelFlag(Constant.ENABLED);
		} else {
			MoneyBack p = moneyBackService.editLoad(moneyBack);
			moneyBack.setBackSerial(p.getBackSerial());
			moneyBack.setApplyforState(p.getApplyforState());
			moneyBack.setDelFlag(p.getDelFlag());
		}
		moneyBackService.saveOrMergeForEdit(moneyBack);
		this.jsonString = "{success:true,applyforId:" + moneyBack.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除还款信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MoneyBack p = moneyBackService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			moneyBackService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交还款信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MoneyBack p = moneyBackService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				moneyBackService.save(p);
			}
		}
		return SUCCESS;
	}

}
