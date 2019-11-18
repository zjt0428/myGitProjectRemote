/**
 *====================================================
 * 文件名称: InspectManageService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月31日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.app.core.service.RemindModuleService;
import com.knight.emms.model.InspectManage;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: InspectManageService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月31日 下午9:15:17
 */
public interface InspectManageService extends RemindModuleService<InspectManage> {
	public void saveOrMergeForEdit(InspectManage inspectManage);
}
