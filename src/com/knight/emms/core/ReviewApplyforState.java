/**
 *====================================================
 * 文件名称: ApplyforState.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-11			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core;

/**
 * @ClassName: ApplyforState
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-11 上午7:00:20
 */
public abstract class ReviewApplyforState extends ApplyforState {

	protected static final long serialVersionUID = 1L;

	public abstract Long getRelateId();

	public abstract String getRelateModule();

}
