/**
 *====================================================
 * 文件名称: SmsAlignment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-12-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.sms;

import java.io.UnsupportedEncodingException;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: SmsAlignment
 * @Description: 短信队列
 * @author chenxy
 * @date 2013-12-3 下午7:54:00
 */
public class SmsAlignment {

	@Getter
	private StringBuffer content;

	@Getter
	private StringBuffer mobile;

	@Getter
	private String time;

	@Getter
	private int items = 0;

	@Getter
	@Setter
	private int replyCode = 1;

	public SmsAlignment() {
		content = new StringBuffer();
		mobile = new StringBuffer();
	}

	public SmsAlignment(String time) {
		content = new StringBuffer();
		mobile = new StringBuffer();
		this.time = time;
	}

	public String getAlignmentMessage() throws UnsupportedEncodingException {
		return this.content.toString();
	}

	public void push(String content, String mobile) {
		items++;
		if (items == 1) {
			this.content.append(content);
			this.mobile.append(mobile);
		} else {
			this.content.append("{|}").append(content);
			this.mobile.append(",").append(mobile);
		}
	}

	public void clear() {
		items = 0;
		this.content.setLength(0);
		this.mobile.setLength(0);
	}

}
