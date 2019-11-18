/**
 *====================================================
 * 文件名称: OpenApi.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-12-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.sms.api;

import java.net.URLEncoder;

import com.knight.system.application.ApplicationContainer;
import org.dom4j.Element;

import com.knight.core.util.HttpUtil;
import com.knight.core.util.XmlUtil;

/**
 * @ClassName: OpenApi
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-12-3 下午3:34:58
 */
public class OpenApi {

	private static String mOpenurl = "http://smsapi.c123.cn/OpenPlatform/OpenApi";

	/** 员工编号 */
	private static String mAccount = "";

	/** 企业编号 */
	private static String mEnterprise = "";

	/** 认证密钥 */
	private static String mAuthkey = "";

	/** 通道组编号 */
	private static int mCgid = 0;

	/** 签名编号 */
	private static int mCsid = 0;

	public static void initialzeAccount(String url, String account, String enterprise, String authkey, int cgid, int csid) {
		mOpenurl = url;
		mAccount = account;
		mEnterprise = enterprise;
		mAuthkey = authkey;
		mCgid = cgid;
		mCsid = csid;
	}

	private static int sendsms(String action, String mobile, String content, int cgid, int csid, String time) throws Exception {
		StringBuilder sb = new StringBuilder();
		sb.append("action=").append(action);
		sb.append("&ac=").append(mAccount).append("@").append(mEnterprise);
		sb.append("&authkey=").append(mAuthkey);
		sb.append("&m=").append(mobile);
		sb.append("&c=").append(URLEncoder.encode(content, "UTF-8"));
		if (cgid > 0 || mCgid > 0) {
			sb.append("&cgid=").append((cgid > 0) ? cgid : mCgid);
		}
		if (csid > 0 || mCsid > 0) {
			sb.append("&csid=").append((csid > 0) ? csid : mCsid);
		}
		if (time != null) {
			sb.append("&t=").append(time);
		}
		String resultxml = HttpUtil.post(mOpenurl, sb.toString(), "POST", "UTF-8");
		Element root = XmlUtil.getRootFromContent(resultxml);
		return Integer.parseInt(XmlUtil.getAttributeValue(root, "result", "-102"));
	}

	public static int sendOnce(String mobile, String content, int cgid, int csid, String time) throws Exception {
		return sendsms("sendOnce", mobile, content, cgid, csid, time);
	}

	public static int sendOnce(String mobile, String content) throws Exception {
		return sendsms("sendOnce", mobile, content, 0, 0, null);
	}

	public static int sendBatch(String mobile, String content, int cgid, int csid, String time) throws Exception {
		return sendsms("sendBatch", mobile, content, cgid, csid, time);
	}

	public static int sendBatch(String mobile, String content) throws Exception {
		return sendsms("sendBatch", mobile, content, 0, 0, null);
	}
}
