/**
 *====================================================
 * 文件名称: InvoiceCollectDaoImpl.java
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
import com.knight.emms.dao.InvoiceCollectDao;
import com.knight.emms.model.InvoiceCollect;

/**
 * @ClassName: InvoiceCollectDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:20:29
 */
public class InvoiceCollectDaoImpl extends BaseBusinessModelDaoImpl<InvoiceCollect> implements InvoiceCollectDao {

	public List<InvoiceCollect> getInvoiceCollectBySerial(InvoiceCollect invoiceCollect) {
		String hql = "from InvoiceCollect d where d.invoiceSerial = ? and d.delFlag = '1'";
		return findByHql(hql, new Object[] { invoiceCollect.getInvoiceSerial() });
	}

	public BigDecimal queryHasCollectAmount(InvoiceCollect invoiceCollect) {
		String sql = "SELECT SUM(COLLECT_AMOUNT) FROM T_INVOICE_COLLECT WHERE RELATE_ID = ? AND RELATE_MODULE = ? AND APPLYFOR_STATE = ?";
		BigDecimal hasCollectAmount = this.jdbcTemplate.queryForObject(sql, BigDecimal.class, invoiceCollect.getRelateId(), invoiceCollect.getRelateModule(), Status.InvoiceApplyfor.passed);
		if (hasCollectAmount == null) {
			hasCollectAmount = EmmsConstant.ZERO;
		}
		return hasCollectAmount;
	}

}
