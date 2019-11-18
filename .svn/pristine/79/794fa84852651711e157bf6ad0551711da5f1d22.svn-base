/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyItemServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.VerifyItemDao;
import com.knight.emms.dao.VerifyItemDemandDao;
import com.knight.emms.model.VerifyItem;
import com.knight.emms.model.VerifyItemDemand;
import com.knight.emms.service.VerifyItemService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: VerifyItemServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-6 下午3:01:14
 */
public class VerifyItemServiceImpl extends BusinessLongPKServiceImpl<VerifyItem> implements VerifyItemService {

	private VerifyItemDao verifyItemDao;

	@Resource
	private VerifyItemDemandDao verifyItemDemandDao;

	public VerifyItemServiceImpl(VerifyItemDao dao) {
		super(dao);
		this.verifyItemDao = dao;
	}

	public void saveItem(Long parentItemId, Long itemId, String itemName, String vitemType) {
		VerifyItem item = null;
		String path = null;
		if (itemId != null) {
			item = verifyItemDao.get(itemId);
			item.setVitemType(vitemType);
			item.setItemName(itemName);
		} else if (parentItemId == null || parentItemId.longValue() == 0L) {
			item = new VerifyItem();
			item.setVitemType(vitemType);
			item.setItemName(itemName);
			item.setItemParent(0L);
			path = "0";
			item.setLevel(1);
			verifyItemDao.save(item);
		} else {
			VerifyItem parentItem = verifyItemDao.get(parentItemId);
			item = new VerifyItem();
			item.setVitemType(vitemType);
			item.setItemName(itemName);
			item.setItemParent(parentItem.getItemId());
			path = parentItem.getPath();
			item.setLevel(parentItem.getLevel() + 1);
			verifyItemDao.save(item);
		}
		item.setPath(path + "." + item.getItemId());
		verifyItemDao.save(item);
	}

	public void deleteItem(Long itemId) {
		verifyItemDao.deleteItemById(itemId);
	}

	public List<VerifyItemDemand> queryDemandByItem(QueryFilter filter) {
		return verifyItemDemandDao.getAll(filter);
	}

	public void saveDemand(Long itemId, Long demandId, String demandDes) {
		VerifyItemDemand d = null;
		if (demandId == null) {
			d = new VerifyItemDemand();
			d.setItemId(itemId);
		} else {
			d = verifyItemDemandDao.get(demandId);
		}
		d.setDemandDes(demandDes);
		verifyItemDemandDao.save(d);
	}

	public void deleteDemand(Long demandId) {
		verifyItemDemandDao.remove(demandId);
	}

	public List<Map<String, Object>> queryDemand(QueryFilter filter) {
		return verifyItemDemandDao.queryDemand(filter);
	}

}
