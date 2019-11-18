/**
 *====================================================
 * 文件名称: CustomerServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.dao.ChangeRecordDao;
import com.knight.emms.dao.CustomerAccountDao;
import com.knight.emms.dao.CustomerDao;
import com.knight.emms.dao.CustomerLinkerDao;
import com.knight.emms.model.Customer;
import com.knight.emms.model.CustomerAccount;
import com.knight.emms.model.CustomerLinker;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.CustomerService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: CustomerServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:33:21
 */
public class CustomerServiceImpl extends BusinessLongPKServiceImpl<Customer> implements CustomerService {

	private CustomerDao customerDao;
	
	@Resource
	private BaseJDBCDao baseJdbcDao;
	
	@Resource
	private ChangeRecordDao changeRecordDao;

	@Resource
	private CustomerAccountDao customerAccountDao;

	@Resource
	private CustomerLinkerDao customerLinkerDao;

	@Resource
	private CodeService codeService;

	public CustomerServiceImpl(CustomerDao dao) {
		super(dao);
		this.customerDao = dao;
	}

	public void saveOrUpdate(Customer customer) {
		customerNameExist(customer.getCustomerId(),customer.getCustomerName());
		if (customer.getCustomerId() == null) {
			customerDao.save(customer);
		}
		customer.setSubCustomer();
		customerDao.merge(customer);
		customer.setCustomerLinker(null);
		customer.setCustomerAccount(null);
		for (CustomerLinker customerLinker : customer.getCustomerLinkerSet()) {
			if (customerLinker.isDefaultFlag()) {
				customer.setCustomerLinker(customerLinker);
			}
		}
		for (CustomerAccount customerAccount : customer.getCustomerAccountSet()) {
			if (customerAccount.isDefaultFlag()) {
				customer.setCustomerAccount(customerAccount);
			}
		}
		customerDao.merge(customer);
	}

	public void deletedLinker(Long customerLinkId) {
		customerLinkerDao.remove(customerLinkId);
	}

	public void deletedAccount(Long customerAccountId) {
		customerAccountDao.remove(customerAccountId);
	}

	public List<CustomerAccount> queryAccountTranslateAll(QueryFilter filter) {
		List<CustomerAccount> list = customerAccountDao.getAll(filter);
		return list;
	}

	public List<CustomerLinker> queryLinkerTranslateAll(QueryFilter filter) {
		List<CustomerLinker> list = customerLinkerDao.getAll(filter);
		for (CustomerLinker l : list) {
			l.setLinkerTypeName(codeService.getValue("linkerType", l.getLinkerType()));
		}
		return list;
	}

	@Override
	public void changeCustomerName(Long customerId, String customerName) {
		customerNameExist(customerId,customerName);
		Customer c = customerDao.get(customerId);
		StringBuffer sa = new StringBuffer();
		StringBuffer sb = new StringBuffer();
		StringBuffer sc = new StringBuffer();
		StringBuffer sd = new StringBuffer();
		StringBuffer se = new StringBuffer();
		StringBuffer sf = new StringBuffer();
		// TODO Auto-generated method stub
		String sql = "UPDATE T_CUSTOMER SET CUSTOMER_NAME = '"+customerName+"' WHERE CUSTOMER_ID = "+customerId+"";
		sa.append("UPDATE T_CUSTOMER SET CUSTOMER_NAME = '"+c.getCustomerName()+"' WHERE CUSTOMER_ID = "+customerId+"");
		//修改项目管理
		String sqa = "UPDATE T_PROJECT SET UN_CUSTOM_NAME = '"+customerName+"' WHERE UN_CUSTOM_ID = "+customerId+"";
		sb.append("UPDATE T_PROJECT SET UN_CUSTOM_NAME = '"+c.getCustomerName()+"' WHERE UN_CUSTOM_ID = "+customerId+"");
		//业务申请
		String sqb = "UPDATE T_CONTRACT_ARRANGE SET CUSTOMER_NAME = '"+customerName+"' WHERE CUSTOMER_ID = "+customerId+"";
		sc.append("UPDATE T_CONTRACT_ARRANGE SET CUSTOMER_NAME = '"+c.getCustomerName()+"' WHERE CUSTOMER_ID = "+customerId+"");
		//租赁合同
		String sqc = "UPDATE T_CONTRACT_LEASE SET PA_ENT_NAME = '"+customerName+"' WHERE PA_ENT = "+customerId+" AND PA_MODULE = '"+SystemConstant.MODULE_CUSTOMER+"' ";
		sd.append("UPDATE T_CONTRACT_LEASE SET PA_ENT_NAME = '"+c.getCustomerName()+"' WHERE PA_ENT = "+customerId+" AND PA_MODULE = '"+SystemConstant.MODULE_CUSTOMER+"' ");
		//结算管理
		String sqd = "UPDATE T_SETTLE_CONTRACT SET PA_ENT_NAME = '"+customerName+"' WHERE PA_ENT = "+customerId+" AND PA_MODULE = '"+SystemConstant.MODULE_CUSTOMER+"' ";
		se.append("UPDATE T_SETTLE_CONTRACT SET PA_ENT_NAME = '"+c.getCustomerName()+"' WHERE PA_ENT = "+customerId+" AND PA_MODULE = '"+SystemConstant.MODULE_CUSTOMER+"' ");
		//收款管理
		String sqe = "UPDATE T_AMOUNT_RECEIVE SET PAYMENT_NAME = '"+customerName+"' WHERE PAYMENT_ID = "+customerId+" AND PAYMENT_MODULE = '"+SystemConstant.MODULE_CUSTOMER+"' ";
		sf.append("UPDATE T_AMOUNT_RECEIVE SET PAYMENT_NAME = '"+c.getCustomerName()+"' WHERE PAYMENT_ID = "+customerId+" AND PAYMENT_MODULE = '"+SystemConstant.MODULE_CUSTOMER+"' ");
		changeRecordDao.recordChange(sql, sa.toString());
		changeRecordDao.recordChange(sqa, sb.toString());
		changeRecordDao.recordChange(sqb, sc.toString());
		changeRecordDao.recordChange(sqc, sd.toString());
		changeRecordDao.recordChange(sqd, se.toString());
		changeRecordDao.recordChange(sqe, sf.toString());
		baseJdbcDao.jdbcTemplate().execute(sql);
		baseJdbcDao.jdbcTemplate().execute(sqa);
		baseJdbcDao.jdbcTemplate().execute(sqb);
		baseJdbcDao.jdbcTemplate().execute(sqc);
		baseJdbcDao.jdbcTemplate().execute(sqd);
		baseJdbcDao.jdbcTemplate().execute(sqe);
	}
	
	@Override
	public void customerNameExist(Long customerId,String customerName){
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_customerName_S_EQ", customerName);
		if(customerId!=null){
			filter.addConjunctFilter("Q_customerId_L_NEQ", customerId+"");
		}
		List<Customer> list = customerDao.getAll(filter);
		if(list.size()>0) {
			throw new BusinessException("客户名称重复！");
		}
	}
}
