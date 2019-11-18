/**
 *====================================================
 * 文件名称: AppDispatchAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.JsonObject;
import com.knight.app.model.TAppRepair;
import com.knight.app.model.TAppRepairCompon;
import com.knight.app.model.TAppRepairType;
import com.knight.app.service.TAppRepairComponService;
import com.knight.app.service.TAppRepairService;
import com.knight.app.service.TAppRepairTypeService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.domain.ListenPatch36;
import com.knight.emms.domain.impl.ScheduleAppRepairDomainImpl;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.ElevatorMonitorService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.model.FileAttach;
import com.knight.system.service.CodeService;
import com.knight.system.service.DepartmentService;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: AppDispatchAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author zhangyz
 * @date
 */
public class AppRepairAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;
	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	@Getter
	@Setter
	private TAppRepair repair;

	@Getter
	@Setter
	private Long repid;

	@Resource
	private TAppRepairService repairService;
	
    @Resource
    private DepartmentService departmentService;

	@Resource
	private TAppRepairComponService repairComponServic;

	@Resource
	private FileAttachService fileAttachService;

	@Resource
	private ProjectService projectService;

	@Resource
	private TAppRepairTypeService typeService;

	@Resource
	private ElevatorMonitorService elevatorMonitorService;
	
	@Resource
	private CodeService codeService;

	public AppRepairAction() {

	}
	/*
	 * public String queryList() { Query query = getTerminalMessage().getQuery();
	 * QueryFilter filter = new QueryFilter();
	 * 
	 * String projName = ""; String recordSerial = ""; String createByname = "";
	 * 
	 * if(query!=null){ projName = query.getProjName(); recordSerial =
	 * query.getRecordSerial(); createByname = query.getCreateByname();
	 * 
	 * System.out.println("repair: projName="+projName+"  recordSerial="
	 * +recordSerial + "  createByname="+createByname);
	 * filter.addConjunctFilter("Q_projName_S_LK", projName);
	 * filter.addConjunctFilter("Q_recordSerial_S_LK", recordSerial);
	 * if(createByname==null ||createByname.equals("")){}else{
	 * filter.addConjunctFilter("Q_createByname_S_EQ",createByname); }
	 * 
	 * 
	 * } filter.addSorted("repid", "desc"); List<TAppRepair> list =
	 * repairService.queryTranslateAll(filter); for (TAppRepair appRep : list) {
	 * List<Long> fileIds = fileAttachService.getFileIdByDepend(appRep.getRepid(),
	 * "APP_REPAIR"); appRep.setFileAttaches(StringUtils.join(fileIds, ",")); }
	 * 
	 * successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
	 * return SUCCESS; }
	 */

	public String queryList() {
		Query query = getTerminalMessage().getQuery();
		// QueryFilter filter = new QueryFilter();

		String projName = "";
		String recordSerial = "";
		String userid = "";
		String projState = "";
		String exwSerial = "";
		String buildNum = "";
		Long type = (long) 0;
		Long equipId = (long) 0;

		if (query != null) {
			logger.info("接收参数type==>" + query.getType());
			logger.info("接收参数userid==>" + query.getUserId().toString());
			logger.info("接收参数projState==>" + query.getProjState());
			projName = query.getProjName() == null ? "" : query.getProjName();
			recordSerial = query.getRecordSerial() == null ? "" : query.getRecordSerial();
			userid = query.getUserId().toString();
			projState = query.getProjState();
			exwSerial = query.getExwSerial() == null ? "" : query.getExwSerial();
			buildNum = query.getBuildingNum() == null ? "" : query.getBuildingNum();
			type = query.getType();
			equipId = query.getEquipId();
		}
		// System.out.println("repair: projName="+projName+" recordSerial="
		// +recordSerial + " createByname="+userid);
		List<Map<String, Object>> maplist = null;
		List<Map<String, Object>> list1 = null;

		if (type == 0) {
			maplist = repairService.queryByScript("terminal.list_app_repair", projState, query.getUserId(),
					"%" + userid + "%", "%" + projName + "%", "%" + recordSerial + "%", "%" + exwSerial + "%",
					"%" + buildNum + "%", equipId);
			if ("4".equals(projState)) {
				list1 = repairService.queryByScript("terminal.list_app_repair", "0", query.getUserId(),
						"%" + userid + "%", "%" + projName + "%", "%" + recordSerial + "%", "%" + exwSerial + "%",
						"%" + buildNum + "%", equipId);
				maplist.addAll(list1);
			}
		} else if (type == 5) { // 维修信息查询
			maplist = repairService.queryByScript("terminal.list_equip_repair", userid, equipId);

		} else {
			maplist = repairService.queryByScript("terminal.list_app_repair_admin", projState, userid,
					"%" + projName + "%", "%" + recordSerial + "%", "%" + exwSerial + "%", "%" + buildNum + "%",
					equipId);
			// if("4".equals(projState)){
			// list1 =
			// repairService.queryByScript("terminal.list_app_repair_admin","0",userid,
			// "%"+projName+"%","%"+recordSerial+"%","%"+exwSerial+"%","%"+buildNum+"%",equipId);
			// maplist.addAll(list1);
			// }
		}

		List<TAppRepair> list = new ArrayList<TAppRepair>();
		for (Map map : maplist) {
			TAppRepair appRep = new TAppRepair();
			appRep.setRepid((Long) map.get("REPID"));
			appRep.setProjName((String) map.get("PROJ_NAME"));
			appRep.setRecordSerial((String) map.get("RECORD_SERIAL"));
			appRep.setExwSerial((String) map.get("EXW_SERIAL"));
			appRep.setBuildingNum((String) map.get("BUILDING_NUM"));
			appRep.setState((String) map.get("STATE"));
			appRep.setFaultDesc((String) map.get("FAULT_DESC"));
			Object disDate = map.get("DIS_DATE");
			if (disDate != null) {
				appRep.setDisDate((df.format((Date) map.get("DIS_DATE"))));
			}
			appRep.setRepTimes((String) map.get("REP_TIMES"));

			Object reportDt = map.get("REPORT_DT");
			if (reportDt != null) {
				appRep.setReportDt(df.format((Date) map.get("REPORT_DT")));
			}
			appRep.setCreateDt(df.format((Date) map.get("CREATE_DT")));

			Object repairDt = map.get("REPAIR_DT");
			if (repairDt != null) {
				appRep.setRepairDt(df.format((Date) map.get("REPAIR_DT")));
			}
			appRep.setCreateDt(df.format((Date) map.get("CREATE_DT")));
			appRep.setEquipSpec((String) map.get("EQUIPSPEC"));
			appRep.setProcResult((String) map.get("PROC_RESULT"));
			appRep.setFaultLevel((String) map.get("FAULT_LEVEL"));
			appRep.setCreateBy((Long) map.get("CREATE_BY"));
			appRep.setCreateByname((String) map.get("CREATE_BYNAME"));
			appRep.setLocation((String) map.get("LOCATION"));
			appRep.setDisMan((String) map.get("DIS_MAN"));

			System.out.println(appRep.getCreateByname() + "||| mapname=" + (String) map.get("CREATE_BYNAME"));
			appRep.setStateName((String) map.get("STATENAME"));
			List<Long> fileIds = fileAttachService.getFileIdByDepend(appRep.getRepid(), "APP_REPAIR");
			appRep.setFileAttaches(StringUtils.join(fileIds, ","));
			if (appRep.getDisMan() != null) {
				String[] dismans = appRep.getDisMan().split(",");
				List<String> userNames = new ArrayList<String>();
				for (int i = 0; i < dismans.length; i++) {
					AppUser appUser = appUserService.get(Long.valueOf(dismans[i]));
					userNames.add(appUser.getFullname());
				}
				appRep.setDisManName(StringUtils.join(userNames, ","));
			}
			Set<TAppRepairCompon> repairComponSet = new HashSet<TAppRepairCompon>();
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_repid_L_EQ", String.valueOf(appRep.getRepid()));
			List<TAppRepairCompon> comList = repairComponServic.getAll(filter);
			if (comList != null && comList.size() > 0) {
				for (TAppRepairCompon repCom : comList) {
					repairComponSet.add(repCom);
				}
			}
			appRep.setRepairComponSet(repairComponSet);
			list.add(appRep);
		}

		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新工作备忘")
	public String applyPatch() throws ParseException {
		String disMan = ""; // 派工给处理 的人
		String disDate = df.format(new Date()); // 派工时间
		String repairType = ""; // 故障类型
		String disRemark = ""; // 备注
		String type = "0";
		String stateName = "";
		String createByname = "";
		String buildingNum = "";
		String equipSpec = ""; // 规格型号
		String recordSerial = ""; // 备案编号
		String exwSerial = ""; // 出厂编号
		String projName = "";
		String location = "";
		String faultLevel = "";
		String faultDesc = "";
		String createDt = "";
		String weightOfFailure = "";
		String inputVoltage = "";
		String breakdownVoltage = "";
		String switchFault1 = ""; // 开关故障1
		String switchFault2 = ""; // 开关故障2
		String switchFault3 = ""; // 开关故障3

		boolean bl = true;
		Tequest tequest = getTerminalMessage();

		type = tequest.getType();
		// if(tequest.getRepId()==null || tequest.getRepId() == 0){
		// bl = false;
		// }
		if (tequest.getDisMan() == null || tequest.getDisMan().equals("")) {
			bl = false;
		}
		if (tequest.getDisDate() == null || tequest.getDisDate().equals("")) {
			bl = false;
		}
		if (tequest.getRepairType() == null || tequest.getRepairType().equals("")) {
			bl = false;
		}

		if (bl == false) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		// if(tequest.getRemark()==null || tequest.getRemark().equals("")){
		// bl = false;
		// }
		TAppRepair repair = repairService.getTranslate(tequest.getRepId());
		if (repair == null) {
			repair = new TAppRepair();
			repair.setStateName("派工中");
			repair.setState("2");
			repair.setCreateByname("自动上报");
			repair.setDisDate(tequest.getDisDate());
			repair.setDisMan(tequest.getDisMan());
			repair.setCreateByname(tequest.getCreateByname());
			repair.setBuildingNum(tequest.getBuildingNum());
			repair.setExwSerial(tequest.getExwSerial());
			repair.setEquipSpec(tequest.getEquipSpec());
			repair.setRecordSerial(tequest.getRecordSerial());
			repair.setProjName(tequest.getProjName());
			repair.setLocation(tequest.getLocation());
			repair.setFaultLevel(tequest.getFaultLevel());
			repair.setFaultDesc(tequest.getFaultDesc());
			repair.setCreateDt(tequest.getCreateDt());
			repair.setWeightOfFailure(tequest.getWeightOfFailure());
			repair.setInputVoltage(tequest.getInputVoltage());
			repair.setBreakdownVoltage(tequest.getBreakdownVoltage());
			repair.setSwitchFault1(tequest.getSwitchFault1());
			repair.setSwitchFault2(tequest.getSwitchFault2());
			repair.setSwitchFault3(tequest.getSwitchFault3());
			repairService.save(repair);
			setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
			return SUCCESS;
		} else if ("0".equals(type) && !repair.getProcMan().contains(tequest.getUserId().toString())) {
			setJsonString("{\"success\":false, \"msg\":\"你不是其中的负责人。\"}");
			return SUCCESS;
		} else {
			if (!repair.getState().equals("1")) {
				setJsonString("{\"success\":false, \"msg\":\"已派工过，不能重复操作。\"}");
				return SUCCESS;
			}
			repair.setDisMan(tequest.getDisMan());
			repair.setDisDate(tequest.getDisDate());
			repair.setRepairType(tequest.getRepairType());
			repair.setDisRemark(tequest.getRemark());
			repair.setRepImage(tequest.getFileAttaches());

			repair.setState("2");
			repairService.update(repair);

			if (repair.getDisMan() != null) {
				String[] dismans = repair.getDisMan().split(",");
				List<String> userNames = new ArrayList<String>();
				for (int i = 0; i < dismans.length; i++) {
					AppUser appUser = appUserService.get(Long.valueOf(dismans[i]));
					userNames.add(appUser.getFullname());
				}
				repair.setDisManName(StringUtils.join(userNames, ","));
			}

			ListenPatch36 app36 = new ListenPatch36();
			app36.setData(repair);
			app36.setOverLenth((long) (8 * 60 * 60 * 1000));//
			app36.setDate(df.parse(repair.getDisDate()));
			ScheduleAppRepairDomainImpl.add(repair.getRepid() + "_PATCH_36", app36);

			ScheduleAppRepairDomainImpl.remove(repair.getRepid() + "_APPLY_4");
			ScheduleAppRepairDomainImpl.remove(repair.getRepid() + "_APPLY_8");
			JsonObject obj = new JsonObject();
			obj.addProperty("repairId", tequest.getRepId());
			obj.addProperty("disMan", tequest.getDisMan());
			obj.addProperty("createByName", tequest.getCreateByname());
			obj.addProperty("buildingNum", tequest.getBuildingNum());
			obj.addProperty("exwSerial", tequest.getExwSerial());
			obj.addProperty("equipSpec", tequest.getEquipSpec());
			obj.addProperty("recordSerial", tequest.getRecordSerial());
			obj.addProperty("location", tequest.getLocation());
			obj.addProperty("projectName", tequest.getProjName());
			obj.addProperty("faultLevel", tequest.getProjName());
			obj.addProperty("faultDesc", tequest.getFaultDesc());
			obj.addProperty("createDt", tequest.getCreateDt());
			obj.addProperty("weightOfFailure", tequest.getWeightOfFailure());
			obj.addProperty("inputVoltage", tequest.getInputVoltage());
			obj.addProperty("breakdownVoltage", tequest.getBreakdownVoltage());
			obj.addProperty("switchFault1", tequest.getSwitchFault1());
			obj.addProperty("switchFault2", tequest.getSwitchFault2());
			obj.addProperty("switchFault3", tequest.getSwitchFault3());
			obj.addProperty("disDate", disDate);
			obj.addProperty("repairType", tequest.getRepairType());
			obj.addProperty("disRemark", tequest.getRemark());
			obj.addProperty("repImage", tequest.getFileAttaches());
			logger.info("故障完成");
			logger.info(obj.toString());
			send(repair.getProjName() + "项目" + repair.getBuildingNum() + "号楼" + repair.getExwSerial()
					+ "设备发生故障，已派工给您，请立即处理，注意安全", obj.toString(), repair.getDisMan(), "REPAIRDISPATCH");
			send(repair.getProjName() + "项目" + repair.getBuildingNum() + "号楼" + repair.getExwSerial() + "设备发生故障，现已派工给"
					+ repair.getDisManName() + "处理，请做好配合。", repair.getProcMan());

			setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
			return SUCCESS;
		}

	}

	@ActionLog(description = "保存或更新工作备忘")
	public String applyProcess() {
		boolean bl = true;
		Tequest tequest = getTerminalMessage();
		if (tequest.getRepId() == null || tequest.getRepId() == 0) {
			bl = false;
		}

		if (tequest.getRepairDt() == null || tequest.getRepairDt().equals("")) {
			bl = false;
		}

		if (tequest.getRepScheme() == null || tequest.getRepScheme().equals("")) {
			bl = false;
		}

		if (tequest.getProcResult() == null || tequest.getProcResult().equals("")) {
			bl = false;
		}
		if (tequest.getRepTimes() == null || tequest.getRepTimes().equals("")) {
			bl = false;
		}
		if (tequest.getRepReason() == null || tequest.getRepReason().equals("")) {
			bl = false;
		}

		if (bl == false) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		TAppRepair repair = repairService.getTranslate(tequest.getRepId());
		if (repair != null) {
			if (!repair.getDisMan().contains(tequest.getUserId().toString())) {
				setJsonString("{\"success\":false, \"msg\":\"你不是其中的维修人员。\"}");
				return SUCCESS;
			}
			if (!repair.getState().equals("2") && !repair.getState().equals("3")) {
				setJsonString("{\"success\":false, \"msg\":\"状态不对，处理失败。\"}");
				return SUCCESS;
			}
			repair.setRepairDt(tequest.getRepairDt());
			repair.setRepScheme(tequest.getRepScheme());
			repair.setProcResult(tequest.getProcResult());
			repair.setRepMan(tequest.getRepMan());
			repair.setRepTimes(tequest.getRepTimes());
			if (tequest.getRepFee() != null || !tequest.getRepFee().equals("")) {
				repair.setRepFee(new BigDecimal(tequest.getRepFee()));
			}
			repair.setRepReason(tequest.getRepReason());
			repair.setRepImage(tequest.getRepImage());
			repair.setState("4");
			repairService.merge(repair);
			for (TAppRepairCompon detail : tequest.getRepairComponSet()) {
				detail.setRepid(repair.getRepid());
				repairComponServic.saveOrUpdate(detail);
			}
		} else {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		ScheduleAppRepairDomainImpl.remove(repair.getRepid() + "_PATCH_36");

		JsonObject obj = new JsonObject();
		String repairComponSet = "";
		obj.addProperty("repairId", tequest.getRepId());
		obj.addProperty("repairDt", tequest.getRepairDt());
		obj.addProperty("repScheme", tequest.getRepScheme());
		obj.addProperty("procResult", tequest.getProcResult());
		obj.addProperty("repMan", tequest.getRepMan());
		obj.addProperty("repTimes", tequest.getRepTimes());
		obj.addProperty("repFee", tequest.getRepFee());
		obj.addProperty("state", "4");
		obj.addProperty("disMan", repair.getDisMan());
		obj.addProperty("repairComponSet", set2json(tequest.getRepairComponSet()));
		String repManId = tequest.getRepManId() != null ? tequest.getRepManId() : "-1";
		send("您收到一条维修反馈," + repair.getProjName() + "项目" + repair.getBuildingNum() + "号楼" + repair.getExwSerial()
				+ "设备发生故障，已处理完成，请核实确认。", obj.toString(), repManId, "REPAIR_COMPLETE");
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
		return SUCCESS;
	}

	public static String set2json(Set<TAppRepairCompon> set) {
		StringBuilder json = new StringBuilder();
		json.append("[");
		if (set != null && set.size() > 0) {
			for (TAppRepairCompon obj : set) {
				json.append(object2json(obj));
				json.append(",");
			}
			json.setCharAt(json.length() - 1, ']');
		} else {
			json.append("]");
		}
		return json.toString();
	}

	public static String object2json(TAppRepairCompon obj) {
		StringBuilder json = new StringBuilder();
		if (obj == null) {
			json.append("\"\"");
		} else if (obj instanceof Set) {
			json.append(set2json((Set<TAppRepairCompon>) obj));
		}
		return json.toString();
	}

	public String applyEnd() {
		boolean bl = true;
		Tequest tequest = getTerminalMessage();
		if (tequest.getRepId() == null || tequest.getRepId() == 0) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		TAppRepair repair = repairService.getTranslate(tequest.getRepId());
		if (repair == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		} else {
			repair.setState("0");
			repairService.merge(repair);
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新工作备忘")
	public String applyEquip() {
		boolean bl = true;
		Tequest tequest = getTerminalMessage();
		if (tequest.getRepId() == null || tequest.getRepId() == 0) {
			bl = false;
		}
		if (bl == false) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		TAppRepair repair = repairService.getTranslate(tequest.getRepId());
		if (repair != null) {
			for (TAppRepairCompon detail : tequest.getRepairComponSet()) {
				detail.setRepid(repair.getRepid());
				repairComponServic.saveOrUpdate(detail);
			}
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
		return SUCCESS;
	}

	public String queryView() {
		Query query = getTerminalMessage().getQuery();
		Long repId = query.getRepId();
		if (repId == null) {
			setJsonString("{\"success\":false, \"msg\":\"参数有误。\"}");
			return SUCCESS;
		}
		TAppRepair repair = repairService.getTranslate(repId);
		if (repair.getState().equals("1")) {
			repair.setStateName("待处理");
		} else if (repair.getState().equals("2")) {
			repair.setStateName("派工中");
			if (repair.getDisMan().contains(query.getUserId().toString())) {
				repair.setState("3");
				repairService.update(repair);
			}
		} else if (repair.getState().equals("3")) {
			repair.setStateName("处理中");
		} else if (repair.getState().equals("4")) {
			repair.setStateName("完成");
		} else if (repair.getState().equals("0")) {
			repair.setStateName("结案");
		}
		if (repair.getDisMan() != null) {
			String[] dismans = repair.getDisMan().split(",");
			List<String> userNames = new ArrayList<String>();
			for (int i = 0; i < dismans.length; i++) {
				AppUser appUser = appUserService.get(Long.valueOf(dismans[i]));
				userNames.add(appUser.getFullname());
			}
			repair.setDisManName(StringUtils.join(userNames, ","));
		}

		if (repair.getRepairType() != null) {
			String[] repTypes = repair.getRepairType().split(",");
			List<String> repTypesNames = new ArrayList<String>();
			for (int i = 0; i < repTypes.length; i++) {
				TAppRepairType type = typeService.get(repTypes[i]);
				repTypesNames.add(type.getName());
			}
			repair.setRepairTypeName(StringUtils.join(repTypesNames, ","));
		}
		// List<Long> fileIds = fileAttachService.getFileIdByDepend(repId,
		// SystemConstant.MODULE_APP_REPAIR);
		// repair.setFileAttaches(StringUtils.join(fileIds, ","));
		List<FileAttach> fileAttchList = fileAttachService.getByDepend(repId, SystemConstant.MODULE_APP_REPAIR);
		StringBuffer sb = new StringBuffer();
		List<String> imgList = new ArrayList<String>();
		List<String> repImgList = new ArrayList<String>();
		for (int i = 0; i < fileAttchList.size(); i++) {
			sb.append(fileAttchList.get(i).getFileId()).append(",");
			if (repair.getRepImage() != null && repair.getRepImage().contains(fileAttchList.get(i).getFileId() + "")) {
				repImgList.add(Constant.IMG_PRE_PATH + fileAttchList.get(i).getFilePath());
			} else {
				imgList.add(Constant.IMG_PRE_PATH + fileAttchList.get(i).getFilePath());
			}
		}
		if (fileAttchList.size() > 0) {
			repair.setFileAttaches(sb.substring(0, sb.length() - 1));
			repair.setImgList(imgList);
			repair.setRepImgList(repImgList);
		}
		List<TAppRepair> list = new ArrayList<TAppRepair>();
		list.add(repair);

		successResponse(GsonUtil.toJson(list, true, DateUtil.LINK_DISPLAY_DATE_FULL, false));
		return SUCCESS;
	}

	public String queryProject() {
		Query query = getTerminalMessage().getQuery();
		String projName = "";
		if (query != null) {
			projName = query.getProjName();
			if (projName == null || projName.equals("null"))
				projName = "";
		}

		List<Map<String, Object>> projectList = null;
		projectList = repairService.queryByScript("terminal.list_project", "%" + projName + "%");

		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(projectList.size())
				.append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(projectList, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String queryUsers() {
		Query query = getTerminalMessage().getQuery();
		String userName = "";
		logger.info(System.getProperty("file.encoding"));
		logger.info(Charset.defaultCharset().toString());
		if (query != null) {
			userName = query.getUserName();
			logger.info(userName);
			if (userName == null || userName.equals("null")) {
				userName = "";
			}
		}

		List<Map<String, Object>> userList = null;
		userList = repairService.queryByScript("terminal.list_users", "%" + userName + "%", "%" + userName + "%");

		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(userList.size())
				.append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(userList, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String queryTypes() {
		Query query = getTerminalMessage().getQuery();
		String parentid = "";
		if (query != null) {
			parentid = query.getParentid();
			if (parentid == null || parentid.equals("root"))
				parentid = "root";
		}

		List<Map<String, Object>> userList = null;
		userList = repairService.queryByScript("terminal.list_types", parentid);
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(userList.size())
				.append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(userList, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String count() {
		Query query = getTerminalMessage().getQuery();
		String projName = "";
		String recordSerial = "";
		String exwSerial = "";
		String buildNum = "";
		if (query != null) {
			projName = query.getProjName();
			recordSerial = query.getRecordSerial();
			exwSerial = query.getExwSerial();
			buildNum = query.getBuildingNum();
		}
		List<Map<String, Object>> maplist = repairService.queryByScript("terminal.count_app_repair",
				"%" + projName + "%", "%" + recordSerial + "%", "%" + exwSerial + "%", "%" + buildNum + "%");
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	private boolean send(String msg, String man) {
		String[] dismans = man.split(",");
		for (int i = 0; i < dismans.length; i++) {
			AppUser appUser = appUserService.get(Long.valueOf(dismans[i]));
			BusinessMessage bm = new BusinessMessage();
			bm.setMessage(msg);
			bm.setReceiveTel(appUser.getMobile());
			bm.setSenderName("系统消息");
			bm.setSendFlag("0");
			bm.setModule("REPAIR");
			bm.setCreateTime(new Date());
			businessMessageService.sendOnce(bm);
		}
		return true;
	}

	public String remote() {
		Query query = getTerminalMessage().getQuery();
		Integer startRow = 0;
		Integer pageSize = 10;
		startRow = query.getStart();
		pageSize = query.getPageSize();
		List<Map<String, Object>> maplist = elevatorMonitorService.queryByScript("terminal.list_remote_repair", "0",
				startRow, pageSize);
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/* 查询所有统计 */
	public String countAll() {
		Query query = getTerminalMessage().getQuery();
		String state = "1";
		String equipStatus = "2";
		String status = "2";
		String receiveTel = "";
		if (query.getReceiveTel() != null) {
			receiveTel = query.getReceiveTel();
		}
		// if(query.getState()!=null && query.getEquipStatus() && query.getStatus()){
		// state = query.getState();
		// equipStatus = query.getEquipStatus();
		// status=query.getStatus();
		// }
		List<Map<String, Object>> maplist = repairService.queryByScript("terminal.list_all_counts", state, equipStatus,
				status, receiveTel);
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String goToBuildingSite() {
		Tequest tequest = getTerminalMessage();
		Long repId = tequest.getRepId();
		String arriveTime = tequest.getArriveTime();
		String startOffTime = tequest.getStartOffTime();
		TAppRepair repair = repairService.getTranslate(repId);
		Long userId = ApplicationContainer.getCurrentUserId();
		if (repair.getDisMan().indexOf(userId.toString()) < 0) {
			setJsonString("{\"success\":false,\"message\":\"当前账号不在维修人员名单中！\"}");
			return SUCCESS;
		}
		if (StringUtils.isNotBlank(startOffTime)) {
			if (StringUtils.isNotBlank(repair.getStartOffTime())) {
				setJsonString("{\"success\":false,\"message\":\"已有维修人员赶往工地！\"}");
				return SUCCESS;
			}
			repair.setStartOffTime(startOffTime);
		} else if (StringUtils.isNotBlank(arriveTime)) {
			if (StringUtils.isNotBlank(repair.getArriveTime())) {
				setJsonString("{\"success\":false,\"message\":\"已有维修人员到达工地！\"}");
				return SUCCESS;
			}
			repair.setArriveTime(arriveTime);
		} else {
			return JSON_FAIL;
		}
		repairService.update(repair);
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新工作备忘")
	public String apply() throws ParseException {
		boolean bl = true;
		Tequest tequest = getTerminalMessage();
		TAppRepair repair = new TAppRepair();
		if (tequest.getRepId() == null) {
			repair.setProjName(tequest.getProjName());
			repair.setProjectId(tequest.getProjectId());
			repair.setRecordId(tequest.getRecordId());// 备案编号
			repair.setExwSerial(tequest.getExwSerial());// 出厂编号
			repair.setEquipSpec(tequest.getEquipSpec());// 设备型号
			repair.setFaultLevel(tequest.getFaultLevel());// 故障级别
			repair.setFaultDesc(tequest.getFaultDesc());// 故障描述
			repair.setLocation(tequest.getLocation());// 所在位置
			repair.setState(Status.smRepair.confirm);
			repair.setEquipSerial(tequest.getEquipSerial());// 设备自编号
			repair.setCreateBy(tequest.getCreateBy());// 申报人ID
			repair.setReportDt(tequest.getReportDt());// 报修时间
			repair.setProcManId(tequest.getProcManId());// 维修人ID
			repair.setProcMan(tequest.getProcMan());// 维修人
			repair.setFileAttaches(tequest.getFileAttaches());// 其他照片
			repair.setBuildingNum(tequest.getBuildingNum());// 楼号
			repair.setEquipId(tequest.getEquipId());
			repair.setReplaceCompon(tequest.getReplaceCompon());
			repair.setRepairAfterImage(tequest.getRepairAfterImage());
			repair.setRepairBeforeImage(tequest.getRepairBeforeImage());
			repair.setComponBeforeImage(tequest.getComponBeforeImage());
			repair.setComponAfterImage(tequest.getComponAfterImage());
			repair.setDisRemark(tequest.getDisRemark());// 备注
			repairService.save(repair);
			setTerminalFileAttach(repair.getRepid(), repair.getFileAttaches());
			setTerminalFileAttach(repair.getRepid(), repair.getRepairAfterImage());
			setTerminalFileAttach(repair.getRepid(), repair.getRepairBeforeImage());
			setTerminalFileAttach(repair.getRepid(), repair.getComponBeforeImage());
			setTerminalFileAttach(repair.getRepid(), repair.getComponAfterImage());
		} else if (tequest.getRepId() != null) {
			TAppRepair repai = repairService.get(tequest.getRepId());
			repai.setProjName(tequest.getProjName());
			repai.setProjectId(tequest.getProjectId());
			repai.setRecordId(tequest.getRecordId());// 备案编号
			repai.setExwSerial(tequest.getExwSerial());// 出厂编号
			repai.setEquipSpec(tequest.getEquipSpec());// 设备型号
			repai.setFaultLevel(tequest.getFaultLevel());// 故障级别
			repai.setFaultDesc(tequest.getFaultDesc());// 故障描述
			repai.setLocation(tequest.getLocation());// 所在位置
			repai.setState(Status.smRepair.confirm);
			repai.setEquipSerial(tequest.getEquipSerial());// 设备自编号
			repai.setCreateBy(tequest.getCreateBy());// 申报人ID
			repai.setReportDt(tequest.getReportDt());// 报修时间
			repai.setProcManId(tequest.getProcManId());// 维修人ID
			repai.setProcMan(tequest.getProcMan());// 维修人
			repai.setFileAttaches(tequest.getFileAttaches());// 其他照片
			repai.setBuildingNum(tequest.getBuildingNum());// 楼号
			repai.setEquipId(tequest.getEquipId());
			repai.setReplaceCompon(tequest.getReplaceCompon());
			repai.setRepairAfterImage(tequest.getRepairAfterImage());
			repai.setRepairBeforeImage(tequest.getRepairBeforeImage());
			repai.setComponBeforeImage(tequest.getComponBeforeImage());
			repai.setComponAfterImage(tequest.getComponAfterImage());
			repai.setDisRemark(tequest.getDisRemark());// 备注
			repairService.update(repai);
			setTerminalFileAttach(repai.getRepid(), repai.getFileAttaches());
			setTerminalFileAttach(repai.getRepid(), repai.getRepairAfterImage());
			setTerminalFileAttach(repai.getRepid(), repai.getRepairBeforeImage());
			setTerminalFileAttach(repai.getRepid(), repai.getComponBeforeImage());
			setTerminalFileAttach(repai.getRepid(), repai.getComponAfterImage());
		}

		// 添加到扫描缓存
		// ListenApply4 app=new ListenApply4();
		// app.setData(repair);app.setOverLenth((long) (4*60*60*1000));//
		// app.setDate(df.parse(repair.getCreateDt()));
		// ScheduleAppRepairDomainImpl.add(repair.getRepid()+"_APPLY_4", app);
		//
		// ListenApply8 app8=new ListenApply8();
		// app8.setData(repair);app8.setOverLenth((long) (8*60*60*1000));//
		// app8.setDate(df.parse(repair.getCreateDt()));
		// ScheduleAppRepairDomainImpl.add(repair.getRepid()+"_APPLY_8", app8);
		// String buff=
		// "{\"repairId\":"+repair.getRepid()+",\"userId\":"+tequest.getUserId()+"}";
		// send("您收到一条故障信息，"+repair.getProjName()+"项目,"+repair.getBuildingNum()+"号楼,"+repair.getFaultDesc(),buff,tequest.getProcMan(),"REPAIRWAIT");
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"repId\":" + repair.getRepid() + "}");
		return SUCCESS;
	}

	@ActionLog(description = "确认故障维修")
	public String passMaintain() {
		Tequest tequest = getTerminalMessage();
		TAppRepair repair = repairService.getTranslate(tequest.getRepId());
		repair.setState(Status.smRepair.confirmed);
		repairService.update(repair);
		return SUCCESS;
	}

	@ActionLog(description = "驳回故障维修")
	public String rejectMaintain() {
		Tequest tequest = getTerminalMessage();
		TAppRepair repair = repairService.getTranslate(tequest.getRepId());
		repair.setState(Status.smRepair.reject);
		repairService.update(repair);
		return SUCCESS;
	}

	/**故障维修通用列表*/
	public String repairGeneralList(){
		Query query = getTerminalMessage().getQuery();
		StringBuffer depId = new StringBuffer() ;
		if(StringUtils.isNotBlank(query.getAccount())){
			String[] ids = query.getAccount().split(",");
			for(String id : ids){
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_path_S_LK", id);
				List<Department> ds = departmentService.getAll(filter);
				for(Department e : ds){
					depId.append(","+e.getDepId());
				}
			}
			depId.append(",");
		}
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		String state = query.getState();
		Long userId = query.getUserId();
		String year = query.getYear();
		String startDate = null;
		String endDate = null;
		String quarter = query.getQuarter();
		if("1".equals(quarter)){
			startDate = year + "-01";
			endDate = year + "-03";
		}else if("2".equals(quarter)){
			startDate = year + "-04";
			endDate = year + "-06";
		}else if("3".equals(quarter)){
			startDate = year + "-07";
			endDate = year + "-09";
		}else if("4".equals(quarter)){
			startDate = year + "-10";
			endDate = year + "-12";
		}
		List<Map<String, Object>> list = repairService.queryByScript("terminal.wechat_repair_general_list",start,pageSize,keyword,userId,state,
				ApplicationContainer.getCurrentUser().getDataPermission(),depId.toString(),year,startDate,endDate);
		for(Map<String, Object> map : list){
			String stateName = CodeServiceImpl.fastValue("APP_REPAIR_STATUS", map.get("state").toString());
			map.put("stateName", stateName);
		}
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	@ActionLog(description = "故障维修详情")
	public String maintainLoad() {
		Tequest tequest = getTerminalMessage();
		System.out.println(tequest.getRepId());
		TAppRepair repair = repairService.getTranslate(tequest.getRepId());
		repair.setFileAttachesList(getFilePath(repair.getFileAttaches()));
		repair.setComponAfterImageList(getFilePath(repair.getComponAfterImage()));
		repair.setComponBeforeImageList(getFilePath(repair.getComponBeforeImage()));
		repair.setRepairAfterImageList(getFilePath(repair.getRepairAfterImage()));
		repair.setRepairBeforeList(getFilePath(repair.getRepairBeforeImage()));
		successResponse(GsonUtil.toJson(repair, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public List<String> getFilePath(String id) {
		List<String> imgList = new ArrayList<String>();
		if (id != null && id.length() > 0) {
			QueryFilter filter = new QueryFilter();
			filter.addValuesDisjunctFilter("QVO_fileId_L_EQ", id);
			List<FileAttach> fileList = fileAttachService.getAll(filter);
			String url = null;
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < fileList.size(); i++) {
				sb.append(fileList.get(i).getFileId()).append(",");
				imgList.add(Constant.IMG_PRE_PATH + fileList.get(i).getFilePath());
			}
		}
		return imgList;
	}

	@ActionLog(description = "故障维修总数")
	public String numberMain() {
		Query query = getTerminalMessage().getQuery();
		Long creatBy = query.getCreatBy();
		List<Map<String, Object>> maplist = repairService.queryByScript("terminal.count_app_repair_all", creatBy,ApplicationContainer.getCurrentUser().getDataPermission());
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*施工端安全巡检列表**/
	public String constructionInspectList() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String inspectResultName = null;
		List<Map<String, Object>> maplist = repairService.queryByScript("equipdoc.wechat_construction_inspect_list",start,pageSize,time);
		for(Map<String,Object> map : maplist) {
			if(StringUtils.isNotBlank(map.get("inspectResult").toString())) {
				inspectResultName = codeService.getValue("INSPECT_RESULT", map.get("inspectResult").toString());
			}
			map.put("inspectResultName", inspectResultName);

		}
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*施工端安全巡检列表详情**/
	public String inspectDetail() {
		Query query = getTerminalMessage().getQuery();
		long inspectId = query.getInspectId();
		List<Map<String, Object>> result = repairService.queryByScript("equipdoc.wechat_construction_inspect_detail",inspectId);
		for (Map<String, Object> map : result) {
			map.put("fileAttachesList", getFilePath(String.valueOf(map.get("fileAttaches"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*施工端故障报修保存前代入的信息**/
	public String beforeApplyFixInfo() {
		Query query = getTerminalMessage().getQuery();
		Long equipId = query.getEquipId();
		List<Map<String, Object>> result = repairService.queryByScript("equipdoc.wechat_construction_before_repair",equipId);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	@ActionLog(description = "保存故障保修")
	public String applyFix() throws ParseException {
		Tequest tequest = getTerminalMessage();
		TAppRepair repair = new TAppRepair();
		repair.setProjName(tequest.getProjName());
		repair.setProjectId(tequest.getProjectId());
		repair.setRecordId(tequest.getRecordId());// 备案编号
		repair.setExwSerial(tequest.getExwSerial());// 出厂编号
		repair.setEquipSpec(tequest.getEquipSpec());// 设备型号
		repair.setFaultLevel(tequest.getFaultLevel());// 故障级别
		repair.setFaultDesc(tequest.getFaultDesc());// 故障描述
		repair.setLocation(tequest.getLocation());// 所在位置
		repair.setState(Status.smRepair.deal);
		repair.setEquipSerial(tequest.getEquipSerial());// 设备自编号
		repair.setCreateBy(tequest.getCreateBy());// 申报人ID
		repair.setCreateByPhone(tequest.getCreateByPhone());// 申报人联系电话
		repair.setReportDt(tequest.getReportDt());// 报修时间
		repair.setBuildingNum(tequest.getBuildingNum());// 楼号
		repair.setEquipId(tequest.getEquipId());
		repair.setRepairBeforeImage(tequest.getRepairBeforeImage());
		repairService.save(repair);
		setTerminalFileAttach(repair.getRepid(), repair.getRepairBeforeImage());
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"repId\":" + repair.getRepid() + "}");
		return SUCCESS;
	}
	/*报修进度列表**/
	public String constructionFixProcessList() {
		Query query = getTerminalMessage().getQuery();
		String keyWord = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> maplist = repairService.queryByScript("equipdoc.wechat_construction_repair_process_list",start,pageSize,keyWord);
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*报修进度详情**/
	public String constructionFixProcessDetail() {
		Query query = getTerminalMessage().getQuery();
		Long repId = query.getRepId();
		List<Map<String, Object>> result = repairService.queryByScript("equipdoc.wechat_construction_repair_process_detail",repId);
		for (Map<String, Object> map : result) {
			map.put("repairBeforeImageList", getFilePath(String.valueOf(map.get("repairBeforeImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*整改反馈列表**/
	public String constructionFixFeedbackList() {
		Query query = getTerminalMessage().getQuery();
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> maplist = repairService.queryByScript("equipdoc.wechat_construction_repair_feedback_list",start,pageSize,keyword);
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*整改反馈详情**/
	public String constructionFixFeedbackDetail() {
		Query query = getTerminalMessage().getQuery();
		Long inspectRectifyId = query.getInspectRectifyId();
		List<Map<String, Object>> result = repairService.queryByScript("equipdoc.wechat_construction_repair_feedback_detail",inspectRectifyId);
		for (Map<String, Object> map : result) {
			map.put("fileAttachesList", getFilePath(String.valueOf(map.get("fileAttaches"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*施工端项目动态**/
	public String construcProjectDynamic(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String,Object>> list = repairService.queryByScript("equipdoc.wechat_construction_project_dynamic", start,pageSize);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/*施工端项目动态之详情列表**/
	public String construcProjectDynamicList(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		if("1".equals(keyword)){
			list = repairService.queryByScript("equipdoc.wechat_construction_dismantling_dynamic", start,pageSize);
		}else if("2".equals(keyword)){
			list = repairService.queryByScript("equipdoc.wechat_construction_inspect_dynamic", start,pageSize);
		}else if("3".equals(keyword)){
			list = repairService.queryByScript("equipdoc.wechat_construction_repair_dynamic", start,pageSize);
		}
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*施工端项目列表**/
	public String construcProjectList(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String,Object>> list = repairService.queryByScript("equipdoc.wechat_construction_project_list", start,pageSize);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/*施工端项目详情**/
	public String construcProjectDetail(){
		Query query = getTerminalMessage().getQuery();
		Long projectId = query.getProjectId();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		Map<String, Object> map = new HashMap();
		List<Map<String,Object>> result = repairService.queryByScript("equipdoc.wechat_construction_project_equip", projectId);
		List<Map<String,Object>> list = repairService.queryByScript("equipdoc.wechat_construction_project_detail",start,pageSize,projectId,keyword);
		map.put("result", result);
		map.put("list", list);
		successResponse(GsonUtil.toJson(map, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
}
