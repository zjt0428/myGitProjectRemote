/**
 *====================================================
 * 文件名称: BusinessFlowServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-11			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.FormReview;
import com.knight.emms.model.ScrapContract;
import com.knight.emms.model.TFlowDefineReview;
import com.knight.emms.service.TFlowDefineReviewService;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: BusinessFlowServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-11 上午7:54:36
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public abstract class BusinessFlowServiceImpl<T extends ApplyforState> extends BaseBusinessModelServiceImpl<T> implements BusinessFlowService<T> {

	protected Map<String, String> passAcceptStateMap = new HashMap<String, String>();

	protected Map<String, String> passReviewStateMap = new HashMap<String, String>();

	protected Map<String, String> passApproveStateMap = new HashMap<String, String>();

	protected Map<String, String> rejectAcceptStateMap = new HashMap<String, String>();

	protected Map<String, String> rejectApproveStateMap = new HashMap<String, String>();

	protected Map<String, String> rejectReviewStateMap = new HashMap<String, String>();

	@Resource
	protected TFlowDefineReviewService tFlowDefineReviewService;

	public BusinessFlowServiceImpl(BaseBusinessModelDao<T> dao) throws RuntimeException {
		super(dao);
		passAcceptStateMap.put(Status.Applyfor.waitAccept, Status.Applyfor.waitApprove);
		rejectAcceptStateMap.put(Status.Applyfor.waitAccept, Status.Applyfor.waitSubmit);

		passReviewStateMap.put(Status.Applyfor.waitreview, Status.Applyfor.waitAccept);
		rejectReviewStateMap.put(Status.Applyfor.waitreview, Status.Applyfor.waitSubmit);

		passApproveStateMap.put(Status.Applyfor.waitApprove, Status.Applyfor.passed);
		rejectApproveStateMap.put(Status.Applyfor.waitApprove, Status.Applyfor.waitSubmit);
	}

	@Override
	public T editLoad(T t) throws RuntimeException {
		T p = dao.get(t.getApplyforId());
		if (p.getUserId() != null && !ApplicationContainer.getCurrentUserId().equals(p.getUserId())) {
			throw new BusinessException("该申请信息只有申请人才能修改!");
		}
		return p;
	}

	protected void passFlowAcceptApplication(T t) throws RuntimeException {
		if (passAcceptStateMap.containsKey(t.getApplyforState())) {
			t.setApplyforState(passAcceptStateMap.get(t.getApplyforState()));
		} else {
			throw new BusinessException("申请状态不符合要求!");
		}
	}

	protected T passFlowAcceptApplication(FormAccept formAccept) throws RuntimeException {
		T t = dao.get(formAccept.getRelateId());
		passFlowAcceptApplication(t);
		return t;
	}

	@Override
	public void passAcceptApplication(FormAccept formAccept) throws RuntimeException {
		dao.save(passFlowAcceptApplication(formAccept));
	}

	protected void rejectFlowAcceptApplication(T t) throws RuntimeException {
		if (rejectAcceptStateMap.containsKey(t.getApplyforState())) {
			t.setApplyforState(rejectAcceptStateMap.get(t.getApplyforState()));
		} else {
			throw new BusinessException("申请状态不符合要求!");
		}
	}

	protected T rejectFlowAcceptApplication(FormAccept formAccept) throws RuntimeException {
		T t = dao.get(formAccept.getRelateId());
		rejectFlowAcceptApplication(t);
		return t;
	}

	@Override
	public void rejectAcceptApplication(FormAccept formAccept) throws RuntimeException {
		dao.save(rejectFlowAcceptApplication(formAccept));
	}

	protected void passFlowReviewApplication(T t) throws RuntimeException {
		if (t instanceof ScrapContract) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_relateId_L_EQ", String.valueOf(((ScrapContract) t).getContractId()));
			filter.addConjunctFilter("Q_relateModule_S_EQ", Constant.SCRAP_CONTRACT);
			filter.addConjunctFilter("Q_state_S_EQ", Constant.UNREVIEW);
			List<TFlowDefineReview> tfd = tFlowDefineReviewService.queryTranslateAll(filter);
			if (tfd.size() > 0) {
				passReviewStateMap.put(Status.Applyfor.waitreview, Status.Applyfor.waitreview);
			}
		}
		if (passReviewStateMap.containsKey(t.getApplyforState())) {
			t.setApplyforState(passReviewStateMap.get(t.getApplyforState()));
		} else {
			throw new BusinessException("申请状态不符合要求!");
		}
	}

	protected T passFlowReviewApplication(FormReview formReview) throws RuntimeException {
		T t = dao.get(formReview.getRelateId());
		passFlowReviewApplication(t);
		return t;
	}

	public void passReviewApplication(FormReview formReview) throws RuntimeException {
		dao.save(passFlowReviewApplication(formReview));
	}

	protected void rejectFlowReviewApplication(T t) throws RuntimeException {
		if (rejectReviewStateMap.containsKey(t.getApplyforState())) {
			t.setApplyforState(rejectReviewStateMap.get(t.getApplyforState()));
		} else {
			throw new BusinessException("申请状态不符合要求!");
		}
	}

	protected T rejectFlowReviewApplication(FormReview formReview) throws RuntimeException {
		T t = dao.get(formReview.getRelateId());
		rejectFlowReviewApplication(t);
		return t;
	}

	@Override
	public void rejectReviewApplication(FormReview formReview) throws RuntimeException {
		dao.save(rejectFlowReviewApplication(formReview));
	}

	protected void passFlowApproveApplication(T t) throws RuntimeException {
		if (passApproveStateMap.containsKey(t.getApplyforState())) {
			t.setApplyforState(passApproveStateMap.get(t.getApplyforState()));
		} else {
			throw new BusinessException("申请状态不符合要求!");
		}
	}

	protected T passFlowApproveApplication(FormApprove formApprove) throws RuntimeException {
		T t = dao.get(formApprove.getRelateId());
		passFlowApproveApplication(t);
		return t;
	}

	@Override
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		dao.save(passFlowApproveApplication(formApprove));
	}

	protected void rejectFlowApproveApplication(T t) throws RuntimeException {
		if (rejectApproveStateMap.containsKey(t.getApplyforState())) {
			t.setApplyforState(rejectApproveStateMap.get(t.getApplyforState()));
		} else {
			throw new BusinessException("申请状态不符合要求!");
		}
	}

	protected T rejectFlowApproveApplication(FormApprove formApprove) throws RuntimeException {
		T t = dao.get(formApprove.getRelateId());
		rejectFlowApproveApplication(t);
		return t;
	}

	@Override
	public void rejectApproveApplication(FormApprove formApprove) throws RuntimeException {
		dao.save(rejectFlowApproveApplication(formApprove));
	}

}
