/**
 *====================================================
 * 文件名称: InventoryServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.InventoryCategoryDao;
import com.knight.emms.dao.InventoryDao;
import com.knight.emms.model.Inventory;
import com.knight.emms.model.InventoryCategory;
import com.knight.emms.service.InventoryService;
import com.knight.system.service.CodeService;

/**
 * @ClassName: InventoryServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-26 下午10:03:08
 */
public class InventoryServiceImpl extends BaseBusinessModelServiceImpl<Inventory> implements InventoryService {

	private InventoryDao inventoryDao;

	@Resource
	private InventoryCategoryDao inventoryCategoryDao;

	@Resource
	private CodeService codeService;

	public InventoryServiceImpl(InventoryDao dao) {
		super(dao);
		this.inventoryDao = dao;
	}

	private void completeInventory(Map<String, Map<String, Object>> inventory, List<Map<String, Object>> categorys, String field) {
		for (Map<String, Object> m : categorys) {
			String c = (String) m.get("CATEGORY");
			String cn = (String) m.get("CATEGORY_NAME");
			Integer q = (Integer) m.get("QUANTITY");
			if (inventory.containsKey(c)) {
				Map<String, Object> n = inventory.get(c);
				Integer qt = (Integer) (n.get(field) == null ? 0 : n.get(field));
				n.put(field, qt + q);
			} else {
				Map<String, Object> n = new HashMap<String, Object>();
				n.put("repertoryCategory", c);
				n.put("repertoryCategoryName", cn);
				n.put(field, q);
				inventory.put(c, n);
			}
		}
	}

	public Inventory getTranslateFull(Long inventoryId) {
		Map<String, String> codes = codeService.getCodeValueMap("repertoryCategory");
		Inventory t = inventoryDao.get(inventoryId);
		t.setRepertoryCategoryName(codes.get(t.getRepertoryCategory()));
		for (InventoryCategory ic : t.getInventoryCategorySet()) {
			ic.setRepertoryCategoryName(codes.get(ic.getRepertoryCategory()));
		}
		return t;
	}

	public void saveOrMerge(Inventory inventory) {
		if (inventory.getInventoryId() == null) {
			inventoryDao.saveSerialModel(inventory);
		}
		inventory.setSubInventory();
		inventoryDao.merge(inventory);
	}

	public void deleteCategory(Long invCategoryId) {
		inventoryCategoryDao.remove(invCategoryId);
	}

	public Collection<Map<String, Object>> calculateCategory(String category, Date startTime, Date endTime) {
		Map<String, Map<String, Object>> inventory = new HashMap<String, Map<String, Object>>();
		List<Map<String, Object>> periods = inventoryDao.queryPeriod(category, startTime, endTime);
		completeInventory(inventory, periods, "bookQuantity");

		List<Map<String, Object>> finalExams = inventoryDao.queryFinalExam(category, startTime, endTime);
		completeInventory(inventory, finalExams, "inventoryQuantity");

		List<Map<String, Object>> scraps = inventoryDao.queryScrap(category, startTime, endTime);
		completeInventory(inventory, scraps, "scrapQuantity");

		List<Map<String, Object>> misses = inventoryDao.queryMiss(category, startTime, endTime);
		completeInventory(inventory, misses, "missQuantity");

		List<Map<String, Object>> inuseds = inventoryDao.queryInused(category, startTime, endTime);
		for (Map<String, Object> m : inuseds) {
			String c = (String) m.get("CATEGORY");
			String cn = (String) m.get("CATEGORY_NAME");
			String mo = ((String) m.get("RELATE_MODULE")).toLowerCase() + "Quantity";
			Integer q = (Integer) m.get("QUANTITY");
			if (inventory.containsKey(c)) {
				Map<String, Object> n = inventory.get(c);
				Integer qt = (Integer) (n.get(mo) == null ? 0 : n.get(mo));
				n.put(mo, qt + q);
			} else {
				Map<String, Object> n = new HashMap<String, Object>();
				n.put("repertoryCategory", c);
				n.put("repertoryCategoryName", cn);
				n.put(mo, q);
				inventory.put(c, n);
			}
		}
		return inventory.values();
	}

}
