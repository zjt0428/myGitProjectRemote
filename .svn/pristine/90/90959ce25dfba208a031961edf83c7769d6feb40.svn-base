package com.knight.emms.terminal.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.knight.app.model.Attendamce;
import com.knight.app.service.AttendamceService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.AccessToken;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.WxMssVo;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.InspectProjectRecordService;
import com.knight.emms.service.InspectSelfChooseDetailService;
import com.knight.emms.service.InspectSelfChooseService;
import com.knight.emms.service.PractiDispatchService;
import com.knight.emms.service.PractiInsuranceClaimRecordService;
import com.knight.emms.service.PractiInsuranceService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.SafeClarificationService;
import com.knight.emms.service.SafetyEducationService;
import com.knight.emms.support.TemplateData;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.FileAttach;
import com.knight.system.service.CodeService;
import com.knight.system.service.FileAttachService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

public class PractitionerAction extends TerminalBaseAction{
	private static final long serialVersionUID = 1L;

	@Resource
	private PractitionerService practitionerService;
	
	@Resource
	private FileAttachService fileAttachService;
	
	@Resource
	private PractiInsuranceService practiInsuranceService;
	
	@Resource
	private PractiInsuranceClaimRecordService practiInsuranceClaimService;

	@Resource
	private SafetyEducationService safetyEducationService;

	@Resource
	private SafeClarificationService safeClarificationService;
	
	@Resource
	private CorpInfoService corpInfoService;
	
	@Resource
	private PractiDispatchService practiDispatchService;
	
	@Resource
	private InspectSelfChooseService chooseService;
	
	@Resource
	private InspectSelfChooseDetailService chooseDetailService;
	
	@Resource
	private InspectProjectRecordService inspectProjectRecordService;
	
	@Resource
	private AttendamceService attendamceService;
	
	@Resource
	private CodeService codeService;
	
	@Resource
	private EquipmentService equipmentService;
	
	@Autowired
	private RestTemplate restTemplate;
	
	
	
	/*
	 * 人员列表
	 */
	public String list() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		String blacklist = query.getBlacklist();
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> list = practitionerService.queryByScript("terminal.practi_list_practi",start,pageSize,
				keyword==null?"":keyword,blacklist,labourPermission);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	public String save() {
		//TODO
		return SUCCESS;
	}
	
	public String update() {
		Query query = getTerminalMessage().getQuery();
		String practiName = query.getPractiName();
		String sex = query.getSex();
		String kindWork = query.getKindWork();
		String isAffiliate = query.getIsAffiliate();
		String idCard = query.getIdCard();
		String birthDate = query.getBirthDate();
		String nation = query.getNation();
		String birthplace = query.getBirthplace();
		String mobile = query.getMobile();
		String address = query.getAddress();
		String bankDeposit = query.getBankDeposit();
		String account = query.getAccount();
		String photo = query.getPhoto();
		Long practiId = query.getPractiId();
		practitionerService.updateScirpt("terminal.practi_update_practi",
				practiName,sex,kindWork,isAffiliate,idCard,birthDate,nation,birthplace,mobile,
				address,bankDeposit,account,photo,practiId);
		setFileAttach(practiId);
		return SUCCESS;
	}
	
	public String updateCert() {
		HttpServletRequest req = getRequest();
		Long certId = Long.parseLong(req.getParameter("certId"));
		String certNum = req.getParameter("certNum");
		String specialtyType = req.getParameter("specialtyType");
		String contractDate = req.getParameter("contractDate");
		String awardDepart = req.getParameter("awardDepart");
		String awardDate = req.getParameter("awardDate");
		String effectDate = req.getParameter("effectDate");
		String registrantOrganization = req.getParameter("registrantOrganization");
		String practiKindwork = req.getParameter("practiKindwork");
		String stampNum = req.getParameter("stampNum");
		String mark = req.getParameter("mark");
		String remark = req.getParameter("remark");
		practitionerService.updateScirpt("terminal.practi_update_cert",
				certNum,specialtyType,contractDate,awardDepart,awardDate,effectDate,registrantOrganization,practiKindwork,
				stampNum,mark,remark,certId);
		return SUCCESS;
	}
	
