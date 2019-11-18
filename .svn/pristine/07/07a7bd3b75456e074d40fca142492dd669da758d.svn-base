
package com.knight.emms.service;


import com.knight.core.service.ExportService;
import com.knight.emms.model.EquipInsurance;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: AllocationDepotService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public interface EquipInsuranceService extends BusinessLongPKService<EquipInsurance> , ExportService{

	public EquipInsurance getTranslateFull(Long insureId);

	public void deletedDetail(Long tdetailId);
	
	public void submitDepot(Long depottId);
	
	public void saveCreate(EquipInsurance dt);
	
	public void delDetail(Long tdetailId);
	
	public void saveOrMergeFor(EquipInsurance t);
	
	public void multiEffective(Long insureId);
	
	public void multiLoseEffective(Long insureId);
	
	

}
