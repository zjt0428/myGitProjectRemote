/**
 *====================================================
 * 文件名称: ISmsSchedularDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-12-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.sms;

/**
 * @ClassName: ISmsSchedularDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-12-3 下午4:18:22
 */
public interface SchedularSmsDomain {

	public void sendsmsBusinessMessage();
	
	public void oneRemainsendsmsBusinessMessage();
	
	public void twoRemainsendsmsBusinessMessage();
	
	public void thrRemainsendsmsBusinessMessage();

}
