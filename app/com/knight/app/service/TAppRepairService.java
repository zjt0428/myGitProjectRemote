package com.knight.app.service;

import com.knight.app.model.TAppRepair;
import com.knight.core.service.ExportService;
import com.knight.emms.terminal.Tequest;
import com.knight.system.service.BusinessLongPKService;
/**
 * @ClassName: AttendamceService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date
 */
public interface TAppRepairService extends BusinessLongPKService<TAppRepair>, ExportService {
	public void saveOrUpdate(TAppRepair tappRepair);
	/** 删除设备安装信息 */
	public void delete(Long repId);
	
	public void createRepair(Long flowId);

}
