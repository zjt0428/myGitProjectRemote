/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: UUIDGenerator.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.util.UUID;

import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName:UUIDGenerator
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:55:34
 * @since JDK Version 1.5
 */
@Slf4j
public class UUIDGenerator {

	public static String getUUID() {
		String s = UUID.randomUUID().toString();

		return s.substring(0, 8) + s.substring(9, 13) + s.substring(14, 18) + s.substring(19, 23) + s.substring(24);
	}

	public static String[] getUUID(int number) {
		if (number < 1) {
			return null;
		}
		String[] ss = new String[number];
		for (int i = 0; i < number; ++i) {
			ss[i] = getUUID();
		}
		return ss;
	}

	public static void main(String[] args) {
		String[] vars = UUID.randomUUID().toString().split("-");
		for (int i = 0; i < vars.length; ++i) {
			log.debug("ok:" + vars[i]);
			long var = Long.valueOf(vars[i], 16).longValue();
			log.debug("ok:===" + var);
		}
	}

}
