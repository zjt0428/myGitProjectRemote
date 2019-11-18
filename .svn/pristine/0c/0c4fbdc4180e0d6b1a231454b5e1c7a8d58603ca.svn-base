package com.knight.emms.terminal.action;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.JsonObject;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ConstructOperation;
import com.knight.emms.model.ConstructPracti;
import com.knight.emms.service.ConstructOperationService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.emms.terminal.dto.ConstructOperationInfoResponse;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.FileAttachService;

/**
 * Created by YaoFly on 2016/8/23.
 */
public class AppConstructAction extends TerminalBaseAction {
	
	private static final long serialVersionUID = 1L;

	@Resource
	private ConstructOperationService constructOperationService;

	@Resource
	private FileAttachService fileAttachService;

	@ActionLog(description = "新增施工作业")
	public String add() {
		Tequest tequest = getTerminalMessage();
		ConstructOperation constructOperation = new ConstructOperation();
		String uid = String.valueOf(ApplicationContainer.getCurrentUserId()) == null ? ""
				: String.valueOf(ApplicationContainer.getCurrentUserId());
		String pDate = DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE);
		if (tequest.getConstructId() != null) {
			constructOperation = constructOperationService.get(tequest.getConstructId());
		}
		constructOperation.setConstructTheme(tequest.getConstructTheme());
		constructOperation.setUserName(tequest.getUsername());
		constructOperation.setConstructDate(tequest.getConstructDate());
		constructOperation.setProvidedDate(pDate);
		constructOperation.setConstructStartDate(tequest.getConstructStartDate());
		constructOperation.setEnterPlanDate(tequest.getEnterPlanDate());
		constructOperation.setLicensePlate(tequest.getLicensePlate());
		constructOperation.setEquipment(tequest.getEquipment());
		constructOperation.setProject(tequest.getProject());
		constructOperation.setTeams(tequest.getTeams());
		constructOperation.setPractiNames(tequest.getPractiNames());
		constructOperation.setBuildingNum(tequest.getBuildingNum());
		constructOperation.setRemark(tequest.getRemark());
		constructOperation.setConstructOperationPlanTasks(tequest.getConstructOperationPlanTasks());
		constructOperation.setStatus(Status.AppConstruct.waitingBegin);
		constructOperation.setFinishedAmount(BigDecimal.ZERO);
		constructOperation.setFundStatus(Status.Fund.payment);
		constructOperation.setSummary(new BigDecimal(tequest.getSummary()));
		constructOperation
				.setRemainderAmount(constructOperation.getSummary().subtract(constructOperation.getFinishedAmount()));
		constructOperation.setConstructPlanPractis(tequest.getConstructPlanPractis());
		constructOperation.setCreateBy(uid);
		constructOperationService.saveOrMergeForEdit(constructOperation);

		JsonObject obj = new JsonObject();
		obj.addProperty("constructId", constructOperation.getConstructId() != null
				? String.valueOf(constructOperation.getConstructId()) : "-1");
		String projectName = constructOperation.getProject().getProjectName() == null ? ""
				: tequest.getProject().getProjectName();
		String buildingNum = tequest.getBuildingNum() == null ? "" : tequest.getBuildingNum();
		String constructTheme = constructOperation.getConstructTheme() == null ? ""
				: constructOperation.getConstructTheme();
		String planDate = tequest.getEnterPlanDate() == null ? "" : tequest.getEnterPlanDate();
		String practiName = tequest.getPractiNames() == null ? "" : tequest.getPractiNames();
		String priactis = "";
		for (ConstructPracti cp : constructOperation.getConstructPlanPractiSet()) {
			priactis = String.valueOf(cp.getUserId()).concat(",").concat(priactis);
		}