	public String listCorpFor() {
		Query query = getTerminalMessage().getQuery();
		Long depId = query.getDepId();
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_AppCorpByDepId", depId);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	public String listDispatch() {
		HttpServletRequest req = getRequest();
		Integer start = Integer.parseInt(req.getParameter("start"));
		Integer pageSize = Integer.parseInt(req.getParameter("pageSize"));
		String keyword = req.getParameter("keyword");
		String startDate = req.getParameter("startDate");
		String endDate = req.getParameter("endDate");
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.practi_dispatch_list", start, pageSize, 
				keyword, startDate, endDate,labourPermission);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String updateDispatch(){
		HttpServletRequest req = getRequest();
		Long dispatchId = Long.parseLong(req.getParameter("dispatchId"));
		Long projectId = Long.parseLong(req.getParameter("projectId"));
		String projectName = req.getParameter("projectName");
		String kindWork = req.getParameter("kindWork");
		String teams = req.getParameter("teams");
		String remark = req.getParameter("remark");
		practiDispatchService.updateScirpt("terminal.practi_dispatch_update",
				dispatchId, projectId, projectName, kindWork, teams, remark);
		setFileAttach(dispatchId);
		return SUCCESS;
	}
	
	public String moveList() {
		HttpServletRequest req = getRequest();
		Long practiId = Long.parseLong(req.getParameter("practiId"));
		String target = req.getParameter("target");
		Practitioner p = practitionerService.get(practiId);
		p.setBlacklist(target);
		practitionerService.merge(p);
		return SUCCESS;
	}
	
