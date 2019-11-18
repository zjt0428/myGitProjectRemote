/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BigDecimalUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-5-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.math.BigDecimal;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;

/**
 * @ClassName:BigDecimalUtil
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:54:04
 * @since JDK Version 1.5
 */
@Slf4j
public class BigDecimalUtil {

	/** 段内位置[0~4]表示取 1~3 位 */
	private static char[] hunit = { '拾', '佰', '仟' };

	/** 段名表示 */
	private static char[] vunit = { '万', '亿' };

	/** 数字表示 */
	private static char[] digit = { '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' };

	private static BigDecimal MAX_AMOUNT = new BigDecimal(999999999999.99).setScale(2, BigDecimal.ROUND_HALF_EVEN);

	/**
	 * 格式化BigDecimal
	 * @param bigDecimalStr
	 * @return
	 * @author:chenxy
	 */
	public static BigDecimal parserBigDecimal(String bigDecimalStr) {
		if (StringUtils.isBlank(bigDecimalStr) || "".equals(bigDecimalStr)) {
			return BigDecimal.ZERO;
		}
		try {
			Double.parseDouble(bigDecimalStr);
			return new BigDecimal(bigDecimalStr);
		} catch (NumberFormatException e) {
			log.error("", e);
			return BigDecimal.ZERO;
		}
	}

	/**
	 * 转换大写金额,最大金额为999999999999.99
	 * @param bigDecimal
	 * @return
	 */
	public static String parserDigAmount(BigDecimal bigDecimal) {
		BigDecimal decimal = bigDecimal.setScale(2, BigDecimal.ROUND_HALF_EVEN);
		if (decimal.compareTo(MAX_AMOUNT) == 1) {
			return bigDecimal.toString();
		}
		decimal = decimal.multiply(new BigDecimal(100));
		long amount = decimal.longValue(); // 四舍五入整型金额
		String val = String.valueOf(amount);
		String head = val.substring(0, val.length() - 2); // 整数部分
		String rail = val.substring(val.length() - 2); // 小数部分

		String prefix = ""; // 整数部分转化的结果
		String suffix = ""; // 小数部分转化的结果

		/* 处理小数部分 */
		if (rail.equals("00")) { // 小数部分为0
			suffix = "整";
		} else { // 转化角分
			suffix = digit[rail.charAt(0) - '0'] + "角" + digit[rail.charAt(1) - '0'] + "分";
		}
		/* 处理整数部分 */
		char[] chDig = head.toCharArray(); // 整数字符数组
		char zero = '0'; // 标志'0'表示出现过0
		byte zeroSerNum = 0; // 连续出现0的次数
		for (int i = 0; i < chDig.length; i++) { // 循环处理每个数字
			int idx = (chDig.length - i - 1) % 4; // 取段内位置[0~4]
			int vidx = (chDig.length - i - 1) / 4; // 取段位置[0~2]-段名
			if (chDig[i] == '0') {

				zeroSerNum++;
				if (idx == 0 && vidx > 0 && zeroSerNum < 4) {
					prefix += vunit[vidx - 1];
					zero = '0';
				}
				 else if (zero == '0') {
						zero = digit[0];
					}
				continue;
			}
			zeroSerNum = 0;
			if (zero != '0') {
				prefix += zero;
				zero = '0';
			}
			prefix += digit[chDig[i] - '0'];
			if (idx > 0) {
				prefix += hunit[idx - 1];
			}
			if (idx == 0 && vidx > 0) {
				prefix += vunit[vidx - 1];
			}
		}
		if (prefix.length() > 0) {
			prefix += '圆';
		}
		return prefix + suffix;
	}

	public static void main(String[] args) {
		System.out.println(parserDigAmount(new BigDecimal(999999999999.999)));
	}

}
