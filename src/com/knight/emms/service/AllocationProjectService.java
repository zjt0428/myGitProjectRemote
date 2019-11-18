
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.AllocationProject;

/**
 * @ClassName: AllocationProjectService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public interface AllocationProjectService extends BusinessFlowService<AllocationProject> {

	public AllocationProject getTranslateFull(Long allocationId);

	public void deletedDetail(Long detailId);
	
	public void submitAllocation(Long allocationId);
	
	public void saveCreate(AllocationProject allocationProject);

	public List<AllocationProject> queryList(String contractIds, QueryFilter filter);

}
