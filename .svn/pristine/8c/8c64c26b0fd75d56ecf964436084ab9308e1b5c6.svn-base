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
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: ContractLeaseService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:31:22
 */
public interface ContractLeaseService extends BusinessFlowService<ContractLease>, ExportService {

	public ContractLease getTranslateFull(Long contractId);

	public void deleteEquip(Long contractEquipId);

	public void deleteEquipBrief(Long ceBriefId);

	public void deletePractiBrief(Long cpBriefId);

	public void deleteCostitem(Long costitemId);

	public void deleteEquipOutlay(Long contractEquipoutlayId);

	public void deleteEquipCost(Long contractEquipcostId);

	public void sendSms(ContractLease p);
	
	public void deleteInstallPriceSet(Long installPriceId);
	
	public void deleteContractInoutFree(Long inoutId);
	
	public void deleteContractOperatirFree(Long operatorId);
	
	public void deleteTruckCranePriceSet(Long tcPriceId);

	void bindingDepartmentPermission(ContractLease contractLease);
	
	public void changeContractNo (Long contractId,String contractNo);
	
	public void contractNoExist(Long contractId,String contractNo);
	
	public void deleteSafetyMonitor(Long safetyId);

}
