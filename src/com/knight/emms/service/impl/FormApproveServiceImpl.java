/**
 *====================================================
 * 文件名称: FormApproveServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Type;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.dao.DispatchComponDao;
import com.knight.emms.dao.FormApproveDao;
import com.knight.emms.dao.LogisticsTrandetailDao;
import com.knight.emms.dao.StoreJoinComponentDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.FormApproveService;
import com.knight.emms.service.ProjectService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

import lombok.Setter;

/**
 * @ClassName: FormApproveServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-7 上午8:11:18
 */
public class FormApproveServiceImpl extends BusinessLongPKServiceImpl<FormApprove> implements FormApproveService {

	private FormApproveDao formApproveDao;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	@Resource
	private LogisticsTrandetailDao logisticsTrandetailDao;
	
	@Resource
	private DispatchComponDao dispatchComponDao;
	
	@Resource
	private StoreJoinComponentDao storeJoinComponentDao;

	@Setter
	private Map<String, BusinessFlowService<ApplyforState>> businessFlowServices = new HashMap<String, BusinessFlowService<ApplyforState>>();

	public FormApproveServiceImpl(FormApproveDao dao) {
		super(dao);
		this.formApproveDao = dao;
	}

	private void checkApplyfor(FormApprove formApprove) {
		if (businessFlowServices.containsKey(formApprove.getRelateModule())) {
			BusinessFlowService<ApplyforState> flowService = businessFlowServices.get(formApprove.getRelateModule());
			if (Type.Applyfor.pass.equals(formApprove.getApproveOpinion())) {
				flowService.passApproveApplication(formApprove);
			} else {
				flowService.rejectApproveApplication(formApprove);
			}
		} else {
			throw new BusinessException("审批类型未定义,不支持该审批信息!");
		}
	}

	public void parserApprove(FormApprove formApprove) {
		checkApplyfor(formApprove);
		formApproveDao.save(formApprove);
	}

	@Override
	public void rollbackRecord(Long relateId, String relateModule) {
		FormApprove formApprove = new FormApprove();
		formApprove.setApproveUserid(ApplicationContainer.getCurrentUserId());
		formApprove.setApproveUsername(ApplicationContainer.getCurrentUser().getFullname());
		formApprove.setApproveDep(ApplicationContainer.getCurrentUser().getDepartment().getDepName());
		formApprove.setApproveTime(new Date());
		formApprove.setApproveOpinion(Constant.DISENABLED);
		formApprove.setRelateId(relateId);
		formApprove.setRelateModule(relateModule);
		formApprove.setApproveRemark("回退操作！");
		formApproveDao.save(formApprove);
	}
}
