/**
 *====================================================
 * 文件名称: ReceivementServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Set;

import com.knight.emms.constant.EmmsConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ReceivementDao;
import com.knight.emms.model.Receivement;
import com.knight.emms.service.ReceivementService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: ReceivementServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午11:15:06
 */
public class ReceivementServiceImpl extends BusinessLongPKServiceImpl<Receivement> implements ReceivementService {

	private ReceivementDao receivementDao;

	public ReceivementServiceImpl(ReceivementDao dao) {
		super(dao);
		this.receivementDao = dao;
	}

	public void saveOrMeger(Set<Receivement> receivementSet) {
		if (receivementSet == null) {
			return;
		}
		for (Receivement r : receivementSet) {
			if (r.getReceivementId() == null) {
				r.setInvoiceFlag(r.isInvoiceFlag());
				r.setStatus(Status.Fund.receive);
				r.setAlreadyReceivement(EmmsConstant.ZERO);
				receivementDao.save(r);
			} else {
				Receivement l = receivementDao.get(r.getReceivementId());
				if (!Status.Fund.receive.equals(l.getStatus())) {
					continue;
				}
				r.setInvoiceFlag(r.isInvoiceFlag());
				r.setStatus(Status.Fund.receive);
				r.setAlreadyReceivement(EmmsConstant.ZERO);
				receivementDao.merge(r);
			}
		}
	}

}
