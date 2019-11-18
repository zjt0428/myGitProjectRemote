/**
 *====================================================
 * 文件名称: IncomeExpenseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.model.ExportModel;
import com.knight.core.service.ExportService;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.service.IncomeExpenseService;

/**
 * @ClassName: IncomeExpenseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-1 下午10:59:58
 */
public class IncomeExpenseAction extends ExportBaseAction<ExportModel> {

	private static final long serialVersionUID = 1L;

	@Resource
	private IncomeExpenseService incomeExpenseService;

	protected ExportService getExportService() {
		return incomeExpenseService;
	}

	protected List<String[]> getExportFieldData(QueryFilter queryFilter, ExportService exportService, String[] datafields) {
//		QueryFilter filter = new QueryFilter(getRequest());
		List<Map<String, Object>> exportList = incomeExpenseService.getAll(queryFilter);
		List<String[]> content = new ArrayList<String[]>(exportList.size());
		for (int i = 0; i < exportList.size(); i++) {
			Map<String, Object> c = exportList.get(i);
			String[] data = new String[datafields.length + 1];
			data[0] = (i + 1) + "";
			for (int j = 1; j < data.length; j++) {
				Object value = c.get(datafields[j - 1]);
				if (value == null) {
					data[j] = "";
					continue;
				}
				data[j] = value.toString();
			}
			content.add(data);
		}
		return content;
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Map<String, Object>> list = incomeExpenseService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
