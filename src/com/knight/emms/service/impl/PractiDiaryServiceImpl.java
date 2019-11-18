/**
 *====================================================
 * 文件名称: PractiDiaryServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Set;

import javax.annotation.Resource;

import com.knight.emms.dao.DispatchPractiDao;
import com.knight.emms.dao.PractiDiaryDao;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.model.DispatchPracti;
import com.knight.emms.model.PractiDiary;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.emms.service.PractiDiaryService;
import com.knight.emms.support.PractiDiarySupport;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: PractiDiaryServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:36:30
 */
public class PractiDiaryServiceImpl extends BusinessLongPKServiceImpl<PractiDiary> implements PractiDiaryService {

	private PractiDiaryDao practiDiaryDao;
	
	@Resource
	private PractitionerDao practitionerDao;

	@Resource
	private DispatchPractiDao dispatchPractiDao;

	public PractiDiaryServiceImpl(PractiDiaryDao dao) {
		super(dao);
		this.practiDiaryDao = dao;
	}

	public void createPractiDiary(Set<PractiDiary> practiDiarySet, DiaryRelationMethod relation) {
		if (practiDiarySet == null) {
			return;
		}
		for (PractiDiary diary : practiDiarySet) {
			DispatchPracti dispatchPracti = new DispatchPracti();
			if (diary.getPractiDiaryId() == null) {
				if(diary.getBusinessPractiId() == null){
					dispatchPracti.setPractitioner(practitionerDao.get(diary.getPractiId()));
				}else{
					dispatchPracti = dispatchPractiDao.get(diary.getBusinessPractiId());
				}
				PractiDiarySupport.setFlowPractiDiary(diary, relation, dispatchPracti);
				practiDiaryDao.save(diary);
			}
		}
	}

	public void fulfil(Long practiDiaryId) {
		PractiDiary pd = practiDiaryDao.get(practiDiaryId);
		practiDiaryDao.updateScirpt("dispatch.clean_practi_resume", practiDiaryId);
		practiDiaryDao.remove(pd);
	}

}
