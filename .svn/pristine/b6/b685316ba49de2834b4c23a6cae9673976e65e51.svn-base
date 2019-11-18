/**
 *====================================================
 * 文件名称: ConstructOperationServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月6日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.*;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.ConstructOperationDao;
import com.knight.emms.dao.ConstructOperationTaskDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ConstructOperationService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.dao.AppUserDao;
import com.knight.system.model.AppUser;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: ConstructOperationServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月6日 上午11:17:29
 */
public class ConstructOperationServiceImpl extends BusinessFlowServiceImpl<ConstructOperation> implements ConstructOperationService, FundPaymentVoucherService {

	@Resource
	private ConstructOperationTaskDao constructOperationTaskDao;

    @Resource
    private AppUserDao appUserDao;

	private ConstructOperationDao constructOperationDao;

    @Resource
    private BusinessMessageService businessMessageService;

	public ConstructOperationServiceImpl(ConstructOperationDao dao) {
		super(dao);
		this.constructOperationDao = dao;
	}

	public List<ConstructOperation> queryTranslateAll(QueryFilter queryFilter) {
		List<ConstructOperation> list = constructOperationDao.getAll(queryFilter);
		for (ConstructOperation co : list) {
			CodeServiceImpl.translate(co);
			CodeServiceImpl.translate(co.getEquipment());
		}
		return list;
	}

	public ConstructOperation getTranslateAll(Long constructId) {
		ConstructOperation co = constructOperationDao.get(constructId);
		CodeServiceImpl.translate(co.getEquipment());
		CodeServiceImpl.translate(co.getProject());
		CodeServiceImpl.translate(co);
		return co;
	}

	public void saveOrMergeForEdit(ConstructOperation constructOperation) {
		if (constructOperation.getConstructId() == null) {
			constructOperationDao.saveSerialModel(constructOperation);
		}
		constructOperation.setSubConstructOperation();
		constructOperationDao.merge(constructOperation);
	}

	public void deleteTask(Long taskId) {
		constructOperationTaskDao.remove(taskId);
	}

	public void effective(ConstructOperation constructOperation) {
		constructOperation.setStatus(Status.AppConstruct.closed);
		constructOperation.setClosedDate(DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE));
		constructOperationDao.save(constructOperation);
	}

	public void loseEffective(ConstructOperation constructOperation) {
		constructOperation.setStatus(Status.AppConstruct.waitingBegin);
		constructOperationDao.save(constructOperation);
	}

	@Override
	public void sendMessagePush(ConstructOperation constructOperation,String msg) {
		Map<String,Object> teamMan = constructOperationDao.queryByScript("terminal.list_usersForConstruct",constructOperation.getTeams()).get(0);
        List<Map<String,Object>> list = queryByScript("terminal.get_currentAppPracti", teamMan.get("USERID"));
        Set<ConstructPracti> set = constructOperation.getConstructRealPractiSet().size()==0?constructOperation.getConstructPlanPractiSet():constructOperation.getConstructRealPractiSet();
        List<String> tels = new ArrayList<String>();
        tels.add((String)teamMan.get("MOBILE"));
        for(int i=0;i<list.size();i++){
			tels.add((String) list.get(i).get("DUTYMAN_TEL1"));
			tels.add((String) list.get(i).get("DUTYMAN_TEL2"));
			tels.add((String) list.get(i).get("DUTYMAN_TEL3"));
        }
        for(ConstructPracti constructPracti:set){
            AppUser user = appUserDao.get(constructPracti.getUserId());
            tels.add(user.getMobile());
        }
        if(constructOperation.getProject()!=null&&constructOperation.getProject().getProjectMobile()!=null){
        	tels.add(constructOperation.getProject().getProjectMobile().toString());
        }
        for(int i=0;i<tels.size();i++){
			if(tels.get(i)!=null) {
                BusinessMessage bm = new BusinessMessage();
                bm.setReceiveTel(tels.get(i));
                bm.setMessage(msg);
                bm.setSenderName("施工作业消息");
    			bm.setSendFlag("0");
    			bm.setMsgType("0");
    			bm.setModule("CONSTRUCT");
                businessMessageService.sendOnce(bm);
            }
        }
	}

	@Override
	public BigDecimal getRelatePaymentAmount(Long constructId) {
		ConstructOperation co = constructOperationDao.get(constructId);
		return co.getSummary();
	}

	@Override
	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long constructId, String status) {
		ConstructOperation co = constructOperationDao.get(constructId);
		co.setFinishedAmount(amountPayment.getHasPaymentAmount());
		co.setRemainderAmount(co.getSummary().subtract(co.getFinishedAmount()));
		co.setFundStatus(status);
		constructOperationDao.save(co);
	}

	protected ConstructOperation passFlowAcceptApplication(FormAccept formAccept) {
		ConstructOperation constructOperation = dao.get(formAccept.getRelateId());
		constructOperation.setConfimDate(DateUtil.changeDateToStr(formAccept.getAcceptTime(),DateUtil.LINK_DISPLAY_DATE));
		if(constructOperation.getStatus().equals(Status.AppConstruct.overTime)) {
            constructOperation.setStatus(Status.AppConstruct.waitingBegin);
        }
		passFlowAcceptApplication(constructOperation);
		return constructOperation;
	}

}
