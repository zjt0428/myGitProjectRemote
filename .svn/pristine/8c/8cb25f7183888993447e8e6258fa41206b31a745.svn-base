/**
 *====================================================
 * 文件名称: MoneyLendServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-16			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.MoneyLendDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MoneyLend;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.MoneyLendService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: MoneyLendServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-16 下午5:39:27
 */
public class MoneyLendServiceImpl extends BusinessFlowServiceImpl<MoneyLend> implements MoneyLendService {

	private MoneyLendDao moneyLendDao;

	@Resource
	private BusinessMessageService businessMessageService;

	public MoneyLendServiceImpl(MoneyLendDao dao) {
		super(dao);
		this.moneyLendDao = dao;
	}

	public void saveOrMergeForEdit(MoneyLend moneyLend) {
		moneyLend.setArrearsAmount(moneyLendDao.queryArrearsAmount(moneyLend));
		if (moneyLend.getLendId() == null) {
			moneyLendDao.saveSerialModel(moneyLend);
		} else {
			moneyLendDao.merge(moneyLend);
		}
	}

	protected MoneyLend passFlowApproveApplication(FormApprove formApprove) {
		MoneyLend t = super.passFlowApproveApplication(formApprove);
		// 借款通过,发送消息
        List<Map<String,Object>> list = moneyLendDao.queryByScript("remaind.money_lend_approve", t.getLendId());
        for(Map<String,Object> map:list){
            BusinessMessage bm = new BusinessMessage();
            bm.setReceiveTel((String)map.get("REMAIND_TEL"));
            bm.setMessage((String)map.get("MESSAGE"));
            bm.setSenderName("借款消息");
            businessMessageService.sendOnce(bm);
        }
        return t;
	}

}
