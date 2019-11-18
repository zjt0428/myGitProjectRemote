
package com.knight.emms.service;


import com.knight.core.service.ExportService;
import com.knight.emms.model.LaborPay;
import com.knight.emms.model.LaborSettle;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: LaborPayService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public interface LaborPayService extends BusinessLongPKService<LaborPay> , ExportService{

	public LaborPay getTranslateFull(Long laborPayId);
	
	public void saveOrMerge(LaborPay ls);
}
