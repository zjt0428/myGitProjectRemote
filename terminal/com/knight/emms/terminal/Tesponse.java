/**
 *====================================================
 * 文件名称: Response.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月22日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal;

import lombok.Data;

/**
 * @ClassName: Response
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年10月22日 下午5:12:14
 */
@Data
public class Tesponse {

	@Data
	public static class Info {

		private Object result;

	}

	private boolean success;

	private String msg;

	private Info info;

	public Tesponse() {
		this.info = new Info();
	}

	public Tesponse(boolean success) {
		this.success = success;
		this.info = new Info();
	}

}
