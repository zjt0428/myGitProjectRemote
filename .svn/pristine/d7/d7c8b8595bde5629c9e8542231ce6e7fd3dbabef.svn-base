package com.knight.emms.service;

import com.knight.emms.model.ProjectDepotInOut;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: ProjectDepotInOutService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenzj
 * @date 2018-6-23 16:16:11
 */
public interface ProjectDepotInOutService extends BusinessLongPKService<ProjectDepotInOut> {

	/**判断相关模块是否曾生成过出入库记录*/
	boolean alreadyRecord(Long relateId, String relateModule);

	void saveCreate(ProjectDepotInOut pd);
}
