
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.dao.LostHandleDao;
import com.knight.emms.domain.BusinessEquipFlowValidate;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LostDetail;
import com.knight.emms.model.LostHandle;
import com.knight.emms.service.LostHandleService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: LostHandleServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public class LostHandleServiceImpl extends BusinessEquipFlowValidate<LostHandle> implements LostHandleService {

	private LostHandleDao lostHandleDao;

	public LostHandleServiceImpl(LostHandleDao dao) {
		super(dao);
		this.lostHandleDao = dao;
	}

	public List<LostHandle> queryTranslateAllFull(QueryFilter filter) {
		List<LostHandle> list = lostHandleDao.getAll(filter);
		for (LostHandle ew : list) {
			CodeServiceImpl.translate(ew, getPersistantStruct());
		}
		return list;
	}

	public LostHandle getTranslateFull(Long lostId) {
		LostHandle ew = lostHandleDao.get(lostId);
		CodeServiceImpl.translate(ew, getPersistantStruct());
		return ew;
	}

	public void saveOrMergeForEdit(LostHandle lostHandle) {
		if (lostHandle.getLostId() == null) {
			lostHandleDao.saveSerialModel(lostHandle);
			lostHandle.setLostSerial(lostHandle.getLostSerial());
		}
		lostHandle.setSubLostDetail();
		lostHandleDao.merge(lostHandle);
	}

	public void delete(Long lostId) {
		LostHandle lostHandle = lostHandleDao.get(lostId);
		lostHandleDao.remove(lostHandle);
	}

	public void deletedCompon(Long lostHandleId) {
		lostHandleDao.remove(lostHandleId);
	}
 
}
