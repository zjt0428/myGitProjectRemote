/**
 *====================================================
 * 文件名称: ConstructOperationService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月6日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.app.core.service.RemindModuleService;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.ConstructOperation;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: ConstructOperationService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月6日 上午11:17:01
 */
public interface ConstructOperationService extends BusinessFlowService<ConstructOperation>, ExportService,RemindModuleService<ConstructOperation> {

	public void saveOrMergeForEdit(ConstructOperation constructOperation);

	public void deleteTask(Long taskId);

	public ConstructOperation getTranslateAll(Long constructId);

	public void effective(ConstructOperation constructOperation);

	public void loseEffective(ConstructOperation constructOperation);

	public void sendMessagePush(ConstructOperation constructOperation,String msg);

}
