/**
 * 版权所有：山东浪潮齐鲁软件产业股份有限公司
 * Copyright 2011 Shandong Inspur software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: OracleDialect.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-4-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.plugin.dialect;


/**
 * @ClassName: OracleDialect
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-4-9 下午4:26:32
 */
public class OracleDialect extends Dialect {

	public String getLimitString(String sql, int offset, int limit) {
		sql = sql.trim();
		StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);
		pagingSelect.append("select * from ( select row_.*, rownum rownum_ from ( ");
		pagingSelect.append(sql);
		pagingSelect.append(" ) row_ ) where rownum_ >= ").append(offset).append(" and rownum_ < ").append(offset + limit);
		return pagingSelect.toString();
	}

	public String getCountString(String sql) {
		sql = sql.trim().toLowerCase();
		StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);
		pagingSelect.append("select count(*) from").append(sql.substring(sql.lastIndexOf("from")+ 4));
		return pagingSelect.toString();
	}
}
