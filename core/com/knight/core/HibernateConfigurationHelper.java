/**
 *====================================================
 * 文件名称: HibernateConfigurationHelper.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月7日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core;

import java.util.Iterator;

import org.hibernate.cfg.Configuration;
import org.hibernate.impl.SessionFactoryImpl;
import org.hibernate.mapping.Column;
import org.hibernate.mapping.PersistentClass;
import org.hibernate.mapping.Property;
import org.springframework.orm.hibernate3.LocalSessionFactoryBean;

/**
 * @ClassName: HibernateConfigurationHelper
 * @Description: 根据实体类得到对应的表名、主键名、字段名工具类</br>注：po类名须与对应映射文件名一致，即Student.java与Student.hbm.xml
 * @author Administrator
 * @date 2014年5月7日 上午8:54:19
 */
public class HibernateConfigurationHelper {

	private static Configuration configuration ;

	public static Configuration getConfiguration(){
		LocalSessionFactoryBean factoryBean = (LocalSessionFactoryBean) ApplicationContextHelper.getBean("&sessionFactory");
		return factoryBean.getConfiguration();
	}

	private static PersistentClass getPersistentClass(Class<?> clazz) {
		return getConfiguration().getClassMapping(clazz.getName());
	}

	/**
	 * 功能描述：获取实体对应的表名
	 * @param clazz 实体类
	 * @return 表名
	 */
	public static String getTableName(Class<?> clazz) {
		return getConfiguration().getClassMapping(clazz.getName()).getTable().getName();
	}

	/**
	 * 功能描述：获取实体对应表的主键字段名称
	 * @param clazz 实体类
	 * @return 主键字段名称
	 */
	public static String getPkColumnName(Class<?> clazz) {
		return getPersistentClass(clazz).getTable().getPrimaryKey().getColumn(0).getName();

	}

	/**
	 * 功能描述：通过实体类和属性，获取实体类属性对应的表字段名称
	 * @param clazz 实体类
	 * @param propertyName 属性名称
	 * @return 字段名称
	 */
	public static String getColumnName(Class<?> clazz, String propertyName) {
		PersistentClass persistentClass = getPersistentClass(clazz);
		Property property = persistentClass.getProperty(propertyName);
		@SuppressWarnings("unchecked")
		Iterator<Column> it = property.getColumnIterator();
		if (it.hasNext()) {
			Column column = it.next();
			return column.getName();
		}
		return null;
	}

}
