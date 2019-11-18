/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: StringUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.io.UnsupportedEncodingException;

import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName:StringUtil
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:55:29
 * @since JDK Version 1.5
 */
@Slf4j
public class StringUtil {

	/**
	 * 数字字符串转化为整数
	 * @param intStr String 待转化的数字字符串
	 * @param intDef int 当intStr为空或空字符串时返回的缺省值
	 * @return int 返回由数字字符串转化成的数字，当intStr为空或空字符串时，返回缺省值intDef
	 */
	public static int getInt(String intStr, int intDef) {
		if (null == intStr || "".equals(intStr.trim())) {
			return intDef;
		}
		int intRetu = intDef;
		Double db = new Double(intStr);
		intRetu = db.intValue();
		return intRetu;
	}

	/**
	 * 数字字符串转化为整数，在转化时发生异常，则返回0
	 * @param intStr String 待转化的数字字符串
	 * @return int 返回由数字字符串转化成的整数，当intStr为空或空字符串时，返回0
	 */
	public static int getInt(String intStr) {
		return getInt(intStr, 0);
	}

	/**
	 * 数字字符串转化为双精数字
	 * @param dbstr String 待转化的数字字符串
	 * @param dbDef double 当dbstr为空或空字符串时返回的缺省值
	 * @return double 返回由数字字符串转化成的数字，当dbstr为空或空字符串时，则返回缺省值dbDef
	 */
	public static double getDouble(String dbstr, double dbDef) {
		if (null == dbstr || "".equals(dbstr.trim())) {
			return dbDef;
		}
		double dbRetu = dbDef;
		Double db = new Double(dbstr);
		dbRetu = db.doubleValue();
		return dbRetu;
	}

	/**
	 * 数字字符串转化为双精数字，在转化时发生异常，则返回0
	 * @param dbstr String 待转化的数字字符串
	 * @return double 返回由数字字符串转化成的数字，当dbstr为空或空字符串时，则返回0。
	 */
	public static double getDouble(String dbstr) {
		return getDouble(dbstr, 0);
	}

	/**
	 * 数字字符串转化为长整型
	 * @param longstr String 待转化的数字字符串
	 * @param longDef long 当longstr为空或空字符串时返回的缺省值
	 * @return long 返回由数字字符串转化成的数字，当longstr为空或空字符串时，则返回缺省值longDef
	 */
	public static long getLong(String longstr, long longDef) {
		if (null == longstr || "".equals(longstr.trim())) {
			return longDef;
		}
		long longRetu = longDef;

		Double db = new Double(longstr);
		longRetu = db.longValue();

		return longRetu;
	}

	/**
	 * 数字字符串转化为长整型，在转化时发生异常，则返回0
	 * @param longstr String 待转化的数字字符串
	 * @return long 返回由数字字符串转化成的数字，当longstr为空或空字符串时，则返回0。
	 */
	public static long getLong(String longstr) {
		return getLong(longstr, 0);
	}

	/**
	 * 字符串转化为布尔型
	 * @param booleanstr String 待转化的字符串
	 * @param booleanDef boolean 当字符串为空或为null时返回的值
	 * @return boolean 返回转化化的布尔值，只有当booleanstr为字符串“true”(忽略大小写)时才返回true 如果在转化时发生异常（只有为null时），则返回缺省值booleanDef
	 */
	public static boolean getBoolean(String booleanstr, boolean booleanDef) {
		if (null == booleanstr) {
			return booleanDef;
		}
		boolean booleanRetu = booleanDef;
		if ("true".equalsIgnoreCase(booleanstr.trim())) {
			booleanRetu = true;
		}
		return booleanRetu;
	}

	/**
	 * 字符串转化为布尔型. 只有当booleanstr为字符串“true”(忽略大小写)时才返回true，其它都返回false, 包括booleanstr为null
	 * @param booleanstr String 待转化的字符串
	 * @return boolean 返回转化化的布尔值，
	 */
	public static boolean getBoolean(String booleanstr) {
		return getBoolean(booleanstr, false);
	}

