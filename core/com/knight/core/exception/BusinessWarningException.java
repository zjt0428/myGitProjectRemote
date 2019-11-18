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
public class BusinessWarningException extends BaseException {

	private static final long serialVersionUID = 1L;

	public BusinessWarningException() {
		super();
	}

	public BusinessWarningException(String message) {
		super(message);
	}

	public BusinessWarningException(String message, Throwable cause) {
		super(message, cause);
	}

	public BusinessWarningException(Throwable cause) {
		super(cause);
	}

	public BusinessWarningException(String messageCode, String message) {
		super(messageCode, message);
		setMessageCode(messageCode);
	}

	public BusinessWarningException(String messageCode, String message, Throwable cause) {
		super(messageCode, message, cause);
		setMessageCode(messageCode);
	}

}
