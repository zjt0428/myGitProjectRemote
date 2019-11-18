/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: RandomUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-3-15			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.util.Random;

/**
 * 随机数工具类
 * @ClassName:RandomUtil
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:55:09
 * @since JDK Version 1.5
 */
public class RandomUtil {

	private static final String allChar = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	private static final String letterChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	private static final String numberChar = "0123456789";

	private static final String maxAllChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	private static final String maxLetterChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	private static final String minAllChar = "0123456789abcdefghijklmnopqrstuvwxyz";

	private static final String minLetterChar = "abcdefghijklmnopqrstuvwxyz";

	/** 返回个定长随机串(只包含大小写字母、数字) */
	public static String generateString(int length) {
		StringBuffer sb = new StringBuffer("");

		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < length; i++) {
			sb.append(allChar.charAt(random.nextInt(allChar.length())));
		}
		return sb.toString();
	}

	/**
	 * 返回个定长随机纯字母串(只包含大小写字母)
	 * @param length 随机串长度 @ 随机串
	 */
	public static String generateMixString(int length) {
		StringBuffer sb = new StringBuffer("");
		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < length; i++) {
			sb.append(letterChar.charAt(random.nextInt(letterChar.length())));
		}
		return sb.toString();
	}

	/**
	 * 返回个定长随机纯大写字母串(只包含大写字母)
	 * @param length 随机串长度 @ 随机串
	 */
	public static String generateHeightenString(int length) {
		StringBuffer sb = new StringBuffer("");
		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < length; i++) {
			sb.append(maxLetterChar.charAt(random.nextInt(maxLetterChar.length())));
		}
		return sb.toString();
	}

	/**
	 * 返回个定长随机纯大写字母串(只包含小写字母)
	 * @param length 随机串长度 @ 随机串
	 */
	public static String generateLowerString(int length) {
		StringBuffer sb = new StringBuffer("");
		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < length; i++) {
			sb.append(minLetterChar.charAt(random.nextInt(minLetterChar.length())));
		}
		return sb.toString();
	}

	/**
	 * 返回个定长随机纯大写字母串(只包含小写字母)
	 * @param length 随机串长度 @ 随机串
	 */
	public static String generateNumberString(int length) {
		StringBuffer sb = new StringBuffer("");
		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < length; i++) {
			sb.append(numberChar.charAt(random.nextInt(numberChar.length())));
		}
		return sb.toString();
	}

	/**
	 * 返回个定长随机纯大写字母串(只包含大写字母&数字)
	 * @param length 随机串长度 @ 随机串
	 */
	public static String generateHeightenAllString(int length) {
		StringBuffer sb = new StringBuffer("");
		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < length; i++) {
			sb.append(maxAllChar.charAt(random.nextInt(maxAllChar.length())));
		}
		return sb.toString();
	}

	/**
	 * 返回个定长随机纯大写字母串(只包含小写字母&数字)
	 * @param length 随机串长度 @ 随机串
	 */
	public static String generateLowerSAlltring(int length) {
		StringBuffer sb = new StringBuffer("");
		Random random = new Random(System.currentTimeMillis());
		for (int i = 0; i < length; i++) {
			sb.append(minAllChar.charAt(random.nextInt(minAllChar.length())));
		}
		return sb.toString();
	}

}
