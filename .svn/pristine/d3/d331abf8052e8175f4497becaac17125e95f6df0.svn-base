/**
 *====================================================
 * 文件名称: CorpCertServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.constant.Constant;
import com.knight.emms.dao.CorpCertDao;
import com.knight.emms.dao.CorpInfoDao;
import com.knight.emms.model.CorpCert;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.service.CorpCertService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: CorpCertServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:05:23
 */
public class CorpCertServiceImpl extends BusinessLongPKServiceImpl<CorpCert> implements CorpCertService {

	private CorpCertDao corpCertDao;

	@Resource
	private CorpInfoDao corpInfoDao;

	public CorpCertServiceImpl(CorpCertDao dao) {
		super(dao);
		this.corpCertDao = dao;
	}

	public void saveOrUpdate(CorpCert corpCert) {
		if (corpCert.getCertId() == null) {
			corpCertDao.save(corpCert);
		} else {
			corpCertDao.merge(corpCert);
		}
		CorpInfo corpInfo = corpInfoDao.get(corpCert.getCorpId());
		if (Constant.ENABLED.equals(corpCert.getDefaultCert())) {
			corpInfo.setCertId(corpCert.getCertId());
			corpCertDao.updateScirpt("corp.reset_defautl_cert", corpCert.getCorpId(), corpCert.getCertId());
		} else {
			if (corpCert.getCertId().equals(corpInfo.getCertId())) {
				corpInfo.setCertId(null);
			}
		}
		corpInfoDao.update(corpInfo);
	}
}
