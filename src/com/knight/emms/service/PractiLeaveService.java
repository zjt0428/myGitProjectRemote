
package com.knight.emms.service;


import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.model.PractiLeave;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: PractiLeaveService
 * @Description: 人员离职
 * @author 
 * @date 
 */
public interface PractiLeaveService extends BusinessLongPKService<PractiLeave> , ExportService{

	public PractiLeave getTranslateFull(Long leaveId);

	public void multiEffective(Long leaveId);
	
	public void multiLoseEffective(Long leaveId);
	
	

}
