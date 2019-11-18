/**
 *====================================================
 * 文件名称: InvoiceCollectDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao;

import java.math.BigDecimal;
import java.util.List;

import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.model.InvoiceCollect;

/**
 * @ClassName: InvoiceCollectDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:16:39
 */
public interface InvoiceCollectDao extends BaseBusinessModelDao<InvoiceCollect> {

	public List<InvoiceCollect> getInvoiceCollectBySerial(InvoiceCollect invoiceCollect);

	public BigDecimal queryHasCollectAmount(InvoiceCollect invoiceCollect);

}
