/**
 *====================================================
 * 文件名称: PickupService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Map;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.Pickup;
import com.knight.emms.model.PickupComponent;

/**
 * @ClassName: PickupService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 上午8:35:06
 */
public interface PickupService extends BusinessFlowService<Pickup>, ExportService {

	public Pickup getTranslateFull(Long pickupId);

	public void deletedComponent(Long pickupComponId);

	public void returnPickup(Long pickupId, Map<Long, PickupComponent> pickupComponents);

}
