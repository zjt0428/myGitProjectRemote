/**
 *====================================================
 * 文件名称: BusinessFlowService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-11			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.service;

import com.knight.emms.core.ApplyforState;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.FormReview;

/**
 * @ClassName: BusinessFlowService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-11 上午7:53:08
 */
public interface BusinessFlowService<T extends ApplyforState> extends BaseBusinessModelService<T> {

	/**
	 * 更新申请信息
	 * @param t
	 */
	public T editLoad(T t);

	/**
	 * 保存更新申请信息
	 * @param t
	 */
	public void saveOrMergeForEdit(T t);

	/**
	 * 受理通过
	 * @param formApprove
	 */
	public void passAcceptApplication(FormAccept formAccept);

	/**
	 * 受理不通过
	 * @param formAccept
	 */
	public void rejectAcceptApplication(FormAccept formAccept);

	/**
	 * 审批通过
	 * @param formApprove
	 */
	public void passApproveApplication(FormApprove formApprove);

	/**
	 * 审批不通过
	 * @param formApprove
	 */
	public void rejectApproveApplication(FormApprove formApprove);
	
	/**
	 * 评审通过
	 * @param formApprove
	 */
	public void passReviewApplication(FormReview formReview);
	
	/**
	 * 评审不通过
	 * @param formApprove
	 */
	public void rejectReviewApplication(FormReview formReview);

}
