
package com.knight.emms.service;


import com.knight.core.service.ExportService;
import com.knight.emms.model.InspectProjectRecord;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: SafetyEducationService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public interface InspectProjectRecordService extends BusinessLongPKService<InspectProjectRecord> , ExportService{

	public InspectProjectRecord getTranslateFull(Long inprojectId);
	

}