	/**
	 * 将字符串转成unicode
	 * @param str 待转字符串
	 * @return unicode字符串
	 */
	public static String convertUnicodeStr(String str) {
		String result = null;
		str = (str == null ? "" : str);
		String tmp;
		StringBuffer sb = new StringBuffer("");
		char c;
		int i, j;
		sb.setLength(0);
		for (i = 0; i < str.length(); i++) {
			c = str.charAt(i);
			j = (c & 0xFF); // 取出低8位
			tmp = Integer.toHexString(j);
			if (tmp.length() == 1) {
				sb.append("0");
			}
			sb.append(tmp);
			j = (c >>> 8); // 取出高8位
			tmp = Integer.toHexString(j);
			if (tmp.length() == 1) {
				sb.append("0");
			}
			sb.append(tmp);
		}
		result = new String(sb).toUpperCase();
		// log.debug(result);
		return result;
	}

	/**
	 * 将unicode字符串
	 * @param str 待转字符串
	 * @return 普通字符串
	 */
	public static String revertUnicodeStr(String hexStr) {
		String result = null;
		hexStr = (hexStr == null ? "" : hexStr);
		StringBuffer sb = new StringBuffer("");
		for (int i = 0; i < hexStr.length() - 4;) {
			String strTemp = hexStr.substring(i + 2, i + 4) + hexStr.substring(i, i + 2);
			String value = strTemp.substring(0).toLowerCase();
			int c = 0;
			for (int j = 0; j < value.length(); j++) {
				char tempChar = value.charAt(j);
				int t = 0;
				switch (tempChar) {
				case 'a':
					t = 10;
					break;
				case 'b':
					t = 11;
					break;
				case 'c':
					t = 12;
					break;
				case 'd':
					t = 13;
					break;
				case 'e':
					t = 14;
					break;
				case 'f':
					t = 15;
					break;
				default:
					t = tempChar - 48;
					break;
				}
				c += t * ((int) Math.pow(16, (value.length() - j - 1)));
			}
			sb.append((char) c);
			i = i + 4;
		}
		result = sb.toString();
		log.debug(result);
		return result;
	}

	/**
	 * 字符串GBK编码按字节截取
	 * @param bytes 原字符串的GBK编码字节
	 * @param beginIndex 截取起始位置
	 * @param endIndex 截取结束位置
	 * @param charsetName 编码类型
	 * @return String
	 * @author:chenxy
	 */
	public static String interceptString(final byte[] bytes, final int beginIndex, final int endIndex, String charsetName) {
		int beginPos = beginIndex;
		int endPos = endIndex;
		if (beginPos < 0) {
			beginPos = 0;
		}
		if (beginPos > bytes.length) {
			return "";
		}
		if (endPos > bytes.length) {
			endPos = bytes.length;
		}
		if (beginPos >= endPos) {
			return "";
		}
		byte[] strBytes = new byte[endPos - beginPos];
		System.arraycopy(bytes, beginPos, strBytes, 0, endPos - beginPos);
		try {
			return new String(strBytes, charsetName);
		} catch (UnsupportedEncodingException e) {
			log.error("", e);
		}
		return null;
	}

	/**
	 * 字符串GBK编码按字节截取
	 * @param bytes 原字符串的GBK编码字节
	 * @param beginIndex 截取起始位置
	 * @param endIndex 截取结束位置
	 * @return String
	 * @author:chenxy
	 */
	public static String interceptStringGBK(final byte[] bytes, final int beginIndex, final int endIndex) {
		return interceptString(bytes, beginIndex, endIndex, "GBK");
	}

	public static String[] translateString(String s){
	 if(s==null){
		 return null;
	 }
	 String[] c = new String[1];
		if(s.contains(",")){
			c = s.split(",");
		}
		else
		c[0] =s;
		return c ; 
	}		
/* public static void main(String[] args) {
	 String[] f = translateString("122");
	 for (int i = 0; i < f.length; i++) {
		 System.out.println(f[i]);
	}
	
}*/
	
	
 }
