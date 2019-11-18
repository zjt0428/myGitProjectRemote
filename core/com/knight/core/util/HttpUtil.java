/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: HttpUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-12-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @ClassName: HttpUtil
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-12-3 下午2:55:10
 */
public class HttpUtil {

	public static String post(String urlPost, String param, String method, String encoding) throws Exception {
		URL url = new URL(urlPost);
		HttpURLConnection http = (HttpURLConnection) url.openConnection();
		http.setDoOutput(true);
		http.setDoInput(true);
		http.setRequestMethod(method);
		http.setUseCaches(false);
		http.setConnectTimeout(10000);
		http.setReadTimeout(10000);
		http.setInstanceFollowRedirects(true);
		http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		http.connect();

		BufferedWriter out = new BufferedWriter(new OutputStreamWriter(http.getOutputStream(), encoding));
		out.write(param);
		out.flush();
		out.close();

		BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream(), encoding));
		String line = null;
		StringBuilder sb = new StringBuilder();
		while ((line = in.readLine()) != null) {
			sb.append(line);
		}
		in.close();
		http.disconnect();
		return sb.toString();
	}
}
