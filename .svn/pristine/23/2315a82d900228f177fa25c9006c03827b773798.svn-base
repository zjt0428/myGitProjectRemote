/**
 *====================================================
 * 文件名称: DispatchService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.DispatchPracti;

/**
 * @ClassName: DispatchService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:28:08
 */
public interface DispatchService extends BusinessFlowService<Dispatch>, ExportService {

	public Dispatch getTranslateFull(Long dispatchId);

	public void deletedEquip(Long dispatchEquipId);

	public void deletedCompon(Long dispatchComponId);

	public void deletedPracti(Long dispatchPractiId);

	public void deletedAutocrane(Long dispatchAutocraneId);

	public void submitDispatch(Long dispatchId);

	public List<DispatchPracti> queryPractiTranslateAll(QueryFilter filter);

	public List<DispatchCompon> queryComponTranslateAll(QueryFilter filter);

	public List<DispatchEquip> queryEquipTranslateAll(QueryFilter filter);

	public void saveCreate(Dispatch dispatch);

	public void saveUpload(List<Dispatch> dispatchList);

	public void deletedAllocate(Long allocateId);

	public DispatchEquip getDispatchEquipment(Long dispatchEquipId);
	
	public void loseEffective(Dispatch dispatch);
	
	public void deleteChange(Dispatch dispatch);
}
