/**
 *====================================================
 * 文件名称: CustomerService.java
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
import com.knight.emms.model.Customer;
import com.knight.emms.model.CustomerAccount;
import com.knight.emms.model.CustomerLinker;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: CustomerService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:33:11
 */
public interface CustomerService extends BusinessLongPKService<Customer>, ExportService {

	public void saveOrUpdate(Customer customer);

	/** 删除联系信息 */
	public void deletedLinker(Long customerLinkId);

	/** 删除帐户信息 */
	public void deletedAccount(Long customerAccountId);

	/** 查询客户帐户信息 */
	public List<CustomerAccount> queryAccountTranslateAll(QueryFilter filter);

	/** 查询客户联系信息 */
	public List<CustomerLinker> queryLinkerTranslateAll(QueryFilter filter);
	
	/** 修改客户名称 */
	public void changeCustomerName(Long customerId,String customerName);
	
	/** 判断客户名称重复 */
	public void customerNameExist(Long customerId,String customerName);
}
