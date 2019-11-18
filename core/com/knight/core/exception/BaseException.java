/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseException.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.exception;

/**
 * @ClassName:BaseException
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-9 上午9:40:08
 * @since JDK Version 1.5
 */
public class BaseException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private String messageCode;

	public String getMessageCode() {
		return messageCode;
	}

	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}

	public BaseException() {
		super();
	}

	public BaseException(String message) {
		super(message);
	}

	public BaseException(String message, Throwable cause) {
		super(message, cause);
	}

	public BaseException(Throwable cause) {
		super(cause);
	}

	public BaseException(String messageCode, String message) {
		super(message);
		setMessageCode(messageCode);

	}

	public BaseException(String messageCode, String message, Throwable cause) {
		super(message, cause);
		setMessageCode(messageCode);
	}

}
