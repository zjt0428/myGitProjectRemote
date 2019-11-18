/**
 *====================================================
 * 文件名称: EquipVerifyServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipVerifyDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.VerifyStandardDao;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipVerify;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.ScrapApply;
import com.knight.emms.model.VerifyStandard;
import com.knight.emms.service.EquipVerifyService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipVerifyServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:34:56
 */
public class EquipVerifyServiceImpl extends BusinessLongPKServiceImpl<EquipVerify> implements EquipVerifyService {

	private EquipVerifyDao equipVerifyDao;

	@Resource
	protected EquipmentDao equipmentDao;

	@Resource
	private VerifyStandardDao verifyStandardDao;

	public EquipVerifyServiceImpl(EquipVerifyDao dao) {
		super(dao);
		this.equipVerifyDao = dao;
	}

	public List<EquipVerify> queryTranslateAllFull(QueryFilter filter) {
		List<EquipVerify> list = equipVerifyDao.getAll(filter);
		for (EquipVerify e : list) {
			CodeServiceImpl.translate(e, getPersistantStruct());
			CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
		}
		return list;
	}

	public EquipVerify getTranslateFull(Long verifyId) {
		EquipVerify e = equipVerifyDao.get(verifyId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
		e.getVerifyStandardSet();
		return e;
	}

	public void saveOrUpdate(EquipVerify equipVerify) {
		Equipment e = null;
		if (equipVerify.getVerifyId() == null) {
			String seq = equipVerifyDao.createNextSerial(equipVerify);
			equipVerify.setVerifySerial(seq);
			equipVerifyDao.save(equipVerify);
			e = equipmentDao.get(equipVerify.getEquipFlow().getEquipId());
		} else {
			equipVerifyDao.merge(equipVerify);
			e = equipVerify.getEquipFlow().getEquipment();
		}
		// 设备业务状态
		e.setBusinessStatus(Status.EquipBusiness.verify);
		equipmentDao.save(e);

		equipVerify.setSubEquipVerify();
		for (VerifyStandard s : equipVerify.getVerifyStandardSet()) {
			if (s.getStandardId() == null) {
				verifyStandardDao.save(s);
			} else {
				verifyStandardDao.merge(s);
			}
		}
	}
	
	public void effective(EquipVerify equipVerify) {

		if (Constant.DISENABLED.equals(equipVerify.getEffective())) {
			equipVerify.setEffective(Constant.ENABLED);
			equipVerifyDao.save(equipVerify);
		}

	}

}
