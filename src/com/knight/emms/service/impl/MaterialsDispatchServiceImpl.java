package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.DispatchMaterialsDao;
import com.knight.emms.dao.MaterialsDispatchDao;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.MaterialsDispatch;
import com.knight.emms.service.MaterialsDispatchService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:39:56
* 类说明
*/
public class MaterialsDispatchServiceImpl extends BusinessFlowServiceImpl<MaterialsDispatch> implements MaterialsDispatchService {

	private MaterialsDispatchDao materialsDispatchDao;
	
	@Resource
	private DispatchMaterialsDao dispatchMaterialsDao;
	
	
	public MaterialsDispatchServiceImpl(MaterialsDispatchDao dao) {
		super(dao);
		this.materialsDispatchDao = dao;
		//发货调度去掉审批
		passAcceptStateMap.put(Status.MaterialsDispatchApplyfor.waitAccept, Status.MaterialsDispatchApplyfor.notLoading);
		rejectAcceptStateMap.put(Status.MaterialsDispatchApplyfor.waitAccept, Status.MaterialsDispatchApplyfor.waitSubmit);
	}

	
	
	
	public List<MaterialsDispatch> queryTranslateAllFull(QueryFilter filter) {
		List<MaterialsDispatch> list = materialsDispatchDao.getAll(filter);
		CodeServiceImpl.translate(list);
		return list;
	}
	
	public MaterialsDispatch getTranslateFull(Long scrapId) {
		MaterialsDispatch r = materialsDispatchDao.get(scrapId);
		return r;
	}

	@Override
	public void saveOrUpdate(MaterialsDispatch materialsDispatch) {
		
		materialsDispatchDao.save(materialsDispatch);
		
	}
	
	@Override
	public void saveOrMergeForEdit(MaterialsDispatch materialsDispatch) {
		if (materialsDispatch.getMaterialsId() == null) {
			materialsDispatchDao.saveSerialModel(materialsDispatch);
		}
		materialsDispatch.setMaterialsDispatch();
		materialsDispatchDao.merge(materialsDispatch);
	}

	public void deleteDispatch(Long dispatchId) {
		dispatchMaterialsDao.remove(dispatchId);
	}

	public void loseEffective(MaterialsDispatch materialsDispatch) {
		materialsDispatch.setEffective(Constant.DISENABLED);
		materialsDispatchDao.save(materialsDispatch);
	}
	
}
