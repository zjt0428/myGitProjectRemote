
package com.knight.emms.service;


import com.knight.core.service.ExportService;
import com.knight.emms.model.PractiInsurance;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: AllocationDepotService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public interface PractiInsuranceService extends BusinessLongPKService<PractiInsurance> , ExportService{

	public PractiInsurance getTranslateFull(Long insureId);

	public void deletedDetail(Long tdetailId);
	
	public void submitDepot(Long depottId);
	
	public void saveCreate(PractiInsurance dt);
	
	public void delDetail(Long tdetailId);
	
	public void saveOrMergeFor(PractiInsurance t);
	
	public void multiEffective(Long insureId);
	
	public void multiLoseEffective(Long insureId);
	
	

}
