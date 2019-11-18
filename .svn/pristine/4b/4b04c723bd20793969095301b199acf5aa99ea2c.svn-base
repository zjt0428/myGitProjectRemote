/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: GetCh2Spell.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import org.apache.commons.lang.StringUtils;

/**
 * 
 * @ClassName:GetCh2Spell
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-1 下午12:50:40
 * @since JDK Version 1.5
 */
public class GetCh2Spell {

	public static int compare(String str1, String str2) {
		int result = 0;
		String m_s1 = null;
		String m_s2 = null;
		try {
			m_s1 = new String(str1.getBytes(_FromEncode_), _ToEncode_);
			m_s2 = new String(str2.getBytes(_FromEncode_), _ToEncode_);
		} catch (Exception e) {
			return str1.compareTo(str2);
		}
		result = chineseCompareTo(m_s1, m_s2);
		return result;
	}

	public static int getCharCode(String s) {
		if (s == null && "".equals(s))
			return -1;
		byte b[] = s.getBytes();
		int value = 0;
		for (int i = 0; i < b.length && i <= 2; i++)
			value = value * 100 + b[i];

		return value;
	}

	public static int chineseCompareTo(String s1, String s2) {
		int len1 = s1.length();
		int len2 = s2.length();
		int n = Math.min(len1, len2);
		for (int i = 0; i < n; i++) {
			int s1_code = getCharCode(s1.charAt(i) + "");
			int s2_code = getCharCode(s2.charAt(i) + "");
			if (s1_code * s2_code < 0)
				return Math.min(s1_code, s2_code);
			if (s1_code != s2_code)
				return s1_code - s2_code;
		}

		return len1 - len2;
	}

	public static String getBeginCharacter(String res) {
		if (StringUtils.isBlank(res)) {
			return "";
		}
		String a = res;
		String result = "";
		for (int i = 0; i < a.length(); i++) {
			String current = a.substring(i, i + 1);
			if (compare(current, "\u554A") < 0)
				result = result + current;
			else if (compare(current, "\u554A") >= 0 && compare(current, "\u5EA7") <= 0)
				if (compare(current, "\u531D") >= 0)
					result = result + "z";
				else if (compare(current, "\u538B") >= 0)
					result = result + "y";
				else if (compare(current, "\u6614") >= 0)
					result = result + "x";
				else if (compare(current, "\u6316") >= 0)
					result = result + "w";
				else if (compare(current, "\u584C") >= 0)
					result = result + "t";
				else if (compare(current, "\u6492") >= 0)
					result = result + "s";
				else if (compare(current, "\u7136") >= 0)
					result = result + "r";
				else if (compare(current, "\u671F") >= 0)
					result = result + "q";
				else if (compare(current, "\u556A") >= 0)
					result = result + "p";
				else if (compare(current, "\u54E6") >= 0)
					result = result + "o";
				else if (compare(current, "\u62FF") >= 0)
					result = result + "n";
				else if (compare(current, "\u5988") >= 0)
					result = result + "m";
				else if (compare(current, "\u5783") >= 0)
					result = result + "l";
				else if (compare(current, "\u5580") >= 0)
					result = result + "k";
				else if (compare(current, "\u51FB") > 0)
					result = result + "j";
				else if (compare(current, "\u54C8") >= 0)
					result = result + "h";
				else if (compare(current, "\u5676") >= 0)
					result = result + "g";
				else if (compare(current, "\u53D1") >= 0)
					result = result + "f";
				else if (compare(current, "\u86FE") >= 0)
					result = result + "e";
				else if (compare(current, "\u642D") >= 0)
					result = result + "d";
				else if (compare(current, "\u64E6") >= 0)
					result = result + "c";
				else if (compare(current, "\u82AD") >= 0)
					result = result + "b";
				else if (compare(current, "\u554A") >= 0)
					result = result + "a";
		}

		return result;
	}

	public static String getFirstStr(String str) {
		char a = str.charAt(0);
		char aa[] = { a };
		String sss = new String(aa);
		if (Character.isDigit(aa[0]))
			sss = "data";
		else if (a >= 'a' && a <= 'z' || a >= 'A' && a <= 'Z')
			sss = "character";
		else
			sss = getBeginCharacter(sss);
		return sss;
	}

	private static String _FromEncode_ = "GBK";

	private static String _ToEncode_ = "GBK";

}
