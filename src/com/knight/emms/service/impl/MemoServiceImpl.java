/**
 *====================================================
 * 文件名称: MemoServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.MemoDao;
import com.knight.emms.model.Memo;
import com.knight.emms.model.MemoDetail;
import com.knight.emms.service.MemoService;

/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class MemoServiceImpl extends BaseBusinessModelServiceImpl<Memo> implements MemoService {

	private MemoDao memoDao;

	public MemoServiceImpl(MemoDao dao) {
		super(dao);
		this.memoDao = dao;
	}

	public void saveOrUpdate(Memo memo) {
		if (memo.getMemoId() == null) {
			memoDao.saveSerialModel(memo);
		}
		memo.setSubMemo();
		memo.setProcessStatus(Status.HandleResult.processed);
		for (MemoDetail md : memo.getMemoDetailSet()) {
			if (Constant.DISENABLED.equals(md.getFinished())) {
				memo.setProcessStatus(Status.HandleResult.untreated);
				break;
			}
		}
		memoDao.merge(memo);
	}

}
