/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: KnightException.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-6-29			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.exception;

/**
 * 系统异常类统一
 * @ClassName:KnightException
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:51:22
 * @since JDK Version 1.5
 */
public class KnightException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public static final String DefaultException = "9999";

	private static int defaultLevel = 0;

	private String errCode;

	private String strErrorMessage;

	private int level;

	public String getErrCode() {
		return errCode;
	}

	public String getStrErrorMessage() {
		return strErrorMessage;
	}

	public int getLevel() {
		return level;
	}

	public KnightException(String errCode) {
		this(errCode, null, defaultLevel);
	}

	public KnightException(String errCode, String strErrorMessage) {
		this(errCode, strErrorMessage, defaultLevel);
	}

	public KnightException(String errCode, int level) {
		this(errCode, null, level);
	}

	public KnightException(String errCode, String strErrorMessage, int level) {
		super(strErrorMessage);
		if (errCode == null) {
			errCode = DefaultException;
		}
		this.errCode = errCode;
		this.strErrorMessage = strErrorMessage;
		this.level = level;
	}

	public KnightException(Throwable innerException) {
		this(null, null, defaultLevel, innerException);
	}

	public KnightException(String errCode, Throwable innerException) {
		this(errCode, null, defaultLevel, innerException);
	}

	public KnightException(String errCode, String strErrorMessage, Throwable innerException) {
		this(errCode, strErrorMessage, defaultLevel, innerException);
	}

	public KnightException(String errCode, String strErrorMessage, int level, Throwable innerException) {
		super(strErrorMessage, innerException);
		if (errCode == null) {
			errCode = DefaultException;
		}
		this.errCode = errCode;
		if (strErrorMessage == null) {
			strErrorMessage = innerException.getMessage();
		}
		this.strErrorMessage = strErrorMessage;
		this.level = level;
	}

}
