/**
 *====================================================
 * 文件名称: VerifySelfServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.CorpInfoDao;
import com.knight.emms.dao.VerifySelfDao;
import com.knight.emms.dao.VerifyStandardDao;
import com.knight.emms.model.VerifySelf;
import com.knight.emms.model.VerifyStandard;
import com.knight.emms.service.VerifySelfService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: VerifySelfServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-26 下午11:48:53
 */
public class VerifySelfServiceImpl extends BaseBusinessModelServiceImpl<VerifySelf> implements VerifySelfService {

	private VerifySelfDao verifySelfDao;

	@Resource
	private VerifyStandardDao verifyStandardDao;

	@Resource
	private CorpInfoDao corpInfoDao;

	public VerifySelfServiceImpl(VerifySelfDao dao) {
		super(dao);
		this.verifySelfDao = dao;
	}

	public void saveOrMerge(VerifySelf verifySelf) {
		if (verifySelf.getSelfId() == null) {
			verifySelfDao.saveSerialModel(verifySelf);
		} else {
			verifySelfDao.merge(verifySelf);
		}
		verifySelf.setSubVerifySelf();
		for (VerifyStandard s : verifySelf.getSelfStandardSet()) {
			if (s.getStandardId() == null) {
				verifyStandardDao.save(s);
			} else {
				verifyStandardDao.merge(s);
			}
		}
	}

	public List<VerifySelf> queryTranslateAllFull(QueryFilter filter) {
		List<VerifySelf> list = verifySelfDao.getAll(filter);
		for (VerifySelf v : list) {
			CodeServiceImpl.translate(v.getEquipFlow().getEquipDiary());
		}
		return list;
	}

	public VerifySelf getTranslateFull(Long selfId) {
		VerifySelf v = verifySelfDao.get(selfId);
		CodeServiceImpl.translate(v.getEquipFlow().getEquipDiary());
		v.getSelfStandardSet();
		return v;
	}
}
