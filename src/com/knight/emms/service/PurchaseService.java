/**
 *====================================================
 * 文件名称: PurchaseService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.Purchase;
import com.knight.emms.model.PurchaseAcceptance;
import com.knight.emms.model.PurchaseBrief;

/**
 * @ClassName: PurchaseService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 下午11:02:03
 */
public interface PurchaseService extends BusinessFlowService<Purchase>, ExportService {

	public Purchase getTranslateFull(Long purchaseId);

	public void deletedBrief(Long purchaseBriefId);

	public void acceptance(PurchaseAcceptance purchaseAcceptance, String acc);

	public List<PurchaseBrief> queryBriefAll(QueryFilter filter);
	
	public Purchase onekeyApprove(Purchase p);

}