		send("您收到一条作业计划," + projectName + "项目" + buildingNum + "楼号,主题是" + constructTheme + "," + "计划进场日期:" + planDate
				+ "," + "作业负责人:" + practiName, obj.toString(), uid, "CONSTRUCTIONPLAN");
		send("您收到一条作业计划," + projectName + "项目" + buildingNum + "楼号,主题是" + constructTheme + "," + "计划进场日期:" + planDate
				+ "," + "作业负责人:" + practiName, obj.toString(), priactis.substring(0, priactis.lastIndexOf(",")),
				"CONSTRUCTIONPLAN");
		String msg = "项目为" + projectName + ",主题是 " + constructOperation.getConstructTheme() + " 的计划已发布，计划"
				+ constructOperation.getConstructDate() + "前完成，" + "请" + practiName + "提前做好作业条件确认及相关准备工作，并及时填报完成情况。";
		constructOperationService.sendMessagePush(constructOperation, msg);
		return SUCCESS;
	}

	public String list() {
		Query query = getTerminalMessage().getQuery();
		QueryFilter filter = getTerminalQueryFilter(getTerminalMessage());
		filter.addConjunctFilter("Q_status_S_EQ", query.getStatus());
		Long projectId = query.getProjectId();
		if (projectId != null) {
			filter.addConjunctFilter("Q_project.projectId_L_EQ", String.valueOf(query.getProjectId()));
		}
		if (StringUtils.isNotBlank(query.getKeyword())) {
			filter.addFieldsDisjunctFilter(
					"Q_[project.projectName|equipment.recordId|constructTheme|teams|practiNames]_S_LK",
					query.getKeyword());
		}
		if (Status.AppConstruct.closed.equals(query.getStatus())) {
			filter.addSorted("closedDate", "DESC");
		} else {
			filter.addSorted("constructId", "DESC");
		}
		List<ConstructOperation> list = constructOperationService.queryTranslateAll(filter);
		ConstructOperationInfoResponse response = new ConstructOperationInfoResponse();
		response.addConstructOperations(list);
		setJsonString(GsonUtil.toJson(response, false));
		return SUCCESS;
	}

	public String load() {
		Query query = getTerminalMessage().getQuery();
		ConstructOperation constructOperation = constructOperationService.getTranslateAll(query.getConstructId());
		List<Long> fileIds = fileAttachService.getFileIdByDepend(getTerminalMessage().getQuery().getConstructId(),
				SystemConstant.MODULE_CONSTRUCT_OPERATION);
		constructOperation.setFileAttaches(StringUtils.join(fileIds, ","));
		successResponse(GsonUtil.toJson(constructOperation, GsonUtil.SINCE_VERSION_20, false));
		return SUCCESS;
	}

	public String fill() {
		Tequest tequest = getTerminalMessage();
		ConstructOperation constructOperation = constructOperationService.get(tequest.getConstructId());
		constructOperation.setUserName(tequest.getUsername());
		constructOperation.setReceiveDate(tequest.getReceiveDate());
		constructOperation.setMileage(tequest.getMileage());
		constructOperation.setActualDate(tequest.getActualDate());
		constructOperation.setActualPractiNames(tequest.getActualPractiNames());
		constructOperation.setSummary(new BigDecimal(tequest.getSummary()));
		constructOperation.setRemark(tequest.getRemark());
		constructOperation.setConstructOperationPlanTasks(tequest.getConstructOperationPlanTasks());
		constructOperation.setConstructOperationRealTasks(tequest.getConstructOperationRealTasks());
		constructOperation.setConstructRealPractis(tequest.getConstructRealPractis());
		constructOperation.setStatus(Status.AppConstruct.finished);
		constructOperation.setCreateBy(String.valueOf(tequest.getCreateBy()));
		super.isCreateFileAttach = true;
		constructOperationService.saveOrMergeForEdit(constructOperation);
		String msg = "项目为" + constructOperation.getProject().getProjectName() + "，主题是"
				+ constructOperation.getConstructTheme() + "的计划，现已完成进场前作业条件的确认工作" + "，已可以进场，请抓紧按计划进场作业！";
		constructOperationService.sendMessagePush(constructOperation, msg);
		setTerminalFileAttach(constructOperation.getConstructId(), tequest.getFileAttaches());
		return SUCCESS;
	}

	public String closed() {
		Tequest tequest = getTerminalMessage();
		String pDate = DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE);
		ConstructOperation constructOperation = constructOperationService.get(tequest.getConstructId());
		constructOperation.setClosedUserId(ApplicationContainer.getCurrentUserId());
		constructOperation.setClosedUserName(ApplicationContainer.getCurrentUser().getFullname());
		constructOperation.setClosedDate(pDate);
		constructOperation.setStatus(Status.AppConstruct.closed);
		constructOperationService.saveOrMergeForEdit(constructOperation);
		JsonObject obj = new JsonObject();
		obj.addProperty("closedUserId", ApplicationContainer.getCurrentUserId());
		obj.addProperty("closedUserName", ApplicationContainer.getCurrentUser().getFullname());
		obj.addProperty("providedDate", pDate);
		obj.addProperty("status", Status.AppConstruct.closed);
		if (tequest.getCreateBy() != null || tequest.getCreateBy().equals(new Long(0))) {
			send("您收到一条作业反馈," + constructOperation.getProject().getProjectName() + "项目"
					+ constructOperation.getBuildingNum() + "楼号,主题是" + constructOperation.getConstructTheme() + ","
					+ "作业完成时间:" + constructOperation.getClosedDate(), obj.toString(),
					String.valueOf(tequest.getCreateBy()), "CONSTRUCTIONPLAN_COMPLETE");
		}
		String msg = "项目为" + constructOperation.getProject().getProjectName() + "，主题是"
				+ constructOperation.getConstructTheme() + "的计划，已于" + constructOperation.getActualDate() + "完成，请知悉!";
		constructOperationService.sendMessagePush(constructOperation, msg);
		return SUCCESS;
	}

}
