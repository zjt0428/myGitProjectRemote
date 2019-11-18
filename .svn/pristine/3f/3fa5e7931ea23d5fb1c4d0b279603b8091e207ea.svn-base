/**
 *====================================================
 * 文件名称: IncomeExpenseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.model.ExportModel;
import com.knight.core.model.ExportStruct;
import com.knight.core.model.PersistantStruct;
import com.knight.emms.dao.IncomeExpenseDao;
import com.knight.emms.service.IncomeExpenseService;

/**
 * @ClassName: IncomeExpenseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-1 下午11:00:28
 */
public class IncomeExpenseServiceImpl implements IncomeExpenseService {

	private static final ExportStruct exportStruct = new ExportStruct("收支明细汇总", "收支明细");

	private static final PersistantStruct persistantStruct = new PersistantStruct(exportStruct);

	@Resource
	private IncomeExpenseDao incomeExpenseDao;

	public List<Map<String, Object>> getAll(QueryFilter queryFilter) {
		return incomeExpenseDao.getAll(queryFilter);
	}

	public List<? extends ExportModel> queryExportData(QueryFilter filter) {
		return null;
	}

	public PersistantStruct getPersistantStruct() {
		return persistantStruct;
	}

}
