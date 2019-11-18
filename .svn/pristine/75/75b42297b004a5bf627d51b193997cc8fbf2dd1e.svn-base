/**
 *====================================================
 * 文件名称: ComponentService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.Component;
import com.knight.emms.model.ComponentHold;

/**
 * @ClassName: ComponentService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午2:29:55
 */
public interface ComponentService extends BaseBusinessModelService<Component>, ExportService {

	public void saveCreate(Component component);

	public void saveUpload(List<Component> componentList);

	public void removeBindingEquipment(Long componId);
	
	public void savecomponentHold(ComponentHold componentHold);

	public void fix();

}
