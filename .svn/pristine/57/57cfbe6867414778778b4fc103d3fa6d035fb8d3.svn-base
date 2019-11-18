/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: InitLoadTableDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.dao;

import java.util.List;
import java.util.Map;

import com.knight.core.dao.BaseStrPKDao;
import com.knight.core.filter.QueryFilter;
import com.knight.system.model.CodeInfo;
import com.knight.system.model.InitLoadTable;

/**
 * @ClassName:InitLoadTableDao
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-1 下午1:40:27
 * @since JDK Version 1.5
 */
public interface InitLoadTableDao extends BaseStrPKDao<InitLoadTable> {

	/**
	 * 得到某一类型的所有下载表信息（别名和表名），表的类型包括两种：即表码{@link #BM_TABLE_TYPE}和 控制表{@link #CONTROL_TABLE_TYPE}
	 * @param tableType int 表类型
	 * @param allTable boolean true :所有的表,false:仅发生更改的表
	 * @return Map 该类型的初始化下载表信息。
	 */
	public List<InitLoadTable> findByTableType(int tableType, boolean allTable);

	/**
	 * 通过表的别名获取表对象.
	 * @param tableAlias
	 * @return
	 */
	public InitLoadTable findByTablAlias(String tableAlias);

	/**
	 * 加载表码信息至表码对象中
	 * @param sql
	 * @param initLoadTable
	 * @return
	 * @author:chenxy
	 */
	public Map<String, CodeInfo> loadCodeToMap(String sql, final InitLoadTable initLoadTable);

	/**
	 * 加载控制表对象信息
	 * @param initLoadTable
	 * @return
	 * @author:chenxy
	 */
	public List<Map<String, Object>> loadConfigTable(InitLoadTable initLoadTable);

	public void setUNRefreshDicTB(String codeId);

	public List<CodeInfo> queryCodeInfo(InitLoadTable initLoadTable, String bhField, String mcField, QueryFilter filter);

	public List<Map<String, Object>> queryCodeInfo(InitLoadTable initLoadTable, String bhField, String mcField);

}
