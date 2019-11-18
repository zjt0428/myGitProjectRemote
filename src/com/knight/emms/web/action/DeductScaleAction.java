/**
 *====================================================
 * 文件名称: DeductScaleAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-21			chenxy(创建:创建文件)
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
import com.knight.emms.model.DeductScale;
import com.knight.emms.service.DeductScaleService;

/**
 * @ClassName: DeductScaleAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-21 下午9:07:29
 */
public class DeductScaleAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private DeductScale deductScale;

	@Resource
	private DeductScaleService deductScaleService;

	public String load() {
		DeductScale ds = deductScaleService.get(DeductScale.SIMPLE);

		QueryFilter queryFilter = new QueryFilter();
		queryFilter.getPagingBean().setPageSize(100);
		queryFilter.addConjunctFilter("Q_deductScaleId_L_GT", DeductScale.SIMPLE.toString());
		List<DeductScale> list = deductScaleService.getAll(queryFilter);
		ds.getDeductScaleSet().addAll(list);

		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(ds, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新提成比例信息")
	public String save() {
		deductScale.setSubDeductScale();
		for (DeductScale s : deductScale.getDeductScaleSet()) {
			deductScaleService.merge(s);
		}
		DeductScale p = deductScaleService.get(DeductScale.SIMPLE);
		p.setScalePercent(deductScale.getScalePercent());
		p.setScaleType("0");
		deductScaleService.save(p);
		return SUCCESS;
	}

	@ActionLog(description = "删除提成比例")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Long deductScaleId = new Long(id);
			if (DeductScale.SIMPLE.equals(deductScaleId)) {
				continue;
			}
			deductScaleService.remove(deductScaleId);
		}
		return SUCCESS;
	}

}
