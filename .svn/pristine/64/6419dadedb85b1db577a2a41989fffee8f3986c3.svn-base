/**
 *====================================================
 * 文件名称: DispatchServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.reflect.TypeToken;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.StringUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.core.service.BusinessFlowServiceAbstract;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.DispatchAllocateDao;
import com.knight.emms.dao.DispatchAutocraneDao;
import com.knight.emms.dao.DispatchComponDao;
import com.knight.emms.dao.DispatchDao;
import com.knight.emms.dao.DispatchEquipDao;
import com.knight.emms.dao.DispatchPractiDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.PractiDispatchDao;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.domain.IUploadTerminalDomain;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.DispatchPracti;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LeaseContract;
import com.knight.emms.model.LogisticsTransport;
import com.knight.emms.model.PractiDispatch;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.Project;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.PractiDispatchService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Setter;

/**
 * @ClassName: DispatchServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:28:27
 */
public class PractiDispatchServiceImpl extends BusinessFlowServiceAbstract<PractiDispatch>
		implements PractiDispatchService {

	private PractiDispatchDao practiDispatchDao;

	@Resource
	private BusinessMessageDao businessMessageDao;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private PractitionerDao practitionerDao;

	@Resource
	private ProjectDao projectDao;

	public PractiDispatchServiceImpl(PractiDispatchDao dao) {
		super(dao);
		this.practiDispatchDao = dao;
		rejectAcceptStateMap.put(Status.DispatchApplyfor.waitAccept, Status.DispatchApplyfor.rejected);
		rejectApproveStateMap.put(Status.DispatchApplyfor.waitApprove, Status.DispatchApplyfor.rejected);
	}

	private void completeCreateDispatch(PractiDispatch dispatch) {
		dispatch.setDispatchId(null);
		dispatch.setDelFlag(Constant.ENABLED);
		dispatch.setApplyforState(Status.DispatchApplyfor.waitSubmit);
	}

	private void initialzeAccount() {
		String openurl = (String) ApplicationContainer.getSystemParam("sms.openurl");
		String account = (String) ApplicationContainer.getSystemParam("sms.account");
		String enterprise = (String) ApplicationContainer.getSystemParam("sms.enterprise");
		String authkey = (String) ApplicationContainer.getSystemParam("sms.authkey");
		int cgid = (Integer) ApplicationContainer.getSystemParam("sms.cgid");
		int csid = (Integer) ApplicationContainer.getSystemParam("sms.csid");
		OpenApi.initialzeAccount(openurl, account, enterprise, authkey, cgid, csid);
	}

	@Override
	public PractiDispatch getTranslateFull(Long dispatchId) {
		PractiDispatch p = practiDispatchDao.get(dispatchId);
		CodeServiceImpl.translate(p, getPersistantStruct());
		CodeServiceImpl.translate(p.getPractitioner(), practitionerDao.getPersistantStruct());
		return p;
	}

	@Override
	public void submitDispatch(Long dispatchId) {
		PractiDispatch p = practiDispatchDao.get(dispatchId);
		if (!Status.PractiDispatchApplyForState.waitSubmit.equals(p.getApplyforState())) {
			throw new BusinessException("派工方案[" + p.getDispatchSerial() + "]状态不合法,无法提交!");
		}
		p.setApplyforState(Status.PractiDispatchApplyForState.waitApprove);
		practiDispatchDao.save(p);
	}
	
	@Override
	public void rejectApproveApplication(FormApprove formApprove) throws RuntimeException {
		PractiDispatch p = super.rejectFlowApproveApplication(formApprove);
		p.setApplyforState(Status.PractiDispatchApplyForState.waitSubmit);
		practiDispatchDao.save(p);
	}
	
	@Override
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		PractiDispatch p = passFlowApproveApplication(formApprove);
		saveSerialModel(p);
		Project project = projectDao.get(p.getProjectId());
		Practitioner pt = practitionerDao.get(p.getPractiId());
		pt.setProject(project);
		pt.setProjectName(p.getProjectName());
		pt.setKindWork(p.getKindWork());
		pt.setTeams(p.getTeams());
		pt.setClarificaStatus("0");
		pt.setIncumbent("1");
		practiDispatchDao.save(p);
	}
}
