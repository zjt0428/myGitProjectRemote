/**
 *====================================================
 * 文件名称: PurchasePlanService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016-12-6			liupj(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.PurchasePlan;
import com.knight.emms.model.PurchasePlanInquiry;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: PurchasePlanService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author liupj
 * @date 2016-12-6 
 */
public interface PurchasePlanService extends BusinessLongPKService<PurchasePlan>{
	public void saveOrMergeForEdit(PurchasePlan purchasePlan);
	public PurchasePlan getTranslateFull(Long purchasePlanId);
	public List<PurchasePlanInquiry> queryInquiryAll(QueryFilter filter);
	public void deletedInquiry(Long PlanId);

}
