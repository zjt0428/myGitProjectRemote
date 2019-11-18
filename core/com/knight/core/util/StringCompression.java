/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: StringCompression.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: StringCompression
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-25 上午9:56:53
 */
@Slf4j
public class StringCompression {

	public static String compress(String str) {
		try {
			if (str == null || str.length() == 0) {
				return str;
			}
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			GZIPOutputStream gzip = new GZIPOutputStream(out);
			gzip.write(str.getBytes());
			gzip.close();
			return out.toString("UTF-8");
		} catch (Exception e) {
			log.error("", e);
			return str;
		}
	}

	public static String uncompress(String str) {
		try {
			if (str == null || str.length() == 0) {
				return str;
			}
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			ByteArrayInputStream in = new ByteArrayInputStream(str.getBytes("UTF-8"));
			GZIPInputStream gunzip = new GZIPInputStream(in);
			byte[] buffer = new byte[256];
			int n;
			while ((n = gunzip.read(buffer)) >= 0) {
				out.write(buffer, 0, n);
			}
			return out.toString();
		} catch (Exception e) {
			log.error("", e);
			return str;
		}
	}

}
