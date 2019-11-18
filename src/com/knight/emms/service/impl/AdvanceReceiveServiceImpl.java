/**
 *====================================================
 * 文件名称: AdvanceReceiveServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.AdvanceReceiveDao;
import com.knight.emms.dao.ClosedSettleInfoDao;
import com.knight.emms.domain.FundReceiveVoucherService;
import com.knight.emms.service.AdvanceReceiveService;

/**
 * @ClassName: AdvanceReceiveServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:26:33
 */
public class AdvanceReceiveServiceImpl extends BusinessFlowServiceImpl<AdvanceReceive> implements AdvanceReceiveService {



	private AdvanceReceiveDao advanceReceiveDao;
	
	@Resource
	private ClosedSettleInfoDao closedSettleInfoDao;

	@Setter
	private Map<String, FundReceiveVoucherService> fundReceiveVoucherServices = new HashMap<String, FundReceiveVoucherService>();

    @Resource
    private BusinessMessageService businessMessageService;

	@Override
	public void saveOrMergeForEdit(AdvanceReceive t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AdvanceReceive getTranslateFull(Long adreceiveId) {
		// TODO Auto-generated method stub
		return null;
	}

	public AdvanceReceiveServiceImpl(BaseBusinessModelDao<AdvanceReceive> dao) throws RuntimeException {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	public void isCloseSettle(AdvanceReceive advanceReceive){
		String providedDate = advanceReceive.getProvidedDate().substring(0,7);
		String startSettleDate = advanceReceive.getAdvanceDate().substring(0,7);
		List<Map<String, Object>> list = closedSettleInfoDao.queryByScript("settle.close_settle_by_months",providedDate,startSettleDate);
		if(list!=null && list.size()>0){
			throw new BusinessException("填报日期和预收款日期处于关账期间，无法操作！");
		}
	}
	
	public void passApproveApplication(FormApprove formApprove) {
		AdvanceReceive t = super.passFlowApproveApplication(formApprove);
		isCloseSettle(t);
	}
	
	@Override
	public void rejectApproveApplication(FormApprove formApprove) {
		AdvanceReceive t = super.rejectFlowApproveApplication(formApprove);
		isCloseSettle(t);
	}
}
