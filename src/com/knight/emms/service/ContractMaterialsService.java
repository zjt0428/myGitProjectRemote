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
import com.knight.emms.model.ContractMaterials;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;

/**
 * @ClassName: ContractLeaseService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public interface ContractMaterialsService extends BusinessFlowService<ContractMaterials> , ExportService {

	public ContractMaterials getTranslateFull(Long contractmaId);
	
	public void deleteMaterialsDetail(Long madetailId);
	
	public void deletePriceSetting(Long priceId);
	
	public void deleteMatDamage(Long matDamageId);
	
	public void deleteCostHandle(Long costHandleId);
	
	public void deleteScrap(Long compensationId);
	
	public String concatAddress(String province,String city,String county);
	
	public AppUser createAppUser(AppUser appUser, AppRole appRole);
}
