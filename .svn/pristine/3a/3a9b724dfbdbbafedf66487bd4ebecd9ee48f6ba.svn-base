/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: StringSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.support;

import java.security.MessageDigest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.codec.binary.Base64;

/**
 * @ClassName:StringSupport
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:53:51
 * @since JDK Version 1.5
 */
@Slf4j
public class StringSupport {

	public static String convertQuot(String orgStr) {
		return orgStr.replace("'", "\\'").replace("\"", "\\\"");
	}

	public static synchronized String encryptSha256(String inputStr) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			byte[] digest = md.digest(inputStr.getBytes("UTF-8"));
			return new String(Base64.encodeBase64(digest));
		} catch (Exception e) {
			log.error("SHA-256加密异常:", e);
		}
		return null;
	}

	public static synchronized String encryptMD5(String inputStr) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] digest = md.digest(inputStr.getBytes("UTF-8"));
			return new String(Base64.encodeBase64(digest));
		} catch (Exception e) {
			log.error("MD5加密异常:", e);
		}
		return null;
	}

	public static String htmlEntityToString(String dataStr) {
		int start = 0;
		int end = 0;
		StringBuffer buffer = new StringBuffer();
		while (start > -1) {
			int system = 10;
			if (start == 0) {
				int t = dataStr.indexOf("&#");
				if (start != t)
					start = t;
			}
			end = dataStr.indexOf(";", start + 2);
			String charStr = "";
			if (end != -1) {
				charStr = dataStr.substring(start + 2, end);

				char s = charStr.charAt(0);
				if ((s == 'x') || (s == 'X')) {
					system = 16;
					charStr = charStr.substring(1);
				}
			}
			try {
				char letter = (char) Integer.parseInt(charStr, system);
				buffer.append(new Character(letter).toString());
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}

			start = dataStr.indexOf("&#", end);
			if (start - end > 1) {
				buffer.append(dataStr.substring(end + 1, start));
			}

			if (start == -1) {
				int length = dataStr.length();
				if (end + 1 != length) {
					buffer.append(dataStr.substring(end + 1, length));
				}
			}
		}
		return buffer.toString();
	}

	public static String stringToHtmlEntity(String str) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < str.length(); ++i) {
			char c = str.charAt(i);

			switch (c) {
			case '\n':
				sb.append(c);
				break;
			case '<':
				sb.append("&lt;");
				break;
			case '>':
				sb.append("&gt;");
				break;
			case '&':
				sb.append("&amp;");
				break;
			case '\'':
				sb.append("&apos;");
				break;
			case '"':
				sb.append("&quot;");
				break;
			default:
				if ((c < ' ') || (c > '~')) {
					sb.append("&#x");
					sb.append(Integer.toString(c, 16));
					sb.append(';');
				} else {
					sb.append(c);
				}
			}
		}
		return sb.toString();
	}

	public static String stringToUnicode(String s) {
		String unicode = "";
		char[] charAry = new char[s.length()];
		for (int i = 0; i < charAry.length; ++i) {
			charAry[i] = s.charAt(i);
			unicode = unicode + "\\u" + Integer.toString(charAry[i], 16);
		}
		return unicode;
	}

	public static String unicodeToString(String unicodeStr) {
		StringBuffer sb = new StringBuffer();
		String[] str = unicodeStr.toUpperCase().split("\\\\U");
		for (int i = 0; i < str.length; ++i)
			if (!(str[i].equals(""))) {
				char c = (char) Integer.parseInt(str[i].trim(), 16);
				sb.append(c);
			}
		return sb.toString();
	}

	public static String html2Text(String inputString) {
		String htmlStr = inputString;
		String textStr = "";
		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>";

			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>";

			String regEx_html = "<[^>]+>";

			Pattern p_script = Pattern.compile(regEx_script, 2);
			Matcher m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll("");

			Pattern p_style = Pattern.compile(regEx_style, 2);
			Matcher m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll("");

			Pattern p_html = Pattern.compile(regEx_html, 2);
			Matcher m_html = p_html.matcher(htmlStr);
			htmlStr = m_html.replaceAll("");

			textStr = htmlStr;
		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}
		return textStr;
	}

	public static void main(String[] args) {
		String vm = "risit654321";
		System.out.println(encryptMD5(vm));
	}

}
