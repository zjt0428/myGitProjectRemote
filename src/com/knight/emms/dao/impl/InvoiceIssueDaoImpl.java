/**
 *====================================================
 * 文件名称: InvoiceIssueDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.math.BigDecimal;
import java.util.List;

import com.knight.emms.constant.EmmsConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.InvoiceIssueDao;
import com.knight.emms.model.InvoiceIssue;

/**
 * @ClassName: InvoiceIssueDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:20:46
 */
public class InvoiceIssueDaoImpl extends BaseBusinessModelDaoImpl<InvoiceIssue> implements InvoiceIssueDao {

	public List<InvoiceIssue> getInvoiceIssueBySerial(InvoiceIssue invoiceIssue) {
		String hql = "from InvoiceIssue d where d.invoiceSerial = ? and d.delFlag = '1'";
		return findByHql(hql, new Object[] { invoiceIssue.getInvoiceSerial() });
	}

	public BigDecimal queryHasIssueAmount(InvoiceIssue invoiceIssue) {
		String sql = "SELECT SUM(ISSUE_AMOUNT) FROM T_INVOICE_ISSUE WHERE RELATE_ID = ? AND RELATE_MODULE = ? AND APPLYFOR_STATE = ?";
		BigDecimal hasIssueAmount = this.jdbcTemplate.queryForObject(sql, BigDecimal.class, invoiceIssue.getRelateId(), invoiceIssue.getRelateModule(), Status.InvoiceApplyfor.passed);
		if (hasIssueAmount == null) {
			hasIssueAmount = EmmsConstant.ZERO;
		}
		return hasIssueAmount;
	}

}
