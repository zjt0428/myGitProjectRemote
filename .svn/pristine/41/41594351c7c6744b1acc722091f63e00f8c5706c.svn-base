/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BeanUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.Iterator;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.DynaBean;
import org.apache.commons.beanutils.DynaProperty;

/**
 * @ClassName:BeanUtil
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-29 下午5:29:57
 * @since JDK Version 1.5
 */
@Slf4j
public class BeanUtil {

	public static void copyNotNullProperties(Object dest, Object orig) throws IllegalAccessException, InvocationTargetException {
		BeanUtilsBean beanUtils = BeanUtilsBean.getInstance();
		if (dest == null) {
			throw new IllegalArgumentException("No destination bean specified");
		}
		if (orig == null) {
			throw new IllegalArgumentException("No origin bean specified");
		}
		log.debug("BeanUtils.copyProperties(" + dest + ", " + orig + ")");
		if (orig instanceof DynaBean) {
			DynaProperty[] origDescriptors = ((DynaBean) orig).getDynaClass().getDynaProperties();
			for (int i = 0; i < origDescriptors.length; i++) {
				String name = origDescriptors[i].getName();
				if ((!(beanUtils.getPropertyUtils().isReadable(orig, name))) || (!(beanUtils.getPropertyUtils().isWriteable(dest, name)))) {
					continue;
				}
				Object value = ((DynaBean) orig).get(name);
				beanUtils.copyProperty(dest, name, value);
			}
		} else if (orig instanceof Map<?, ?>) {
			Iterator<?> entries = ((Map<?, ?>) orig).entrySet().iterator();
			while (entries.hasNext()) {
				Map.Entry<?, ?> entry = (Map.Entry<?, ?>) entries.next();
				String name = (String) entry.getKey();
				if (beanUtils.getPropertyUtils().isWriteable(dest, name))
					beanUtils.copyProperty(dest, name, entry.getValue());
			}
		} else {
			PropertyDescriptor[] origDescriptors = beanUtils.getPropertyUtils().getPropertyDescriptors(orig);
			for (int i = 0; i < origDescriptors.length; i++) {
				String name = origDescriptors[i].getName();
				if ("class".equals(name)) {
					continue;
				}
				if ((!(beanUtils.getPropertyUtils().isReadable(orig, name))) || (!(beanUtils.getPropertyUtils().isWriteable(dest, name))))
					continue;
				try {
					Object value = beanUtils.getPropertyUtils().getSimpleProperty(orig, name);
					if (value != null) {
						beanUtils.copyProperty(dest, name, value);
					}
				} catch (NoSuchMethodException e) {
					log.error("BeanUtil.copyProperties(" + dest + ", " + orig + ") NoSuchMethodException:", e);
				}
			}
		}
	}

}
