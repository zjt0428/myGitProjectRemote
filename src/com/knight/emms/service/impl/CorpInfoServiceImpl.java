/**
 *====================================================
 * 文件名称: CorpInfoServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.CorpAccountDao;
import com.knight.emms.dao.CorpCertDao;
import com.knight.emms.dao.CorpInfoDao;
import com.knight.emms.model.CorpAccount;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.service.CorpInfoService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: CorpInfoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:05:56
 */
public class CorpInfoServiceImpl extends BusinessLongPKServiceImpl<CorpInfo> implements CorpInfoService {

	private CorpInfoDao corpInfoDao;

	@Resource
	private CorpAccountDao corpAccountDao;

	@Resource
	private CorpCertDao corpCertDao;

	public CorpInfoServiceImpl(CorpInfoDao dao) {
		super(dao);
		this.corpInfoDao = dao;
	}

	public void deletedAccount(Long corpAccountId) {
		corpAccountDao.remove(corpAccountId);
	}

	public List<CorpAccount> queryAccountAll(QueryFilter filter) {
		filter.getPagingBean().setPageSize(5000);
		return corpAccountDao.getAll(filter);
	}

	public CorpInfo getTranslateFull(Long corpId) {
		CorpInfo c = corpInfoDao.get(corpId);
		CodeServiceImpl.translate(c, getPersistantStruct());
		CodeServiceImpl.translate(c.getCorpCert(), corpCertDao.getPersistantStruct());
		c.getCorpAccountSet();
		return c;
	}

}
