/**
 *====================================================
 * 文件名称: UserAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月24日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.knight.app.model.Attendamce;
import com.knight.app.service.AttendamceService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.support.StringSupport;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.InspectProjectRecord;
import com.knight.emms.model.InspectSelfChoose;
import com.knight.emms.model.InspectSelfChooseDetail;
import com.knight.emms.model.PractiEvaluation;
import com.knight.emms.model.PractiInsurance;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.SafeClarification;
import com.knight.emms.model.SafetyEducation;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.InspectProjectRecordService;
import com.knight.emms.service.InspectSelfChooseService;
import com.knight.emms.service.PractiEvaluationService;
import com.knight.emms.service.PractiInsuranceClaimRecordService;
import com.knight.emms.service.PractiInsuranceService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.SafeClarificationService;
import com.knight.emms.service.SafetyEducationService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.emms.terminal.support.utils.SyncBase;
import com.knight.emms.terminal.support.utils.UcAccountUtil;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.dao.AppUserExtendDao;
import com.knight.system.model.AppUser;
import com.knight.system.model.AppUserExtend;
import com.knight.system.model.FileAttach;
import com.knight.system.service.AppUserExtendService;
import com.knight.system.service.AppUserService;
import com.knight.system.service.DepartmentService;
import com.knight.system.service.FileAttachService;

import flexjson.JSONSerializer;

/**
 * @ClassName: UserAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月24日 下午9:37:49
 */
public class UserAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private AppUserService appUserService;
	
	@Resource
	private DepartmentService departmentService;
	
	@Resource
	private SafetyEducationService safetyEducationService;
	
	@Resource
	private PractitionerService practitionerService;
	
	@Resource
	private PractitionerDao practitionerDao;
	
	@Resource
	private FileAttachService fileAttachService;
	
	@Resource
	private PractiInsuranceService practiInsuranceService;
	
	@Resource
	private PractiInsuranceClaimRecordService practiInsuranceClaimService;
	
	@Resource
	private SafeClarificationService safeClarificationService;

	@Resource
	private PractiEvaluationService practiEvaluationService;
	
	@Resource
	private AttendamceService attendamceService;
	
	@Resource
	private InspectProjectRecordService inspectProjectRecordService;
	
	@Resource
	private EquipmentService equipmentService;
	
	@Resource
	private AppUserExtendService appUserExtendService;
	
	private  Map<String, String> secParam = new HashMap<String, String>();
	 
	 
	public String list() {
		List<Map<String, Object>> result = appUserService.queryByScript("terminal.list_user_lbs");
		JSONSerializer serializer = new JSONSerializer();
		successResponse(serializer.serialize(result));
		return SUCCESS;
	}

	public String update() {
		Tequest tequest = getTerminalMessage();
		AppUser appUser = appUserService.get(ApplicationContainer.getCurrentUserId());
		if (StringUtils.isNotBlank(tequest.getFullname())) {
			appUser.setFullname(tequest.getFullname());
		}
		if (StringUtils.isNotBlank(tequest.getMobile())) {
			appUser.setMobile(tequest.getMobile());
		}
		if (StringUtils.isNotBlank(tequest.getLongitude()) && StringUtils.isNotBlank(tequest.getLatitude())) {
			appUser.setLongitude(tequest.getLongitude());
			appUser.setLatitude(tequest.getLatitude());
			appUser.setUpdateTime(new Date());
		}
		appUserService.save(appUser);
		return SUCCESS;
	}

	public String updatePassword() {
		Tequest tequest = getTerminalMessage();
		AppUser appUser = appUserService.get(ApplicationContainer.getCurrentUserId());
		if(tequest.getType()!=null && tequest.getType().equals("IOS")){
			if (!StringSupport.encryptMD5(tequest.getOldpassword()).equals(appUser.getPassword())) {
				setJsonString("{\"success\":false, \"msg\":\"原密码不正确。\"}");
				return SUCCESS;
			}
			appUser.setPassword(StringSupport.encryptMD5(tequest.getNewpassword()));
		}else{
			if (!appUser.getPassword().equals(tequest.getOldpassword())) {
				setJsonString("{\"success\":false, \"msg\":\"原密码不正确。\"}");
				return SUCCESS;
			}
			appUser.setPassword(tequest.getNewpassword());
		}
		if (!appUser.getUsername().equals(tequest.getUsername())) {
			setJsonString("{\"success\":false, \"msg\":\"用户名不匹配。\"}");
			return SUCCESS;
		}
		
		appUserService.save(appUser);
		if(syncAccount(appUser.getMobile())){
			setJsonString("{\"success\":true, \"msg\":\"修改成功。\"}");
		}else{
			if(tequest.getType()!=null && tequest.getType().equals("IOS")){
				appUser.setPassword(StringSupport.encryptMD5(tequest.getOldpassword()));
			}else{
				appUser.setPassword(tequest.getOldpassword());
			}
			appUserService.save(appUser);
			setJsonString("{\"success\":false, \"msg\":\"修改失败。\"}");
		}
		
		return SUCCESS;
	}

