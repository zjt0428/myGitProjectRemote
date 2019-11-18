/**
 *====================================================
 * 文件名称: MoneyLendAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-16			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
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
import com.knight.emms.model.MoneyLend;
import com.knight.emms.service.InstalmentService;
import com.knight.emms.service.MoneyLendService;
import com.knight.emms.service.ReceivementService;

/**
 * @ClassName: MoneyLendAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-16 下午5:41:40
 */
public class MoneyLendAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private MoneyLend moneyLend;

	@Getter
	@Setter
	private Long lendId;

	@Resource
	private MoneyLendService moneyLendService;

	@Resource
	private InstalmentService instalmentService;

	@Resource
	private ReceivementService receivementService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MoneyLend> list = moneyLendService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		MoneyLend p = moneyLendService.get(lendId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新借款信息")
	public String save() {
		if (moneyLend.getLendId() == null) {
			moneyLend.setBackAmount(BigDecimal.ZERO);
			moneyLend.setLendbackStatus(Status.InvoiceAmount.unfinished);
			moneyLend.setApplyforState(Status.Applyfor.waitSubmit);
			moneyLend.setDelFlag(Constant.ENABLED);
		} else {
			MoneyLend p = moneyLendService.editLoad(moneyLend);
			moneyLend.setLendSerial(p.getLendSerial());
			moneyLend.setBackAmount(p.getBackAmount());
			moneyLend.setLendbackStatus(p.getLendbackStatus());
			moneyLend.setApplyforState(p.getApplyforState());
			moneyLend.setDelFlag(p.getDelFlag());
		}
		moneyLendService.saveOrMergeForEdit(moneyLend);
		this.jsonString = "{success:true,applyforId:" + moneyLend.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除借款信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MoneyLend p = moneyLendService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			moneyLendService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交借款信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MoneyLend p = moneyLendService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				moneyLendService.save(p);
			}
		}
		return SUCCESS;
	}

}
