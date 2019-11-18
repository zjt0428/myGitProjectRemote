package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.MaterialsDispatch;
import com.knight.emms.model.ScrapApply;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:37:40
* 类说明
*/
public interface MaterialsDispatchService extends BusinessFlowService<MaterialsDispatch> {

	
	public List<MaterialsDispatch> queryTranslateAllFull(QueryFilter filter);
	
	public MaterialsDispatch getTranslateFull(Long materialsId) ;

	public void saveOrUpdate(MaterialsDispatch materialsDispatch);
	
//	public void saveCreate(MaterialsDispatch materialsDispatch);
	
	public void deleteDispatch(Long disptchId);
	
	public void loseEffective(MaterialsDispatch materialsDispatch);
}
