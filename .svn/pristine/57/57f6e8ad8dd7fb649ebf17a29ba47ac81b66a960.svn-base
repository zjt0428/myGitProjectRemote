/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BusinessException.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.exception;

/**
 * @ClassName:BusinessException
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-9 上午9:17:20
 * @since JDK Version 1.5
 */
public class BusinessException extends BaseException {

	private static final long serialVersionUID = 1L;

	private static final String prefixStr = "抱歉，";

	private static final String suffixStr = " 请稍后再试或与管理员联系！";

	public BusinessException() {
		super();
	}

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}

	public BusinessException(String messageCode, String message) {
		super(messageCode, message);
		setMessageCode(messageCode);
	}

	public BusinessException(String messageCode, String message, Throwable cause) {
		super(messageCode, message, cause);
		setMessageCode(messageCode);
	}

	public static String createFriendlyErrMsg(Throwable e) {
		StringBuffer friendlyErrMsg = new StringBuffer("");
		friendlyErrMsg.append(prefixStr);
		friendlyErrMsg.append("数据处理异常!");
		friendlyErrMsg.append(suffixStr);
		return friendlyErrMsg.toString();
	}
}