//	public String getMyPassword() {
//		Tequest tequest = getTerminalMessage();
//		AppUser appUser = appUserService.findByUserName(tequest.getUsername());
//		if (appUser == null) {
//			setJsonString("{\"success\":false, \"msg\":\"该用户名不存在。\"}");
//			return SUCCESS;
//		}
//		String oldPass = appUser.getPassword();
//		appUser.setPassword(StringSupport.encryptMD5(tequest.getNewpassword()));
//		appUserService.save(appUser);
//		
//		if(syncAccount(appUser.getMobile())){
//			setJsonString("{\"success\":true, \"msg\":\"修改成功。\"}");
//		}else{
//			appUser.setPassword(oldPass);
//			appUserService.save(appUser);
//			setJsonString("{\"success\":false, \"msg\":\"修改失败。\"}");
//		}
//		return SUCCESS;
//	}
	
	public String passwordChange() {
		HttpServletRequest  request = ServletActionContext.getRequest();
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		AppUser appUser = appUserService.findByUserName(username);
		if (appUser == null) {
			setJsonString("{\"success\":false");
			return SUCCESS;
		}
		appUser.setPassword(password);
		appUserService.save(appUser);
		return SUCCESS;
	}

	//去掉返回数据的role对象

	public String getCurrent(){
        AppUser appUser = ApplicationContainer.getCurrentUser();
        appUser.setRoles(null);
        successResponse(GsonUtil.toJson(appUser));
		return SUCCESS;
	}
	 
	public String appListDep() {
		List<Map<String, Object>> result = departmentService.queryByScript("terminal.list_department");
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	
	public  boolean syncAccount(String mobile) {
		SyncBase syncBase = new SyncBase();
		syncBase.connectMysqlDb(); // 连接A9数据库
		
		UcAccountUtil ucAccountImpl = new UcAccountUtil();
		List<Map<String, Object>>  ucAccountList = appUserService.queryByScript("terminal.list_app_user", mobile);
		
		if (ucAccountList != null && ucAccountList.size() > 0) {
				ucAccountImpl.insertToMySql(ucAccountList);//更新 USER数据到A9
		} else {
			syncBase.closeA9Conn(); 
			return false;
		}
		syncBase.closeA9Conn(); 
		return true;
	}
	
//	public void syncAccount2A9(){
//		  CloseableHttpClient httpClient = HttpClients.custom().build();
//		  String url = "http://121.42.34.181:8082/emms/public/external/account/update.do";
//		  secParam.put("externalId","357");
//		  secParam.put("externalName","5923883009");
//		  secParam.put("externalAddress","http://www.jjaq.com.cn:8936/emms");
//		  secParam.put("mobile","5923883009");
//		  secParam.put("password","1234567");
//		 String responseText = AppsUserClient.post(httpClient, url, secParam);
//		System.out.println(responseText);
//	}
	
	/**新增安全教育*/
	public String applySafetyEducation(){
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = new QueryFilter();
		SafetyEducation safety = new SafetyEducation();
		safety.setSafetySerial(tequest.getSafetySerial());
		safety.setSafetyDetail(tequest.getSafetyDetail());
		safety.setTeachManId(tequest.getTeachManId());
		safety.setTeachMan(tequest.getTeachMan());
		safety.setEducaManId(tequest.getEducaManId());
		safety.setEducaMan(tequest.getEducaMan());
		safety.setEdcationImage(tequest.getEdcationImage());
		safety.setEdcationTime(tequest.getEdcationTime());
		safety.setDelFlag(Constant.ENABLED);
		safety.setRemark(tequest.getRemark());
		safety.setUserId(ApplicationContainer.getCurrentUserId());
		safetyEducationService.save(safety);
		setTerminalFileAttach(safety.getSafetyId(), safety.getEdcationImage());
		filter.addValuesDisjunctFilter("QVO_practiId_L_EQ", tequest.getEducaManId());
		List<Practitioner> list = practitionerService.getAll(filter);
		for(Practitioner p : list){
			p.setEdcationTime(tequest.getEdcationTime());
			practitionerService.update(p);
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"repId\":"+safety.getSafetyId()+"}");
		return SUCCESS;
	}
	
	/**待安全教育列表*/
	public String waitSafetyEducation(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> result = safetyEducationService.queryByScript("terminal.wechat_wait_safety_education",start,pageSize,keyword,labourPermission);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**已安全教育列表*/
	public String safetyEducationList(){
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addFieldsDisjunctFilter("Q_safetySerial|teachMan|educaMan_S_LK",tequest.getQuery().getKeyword());
		filter.addConjunctFilter("Q_edcationTime_S_LE", tequest.getQuery().getDisDate());
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			filter.addValuesDisjunctFilter("QVO_permissionFlag_S_LK", ApplicationContainer.getCurrentUser().getLabourPermission());
		}
		List<SafetyEducation> list = safetyEducationService.queryTranslateAll(filter);
		for(SafetyEducation s : list){
			s.setEdcationImageList(getFilePath(s.getEdcationImage()));
			s.setCount(list.size());
		}
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	/**人员保险详情*/
	public String practiInsureDetail(){
		Query query = getTerminalMessage().getQuery();
		Integer insureId = query.getStart();
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String,Object>> result = practiInsuranceService.queryByScript("terminal.wechat_practi_insurance_one",insureId);
		List<Map<String,Object>> list = practiInsuranceService.queryByScript("terminal.wechat_practi_insurance_second",insureId);
		map.put("result", result);
		map.put("list", list);
		successResponse(GsonUtil.toJson(map, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**人员保险理赔记录列表*/
	public String practiClaimList(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		String secondKeyword = query.getSecondKeyword();
		List<Map<String,Object>> list = practiInsuranceClaimService.queryByScript("terminal.wechat_practi_claim",start,pageSize,keyword,secondKeyword);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**人员保险记录列表*/
	public String practiInsuranceList(){
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addFieldsDisjunctFilter("Q_insureSerial|insuranceCompany_S_LK",tequest.getQuery().getKeyword());
		filter.addConjunctFilter("Q_practiFull_S_EQ", tequest.getQuery().getSecondKeyword());
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			filter.addValuesDisjunctFilter("QVO_permissionFlag_S_LK", ApplicationContainer.getCurrentUser().getLabourPermission());
		}
		List<PractiInsurance> list = practiInsuranceService.getAll(filter);
		for(PractiInsurance s : list){
			s.setCount(list.size());
		}
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	/**保存安全交底*/
	public String applySafeClarification(){
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = new QueryFilter();
		SafeClarification clari = new SafeClarification();
		clari.setProjectName(tequest.getProjectName());
		clari.setProjectId(tequest.getProjectId());
		clari.setAddress(tequest.getAddress());
		clari.setCopeId(tequest.getCopeId());
		clari.setCopeName(tequest.getCopeName());
		clari.setClarificaImage(tequest.getClarificaImage());
		clari.setClarificaTime(tequest.getClarificaTime());
		clari.setClarificaManId(tequest.getClarificaManId());
		clari.setClarificaMan(tequest.getClarificaMan());
		clari.setClarificaHeadId(tequest.getClarificaHeadId());
		clari.setClarificaHead(tequest.getClarificaHead());
		clari.setDelFlag(Constant.ENABLED);
		clari.setRemark(tequest.getRemark());
		clari.setUserId(ApplicationContainer.getCurrentUserId());
		safeClarificationService.save(clari);
		setTerminalFileAttach(clari.getClarificaId(), clari.getClarificaImage());
		filter.addValuesDisjunctFilter("QVO_practiId_L_EQ", tequest.getClarificaManId());
		List<Practitioner> list = practitionerService.getAll(filter);
		for(Practitioner p : list){
			p.setClarificaStatus("1");
			p.setClarificaTime(tequest.getClarificaTime());
			practitionerService.update(p);
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"clarificaId\":"+clari.getClarificaId()+"}");
		return SUCCESS;
	}
	
	/**待安全交底列表*/
	public String waitSafeClarification(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> result = safeClarificationService.queryByScript("terminal.wechat_wait_safe_clarification",start,pageSize,keyword,labourPermission);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**我的安全、已安全交底列表*/
	public String safeClarificationList(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> result = safeClarificationService.queryByScript("terminal.wechat_safe_clarification_list",start,pageSize,keyword,labourPermission);
		for (Map<String, Object> map : result) {
			map.put("clarificaImageList", getFilePath(String.valueOf(map.get("clarificaImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**人员总数列表*/
	public String practitionerAllList(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> result = safeClarificationService.queryByScript("terminal.wechat_practitioner_list",start,pageSize,labourPermission);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/** 在职人员列表*/
	public String practitionerInList(){
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> result = safeClarificationService.queryByScript("terminal.wechat_practitionerIn_list",start,pageSize,labourPermission);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/*添加人员评价**/
	public String addPractiEvaluation(){
		Tequest tequest = getTerminalMessage();
		PractiEvaluation pe = new PractiEvaluation();
		pe.setAcceptMan(tequest.getAcceptMan());
		pe.setAcceptManId(tequest.getAcceptManId());
		pe.setEvaluaMan(ApplicationContainer.getCurrentUser().getUsername());
		pe.setEvaluaManId(ApplicationContainer.getCurrentUserId());
		pe.setEvaluaContent(tequest.getEvaluaContent());
		pe.setEvaluaStar(tequest.getEvaluaStar());
		pe.setEvaluaDate(DateUtil.getCurrentLinkTimeStr());
		pe.setDelFlag(Status.AppLogistics.Received);
		practiEvaluationService.save(pe);
		Practitioner p = practitionerService.get(tequest.getAcceptManId());
		p.setStarsLevel(tequest.getEvaluaStar());
		p.setEvaluaCount(p.getEvaluaCount()+1);
		practitionerService.update(p);
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"evaluaId\":"+pe.getEvaluaId()+"}");
		return SUCCESS;
	}

	/*人员评价记录列表**/
	public String practiEvaluatonList(){
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addFieldsDisjunctFilter("Q_acceptManId_L_EQ",tequest.getQuery().getKeyword());
		List<PractiEvaluation> list = practiEvaluationService.queryTranslateAll(filter);
		for(PractiEvaluation p : list){
			p.setCount(list.size());
		}
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*新增签到**/
	public String addAttendamceSgin(){
		Tequest tequest = getTerminalMessage();
		String time = DateUtil.getCurrentLinkTimeStr().substring(11, 19);
		Attendamce a = new Attendamce();
		a.setUserId(tequest.getUserId());
		a.setUserName(tequest.getUsername());
		a.setSgDate(DateUtil.changeStrToDate(DateUtil.getCurrentLinkDateStr()));
		a.setSginTime(time);
		a.setSginLocation(tequest.getLocation());
		a.setProjectId(tequest.getProjectId());
		a.setEquipId(tequest.getEquipId());
		a.setDelFlag(Status.Archives.enabled);
//		a.setFormId(tequest.getFormId());
		attendamceService.save(a);
		this.changeState("2", tequest.getUserId(), tequest.getEquipId());
		if(tequest.getInspectProjectRecordSet().size()>0){
			for(InspectProjectRecord d : tequest.getInspectProjectRecordSet()){
				InspectProjectRecord is = new InspectProjectRecord();
				is.setInprojectSerial(DateUtil.getCurrentTimeStr());
				is.setInprojectDate(DateUtil.getCurrentLinkTimeStr());
				is.setInprojectState(d.getInprojectState());
				is.setInprojectType(d.getInprojectType());
				is.setInprojectItem(d.getInprojectItem());
				is.setInprojectImage(d.getInprojectImage());
				is.setAid(a.getAid());
				is.setDelFlag("1");
				inspectProjectRecordService.save(is);
				setTerminalFileAttach(is.getInprojectId(), is.getInprojectImage());
			}
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"workState\":"+2+"}");
		return SUCCESS;
	}
	
	/**人员签退之前的详情*/
	public String practiSignBefore() {
		Query query = getTerminalMessage().getQuery();
		Long userId = query.getUserId();
		List<Map<String, Object>> result = attendamceService.queryByScript("terminal.practi_sgon_before",userId);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	
	/*新增签退**/
	public String addAttendamceSgon(){
		Tequest tequest = getTerminalMessage();
		String time = DateUtil.getCurrentLinkTimeStr().substring(11, 19);
		Attendamce a = attendamceService.get(tequest.getAid());
		a.setSgouTime(time);
		a.setSgouLocation(tequest.getLocation());
		attendamceService.update(a);
		this.changeState("1", tequest.getUserId(), tequest.getEquipId());
		if(tequest.getInspectProjectRecordSet().size()>0){
			for(InspectProjectRecord d : tequest.getInspectProjectRecordSet()){
				InspectProjectRecord is = new InspectProjectRecord();
				is.setInprojectSerial(DateUtil.getCurrentTimeStr());
				is.setInprojectDate(DateUtil.getCurrentLinkTimeStr());
				is.setInprojectState(d.getInprojectState());
				is.setInprojectType(d.getInprojectType());
				is.setInprojectItem(d.getInprojectItem());
				is.setInprojectImage(d.getInprojectImage());
				is.setAid(a.getAid());
				is.setDelFlag("1");
				inspectProjectRecordService.save(is);
				setTerminalFileAttach(is.getInprojectId(), is.getInprojectImage());
				is = null;
			}
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"workState\":"+1+"}");
		return SUCCESS;
	}
	
	/*签到签退修改员工工作状态、设备占用状态**/
	public void changeState(String a,Long id,Long ids){
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_userId_L_EQ", id.toString());
		List<Practitioner> list = practitionerService.getAll(filter);
		if(list.size()>0){
			list.get(0).setWorkState(a);
			practitionerService.merge(list.get(0));
		}
		Equipment e = equipmentService.get(ids);
		if("1".equals(a)){
			e.setSeatState(String.valueOf(Integer.valueOf(e.getSeatState()) - 1));
		}else {
			e.setSeatState(String.valueOf(Integer.valueOf(e.getSeatState()) + 1));
		}
		equipmentService.update(e);
	}
	
	public List<String> getFilePath(String id) {
		List<String> imgList = new ArrayList<String>();
		if (StringUtils.isNotBlank(id)&&!id.equals("null")&&!id.equals("NULL")) {
			System.out.println(id);
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
	
}
