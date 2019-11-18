/**
 *====================================================
 * 文件名称: SupplierService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.model.Supplier;
import com.knight.emms.model.SupplierAccount;
import com.knight.emms.model.SupplierLinker;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: SupplierService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:33:11
 */
public interface SupplierService extends BusinessLongPKService<Supplier>, ExportService {

	public void saveOrUpdate(Supplier supplier);

	/** 删除联系信息 */
	public void deletedLinker(Long supplierLinkId);

	/** 删除帐户信息 */
	public void deletedAccount(Long supplierAccountId);

	/** 查询供应商帐户信息 */
	public List<SupplierAccount> queryAccountTranslateAll(QueryFilter filter);

	/** 查询供应商联系信息 */
	public List<SupplierLinker> queryLinkerTranslateAll(QueryFilter filter);

}
