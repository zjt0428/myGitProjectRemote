/**
 * 版权所有：山东浪潮齐鲁软件产业股份有限公司
 * Copyright 2011 Shandong Inspur software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: Dialect.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-4-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.plugin.dialect;

/**
 * @ClassName: Dialect
 * @Description: 只支持标准的SQL（SELECT ~ FROM ~ WHERE ~ [ORDER BY ~]）语句
 * @author chenxy
 * @date 2012-4-9 下午4:25:51
 */
public abstract class Dialect {

	public static enum DialectType {

		ORACLE("org.hibernate.dialect.OracleDialect"), SQLSERVER("org.hibernate.dialect.SQLServerDialect");

		public final String dialect;

		private DialectType(String dialect) {
			this.dialect = dialect;
		}

		public String toString() {
			return this.dialect;
		}

		public static DialectType getDialectType(String dialect) {
			for (DialectType d : values()) {
				if (d.dialect.equals(dialect)) {
					return d;
				}
			}
			return null;
		}
	}

	public abstract String getLimitString(String sql, int offset, int limit);

	public abstract String getCountString(String sql);

}
