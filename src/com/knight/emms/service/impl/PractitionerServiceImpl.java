/**
 *====================================================
 * 文件名称: PractitionerServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.CorpCertDao;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.PractitionerService;
import com.knight.system.model.AppUserExtend;
import com.knight.system.model.UserExtend;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: PractitionerServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:04:20
 */
public class PractitionerServiceImpl extends BusinessLongPKServiceImpl<Practitioner> implements PractitionerService {

	private PractitionerDao practitionerDao;

	@Resource
	private CorpCertDao corpCertDao;

	public PractitionerServiceImpl(PractitionerDao dao) {
		super(dao);
		this.practitionerDao = dao;
	}

	public UserExtend loadAppUserExtend(AppUserExtend appUserExtend) {
		Practitioner p = practitionerDao.get(appUserExtend.getForeignId());
		CorpInfo c = p.getCorpInfo();
		Practitioner extend = null;
		try {
			CorpInfo ci = c.clone();
			ci.setPractitionerSet(null);
			ci.setCorpAccountSet(null);
			CodeServiceImpl.translate(ci.getCorpCert(), corpCertDao.getPersistantStruct());
			extend = p.clone();
			extend.setCorpInfo(ci);
			extend.setDepartment(null);
			extend.setAppUser(null);
		} catch (Exception e) {
			logger.error("", e);
		}
		return extend;
	}

}
