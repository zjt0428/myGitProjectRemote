/**
 *====================================================
 * 文件名称: RentContractService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月11日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.RentContract;

/**
 * @ClassName: RentContractService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月11日 下午11:14:55
 */
public interface RentContractService extends BaseBusinessModelService<RentContract> {

	public RentContract getTranslateAll(Long rentId);

	public void saveOrMergeEdit(RentContract rentContract);

	public void deleteEquipBrief(Long rentEquipBriefId);

	public void deleteComponBrief(Long rentComponBriefId);

	public void deleteItemBrief(Long rentItemBriefId);

	public void deleteDeductBrief(Long rentDeductBriefId);

	public void effective(RentContract rentContract);

	public void loseEffective(RentContract rentContract);

}
