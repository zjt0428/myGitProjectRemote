package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.MaterialsDispatch;
import com.knight.emms.model.MaterialsPackage;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:37:40
* 类说明
*/
public interface MaterialsPackageService extends BusinessFlowService<MaterialsPackage>,ExportService{


	public List<MaterialsPackage> queryTranslateAllFull(QueryFilter filter);
	
	public MaterialsPackage getTranslateFull(Long packageId) ;

	public void saveOrUpdate(MaterialsPackage materialsPackage);
	
	public void saveCreate(MaterialsPackage materialsPackage);
	
	public void deleteCost(Long costId);
	
	public void calculateCostDetail(MaterialsDispatch md, MaterialsPackage mp);
}
