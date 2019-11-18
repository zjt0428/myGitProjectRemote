/**
 *====================================================
 * 文件名称: AnnounceServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.constant.Constant;
import com.knight.emms.dao.AnnounceCategoryDao;
import com.knight.emms.dao.AnnounceDao;
import com.knight.emms.model.Announce;
import com.knight.emms.service.AnnounceService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: AnnounceServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:44:30
 */
public class AnnounceServiceImpl extends BusinessLongPKServiceImpl<Announce> implements AnnounceService {

	private AnnounceDao announceDao;

	@Resource
	private AnnounceCategoryDao announceCategoryDao;

	public AnnounceServiceImpl(AnnounceDao dao) {
		super(dao);
		this.announceDao = dao;
	}

	public Announce getTranslateFull(Long announceId) {
		Announce a = announceDao.get(announceId);
		a.getAnnounceDepSet();
		a.getAnnouncePractiSet();
		a.getAnnounceScopeDepSet();
		return a;
	}

	public void saveOrMergeEdit(Announce announce) {
		if (announce.getAnnounceId() == null) {
			announceDao.save(announce);
		} else {
			announceDao.merge(announce);
		}
		announce.setSubAnnounce();
		announceCategoryDao.saveOrUpdate(announce.getAnnouncePractiSet());
		announceCategoryDao.saveOrUpdate(announce.getAnnounceDepSet());
		announceCategoryDao.saveOrUpdate(announce.getAnnounceScopeDepSet());
	}

	public void deletedCategory(Long announceCategoryId) {
		announceCategoryDao.remove(announceCategoryId);
	}

	public void publish(Long announceId) {
		announceDao.updateScirpt("announce.pulish_to_appuser", announceId);
		Announce a = announceDao.get(announceId);
		a.setPublish(Constant.ENABLED);
		announceDao.save(a);
	}
	
	public void saveOrMergeEditApp(Announce announce) {
		if (announce.getAnnounceId() == null) {
			announceDao.save(announce);
		} else {
			announceDao.merge(announce);
		}
		announce.setSubAnnounce("app");
		announceCategoryDao.saveOrUpdate(announce.getAnnouncePractiSet());
		announceCategoryDao.saveOrUpdate(announce.getAnnounceDepSet());
		announceCategoryDao.saveOrUpdate(announce.getAnnounceScopeDepSet());
	}

}
