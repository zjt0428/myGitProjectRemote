/**
 *====================================================
 * 文件名称: InsureEquipServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.InsureClaimDao;
import com.knight.emms.dao.InsureEquipDao;
import com.knight.emms.model.InsureClaim;
import com.knight.emms.model.InsureEquip;
import com.knight.emms.model.Project;
import com.knight.emms.service.InsureEquipService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: InsureEquipServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:36:00
 */
public class InsureEquipServiceImpl extends BusinessLongPKServiceImpl<InsureEquip> implements InsureEquipService {

	private InsureEquipDao insureEquipDao;

	@Resource
	private InsureClaimDao insureClaimDao;

	public InsureEquipServiceImpl(InsureEquipDao dao) {
		super(dao);
		this.insureEquipDao = dao;
	}

	public List<InsureEquip> queryTranslateAllFull(QueryFilter filter) {
		List<InsureEquip> list = insureEquipDao.getAll(filter);
		for (InsureEquip ie : list) {
			CodeServiceImpl.translate(ie, getPersistantStruct());
			CodeServiceImpl.translate(ie.getEquipment());
		}
		return list;
	}

	public InsureEquip getTranslateFull(Long insureId) {
		InsureEquip ie = insureEquipDao.get(insureId);
		if (ie.getProject() == null) {
			ie.setProject(Project.DEFAULT);
		}
		CodeServiceImpl.translate(ie, getPersistantStruct());
		CodeServiceImpl.translate(ie.getEquipment());
		return ie;
	}

	public void deleteClaim(Long insureClaimId) {
		insureClaimDao.remove(insureClaimId);
	}

	public void saveOrMergeClaim(Set<InsureClaim> insureClaimSet) {
		for (InsureClaim ic : insureClaimSet) {
			insureClaimDao.save(ic);
		}
	}

}
