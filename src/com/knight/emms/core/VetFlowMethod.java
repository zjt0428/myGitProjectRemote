/**
 *====================================================
 * 文件名称: VetFlowMethod.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core;

/**
 * @ClassName: VetFlowMethod
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-20 下午3:48:58
 */
public interface VetFlowMethod {

	public Object getVetFlow();

	public String getOpinion();

	public void setOpinion(String opinion);

	public String getVetRemark();

	public void setVetRemark(String remark);

	public boolean isVetWarning();

}