	public String listChoose() {
		HttpServletRequest req = getRequest();
		String kindWork = req.getParameter("kindWork");
		String type = req.getParameter("type");
		String inspectType = null;
		
		if(kindWork.length() > 0 && kindWork.equals("8")) {
			if(type.equals("1")) {
				inspectType = "1";
			}else {
				inspectType = "3";
			}
		}else if(kindWork.length()>0 && kindWork.equals("4")) {
			if(type.equals("1")) {
				inspectType = "2";
			}else {
				inspectType = "4";
			}
		}
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> detailList = new ArrayList<Map<String,Object>>();
		if(inspectType != null) {
			list = chooseService.queryByScript("terminal.practi_choose_list",inspectType);
			if(list.size()>0) {
				for(Map<String,Object> m : list) {
					Long chooseId = Long.parseLong(m.get("chooseId").toString());
					detailList = chooseDetailService.queryByScript("terminal.practi_chooseDetails_list",chooseId);
					m.put("content", detailList);
				}
			}
		}
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	public String listUser() {
		HttpServletRequest req = getRequest();
		Integer start = Integer.parseInt(req.getParameter("start"));
		Integer pageSize = Integer.parseInt(req.getParameter("pageSize"));
		String fullname = req.getParameter("fullname");
		Long corpId = Long.parseLong(req.getParameter("corpId"));
		Long depId = Long.parseLong(req.getParameter("depId"));
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.practi_appUser_list",start,pageSize,
				corpId, depId,fullname);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	
	public String listLeave() {
		HttpServletRequest req = getRequest();
		Integer start = Integer.parseInt(req.getParameter("start"));
		Integer pageSize = Integer.parseInt(req.getParameter("pageSize"));
		String keyword = req.getParameter("keyword");
		String labourPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			labourPermission = ApplicationContainer.getCurrentUser().getLabourPermission();
		}
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.practi_leave_list",start,pageSize,
				keyword,labourPermission);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	public String practiNum() {
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.practi_statistics_practiNum");
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	public String certNum() {
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.practi_statistics_cert");
		List<Map<String,Object>> list1 = corpInfoService.queryByScript("terminal.practi_statistics_certStateForKindWork");
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("kindCount", list1);
		list.add(map);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*项目人员统计图**/
	public String practiInProjectNum() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.practi_statistics_practiAndProjectNum");
		List<Map<String,Object>> list1 = corpInfoService.queryByScript("terminal.practi_statistics_practiInProjectNum",start,pageSize,keyword);
		for(Map<String,Object> m : list1) {
			List<Map<String,Object>> list2 = corpInfoService.queryByScript("terminal.practi_statistics_projectKindWorkNum",Long.parseLong(m.get("projectId").toString()));
			m.put("detail", list2);
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("content", list1);
		list.add(map);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/*人员数据统计保险**/
	public String practiTotalInsurance(){
		List<Map<String,Object>> list = practitionerService.queryByScript("terminal.practi_data_total_insurance");
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	/*人员数据统计安全交底教育**/
	public String practiTotalSafe(){
		Query query = getTerminalMessage().getQuery();
		String time = query.getCreateTime();
		Map<String, Object> maps = new HashMap();
		List<Map<String,Object>> list = safetyEducationService.queryByScript("terminal.practi_data_total_education",time);
		List<Map<String,Object>> result = safeClarificationService.queryByScript("terminal.practi_data_total_clarification",time);
		maps.put("list", list);
		maps.put("result", result);
		successResponse(GsonUtil.toJson(maps));
		return SUCCESS;
	}
	
	/*人员数据统计自检项目**/
	public String practiInspectProject(){
		Query query = getTerminalMessage().getQuery();
		String time = query.getCreateTime();
		String state = query.getState();
		List<Map<String,Object>> list = inspectProjectRecordService.queryByScript("terminal.practi_data_inspect_project",time,state);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	/*人员数据统计人员考勤**/
	public String practiAttendamce(){
		Query query = getTerminalMessage().getQuery();
		Integer time = query.getStart();
		List<Map<String,Object>> list = attendamceService.queryByScript("terminal.practi_data_total_attendamce",time);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	/*我的考勤**/
	public String myAttendamce(){
		Query query = getTerminalMessage().getQuery();
		Long userId = query.getUserId();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String,Object>> list = attendamceService.queryByScript("terminal.my_attendamce_detail",userId,start,pageSize);
		successResponse(GsonUtil.toJson(list,DateUtil.LINK_DISPLAY_DATE,false));
		return SUCCESS;
	}
	
	/*我的考勤自检项目详情**/
	public String myAttendamceInspect(){
		Query query = getTerminalMessage().getQuery();
		Long aid = query.getAid();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String,Object>> list = inspectProjectRecordService.queryByScript("terminal.my_attendamce_inspect_project",aid,start,pageSize);
		for(Map<String,Object> map : list){
			String inprojectTypeName = codeService.getValue("EQUIP_INSPECTION_TYPE", map.get("inprojectType").toString());
			map.put("inprojectTypeName", inprojectTypeName);
			map.put("inprojectImageList", getFilePath(String.valueOf(map.get("inprojectImage"))));
		}
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	/*人员首页详情**/
	public String practiFristDetail(){
		Query query = getTerminalMessage().getQuery();
		Long userId = query.getUserId();
		if(StringUtils.isNotBlank(query.getFormId())){
			this.pushOneUser("oEELP0ramg4tiZwN64UxRz3-SaMs",query.getFormId());
		}
		List<Map<String,Object>> list = practitionerService.queryByScript("terminal.wechat_practi_first_detail",userId);
		for(Map<String,Object> map : list){
			String insureStatusName = codeService.getValue("INSURE_STATUS", map.get("insureStatus").toString());
			String clarificaStatusName = codeService.getValue("PRACTI_DISCLOSE_STATE", map.get("clarificaStatus").toString());
			map.put("insureStatusName", insureStatusName);
			map.put("clarificaStatusName", clarificaStatusName);
		}
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	/*人员所有历史记录**/
	public String practiHistoryRecord(){
		Query query = getTerminalMessage().getQuery();
		Long practiId = query.getPractiId();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		if("1".equals(keyword)){
			list = safetyEducationService.queryByScript("terminal.wechat_practi_history_education", start,pageSize,practiId);
		}else if("2".equals(keyword)){
			list = practiInsuranceService.queryByScript("terminal.wechat_practi_history_insurance", start,pageSize,practiId);
		}else if("3".equals(keyword)){
			list = safeClarificationService.queryByScript("terminal.wechat_practi_history_clarification", start,pageSize,practiId);
		}
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	public String practiEquipDetail(){
		Query query = getTerminalMessage().getQuery();
		Long aid = query.getAid();
		Attendamce a = attendamceService.get(aid);
		Equipment equip = equipmentService.getTranslate(a.getEquipId());
		QueryFilter f = new QueryFilter();
		f.addConjunctFilter("Q_userId_L_EQ", String.valueOf(a.getUserId()));
		List<Practitioner> p = practitionerService.getAll(f);
		equip.setUserName(p.get(0).getPractiName());
		successResponse(GsonUtil.toJson(equip, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
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

	public String photo() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		filter.addConjunctFilter("Q_fileId_L_EQ", tequest.getQuery().getFileId() + "");
		filter.addConjunctFilter("Q_dependName_S_EQ", tequest.getQuery().getRelateModule());
		List<FileAttach> list = fileAttachService.getAll(filter);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for (FileAttach fileAttach : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("fileId", fileAttach.getFileId());
			map.put("fileName", fileAttach.getFileName());
			map.put("filePath", fileAttach.getFilePath());
			map.put("createtime", fileAttach.getCreatetime());
			result.add(map);
		}
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] { "createtime" });
		successResponse(serializer.serialize(result));
		return SUCCESS;
	}
	
	public String getAccess_token(String appid, String appsecret) {
		//获取access_token
		String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential" +
				"&appid=" + appid + "&secret=" + appsecret;
		String json = restTemplate.getForObject(url, String.class);
		AccessToken accessToken = new Gson().fromJson(json,AccessToken.class);
		return accessToken.getAccess_token();
	}

	/*
	 * 微信小程序推送单个用户
	 * */
	public String pushOneUser(String openid, String formid) {

		//获取access_token
//	        String access_token = getAccess_token("wxc948920c4386940a", "398a326d46ae81b1e32a3ae710a55dfd");
//	    	String access_token = getAccess_token("wx06707614993eeb47", "fe041c4c5914c557ba3b01906ced19e8");
//	    	String access_token = getAccess_token("wx06707614993eeb47", "7d52bb0c3005a23b7654d840d92c7a53");
//	    	String access_token = getAccess_token("wxc74badc5973f7ab2", "dd3a6b1d7a7075210ca3864bd06d912d");
		String access_token = getAccess_token("wxbd1d7181e37a9d56", "61bba55ab68727f7e9f37904194f54c1");
		String url = "https://api.weixin.qq.com/cgi-bin/wxopen/message/template/send" +
				"?access_token=" + access_token;

		//拼接推送的模版
		WxMssVo wxMssVo = new WxMssVo();
		wxMssVo.setTouser(openid);//用户openid
//	        wxMssVo.setTemplate_id("IU100XzWbkjD02YMGyJBUQXruW34HF_Plal83eSQR2A");//模版id
//	        wxMssVo.setTemplate_id("sCLKQ1whqcGjX-IpyhYSVsDPwHJnHnFoIbzfYn_oqN4");
//	        wxMssVo.setTemplate_id("ORDsGoIyAN30lSqbhKZBgQMYi3AoCEhUPG23mf2Kkmk");//模版id
//	        wxMssVo.setTemplate_id("ORDsGoIyAN30lSqbhKZBgc5xTVxx1b_8NtSIrdVE688");//模版id
//	        wxMssVo.setTemplate_id("aLf5lz6nduJShJ4sY1NsJveGmpfVfVUCKyeDOyz9wXc");//模版id
//	        wxMssVo.setTemplate_id("_XlAbohDLHKIs170OWGfcaaKbo_kAS_ptQpQRknyWtc");//模版

		wxMssVo.setTemplate_id("idFrSdhrDE6weydSfVZnVyCYPsQD4Rb_yEiJ9ZHn4ouqs");//模版
		wxMssVo.setForm_id(formid);//formid


		Map<String, TemplateData> m = new HashMap<String, TemplateData>();

		//keyword1：订单类型，keyword2：下单金额，keyword3：配送地址，keyword4：取件地址，keyword5备注
		TemplateData keyword1 = new TemplateData();
		keyword1.setValue("431");
		m.put("keyword1", keyword1);
		wxMssVo.setData(m);
		TemplateData keyword2 = new TemplateData();
		keyword2.setValue("123");
		m.put("keyword2", keyword2);
		wxMssVo.setData(m);

//	        TemplateData keyword3 = new TemplateData();
//	        keyword3.setValue("321");
//	        m.put("keyword3", keyword3);
//	        wxMssVo.setData(m);
//
//	        TemplateData keyword4 = new TemplateData();
//	        keyword4.setValue("111");
//	        m.put("keyword4", keyword4);
//	        wxMssVo.setData(m);
//
//	        TemplateData keyword5 = new TemplateData();
//	        keyword5.setValue("333");
//	        m.put("keyword5", keyword5);
//	        wxMssVo.setData(m);

		HttpHeaders headers = new HttpHeaders();
		MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
		headers.setContentType(type);
		headers.add("Accept", MediaType.APPLICATION_JSON.toString());

		String json = JSONObject.toJSONString(wxMssVo);

		HttpEntity<String> formEntity = new HttpEntity<String>(json, headers);

		String result = restTemplate.postForObject(url, formEntity, String.class);
		System.out.println(result);
		return result;
	}
}
