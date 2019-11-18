package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.MaterialsRemodel;

public interface MaterialsRemodelService extends BusinessFlowService<MaterialsRemodel> {

	public List<MaterialsRemodel> queryTranslateAllFull(QueryFilter filter);

	public MaterialsRemodel getTranslateFull(Long remodelId);

	public void deleteAfter(Long afterId);

	public void deleteBefore(Long beforeId);
	
}
