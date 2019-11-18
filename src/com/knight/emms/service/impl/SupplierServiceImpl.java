/**
 *====================================================
 * 文件名称: SupplierServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.SupplierAccountDao;
import com.knight.emms.dao.SupplierDao;
import com.knight.emms.dao.SupplierLinkerDao;
import com.knight.emms.model.Supplier;
import com.knight.emms.model.SupplierAccount;
import com.knight.emms.model.SupplierLinker;
import com.knight.emms.service.SupplierService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: SupplierServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:33:21
 */
public class SupplierServiceImpl extends BusinessLongPKServiceImpl<Supplier> implements SupplierService {

	private SupplierDao supplierDao;

	@Resource
	private SupplierAccountDao supplierAccountDao;

	@Resource
	private SupplierLinkerDao supplierLinkerDao;

	public SupplierServiceImpl(SupplierDao dao) {
		super(dao);
		this.supplierDao = dao;
	}

	public void saveOrUpdate(Supplier supplier) {
		if (supplier.getSupplierId() == null) {
			supplierDao.save(supplier);
		}
		supplier.setSubSupplier();
		supplierDao.merge(supplier);
		supplier.setSupplierLinker(null);
		supplier.setSupplierAccount(null);
		for (SupplierLinker supplierLinker : supplier.getSupplierLinkerSet()) {
			if (supplierLinker.isDefaultFlag()) {
				supplier.setSupplierLinker(supplierLinker);
			}
		}
		for (SupplierAccount supplierAccount : supplier.getSupplierAccountSet()) {
			if (supplierAccount.isDefaultFlag()) {
				supplier.setSupplierAccount(supplierAccount);
			}
		}
		supplierDao.merge(supplier);
	}

	public void deletedLinker(Long supplierLinkId) {
		supplierLinkerDao.remove(supplierLinkId);
	}

	public void deletedAccount(Long supplierAccountId) {
		supplierAccountDao.remove(supplierAccountId);
	}

	public List<SupplierAccount> queryAccountTranslateAll(QueryFilter filter) {
		List<SupplierAccount> list = supplierAccountDao.getAll(filter);
		return list;
	}

	public List<SupplierLinker> queryLinkerTranslateAll(QueryFilter filter) {
		List<SupplierLinker> list = supplierLinkerDao.getAll(filter);
		for (SupplierLinker l : list) {
			l.setLinkerTypeName(CodeServiceImpl.fastValue("linkerType", l.getLinkerType()));
		}
		return list;
	}

}
