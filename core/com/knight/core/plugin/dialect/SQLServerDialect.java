/**
 * 版权所有：山东浪潮齐鲁软件产业股份有限公司
 * Copyright 2011 Shandong Inspur software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SQLServerDialect.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-4-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.plugin.dialect;

import java.util.Date;
import java.util.GregorianCalendar;

/**
 * @ClassName: SQLServerDialect
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-4-9 下午4:37:17
 */
public class SQLServerDialect extends Dialect {

	public static final Date MAX_DATE = new GregorianCalendar(2079, 5, 6, 0, 0, 0).getTime();

	public static final String MAX_LINK_DATE = "9999-12-31";

	private static final String SELECT = "SELECT ";

	private static final String FROM = "FROM ";

	private static final String ORDERBY = "ORDER BY";

	private static int getFromIndex(StringBuilder sql, int beginIndex, int endIndex) {
		int tempBeginIndex = sql.indexOf(SELECT, beginIndex + 1);
		if (tempBeginIndex == -1) {
			return endIndex;
		}
		if (tempBeginIndex > endIndex) {
			return endIndex;
		}
		int tempEndIndex = sql.indexOf(FROM, endIndex + 1);
		return getFromIndex(sql, tempBeginIndex, tempEndIndex);
	}

	public String getLimitString(String sql, int offset, int limit) {
		StringBuilder sb = new StringBuilder(sql.trim().toUpperCase());
		int formEndIndex = sb.indexOf(FROM, 0);
		formEndIndex = getFromIndex(sb, 0, formEndIndex);

		int orderWhereIndex = sb.lastIndexOf("WHERE ");
		int orderEndIndex = sb.lastIndexOf("ORDER BY");
		CharSequence orderby = "ORDER BY CURRENT_TIMESTAMP";
		if (orderEndIndex > 0 && orderEndIndex > orderWhereIndex) {
			orderby = sb.subSequence(orderEndIndex, sb.length());
		}
		sb.insert(formEndIndex - 1, ", ROW_NUMBER() OVER (" + orderby + ") AS _ROWNUM ");
		sb.insert(0, "WITH QUERY AS (").append(") SELECT * FROM QUERY WHERE _ROWNUM >= ").append(offset).append(" AND _ROWNUM < ").append(offset + limit);
		return sb.toString();
	}

	public String getCountString(String sql) {
		StringBuilder sb = new StringBuilder(sql.trim().toUpperCase());
		int formEndIndex = sb.indexOf(FROM, 0);
		formEndIndex = getFromIndex(sb, 0, formEndIndex);
		StringBuffer pagingSelect = new StringBuffer(sb.length());
		int lastOrderByIndex = sb.lastIndexOf(ORDERBY);
		if (lastOrderByIndex == -1) {
			lastOrderByIndex = sb.length();
		}
		pagingSelect.append("SELECT COUNT(*) FROM").append(sb.substring(formEndIndex + 4, lastOrderByIndex));
		return pagingSelect.toString();
	}

	public static void main(String[] args) {
		SQLServerDialect dialect = new SQLServerDialect();
		String sql = "SELECT D.DEMAND_ID, I.ITEM_NAME, (SELECT P.ITEM_NAME FROM T_VERIFY_ITEM P WHERE I.ITEM_PARENT = P.ITEM_ID) PARENT_ITEM_NAME, D.DEMAND_DES FROM T_VERIFY_ITEM_DEMAND D, T_VERIFY_ITEM I WHERE D.ITEM_ID = I.ITEM_ID AND I.DELFLAG = '1' ORDER BY I.ITEM_ID";
		System.out.println(dialect.getLimitString(sql, 0, 25));
	}

}
