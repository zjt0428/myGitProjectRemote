/**
 *====================================================
 * 文件名称: AmountReceiveService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.AmountReceive;

/**
 * @ClassName: AmountReceiveService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:22:35
 */
public interface AmountReceiveService extends BusinessFlowService<AmountReceive> {

	public void deleteShare(Long receiveShareId);

	public AmountReceive getTranslateFull(Long amountReceiveId);
	
	/**判断结算单是否在关账期间*/
	public void isCloseSettle(AmountReceive amountReceive);

}
