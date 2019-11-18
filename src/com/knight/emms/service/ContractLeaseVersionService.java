/**
 *====================================================
 * 文件名称: ContractLeaseService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.AccidentReport;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.ContractLeaseVersion;

/**
 * @ClassName: ContractLeaseVersionService
 * @Description: TODO(这里用一句话描述这个类的作用)
 */
public interface ContractLeaseVersionService extends BaseBusinessModelService<ContractLeaseVersion>, ExportService {

	public void saveOrMergeForEdit(ContractLeaseVersion contractLeaseVersion,ContractLease contractLease);
	
	public ContractLeaseVersion getTranslateFull(Long leaseVersionId);

}
