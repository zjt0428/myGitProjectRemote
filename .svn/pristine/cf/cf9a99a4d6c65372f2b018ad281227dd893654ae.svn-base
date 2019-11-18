/**
 *====================================================
 * 文件名称: EquipmentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;


import java.math.BigDecimal;
import java.text.DateFormat;
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

import com.knight.core.util.ObjectUtil;
import com.knight.core.util.StringUtil;

import org.apache.commons.lang.StringUtils;

import com.google.gson.JsonObject;
import com.knight.app.dao.InspectRectifyDao;
import com.knight.app.model.InspectRectify;
import com.knight.app.service.InspectRectifyService;
import com.knight.app.service.TAppRepairService;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.DispatchDao;
import com.knight.emms.dao.DispatchEquipDao;
import com.knight.emms.dao.EquipDismantleDao;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.ProjectComponDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.DismantleManage;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.EquipAddReduceDetail;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.EquipInspectSchema;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.EquipInstallReview;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.model.InspectManage;
import com.knight.emms.model.InstallJjCompon;
import com.knight.emms.model.InstallManage;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.Project;
import com.knight.emms.model.ProjectCompon;
import com.knight.emms.model.RectificationRecord;
import com.knight.emms.model.TechnicalDisclosure;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.DismantleManageService;
import com.knight.emms.service.EquipAddReduceDetailService;
import com.knight.emms.service.EquipDiaryService;
import com.knight.emms.service.EquipDismantleService;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipInspectSchemaService;
import com.knight.emms.service.EquipInspectService;
import com.knight.emms.service.EquipInstallService;
import com.knight.emms.service.EquipRepairService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.FormApproveService;
import com.knight.emms.service.IndisSchemaService;
import com.knight.emms.service.InspectManageService;
import com.knight.emms.service.InstallManageService;
import com.knight.emms.service.PractiDiaryService;
import com.knight.emms.service.PractiResumeService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.ProjectComponService;
import com.knight.emms.service.TechnicalDisclosureService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.emms.terminal.dto.ComponentInfoResponse;
import com.knight.emms.terminal.dto.DismantleLoadResponse;
import com.knight.emms.terminal.dto.EquipmentGatherResponse;
import com.knight.emms.terminal.dto.EquipmentInfoResponse;
import com.knight.emms.terminal.dto.InspectLoadResponse;
import com.knight.emms.terminal.dto.InstallLoadEquipmentResponse;
import com.knight.emms.terminal.dto.InstallWaitListEquipmentResponse;
import com.knight.emms.terminal.dto.WaitInstallComponResponse;
import com.knight.emms.terminal.dto.WaitInstallPractiResponse;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.model.FileAttach;
import com.knight.system.model.UserExtend;
import com.knight.system.service.AppUserService;
import com.knight.system.service.CodeService;
import com.knight.system.service.DepartmentService;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;
import com.mysql.jdbc.log.Log;

/**
 * @ClassName: EquipmentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月25日 上午10:55:39
 */
public class EquipmentAction extends TerminalBaseAction {
	
	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;

	@Resource
	private FileAttachService fileAttachService;

	@Resource
	private EquipmentService equipmentService;

	@Resource
	private EquipInstallService equipInstallService;

	@Resource
	private InstallManageService installManageService;

	@Resource
	private EquipDismantleService equipDismantleService;

	@Resource
	private DismantleManageService dismantleManageService;

    @Resource
    private IndisSchemaService indisSchemaService;

	@Resource
	private InspectManageService inspectManageService;

	@Resource
	private EquipInspectService equipInspectService;

	@Resource
	private EquipFlowService equipFlowService;

	@Resource
	private PractitionerService practitionerService;

	@Resource
	private ComponentService componentService;
	
	@Resource
	private InspectRectifyService inspectRectifyService;

	@Resource
	private ProjectComponService projectComponService;

    @Resource
    private CodeService codeService;
    
    @Resource
    private EquipRepairService equipRepairService;

    @Resource
    private InspectRectifyDao inspectRectifyDao;

    @Resource
    private AppUserService appUserService;
    @Resource
    private DepartmentService departmentService;
    @Resource
    private TAppRepairService repairService;
//    @Resource
//	private UserProjectService userProjectService;
    
    @Resource
	private TechnicalDisclosureService technicalDisclosureService;

	@Resource
	private EquipDiaryService equipDiaryService;
	@Resource
	private ProjectComponDao projectComponDao;
	@Resource
	private EquipmentDao equipmentDao;
	@Resource
	private DispatchEquipDao dispatchEquipDao;
	@Resource
	private ContractLeaseDao contractLeaseDao;
	@Resource
	private DispatchDao dispatchDao;
	@Resource
	private ComponentDao componentDao;
	@Resource
	private EquipFlowDao equipFlowDao;
	@Resource
	private ComponDiaryService componDiaryService;
	@Resource
	private PractiResumeService	practiResumeService;
	@Resource
	PractiDiaryService practiDiaryService;
	@Resource
	private EquipDismantleDao equipDismantleDao;
	@Resource
    private ProjectDao projectDao;
	@Resource
	private EquipInspectSchemaService equipInspectSchemaService;
	@Resource
	private EquipAddReduceDetailService equipAddReduceDetailService;
	@Resource
	private FormApproveService formApproveService;
	
	
	
//    
	public String gather() {
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.gather");
		EquipmentGatherResponse response = new EquipmentGatherResponse();
		response.addGather(result);
		setJsonString(GsonUtil.toJson(response, false));
		return SUCCESS;
	}
	
	/* 当前设备各状态数量统计 */
	public String countEquip() {
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.equip_count");
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String listPractitioner() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String mobile = query.getMobile();
		String practiName = query.getPractiName();
		String kindWorkName = query.getKindWorkName();
		List<Map<String, Object>> practiList = practitionerService.queryByScript("terminal.list_practitioner", mobile, practiName, kindWorkName, start, pageSize);
		successResponse(GsonUtil.toJson(practiList, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

    public String listEquip(){
        Query query = getTerminalMessage().getQuery();
        Integer start = query.getStart();
        Integer pageSize = query.getPageSize();
		String equipGenericName = codeService.getCode("equipGeneric",query.getKeyword());
		String equipSpecificName = codeService.getCode("equipSpecific",query.getKeyword());
		String projectName = query.getProjectName();
		String keyword = query.getKeyword();
		Long projectId = query.getStoreId();
		if(!equipGenericName.equals(keyword)){
			keyword = equipGenericName;
		}
		if(!equipSpecificName.equals(keyword)){
			keyword = equipSpecificName;
		}
		QueryFilter filter = new QueryFilter();
		if(projectId !=null){
			if(query.getRelateModule() !=null && query.getRelateModule().equals("projectStore")){
				filter.addConjunctFilter("Q_projectId_L_EQ",String.valueOf(projectId));
			}
			if(query.getRelateModule() !=null && query.getRelateModule().equals("houseStore")){
				filter.addConjunctFilter("Q_storeId_L_EQ",String.valueOf(projectId));
			}
			 
		}
		filter.addFieldsDisjunctFilter("Q_exwSerial|recordId|equipGeneric|equipSpecific|equipVender|projectName_S_LK",keyword);
        filter.addConjunctFilter("Q_delFlag_S_EQ","1");
//        filter.addFieldsValuesDisjunctFilter("Q_status_S_EQ","1");
		filter.setPagingBean(new PagingBean(start,pageSize));
        List<Equipment> equipments = equipmentService.queryTranslateAll(filter);
		EquipmentInfoResponse info = new EquipmentInfoResponse();
		for(Equipment e :equipments){
            ComponentInfoResponse compInfo = new ComponentInfoResponse();
            CodeServiceImpl.translate(e.getComponentSet());
            for(Component c :e.getComponentSet()){
                compInfo.addComponent(c);
            }
			info.addEquipment(e,compInfo);
		}
        setJsonString(GsonUtil.toJson(info,false));
        return SUCCESS;
    }

	public String listComponent() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String componSerial = query.getComponSerial();
		String dimensions = query.getDimensions();
		String componGenericName = query.getComponGenericName();
		String componSpecificName = query.getComponSpecificName();
		String componIds = query.getComponIds();
		if(StringUtils.isNotBlank(componIds)){
			List<Map<String, Object>> componentList = componentService.queryByScript("terminal.list_component2", componSerial, dimensions, componGenericName, componSpecificName, start, pageSize,componIds);
			successResponse(GsonUtil.toJson(componentList, DateUtil.LINK_DISPLAY_DATE, false));
		}else{
			List<Map<String, Object>> componentList = componentService.queryByScript("terminal.list_component", componSerial, dimensions, componGenericName, componSpecificName, start, pageSize);
			successResponse(GsonUtil.toJson(componentList, DateUtil.LINK_DISPLAY_DATE, false));
		}
		return SUCCESS;
	}

	public String listComponentDispatch() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String componSerial = query.getComponSerial();
		String dimensions = query.getDimensions();
		String componGenericName = query.getComponGenericName();
		String componSpecificName = query.getComponSpecificName();
		String exwSerial = query.getExwSerial();
        Long storeId = query.getStoreId();
        if("storeCompon".equals(query.getRelateModule())) {
            List<Map<String, Object>> componentList = componentService.queryByScript("terminal.list_component_dispatch", componSerial, dimensions, componGenericName, componSpecificName, start, pageSize,storeId,exwSerial);
            successResponse(GsonUtil.toJson(componentList, DateUtil.LINK_DISPLAY_DATE, false));
        }
		if("projectCompon".equals(query.getRelateModule())){
			List<Map<String,Object>> projectComponlist = projectComponService.queryByScript("terminal.list_project_compon",componSerial, dimensions, componGenericName, componSpecificName, start, pageSize,storeId,exwSerial);
			successResponse(GsonUtil.toJson(projectComponlist, DateUtil.LINK_DISPLAY_DATE, false));
		}
		return SUCCESS;
	}

	public String ecinfoLoad() {
		Query query = getTerminalMessage().getQuery();
		String qrcode = query.getQrcode();
		if (StringUtils.isBlank(qrcode)) {
			setJsonString("{\"success\":false, \"msg\":\"二维码信息有误-" + qrcode + "\"}");
		}
		try {
			Query ecquery = GsonUtil.fromJson(qrcode, Query.class);
			if (ecquery.getComponId() != null) {
				Component component = componentService.get(ecquery.getComponId());
				if (component == null) {
					setJsonString("{\"success\":false, \"msg\":\"不存在该配件信息[" + ecquery.getComponId() + "]\"}");
				} else {
					ComponentInfoResponse response = new ComponentInfoResponse();
					CodeServiceImpl.translate(component);
					response.addComponent(component);
					setJsonString(GsonUtil.toJson(response, false));
				}
			} else if (ecquery.getEquipId() != null) {
				Equipment equipment = equipmentService.get(ecquery.getEquipId());
				if (equipment == null) {
					setJsonString("{\"success\":false, \"msg\":\"不存在该设备信息[" + ecquery.getEquipId() + "]\"}");
				} else {
					EquipmentInfoResponse response = new EquipmentInfoResponse();
					CodeServiceImpl.translate(equipment);
					response.addEquipment(equipment);
					setJsonString(GsonUtil.toJson(response, false));
				}
			} else {
				setJsonString("{\"success\":false, \"msg\":\"二维码信息有误-" + qrcode + "\"}");
			}
		} catch (Exception e) {
			setJsonString("{\"success\":false, \"msg\":\"二维码信息有误-" + qrcode + "\"}");
		}

		return SUCCESS;
	}

	public String installWaitList() {
		Tequest tequest = getTerminalMessage();
		String projectName = tequest.getQuery().getProjectName();
		String recordId = tequest.getQuery().getRecordId();
		String exwSerial=tequest.getQuery().getExwSerial();
		String buildingNum=tequest.getQuery().getBuildingNum();

//		if(exwSerial==null){exwSerial="";}
		List<Map<String, Object>> result = equipInstallService.queryByScript("terminal.wait_install", projectName, recordId,exwSerial,buildingNum);
		InstallWaitListEquipmentResponse response = new InstallWaitListEquipmentResponse();
		for (Map<String, Object> data : result) {
			response.add((Long) data.get("dispatchEquipId"), (Long) data.get("dispatchId"), (String) data.get("recordId"), (String) data.get("projectName"),(Long) data.get("projectId"),
					(String) data.get("buildingNum"),(String) data.get("exwSerial"));
		}
		setJsonString(GsonUtil.toJson(response, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String waitInstallCompon() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		filter.addConjunctFilter("Q_projectId_L_EQ", tequest.getQuery().getProjectId() == null ? "-1" : tequest.getQuery().getProjectId() + "");
		filter.addConjunctFilter("Q_counts_N_NEQ","0");
		filter.addConjunctFilter("Q_status_S_EQ",tequest.getQuery().getStatus());
		filter.addConjunctFilter("Q_component.componGenericName_S_LK",tequest.getQuery().getComponGenericName());
		filter.addConjunctFilter("Q_component.componSpecificName_S_LK",tequest.getQuery().getComponSpecificName());
		filter.addConjunctFilter("Q_component.exwSerial_S_LK",tequest.getQuery().getExwSerial());
		List<ProjectCompon> list = projectComponService.queryTranslateAll(filter);
		WaitInstallComponResponse response = new WaitInstallComponResponse();
		response.add(list);
		setJsonString(GsonUtil.toJson(response, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String listInstallCompondiary() {
		Tequest tequest = getTerminalMessage();
        EquipInstall equipInstall = equipInstallService.getTranslateFull(tequest.getQuery().getInstallId());
        List list =  equipInstallService.loadCompondiarySet(equipInstall,tequest.getQuery());
		WaitInstallComponResponse response = new WaitInstallComponResponse();
		response.add(list);
		setJsonString(GsonUtil.toJson(response, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String waitInstallPracti() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
        if(tequest.getQuery().getKeyword()!=null&&tequest.getQuery().getKeyword()!=""){
            filter.addFieldsDisjunctFilter("Q_[practiName|department.depName|kindWork]_S_LK",tequest.getQuery().getKeyword());
        }
        if(tequest.getQuery().getDepId()!=null) {
        	filter.addConjunctFilter("Q_depId_L_EQ", String.valueOf(tequest.getQuery().getDepId()));
        }
		filter.setPagingBean(new PagingBean(0,1000));
		List<Practitioner> list = practitionerService.queryTranslateAll(filter);
		WaitInstallPractiResponse response = new WaitInstallPractiResponse();
		response.add(list);
		setJsonString(GsonUtil.toJson(response, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	@Deprecated
	public String installList() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addConjunctFilter("Q_equipFlow.equipDiary.recordId_S_LK", tequest.getQuery().getRecordId());
		filter.addConjunctFilter("Q_equipFlow.equipDiary.projectName_S_LK", tequest.getQuery().getProjectName());
		filter.addConjunctFilter("Q_equipFlow.flowState_S_EQ", Status.EquipFlow.installed);
		List<EquipInstall> list = equipInstallService.getAll(filter);
		for (EquipInstall equipInstall : list) {
			List<Long> fileIds = fileAttachService.getFileIdByDepend(equipInstall.getInstallId(), SystemConstant.MODULE_EQUIP_INSTALL);
			equipInstall.setFileAttaches(StringUtils.join(fileIds, ","));
		}
		return SUCCESS;
	}

	public String installLoad() {
		Tequest tequest = getTerminalMessage();
		EquipInstall equipInstall = equipInstallService.getTranslateFull(tequest.getQuery().getInstallId());
		List<Long> fileIds = fileAttachService.getFileIdByDepend(equipInstall.getInstallId(), SystemConstant.MODULE_EQUIP_INSTALL);
		equipInstall.setFileAttaches(StringUtils.join(fileIds, ","));
		List<FileAttach> fileAttchs=fileAttachService.getByDepend(equipInstall.getInstallId(), SystemConstant.MODULE_EQUIP_INSTALL);
		List<Map> images=new ArrayList<Map>();
		Map<String, Object> map=null;
		FileAttach attch=null;
		for(int i=0;i<fileAttchs.size();i++){
			map=new HashMap<String, Object>();
			attch=fileAttchs.get(i);
			map.put("fileid", attch.getFileId());
			map.put("filesource", attch.getSource());
			map.put("imagePath", Constant.IMG_PRE_PATH+attch.getFilePath());
			images.add(map);
		}
		InstallLoadEquipmentResponse response = new InstallLoadEquipmentResponse();
		response.add(equipInstall,images);
		setJsonString(GsonUtil.toJson(response, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String installSubmit() {
		Map<String, UserExtend> userExtends = ApplicationContainer.getCurrentUser().getAppUserExtends();
		if (userExtends == null || userExtends.isEmpty() || userExtends.get(SystemConstant.MODULE_PRACTITIONER) == null || userExtends.get(SystemConstant.MODULE_PRACTITIONER).getForeignId() == null) {
			throw new BusinessException("非从业人员不允许操作");
		}
		Practitioner practitioner = (Practitioner) userExtends.get(SystemConstant.MODULE_PRACTITIONER);
		Tequest tequest = getTerminalMessage();
		EquipFlow equipFlow = new EquipFlow();
		equipFlow.setDispatchEquipId(tequest.getDispatchEquipId());
		EquipInstall equipInstall = new EquipInstall();
		equipInstall.setStartinDate(tequest.getStartinDate());
		equipInstall.setEndinDate(tequest.getEndinDate());
		equipInstall.setInstallHeight(tequest.getInstallHeight());
		equipInstall.setKnotCounts(tequest.getKnotCounts());
		equipInstall.setBrachium(tequest.getBrachium());
		equipInstall.setWallAttacheQty(tequest.getWallAttacheQty());
		equipInstall.setEquipFlow(equipFlow);
		equipInstall.setApplyforState(Status.EquipFlowApplyfor.waitSubmit);
		equipInstall.setPrincipalId(practitioner.getPractiId());
		equipInstall.setPrincipal(practitioner.getPractiName());
		equipInstall.setPrincipalTel(practitioner.getMobile());
		equipInstall.setDelFlag(Constant.ENABLED);
		equipInstall.setComponDiarySet(tequest.getComponDiarySet());
		equipInstall.setPractiDiarySet(tequest.getPractiDiarySet());
		equipInstall.setFileAttaches(tequest.getFileAttaches());
		equipInstall.setLongitude(tequest.getLongitude());
		equipInstall.setLatitude(tequest.getLatitude());
		equipInstall.setAddress(tequest.getAddress());
		equipInstall.setInstalltype(tequest.getInstalltype());
		equipInstall.setRemark(tequest.getRemark());
		equipInstallService.sceneInstall(equipInstall,tequest.getBuildingNum());
		setTerminalFileAttach(equipInstall.getInstallId(), equipInstall.getFileAttaches());
		return SUCCESS;
	}

	public String jackOrDrop() {
		Tequest tequest = getTerminalMessage();
        EquipInstall p = equipInstallService.getTranslate(tequest.getInstallId());
        p.setJjCompons(GsonUtil.toJson(tequest.getJjComponSet()));
        p.setSubComponInstall();
        Integer knotCounts =p.getKnotCounts(),wallAttacheQty =p.getWallAttacheQty();
        BigDecimal installHeight = p.getInstallHeight();
        for(InstallJjCompon cd : p.getJjComponSet()){
            Component c = componentService.get(cd.getComponId());
            if("1".equals(c.getKnotFlag())){
                knotCounts += cd.getCounts();
            }
            if("1".equals(c.getWallAttacheFlag())){
                wallAttacheQty += cd.getCounts();
            }
            if(c.getKnotMetric()!=null){
				installHeight = installHeight.add(c.getKnotMetric().multiply(new BigDecimal(cd.getCounts())));
            }
        }
		p.setInstallHeight(installHeight);
        p.setKnotCounts(knotCounts);
		p.setWallAttacheQty(wallAttacheQty);
		if(tequest.getDropFileAttaches()!=null){
			p.setDropFileAttaches((p.getDropFileAttaches()==null?"":(p.getDropFileAttaches()+","))+tequest.getDropFileAttaches());
		}
		if(tequest.getJackFileAttaches()!=null){
			p.setJackFileAttaches((p.getJackFileAttaches()==null?"":(p.getJackFileAttaches()+","))+tequest.getJackFileAttaches());
		}

        if ((Boolean) ApplicationContainer.getSystemParam("schemaNoticeSwitch")) {
            QueryFilter filter = new QueryFilter();
            filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_EMPLOY);
            filter.addConjunctFilter("Q_equipment.equipId_L_EQ", p.getEquipFlow().getEquipId() + "");
            filter.addConjunctFilter("Q_project.projectId_L_EQ", p.getEquipFlow().getDispatch().getProjectId() + "");
            filter.addConjunctFilter("Q_contractLease.contractId_L_EQ", p.getEquipFlow().getContractId() + "");
            List<IndisSchema> s = indisSchemaService.getAll(filter);
            if (s.isEmpty()) {
                throw new BusinessException("该设备未做附墙方案");
            }
        }
        if("jack".equals(tequest.getType())){
            setTerminalFileAttach(tequest.getInstallId(), tequest.getDropFileAttaches());
        }else if("drop".equals(tequest.getType())){
            setTerminalFileAttach(tequest.getInstallId(), tequest.getJackFileAttaches());
        }
        equipInstallService.setJjCompon(p,tequest.getType());
		return SUCCESS;
	}

	public String installManageList() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addConjunctFilter("Q_recordId_S_LK", tequest.getQuery().getRecordId());
		filter.addConjunctFilter("Q_projectName_S_LK", tequest.getQuery().getProjectName());
		List<InstallManage> list = installManageService.getAll(filter);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String installManageLoad() {
		Tequest tequest = getTerminalMessage();
		InstallManage installManage = installManageService.get(tequest.getQuery().getInstallId());
		EquipFlow equipFlow = new EquipFlow();
		EquipDiary equipDiary = new EquipDiary();
		equipDiary.setProjectName(installManage.getProjectName());
		equipDiary.setRecordId(installManage.getRecordId());
		equipFlow.setEquipDiary(equipDiary);
		installManage.setEquipFlow(equipFlow);
		List<Long> fileIds = fileAttachService.getFileIdByDepend(installManage.getInstallId(), SystemConstant.MODULE_INSTALL_MANAGE);
		installManage.setFileAttaches(StringUtils.join(fileIds, ","));
		List<FileAttach> fileAttchs=fileAttachService.getByDepend(installManage.getInstallId(), SystemConstant.MODULE_INSTALL_MANAGE);
		List<Map> images=new ArrayList<Map>();
		Map<String, Object> map=null;
		FileAttach attch=null;
		for(int i=0;i<fileAttchs.size();i++){
			map=new HashMap<String, Object>();
			attch=fileAttchs.get(i);
			map.put("fileid", attch.getFileId());
			map.put("filesource", attch.getSource());
			images.add(map);
		}
		installManage.setImages(images);
		List<InstallManage> list = new ArrayList<InstallManage>();
		list.add(installManage);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String installManageSubmit() {
		Tequest tequest = getTerminalMessage();
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		InstallManage install = new InstallManage();
		EquipInstall equipInstall  = new  EquipInstall();
		install.setRecordId(tequest.getRecordId());
		install.setProjectName(tequest.getProjectName());
		install.setStartinDate(tequest.getStartinDate());
		install.setEndinDate(tequest.getEndinDate());
		install.setWallAttacheQty(tequest.getWallAttacheQty());
		install.setBrachium(tequest.getBrachium());
		install.setInstallHeight(tequest.getInstallHeight());
		install.setLongitude(tequest.getLongitude());
		install.setLatitude(tequest.getLatitude());
		install.setAddress(tequest.getAddress());
		install.setUserId(currentUser.getUserId());
		install.setUserName(currentUser.getFullname());
		install.setProvidedDate(DateUtil.getCurrentLinkDateStr());
		install.setInstalltype(tequest.getInstalltype());
		install.setExwserial(tequest.getExwSerial());
		install.setBuildingnum(tequest.getBuildingNum());
		equipInstall.setContractSerial(equipInstall.getContractSerial());
		equipInstall.setEquipmentNo(equipInstall.getEquipmentNo());
		equipInstall.setExwDate(equipInstall.getExwDate());
		equipInstall.setEquipVender(equipInstall.getEquipVender());
		installManageService.save(install);
		setTerminalFileAttach(install.getInstallId(), tequest.getFileAttaches());
		return SUCCESS;
	}

	public String installAllList() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String recordId = query.getRecordId();
		String projectName = query.getProjectName();
		String exwSerial=query.getExwSerial();
		String buildingNum=query.getBuildingNum();
		String flowState = query.getFlowState();
		List<Map<String, Object>> installAllList = installManageService.queryByScript("terminal.list_install_all", projectName, recordId, exwSerial,buildingNum,flowState,start, pageSize);
		for (Map<String, Object> data : installAllList) {
//			List<Long> fileIds = fileAttachService.getFileIdByDepend((Long) data.get("installId"), data.get("relateModule").toString());
//			data.put("fileAttaches", StringUtils.join(fileIds, ","));
			List<FileAttach> fileAttchList = fileAttachService.getByDepend((Long) data.get("installId"), data.get("relateModule").toString());
			if(fileAttchList.size()>0) {
				StringBuffer sb = new StringBuffer();
				List<String> imgList = new ArrayList<String>();
				for(FileAttach fa : fileAttchList) {
					sb.append(fa.getFileId()).append(",");
					imgList.add(Constant.IMG_PRE_PATH+fa.getFilePath());
				}
				data.put("imgList", imgList);
				data.put("fileAttaches", sb.substring(0, sb.length()-1));
			}
		}
		Integer count = 0;
		if(installAllList.size()>0){
			count = (Integer)installAllList.get(0).get("count");
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + GsonUtil.toJson(installAllList, DateUtil.LINK_DISPLAY_DATE, false)
		+ ",\"count\":"+count+"}}");
//		successResponse(GsonUtil.toJson(installAllList, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String inspectWaitList() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = new QueryFilter();
		Query query = tequest.getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		if(start!=null && pageSize!=null) {
			if(!"0".equals(start.toString())) {
				filter.setPagingBean(new PagingBean(start+1, pageSize));
			}else {
				filter.setPagingBean(new PagingBean(start, pageSize));
			}
		}
		if(StringUtils.isNotBlank(query.getKeyword())) {
			filter.addFieldsDisjunctFilter("Q_[equipInspectSchema.equipDiary.projectName"
					+ "|equipInspectSchema.equipDiary.recordId|equipInspectSchema.equipDiary.exwSerial"
					+ "|equipInspectSchema.equipDiary.equipSerial]_S_LK", query.getKeyword());
		}
		filter.addConjunctFilter("Q_status_S_EQ", Status.HandleResult.untreated);
		//已经拆卸入库的设备，其对应的巡检单尚未巡检过的不显示
		filter.addConjunctFilter("Q_flowState_S_LT", Status.EquipFlow.dismantling);
		filter.addConjunctFilter("Q_sealStatus_S_EQ", Constant.DISENABLED);
		AppUser au = appUserService.findByUserName(ApplicationContainer.getCurrentUser().getUsername());
		appUserService.getRoleDataPermission(au);
		filter.addValuesDisjunctFilter("QVO_permissionFlag_S_LK", au.getDataPermission());
		List<EquipInspect> list = equipInspectService.getAll(filter);
		for(EquipInspect ei:list){
			CodeServiceImpl.translate(ei.getEquipInspectSchema().getEquipDiary());
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false)
		+ ",\"totalCounts\":"+filter.getPagingBean().getTotalItems()+"}}");
		return SUCCESS;
	}

	public String inspectList() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addConjunctFilter("Q_status_S_GT", Status.HandleResult.untreated);
		filter.addConjunctFilter("Q_equipInspectSchema.equipDiary.projectName_S_LK", tequest.getQuery().getProjectName());
		List<EquipInspect> list = equipInspectService.queryTranslateAll(filter);
		for (EquipInspect equipInspect : list) {
			List<Long> fileIds = fileAttachService.getFileIdByDepend(equipInspect.getInspectId(), SystemConstant.MODULE_EQUIP_INSPECT);
			equipInspect.setFileAttaches(StringUtils.join(fileIds, ","));
		}
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String inspectLoad() {
		Tequest tequest = getTerminalMessage();
		EquipInspect equipInspect = equipInspectService.getTranslateFull(tequest.getQuery().getInspectId());
//		List<Long> fileIds = fileAttachService.getFileIdByDepend(equipInspect.getInspectId(), SystemConstant.MODULE_EQUIP_INSPECT);
//		equipInspect.setFileAttaches(StringUtils.join(fileIds, ","));
		List<FileAttach> fileAttchs=fileAttachService.getByDepend(equipInspect.getInspectId(), SystemConstant.MODULE_EQUIP_INSPECT);
		List<Map> images=new ArrayList<Map>();
		Map<String, Object> map=null;
		FileAttach attch=null;
		for(int i=0;i<fileAttchs.size();i++){
			attch=fileAttchs.get(i);
			if(equipInspect.getFileAttaches().contains(attch.getFileId()+"")) {
				map=new HashMap<String, Object>();
				map.put("fileid", attch.getFileId());
				map.put("filesource", attch.getSource());
				map.put("remark", attch.getRemark());
				map.put("imagePath", Constant.IMG_PRE_PATH+attch.getFilePath());
				images.add(map);
			}
		}
		//-----------------读取巡检整改信息---------------
		if(equipInspect.getInspectRectifyId()!=null){
			InspectRectify inspectRectify = inspectRectifyService.get(equipInspect.getInspectRectifyId());
//			List<Long> inspectRectifyFileIds = fileAttachService.getFileIdByDepend(inspectRectify.getInspectRectifyId(), SystemConstant.MODULE_INSPECT_RECTIFY);
//			inspectRectify.setFileAttaches(StringUtils.join(inspectRectifyFileIds, ","));
			List<FileAttach> fileAttchList = fileAttachService.getByDepend(inspectRectify.getInspectRectifyId(), SystemConstant.MODULE_INSPECT_RECTIFY);
			StringBuffer sb = new StringBuffer();
			List<String> list = new ArrayList<String>();
			for (int i = 0; i < fileAttchList.size(); i++) {
				sb.append(fileAttchList.get(i).getFileId()).append(",");
				list.add(Constant.IMG_PRE_PATH+fileAttchList.get(i).getFilePath());
			}
			if(fileAttchList.size()>0) {
				inspectRectify.setFileAttaches(sb.substring(0, sb.length()-1));
				inspectRectify.setImgList(list);
			}
			equipInspect.setInspectRectify(inspectRectify);
		}
		InspectLoadResponse response = new InspectLoadResponse();
		response.add(equipInspect,images);
		setJsonString(GsonUtil.toJson(response, DateUtil.LINK_DISPLAY_DATE_FULL, false));
		return SUCCESS;
	}

	public String inspectSubmit() {
		Tequest tequest = getTerminalMessage(DateUtil.LINK_DISPLAY_DATE_FULL);
		logger.info("tequest : "+tequest);
		logger.info(String.valueOf(tequest.getInspectId()));
		EquipInspect inspect = equipInspectService.get(tequest.getInspectId());
		inspect.setInspectResult(tequest.getInspectResult());
		inspect.setInspectDate(tequest.getInspectDate());
		inspect.setInspectPepoles(ApplicationContainer.getCurrentUser().getFullname());
		inspect.setRemark(tequest.getRemark());
		inspect.setFileAttaches(tequest.getFileAttaches());
		inspect.setLongitude(tequest.getLongitude());
		inspect.setLatitude(tequest.getLatitude());
		inspect.setAddress(tequest.getAddress());
		inspect.setBuildingNum(tequest.getBuildingNum());
		inspect.setExwSerial(tequest.getExwSerial());
		inspect.setRecordId(tequest.getRecordId());
		inspect.setRectification(tequest.getRectification());
		inspect.setInspectSchedule(Status.InspectSchedule.planed);
		if(!equipInspectService.immediate(inspect)) {
			errorResponse("请为当前账户绑定企业档案，以正常使用短信提醒功能");
		}
		
		JsonObject obj  = new JsonObject();
    	obj.addProperty("inspectId", inspect.getInspectId());
    	obj.addProperty("relateModule", "EQUIP_INSPECT");
		
		send("您收到一条整改通知，"+tequest.getProjectName()+"项目,"+inspect.getBuildingNum()+"号楼,"+inspect.getRemark(),obj.toString(),String.valueOf(ApplicationContainer.getCurrentUserId()),"INSPECTIONDEETAIL");
		setTerminalFileAttach(inspect.getInspectId(), inspect.getFileAttaches());
		if("3".equals(tequest.getInspectResult())||"4".equals(tequest.getInspectResult())||"5".equals(tequest.getInspectResult())){
			repairService.createRepair(inspect.getEquipInspectSchema().getFlowId());
		}
		
		return SUCCESS;
	}

	public String inspectComplete() {
		Tequest tequest = getTerminalMessage(DateUtil.LINK_DISPLAY_DATE_FULL);
		String relateModule = tequest.getRelateModule();
		if (SystemConstant.MODULE_EQUIP_INSPECT.equals(relateModule)) {
			EquipInspect inspect = equipInspectService.get(tequest.getInspectId());
			inspect.setInspectResult(tequest.getProjectName());
			inspect.setBuildingNum(tequest.getBuildingNum());
			inspect.setExwSerial(tequest.getExwSerial());
			inspect.setInspectPepoles(tequest.getInspectPepoles());
			inspect.setInspectDate(tequest.getInspectDate());
			inspect.setRectification(tequest.getRectification());
			inspect.setInspectResult(tequest.getInspectResult());
			inspect.setAddress(tequest.getAddress());
			inspect.setRemark(tequest.getRemark());
			inspect.setFileAttaches(tequest.getFileAttaches());
			inspect.setLongitude(tequest.getLongitude());
			inspect.setLatitude(tequest.getLatitude());
			
			if(tequest.getRectification().equals("1")){
				inspect.setInspectSchedule(Status.InspectSchedule.unInspect);
			}else{
				inspect.setInspectSchedule(Status.InspectSchedule.completed);
			}
		
			if(!equipInspectService.immediate(inspect)) {
				errorResponse("请为当前账户绑定企业档案，以正常使用短信提醒功能");
			}
			
			JsonObject obj  = new JsonObject();
	    	obj.addProperty("inspectId", inspect.getInspectId());
	    	obj.addProperty("relateModule", SystemConstant.MODULE_EQUIP_INSPECT);
			
			send("您收到一条整改通知，"+tequest.getProjectName()+"项目,"+inspect.getBuildingNum()+"号楼,"+inspect.getRemark(),obj.toString(),String.valueOf(ApplicationContainer.getCurrentUserId()),"INSPECTIONDEETAIL");
			setTerminalFileAttach(inspect.getInspectId(), inspect.getFileAttaches());
		}else if(SystemConstant.MODULE_INSPECT_MANAGE.equals(relateModule)){
			InspectManage inspect = inspectManageService.get(tequest.getInspectId());
			inspect.setInspectResult(tequest.getProjectName());
			inspect.setBuildingNum(tequest.getBuildingNum());
			inspect.setExwSerial(tequest.getExwSerial());
			inspect.setInspectPepoles(tequest.getInspectPepoles());
			inspect.setInspectDate(tequest.getInspectDate());
			inspect.setRectification(tequest.getRectification());
			inspect.setInspectResult(tequest.getInspectResult());
			inspect.setAddress(tequest.getAddress());
			inspect.setRemark(tequest.getRemark());
			inspect.setFileAttaches(tequest.getFileAttaches());
			inspect.setLongitude(tequest.getLongitude());
			inspect.setLatitude(tequest.getLatitude());
			
			if(tequest.getRectification().equals("1")){
				inspect.setInspectSchedule(Status.InspectSchedule.unInspect);
			}else{
				inspect.setInspectSchedule(Status.InspectSchedule.completed);
			}
			
			JsonObject obj  = new JsonObject();
	    	obj.addProperty("inspectId", inspect.getInspectId());
	    	obj.addProperty("relateModule", SystemConstant.MODULE_INSPECT_MANAGE);
			
			send("您收到一条整改通知，"+tequest.getProjectName()+"项目,"+inspect.getBuildingNum()+"号楼,"+inspect.getRemark(),obj.toString(),String.valueOf(ApplicationContainer.getCurrentUserId()),"INSPECTIONDEETAIL");
			setTerminalFileAttach(inspect.getInspectId(), inspect.getFileAttaches());
			
		}
		return SUCCESS;
	}
	
	
	public String inspectManageList() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addConjunctFilter("Q_projectName_S_LK", tequest.getQuery().getProjectName());
		List<InspectManage> list = inspectManageService.queryTranslateAll(filter);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String inspectManageLoad() {
		Tequest tequest = getTerminalMessage();
		InspectManage inspectManage = inspectManageService.get(tequest.getQuery().getInspectId());
		EquipInspectSchema equipInspectSchema = new EquipInspectSchema();
		EquipDiary equipDiary = new EquipDiary();
		equipDiary.setProjectName(inspectManage.getProjectName());
		equipInspectSchema.setEquipDiary(equipDiary);
		inspectManage.setEquipInspectSchema(equipInspectSchema);
		List<Long> fileIds = fileAttachService.getFileIdByDepend(inspectManage.getInspectId(), SystemConstant.MODULE_INSPECT_MANAGE);
		inspectManage.setFileAttaches(StringUtils.join(fileIds, ","));
		List<FileAttach> fileAttchs=fileAttachService.getByDepend(inspectManage.getInspectId(), SystemConstant.MODULE_INSPECT_MANAGE);
		List<Map> images=new ArrayList<Map>();
		Map<String, Object> map=null;
		FileAttach attch=null;
		for(int i=0;i<fileAttchs.size();i++){
			map=new HashMap<String, Object>();
			attch=fileAttchs.get(i);
			map.put("fileid", attch.getFileId());
			map.put("filesource", attch.getSource());
			map.put("imagePath", Constant.IMG_PRE_PATH+attch.getFilePath());
			images.add(map);
		}
		inspectManage.setImages(images);
		
		//-----------------读取巡检整改信息---------------
		if(inspectManage.getInspectRectifyId()!=null){
			InspectRectify inspectRectify = inspectRectifyService.get(inspectManage.getInspectRectifyId());
			List<Long> inspectRectifyFileIds = fileAttachService.getFileIdByDepend(inspectRectify.getInspectRectifyId(), SystemConstant.MODULE_INSPECT_RECTIFY);
			inspectRectify.setFileAttaches(StringUtils.join(inspectRectifyFileIds, ","));
			inspectManage.setInspectRectify(inspectRectify);
		}
		
		List<InspectManage> list = new ArrayList<InspectManage>();
		list.add(inspectManage);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String inspectManageSubmit() {
		setJsonString("待巡检单不能为空，请通过查询待巡检单选择要巡检的设备");
		/*AppUser currentUser = ApplicationContainer.getCurrentUser();
		Tequest tequest = getTerminalMessage(DateUtil.LINK_DISPLAY_DATE_FULL);
		InspectManage inspect = new InspectManage();
		inspect.setProjectName(tequest.getProjectName());
		inspect.setInspectDate(tequest.getInspectDate());
		inspect.setInspectPepoles(ApplicationContainer.getCurrentUser().getFullname());
		inspect.setInspectResult(tequest.getInspectResult());
		inspect.setRemark(tequest.getRemark());
		inspect.setFileAttaches(tequest.getFileAttaches());
		inspect.setLongitude(tequest.getLongitude());
		inspect.setLatitude(tequest.getLatitude());
		inspect.setAddress(tequest.getAddress());
		inspect.setBuildingNum(tequest.getBuildingNum());
		inspect.setExwSerial(tequest.getExwSerial());
		inspect.setRecordId(tequest.getRecordId());
		inspect.setUserId(currentUser.getUserId());
		inspect.setUserName(currentUser.getFullname());
		inspect.setProvidedDate(DateUtil.getCurrentLinkDateStr());
		inspect.setRectification(tequest.getRectification());
		inspect.setProjectId(tequest.getProjId());
		inspectManageService.saveOrMergeForEdit(inspect);
		
		JsonObject obj  = new JsonObject();
    	obj.addProperty("inspectId", inspect.getInspectId());
    	obj.addProperty("relateModule", "INSPECT_MANAGE");
		
		send("您收到一条整改通知，"+tequest.getProjectName()+"项目,"+inspect.getBuildingNum()+"号楼,"+inspect.getRemark(),obj.toString(),String.valueOf(ApplicationContainer.getCurrentUserId()),"INSPECT_MANAGE");

		
		setTerminalFileAttach(inspect.getInspectId(), inspect.getFileAttaches());*/
		return SUCCESS;
	}
		
	//整改反馈提交
	public String inspectRectifySubmit(){
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		Tequest tequest = getTerminalMessage(DateUtil.LINK_DISPLAY_DATE_FULL);
		InspectRectify inspectRectify = new InspectRectify();
		inspectRectify.setInspectId(tequest.getInspectId());
		inspectRectify.setLatitude(tequest.getLatitude());
		inspectRectify.setLongitude(tequest.getLatitude());
		inspectRectify.setRectifyDate(tequest.getRectifyDate());
		inspectRectify.setRectifyIntroduce(tequest.getRectifyIntroduce());
		inspectRectify.setRectifyResult(tequest.getRectifyResult());
		inspectRectify.setFileAttaches(tequest.getFileAttaches());
		inspectRectify.setRectifyUsername(currentUser.getFullname());
		inspectRectify.setRectifyUserId(currentUser.getUserId());
		if(!currentUser.getFullname().equals(tequest.getRectifyUsername())){
			inspectRectify.setRectifyResultName(tequest.getRectifyUsername());
		}
		inspectRectifyService.save(inspectRectify);
		setTerminalFileAttach(inspectRectify.getInspectRectifyId(), inspectRectify.getFileAttaches());
		if(tequest.getRelateModule().equals("INSPECT_MANAGE")){
			InspectManage inspectManage = inspectManageService.getTranslate(tequest.getInspectId());
			inspectManage.setInspectRectifyId(inspectRectify.getInspectRectifyId());
			inspectManage.setRectification("2");
			inspectManageService.merge(inspectManage);
			inspectRectifyService.sendSms(inspectManage.getProjectName(), inspectManage.getBuildingNum(), inspectManage.getInspectResultName());
		}
		if(tequest.getRelateModule().equals("EQUIP_INSPECT")){
			EquipInspect inspect = equipInspectService.getTranslateFull(tequest.getInspectId());
			inspect.setInspectRectifyId(inspectRectify.getInspectRectifyId());
			inspect.setRectification("2");
			equipInspectService.merge(inspect);
			inspectRectifyService.sendSms(inspect.getEquipInspectSchema().getEquipDiary().getProjectName(), inspect.getBuildingNum(), inspect.getInspectResultName());
		}
		
		JsonObject obj  = new JsonObject();
    	obj.addProperty("practiNames", tequest.getPractiNames());
    	obj.addProperty("buildingNum", tequest.getBuildingNum());
    	obj.addProperty("inspectId", inspectRectify.getInspectId());
    	obj.addProperty("rectifyResult", inspectRectify.getRectifyResult());
    	obj.addProperty("rectifyUsername", inspectRectify.getRectifyUsername());
    	obj.addProperty("rectifyIntroduce", inspectRectify.getRectifyIntroduce());
    	obj.addProperty("longitude", inspectRectify.getLongitude());
    	obj.addProperty("latitude", inspectRectify.getLatitude());
    	obj.addProperty("fileAttaches", inspectRectify.getFileAttaches());
    	obj.addProperty("latitude", inspectRectify.getLatitude());
    	obj.addProperty("fileAttaches", inspectRectify.getFileAttaches());
    	obj.addProperty("relateModule", tequest.getRelateModule());
    	obj.addProperty("projectName", tequest.getProjectName());
		
		send("您收到一条整改反馈，"+tequest.getProjectName()+"项目,"+tequest.getBuildingNum()+"号楼,"+inspectRectify.getRectifyIntroduce(),obj.toString(),String.valueOf(currentUser.getUserId()),"INSPECTRECTIFY");

		return SUCCESS;
	}
	
	public String changeInspectResult() {
		Tequest tequest = getTerminalMessage();
		Long inspectRectifyId = tequest.getInspectRectifyId();
		String rectifyResult =  tequest.getRectifyResult();
		if(StringUtils.isBlank(inspectRectifyId+"")||StringUtils.isBlank(rectifyResult)) {
			errorResponse(); 
		}
		InspectRectify inspectRectify = inspectRectifyDao.get(inspectRectifyId);
		inspectRectify.setRectifyResult(rectifyResult);
		inspectRectifyDao.update(inspectRectify);
		return SUCCESS;
	}

	public String inspectAllList() {
		Query query = getTerminalMessage().getQuery();
		StringBuffer depId = new StringBuffer() ;
		if(StringUtils.isNotBlank(query.getAccount()) && !query.getAccount().equals("0")){
			String[] ids = query.getAccount().split(",");
			for(String id : ids){
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_path_S_LK", id);
				List<Department> ds = departmentService.getAll(filter);
				for(Department e : ds){
					depId.append(","+e.getDepId());
				}
				filter = null;
			}
			depId.append(",");
		}
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String recordId=query.getRecordId();
		String exwSerial=query.getExwSerial();
		String buildingNum=query.getBuildingNum();
		String projectName = query.getProjectName();
		String rectification = query.getRectification();
		Long type = query.getType();
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
//		appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
		AppUser au = appUserService.findByUserName(ApplicationContainer.getCurrentUser().getUsername());
		appUserService.getRoleDataPermission(au);
		List<Map<String, Object>> installAllList = null;
		if("0".equals(type.toString())){		//异常
			String inspectResult  = "345";
			installAllList = inspectManageService.queryByScript("terminal.list_inspect_all", projectName,exwSerial,buildingNum, recordId,start, pageSize,rectification,inspectResult,au.getDataPermission(),depId.toString(),year,startDate,endDate);
		}else if("1".equals(type.toString())) {		//正常
			String inspectResult = "012";
			installAllList = inspectManageService.queryByScript("terminal.list_inspect_all2", projectName,exwSerial,buildingNum, recordId,start, pageSize,rectification,inspectResult,au.getDataPermission(),depId.toString(),year,startDate,endDate);
		}
		//**************************************************************
		/*QueryFilter filter = new QueryFilter();
		if(start!=null && pageSize!=null) {
			if(!"0".equals(start.toString())) {
				start = start/pageSize;
			}
			filter.setPagingBean(new PagingBean(start, pageSize));
		}
		filter.addConjunctFilter("Q_inspectResult_S_LK", inspectResult);
		if(StringUtils.isNotBlank(projectName)) {
			filter.addFieldsDisjunctFilter("Q_[equipInspectSchema.equipDiary.projectName"
					+ "|equipInspectSchema.equipDiary.recordId|equipInspectSchema.equipDiary.exwSerial"
					+ "|equipInspectSchema.equipDiary.equipSerial]_S_LK", projectName);
		}
		if("0".equals(type.toString())){
			filter.addConjunctFilter("Q_rectification_S_EQ", "1");
		}else {
			filter.addConjunctFilter("Q_rectification_S_NEQ", "1");
		}
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			AppUser ap = ApplicationContainer.getCurrentUser();
			appUserService.getRoleDataPermission(ap);
			filter.addValuesDisjunctFilter("QVO_permissionFlag_S_LK", ap.getDataPermission());
		}
		List<EquipInspect> equipInspectList = equipInspectService.getAll(filter);
		CodeServiceImpl.translate(equipInspectList);*/
		
		//****************************************************************************************************
		
		for (Map<String, Object> data : installAllList) {
//			List<Long> fileIds = fileAttachService.getFileIdByDepend((Long) data.get("inspectId"), data.get("relateModule").toString());
//			data.put("fileAttaches", StringUtils.join(fileIds, ","));
			List<FileAttach> list = fileAttachService.getByDepend((Long) data.get("inspectId"), data.get("relateModule").toString());
			if(list.size()>0) {
				StringBuffer sb = new StringBuffer();
				List<String> imgList = new ArrayList<String>();
				for(FileAttach fa : list) {
					sb.append(fa.getFileId()).append(",");
					imgList.add(Constant.IMG_PRE_PATH+fa.getFilePath());
				}
				data.put("imgList", imgList);
				data.put("fileAttaches", sb.substring(0, sb.length()-1));
			}
		}
		Integer count = 0;
		if(installAllList.size()>0) {
			count =(Integer) installAllList.get(0).get("count");
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + GsonUtil.toJson(installAllList, DateUtil.LINK_DISPLAY_DATE, false)
				+ ",\"count\":"+count+"}}");
		return SUCCESS;
	}
	
	
	public String querySecureOnEquipId() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		long equipId = 0;
		long projId=0;
		if(query !=null){
			equipId=query.getEquipId();
			projId= query.getProjectId();
		}
		List<Map<String, Object>> projectList = inspectManageService.queryByScript("terminal.list_secure_on_equip_id",equipId,projId,start,pageSize);
		
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(projectList.size()).append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(projectList, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String dismantleWaitList() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String recordId = query.getRecordId();
		String projectName = query.getProjectName();
		String exwSerial=query.getExwSerial();
		String buildingNum=query.getBuildingNum();
		List<Map<String, Object>> installAllList = installManageService.queryByScript("terminal.list_dismantle_wait", projectName,buildingNum, recordId,exwSerial, start, pageSize);
		for (Map<String, Object> data : installAllList) {
			List<Long> fileIds = fileAttachService.getFileIdByDepend((Long) data.get("installId"), data.get("relateModule").toString());
			data.put("fileAttaches", StringUtils.join(fileIds, ","));
            // 拆卸配件表
            EquipInstall equipInstall = equipInstallService.getTranslateFull((Long) data.get("installId"));
            List list = equipInstallService.loadCompondiarySet(equipInstall);
            WaitInstallComponResponse response = new WaitInstallComponResponse();
            response.add(list);
            data.put("dismantleComponSet",response.getInfo().getResult());
		}
		Integer count = 0;
		if(installAllList.size()>0) {
			count =(Integer) installAllList.get(0).get("count");
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + GsonUtil.toJson(installAllList, DateUtil.LINK_DISPLAY_DATE, false)
				+ ",\"count\":"+count+"}}");
		return SUCCESS;
	}
	@Deprecated
	public String dismantleList() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addConjunctFilter("Q_equipFlow.equipDiary.recordId_S_LK", tequest.getQuery().getRecordId());
		filter.addConjunctFilter("Q_equipFlow.equipDiary.projectName_S_LK", tequest.getQuery().getProjectName());
		filter.addConjunctFilter("Q_equipFlow.flowState_S_EQ", Status.EquipFlow.dismantled);
		List<EquipDismantle> list = equipDismantleService.getAll(filter);
		for (EquipDismantle dismantle : list) {
			List<Long> fileIds = fileAttachService.getFileIdByDepend(dismantle.getDismantleId(), SystemConstant.MODULE_EQUIP_DISMANTLE);
			dismantle.setFileAttaches(StringUtils.join(fileIds, ","));
		}
		return SUCCESS;
	}

	public String dismantleLoad() {
		Tequest tequest = getTerminalMessage();
		EquipDismantle dismantle = equipDismantleService.getTranslateFull(tequest.getQuery().getDismantleId());
        Set<ComponDiary> cd = equipInstallService.getTranslateFull(dismantle.getEquipFlow().getInstallId()).getComponDiarySet();
        List<ComponDiary> list_cd = new ArrayList<ComponDiary>(cd);
        //将相同配件归为一条记录
        List<ComponDiary> list_temp = new ArrayList<ComponDiary>();
            for(int i = 0;i < list_cd.size();i++){
            for(int j = i+1;j<list_cd.size();j++){
                if(list_cd.get(i).getComponId().equals(list_cd.get(j).getComponId())){
                    list_cd.get(j).setCounts(list_cd.get(i).getCounts()+list_cd.get(j).getCounts());
                    list_temp.add(list_cd.get(i));
                    break;
                }
            }
        }
        list_cd.removeAll(list_temp);
        dismantle.setComponDiarySet(new HashSet<ComponDiary>(list_cd));
		EquipFlow ef=dismantle.getEquipFlow();
		EquipDiary ed=ef.getEquipDiary();
		List<Long> fileIds = fileAttachService.getFileIdByDepend(dismantle.getDismantleId(), SystemConstant.MODULE_EQUIP_DISMANTLE);
		dismantle.setFileAttaches(StringUtils.join(fileIds, ","));
		List<FileAttach> fileAttchs=fileAttachService.getByDepend(dismantle.getDismantleId(), SystemConstant.MODULE_EQUIP_DISMANTLE);
		List<Map> images=new ArrayList<Map>();
		Map<String, Object> map=null;
		FileAttach attch=null;
		for(int i=0;i<fileAttchs.size();i++){
			map=new HashMap<String, Object>();
			attch=fileAttchs.get(i);
			map.put("fileid", attch.getFileId());
			map.put("filesource", attch.getSource());
			map.put("imagePath", Constant.IMG_PRE_PATH+attch.getFilePath());
			images.add(map);
		}
		DismantleLoadResponse response = new DismantleLoadResponse();
		response.add(dismantle,images);
		
		setJsonString(GsonUtil.toJson(response, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String dismantleSubmit() {
		Tequest tequest = getTerminalMessage();
		EquipDismantle equipDismantle = new EquipDismantle();
		equipDismantle.setEquipFlow(equipFlowService.get(tequest.getFlowId()));
		equipDismantle.setStartdisDate(tequest.getStartdisDate());
		equipDismantle.setEnddisDate(tequest.getEnddisDate());
		equipDismantle.setDismantleHeight(tequest.getDismantleHeight());
		equipDismantle.setApplyforState(Status.EquipFlowApplyfor.waitSubmit);
		equipDismantle.setDelFlag(Constant.ENABLED);
		equipDismantle.setFileAttaches(tequest.getFileAttaches());
		equipDismantle.setLongitude(tequest.getLongitude());
		equipDismantle.setLatitude(tequest.getLatitude());
		equipDismantle.setAddress(tequest.getAddress());
		Set<ComponDiary> set = new HashSet<ComponDiary>();
		//做深拷贝
		for(ComponDiary cd :equipDismantle.getEquipFlow().getComponDiarySet()){
			set.add(cd);
		}
		equipDismantle.setComponDiarySet(set);
		equipDismantle.setPractiDiarySet(tequest.getPractiDiarySet());
		equipDismantle.setDismantleType(tequest.getDismantleType());
		equipDismantleService.sceneDismantle(equipDismantle);
		setTerminalFileAttach(equipDismantle.getDismantleId(), equipDismantle.getFileAttaches());
		return SUCCESS;
	}

	public String dismantleManageList() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter(tequest);
		filter.addConjunctFilter("Q_recordId_S_LK", tequest.getQuery().getRecordId());
		filter.addConjunctFilter("Q_projectName_S_LK", tequest.getQuery().getProjectName());
		List<DismantleManage> list = dismantleManageService.getAll(filter);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String dismantleManageLoad() {
		Tequest tequest = getTerminalMessage();
		DismantleManage dismantleManage = dismantleManageService.get(tequest.getQuery().getDismantleId());
        EquipFlow equipFlow = new EquipFlow();
		EquipDiary equipDiary = new EquipDiary();
		equipDiary.setProjectName(dismantleManage.getProjectName());
		equipDiary.setRecordId(dismantleManage.getRecordId());
		equipFlow.setEquipDiary(equipDiary);
		dismantleManage.setEquipFlow(equipFlow);
		List<Long> fileIds = fileAttachService.getFileIdByDepend(dismantleManage.getDismantleId(), SystemConstant.MODULE_DISMANTLE_MANAGE);
		dismantleManage.setFileAttaches(StringUtils.join(fileIds, ","));
		List<FileAttach> fileAttchs=fileAttachService.getByDepend(dismantleManage.getDismantleId(), SystemConstant.MODULE_DISMANTLE_MANAGE);
		List<Map> images=new ArrayList<Map>();
		Map<String, Object> map=null;
		FileAttach attch=null;
		for(int i=0;i<fileAttchs.size();i++){
			map=new HashMap<String, Object>();
			attch=fileAttchs.get(i);
			map.put("fileid", attch.getFileId());
			map.put("filesource", attch.getSource());
			images.add(map);
		}
		dismantleManage.setImages(images);
		List<DismantleManage> list = new ArrayList<DismantleManage>();
		list.add(dismantleManage);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String dismantleManageSubmit() {
		Tequest tequest = getTerminalMessage();
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		DismantleManage dismantle = new DismantleManage();
		dismantle.setRecordId(tequest.getRecordId());
		dismantle.setProjectName(tequest.getProjectName());
		dismantle.setStartdisDate(tequest.getStartdisDate());
		dismantle.setEnddisDate(tequest.getEnddisDate());
		dismantle.setDismantleHeight(tequest.getDismantleHeight());
		dismantle.setLongitude(tequest.getLongitude());
		dismantle.setLatitude(tequest.getLatitude());
		dismantle.setAddress(tequest.getAddress());
		dismantle.setDismantleType(tequest.getDismantleType());
		dismantle.setExwSerial(tequest.getExwSerial());
		dismantle.setBuildingNum(tequest.getBuildingNum());
		dismantle.setUserId(currentUser.getUserId());
		dismantle.setUserName(currentUser.getFullname());
		dismantle.setProvidedDate(DateUtil.getCurrentLinkDateStr());
		dismantleManageService.save(dismantle);
		setTerminalFileAttach(dismantle.getDismantleId(), tequest.getFileAttaches());
		return SUCCESS;
	}

	public String dismantleAllList() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String recordId = query.getRecordId();
		String projectName = query.getProjectName();
		String exwSerial=query.getExwSerial();
		String buildingNum=query.getBuildingNum();
		List<Map<String, Object>> dismantleAllList = dismantleManageService.queryByScript("terminal.list_dismantle_all", projectName, recordId,exwSerial, buildingNum,start, pageSize);
		for (Map<String, Object> data : dismantleAllList) {
//			List<Long> fileIds = fileAttachService.getFileIdByDepend((Long) data.get("dismantleId"), data.get("relateModule").toString());
//			data.put("fileAttaches", StringUtils.join(fileIds, ","));
			List<FileAttach> fileAttchList = fileAttachService.getByDepend((Long) data.get("dismantleId"), data.get("relateModule").toString());
			if(fileAttchList.size()>0) {
				StringBuffer sb = new StringBuffer();
				List<String> imgList = new ArrayList<String>();
				for(FileAttach fa : fileAttchList) {
					sb.append(fa.getFileId()).append(",");
					imgList.add(Constant.IMG_PRE_PATH+fa.getFilePath());
				}
				data.put("imgList", imgList);
				data.put("fileAttaches", sb.substring(0, sb.length()-1));
			}
		}
		Integer count = 0;
		if(dismantleAllList.size()>0) {
			count =(Integer) dismantleAllList.get(0).get("count");
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + GsonUtil.toJson(dismantleAllList, DateUtil.LINK_DISPLAY_DATE, false)
				+ ",\"count\":"+count+"}}");
		return SUCCESS;
	}

	public String query() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		Integer totalnums = 0;
		String exwSerial = query.getExwSerial()==null? "" : query.getExwSerial();
		String recordId = query.getRecordId()==null? "" : query.getRecordId();
		String projName = query.getProjName()==null? "" : query.getProjName();

		List<Map<String, Object>> numslist = equipmentService.queryByScript("terminal.get_app_equipnums", "%" + projName + "%", "%" + exwSerial + "%", "%" + recordId + "%");
		if (numslist != null && numslist.size() > 0) {
			totalnums = (Integer) numslist.get(0).get("_ROWNUM");
		}

		List<Map<String, Object>> equipList = equipmentService.queryByScript("terminal.list_app_equips", "%" + projName + "%", "%" + exwSerial + "%", "%" + recordId + "%", start, pageSize + start);

		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"totalCounts\":" + totalnums + ",\"result\":" + GsonUtil.toJson(equipList, true, DateUtil.LINK_DISPLAY_DATE, false) + "}");
		// successResponse();
		return SUCCESS;
	}

	
	/*查看指定状态的设备列表*/
	public String listEquipOnStatus() {
		Tequest tequest = getTerminalMessage();
		int businessStatus = tequest.getQuery().getBusinessStatus();
		Integer start = tequest.getQuery().getStart();
		Integer pageSize = tequest.getQuery().getPageSize();
		List<Map<String, Object>> result= new ArrayList<Map<String,Object>>();
		switch(businessStatus){
		case 0:   //闲置在仓： 业务状态 0 ，且设备状态 status = 1闲置
			result = equipmentService.queryByScript("terminal.list_equip_notinuse_detail",start,pageSize, String.valueOf(businessStatus));
			break;
		case 5:  //调度： 业务状态  2  ，且设备状态 status = 1闲置
			result = equipmentService.queryByScript("terminal.list_equip_out_detail",start,pageSize, String.valueOf(businessStatus));
			break;
		case 6://在用： 业务状态 3 4 5 6 ，且设备状态 status = 0 8 9 
			result = equipmentService.queryByScript("terminal.list_equip_online_detail",start,pageSize, String.valueOf(businessStatus));
			break;
		case 7: //报停未入仓设： 业务状态  7 9 ，或设备状态 status = 4
			result = equipmentService.queryByScript("terminal.list_equip_broke_detail",start,pageSize, String.valueOf(businessStatus));
			break;
		case 8: //报废：设备状态 status = 6
			result = equipmentService.queryByScript("terminal.list_scrap_equip_detail",start,pageSize);
			break;
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/*维修次数和详情*/
	public String listRepairCounts() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		long projectId = 0;
		if(query.getProjectId() !=null){
			projectId=query.getProjectId();
		}
		List<Map<String, Object>> list = equipRepairService.queryByScript("terminal.list_repair_counts",String.valueOf(projectId),start,pageSize);
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(list.size()).append(",\"result\":");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String equipList() {
		Query query = getTerminalMessage().getQuery();
		Long type = query.getType();
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.equip_list", start, pageSize, type, keyword);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	
	//保存设备的技术交底
	public String saveEquipTechnicalDisclosure() {
		Tequest tequest = getTerminalMessage();
		TechnicalDisclosure td = new TechnicalDisclosure();
		DispatchEquip de = dispatchEquipDao.get(tequest.getDispatchEquipId());
		dispatchEquipDao.merge(de);
		Long equipId = tequest.getEquipId();
		Long contractId = tequest.getContractId();
		Equipment e = new Equipment();
		ContractLease cl = new ContractLease();
		Project p = new Project();
		p.setProjectId(tequest.getProjectId());
		cl.setContractId(contractId);
		td.setContractLease(cl);
		e.setEquipId(equipId);
		td.setEquipment(e);
		td.setProject(p);
		td.setBuildingNum(tequest.getBuildingNum());
		td.setDisclosureMan(tequest.getDisclosureMan());
		td.setDisclosureManId(tequest.getDisclosureManId());
		td.setAcceptanceMan(tequest.getAcceptanceMan());
		td.setAcceptanceManId(tequest.getAcceptanceManId());
		td.setDisclosureDate(tequest.getDisclosureDate());
		td.setDisclosurePhoto(tequest.getDisclosurePhoto());
		td.setDispatchEquipId(tequest.getDispatchEquipId());
		td.setDisclosureLocation(tequest.getDisclosureLocation());
		td.setOperationWay(tequest.getOperationWay());
		switch(tequest.getOperationWay()) {
		    case 1:td.setRelateModule("EQUIP_INSTALL");
		    break;
		    case 2:td.setRelateModule("EQUIP_INSTALL_ADD");
		    break;
		    case 3:td.setRelateModule("EQUIP_DISMANTLE");
		    break;
		    case 4:td.setRelateModule("EQUIP_DISMANTLE_REDUCE");
		    break;
		}
		if(tequest.getInstallId()!=null) {
			td.setInstallId(tequest.getInstallId());
			EquipInstall install = equipInstallService.get(tequest.getInstallId());
			if(StringUtils.isEmpty(install.getBuildingNum())) {
				install.setBuildingNum(tequest.getBuildingNum());
				equipInstallService.merge(install);
			}
		}
		technicalDisclosureService.save(td);
		setTerminalFileAttach(td.getDisclosureId(), tequest.getDisclosurePhoto());
		String a = "\""+td.getRelateModule()+"\"";
		/*if(tequest.getInstallId()!=null) {
			String b = "\""+td.getInstallId()+"\"";
			successResponse2("\"disclosureId\":" + td.getDisclosureId()+","+"\"relateModule\":"+ a+","+"\"installId\":"+ b);
		}*/
		successResponse2("\"disclosureId\":" + td.getDisclosureId()+","+"\"relateModule\":"+ a);
		return SUCCESS;
	}
	// 查找新增的技术交底详情
	public String findTechnicalDisclosureDetail() {
		Tequest tequest = getTerminalMessage();
		long disclosureId = tequest.getDisclosureId();
		String relateModule = tequest.getRelateModule();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_disclosure_detail", disclosureId,relateModule);
		for (Map<String, Object> map : result) {
			map.put("disclosurePhotoList", getFilePath(String.valueOf(map.get("disclosurePhoto"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	// 保存设备的安装作业或者顶升加节后保存
	public String saveEquipInstallWork() throws ParseException {
		Tequest tequest = getTerminalMessage();
		EquipInstall ei = null;
//		SimpleDateFormat sd_src = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
//		SimpleDateFormat sd_data = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		if (tequest.getInstallId() == null) {		//新增
			ei = new EquipInstall();
			ei.setDisclosureId(tequest.getDisclosureId());
			ei.setEquipAmount(tequest.getEquipAmount());
			
			ei.setFirstAttach(tequest.getFirstAttach());				//首次附墙
			ei.setFirstKnotCount(tequest.getFirstKnotCount());			//首次标准节
			ei.setWallAttacheFrameNum(tequest.getWallAttacheFrameNum());//首次附墙框
			ei.setWallAttachePoleNum(tequest.getWallAttachePoleNum());	//首次附墙杆
			ei.setInstallHeight(tequest.getInstallHeight());			//首次安装高度
			ei.setBuildingNum(tequest.getBuildingNum());
			ei.setBrachium(tequest.getBrachium());
			ei.setPartake(tequest.getPartake());
			ei.setApproachNumber(tequest.getApproachNumber());
			EquipFlow ef = new EquipFlow();
			ef.setDispatchEquipId(tequest.getDispatchEquipId());
			ef.setEquipId(tequest.getEquipId());
			Equipment e = equipmentService.get(tequest.getEquipId());
			ei.setEquipmentNo(e.getEquipSerial());
			ef.setDispatchId(tequest.getDispatchId());
			ei.setEquipFlow(ef);
			ei.setInstallTheme(tequest.getProjectName() + "的安装" + DateUtil.getCurrentDateStr());
			ei.setRemark(tequest.getRemark());
			ei.setInstallLocation(tequest.getInstallLocation());
			ei.setFileAttaches(tequest.getFileAttaches());
			ei.setCheckAttach(tequest.getCheckAttach());
			ei.setStartinDate(tequest.getStartinDate());
			ei.setEndinDate(tequest.getEndinDate());
			ei.setSpendTime((ei.getEndinDate().getTime() - ei.getStartinDate().getTime()) / (1000 * 60 * 60));
			ei.setUserId(ApplicationContainer.getCurrentUserId());
			ei.setUserName(ApplicationContainer.getCurrentUser().getUsername());
			Department dep = new Department();
			dep.setDepId(ApplicationContainer.getCurrentUser().getDepartment().getDepId());
			ei.setDepartment(dep);
			ei.setDelFlag("1");
			ei.setApplyforState(Status.Applyfor.waitSubmit);
			ei.setProvidedDate(DateUtil.getCurrentLinkTimeStr());
			ei.setAppInstallState(Status.wechatInstall.deal);
			equipInstallService.saveOrMergeForEdit(ei);
			//保存交底relateId
			long disclosureId = (tequest.getDisclosureId());
			TechnicalDisclosure technicalDisclosure = technicalDisclosureService.get(disclosureId);
			technicalDisclosure.setRelateId(ei.getInstallId());
			technicalDisclosure.setInstallId(ei.getInstallId());
			technicalDisclosureService.update(technicalDisclosure);
		} else{	//顶升加节
			ei = equipInstallService.get(tequest.getInstallId());

			EquipAddReduceDetail eard = new EquipAddReduceDetail();
			eard.setKnotNum(tequest.getKnotNum());
			eard.setWallAttacheNum(tequest.getWallAttacheNum());
			eard.setWallAttacheFrameNum(tequest.getWallAttacheFrameNum());
			eard.setWallAttachePoleNum(tequest.getWallAttachePoleNum());
			
			eard.setFileAttaches(tequest.getFileAttaches());
			eard.setCheckAttach(tequest.getCheckAttach());
			eard.setStartinDate(tequest.getStartinDate());
			eard.setEndinDate(tequest.getEndinDate());
			eard.setSpendTime((eard.getEndinDate().getTime() - eard.getStartinDate().getTime()) / (1000 * 60 * 60));
			eard.setExecuteDate(DateUtil.getCurrentLinkDateStr());
			eard.setExecuterId(ApplicationContainer.getCurrentUserId());
			eard.setExecuterName(ApplicationContainer.getCurrentUser().getUsername());
			eard.setInstallHeight(tequest.getInstallHeight());
			eard.setUserId(ApplicationContainer.getCurrentUserId());
			eard.setUserName(ApplicationContainer.getCurrentUser().getUsername());
			eard.setPartake(tequest.getPartake());
			eard.setRemark(tequest.getRemark());
			eard.setRelateId(ei.getInstallId());
			eard.setInstallId(ei.getInstallId());
			eard.setRelateModule("EQUIP_INSTALL_ADD");
			eard.setDisclosureId(tequest.getDisclosureId());
			eard.setAppInstallState(Status.wechatInstall.deal);
			
			Equipment equip = equipmentService.get(ei.getEquipFlow().getEquipId());
			eard.setEquipment(equip);
			equipAddReduceDetailService.save(eard);
			
			//保存交底relateId
			long disclosureId = tequest.getDisclosureId();
			TechnicalDisclosure technicalDisclosure = technicalDisclosureService.get(disclosureId);
			technicalDisclosure.setInstallId(tequest.getInstallId());
			technicalDisclosure.setRelateId(eard.getAddReduceId());
			technicalDisclosure.setRelateModule("EQUIP_INSTALL_ADD");
			technicalDisclosureService.save(technicalDisclosure);
		}
		setTerminalFileAttach(ei.getInstallId(), String.valueOf(tequest.getFileAttaches()));
		setTerminalFileAttach(ei.getInstallId(), String.valueOf(tequest.getCheckAttach()));
		return SUCCESS;
	}

	// 保存设备的安装验收
	public String saveEquipInstallReview() {
		Tequest tequest = getTerminalMessage();
		EquipInstallReview eir = new EquipInstallReview();
		if (tequest.getReviewStatus().equals("通过")) {
			if("0".equals(tequest.getState())) {
				EquipInstall ei = equipInstallService.get(tequest.getInstallId());
				ei.setAppInstallState(Status.wechatInstall.confirmed);
				ei.setApplyforState(Status.Applyfor.waitApprove);
				
				ei.setKnotCounts(ei.getKnotCounts() == null ? ei.getFirstKnotCount() : ei.getKnotCounts() + ei.getFirstKnotCount());
				ei.setWallAttacheQty(ei.getWallAttacheQty() == null ? ei.getFirstAttach() : ei.getWallAttacheQty() + ei.getFirstAttach() );
			    ei.setWallAttacheFrameCount(ei.getWallAttacheFrameCount() == null ? ei.getWallAttacheFrameNum() : ei.getWallAttacheFrameCount() + ei.getWallAttacheFrameNum());
			    ei.setWallAttachePoleCount(ei.getWallAttachePoleCount() == null ? ei.getWallAttachePoleNum() : ei.getWallAttachePoleCount() + ei.getWallAttachePoleNum());
				ei.setCurrentInstallHeight(ei.getCurrentInstallHeight() == null ? String.valueOf(ei.getInstallHeight()) : String.valueOf(ei.getInstallHeight().add(new BigDecimal(ei.getCurrentInstallHeight()))));
				
				equipInstallService.update(ei);
				eir.setInstallId(tequest.getInstallId());
				eir.setReviewConclusion(tequest.getReviewConclusion());
				eir.setReviewStatus(tequest.getReviewStatus());
				eir.setRejectReason(tequest.getRejectReason());
				eir.setRelateId(tequest.getInstallId());
				eir.setRelateModule("EQUIP_INSTALL");
				if(StringUtils.isNotBlank(tequest.getReviewCheckAttach())) {
					eir.setReviewCheckAttach(tequest.getReviewCheckAttach());
				}
				equipInstallService.saveEquipInstallWork(eir);
				FormApprove fa = new FormApprove();
				fa.setRelateId(ei.getInstallId());
				fa.setRelateModule("EQUIP_INSTALL");
				fa.setApproveUserid(ApplicationContainer.getCurrentUserId());
				fa.setApproveUsername(ApplicationContainer.getCurrentUser().getUsername());
				fa.setApproveDep(ApplicationContainer.getCurrentUser().getDepartment().getDepName());
				fa.setApproveOpinion("1");
				fa.setApproveTime(new Date());
				formApproveService.save(fa);
				equipInstallService.passApproveApplication(fa);
			}else if("1".equals(tequest.getState())){
				EquipAddReduceDetail eard = equipAddReduceDetailService.get(tequest.getInstallId());
				eard.setAppInstallState(Status.wechatInstall.confirmed);
				eard.setApplyforState(Status.Applyfor.waitApprove);
				EquipInstall ei = equipInstallService.get(eard.getInstallId());
				//对安装单进行累加
				Integer knotNum = eard.getKnotNum()==null?0:eard.getKnotNum();
				Integer atta = eard.getWallAttacheNum()==null?0:eard.getWallAttacheNum();
				Integer frame = eard.getWallAttacheFrameCount()==null?0:eard.getWallAttacheFrameNum();
				Integer pole = eard.getWallAttachePoleCount()==null?0:eard.getWallAttachePoleNum();
				
				ei.setKnotCounts(ei.getKnotCounts() == null ? knotNum: ei.getKnotCounts()+knotNum);
				ei.setWallAttacheQty(ei.getWallAttacheQty() == null ? atta : ei.getWallAttacheQty() + atta);
			    ei.setWallAttacheFrameCount(ei.getWallAttacheFrameCount() == null ? frame : ei.getWallAttacheFrameCount() + frame);
			    ei.setWallAttachePoleCount(ei.getWallAttachePoleCount() == null ? pole : ei.getWallAttachePoleCount() + pole);
			    BigDecimal bd = new BigDecimal(ei.getCurrentInstallHeight() == null ? "0" : ei.getCurrentInstallHeight());
				ei.setCurrentInstallHeight(String.valueOf(eard.getInstallHeight().add(bd)));
				equipInstallService.merge(ei);
				equipAddReduceDetailService.merge(eard);
				
				eir.setInstallId(eard.getRelateId());
				eir.setReviewConclusion(tequest.getReviewConclusion());
				eir.setReviewStatus(tequest.getReviewStatus());
				eir.setRejectReason(tequest.getRejectReason());
				eir.setRelateId(tequest.getInstallId());
				eir.setRelateModule("EQUIP_INSTALL_ADD");
				if(StringUtils.isNotBlank(tequest.getReviewCheckAttach())) {
					eir.setReviewCheckAttach(tequest.getReviewCheckAttach());
				}
				equipInstallService.saveEquipInstallWork(eir);
				FormApprove fa = new FormApprove();
				fa.setRelateId(eard.getAddReduceId());
				fa.setRelateModule("EQUIP_INSTALL_ADD");
				fa.setApproveUserid(ApplicationContainer.getCurrentUserId());
				fa.setApproveUsername(ApplicationContainer.getCurrentUser().getUsername());
				fa.setApproveDep(ApplicationContainer.getCurrentUser().getDepartment().getDepName());
				fa.setApproveOpinion("1");
				fa.setApproveTime(new Date());
				formApproveService.save(fa);
				equipAddReduceDetailService.passApproveApplication(fa);
				
			}
		} else {
			if("0".equals(tequest.getState())) {
				EquipInstall eil = equipInstallService.get(tequest.getInstallId());
				eil.setAppInstallState(Status.wechatInstall.reject);
				equipInstallService.update(eil);
				eir.setInstallId(tequest.getInstallId());
				eir.setReviewConclusion(tequest.getReviewConclusion());
				eir.setReviewStatus(tequest.getReviewStatus());
				eir.setRejectReason(tequest.getRejectReason());
				eir.setRelateId(tequest.getInstallId());
				eir.setRelateModule("EQUIP_INSTALL");
				if(StringUtils.isNotBlank(tequest.getReviewCheckAttach())) {
					eir.setReviewCheckAttach(tequest.getReviewCheckAttach());
				}
				equipInstallService.saveEquipInstallWork(eir);
			}else {
				EquipAddReduceDetail eard  = equipAddReduceDetailService.get(tequest.getInstallId());
				eard.setAppInstallState(Status.wechatInstall.reject);
				equipAddReduceDetailService.update(eard);
				eir.setInstallId(eard.getRelateId());
				eir.setReviewConclusion(tequest.getReviewConclusion());
				eir.setReviewStatus(tequest.getReviewStatus());
				eir.setRejectReason(tequest.getRejectReason());
				eir.setRelateId(tequest.getInstallId());
				eir.setRelateModule("EQUIP_INSTALL_ADD");
				if(StringUtils.isNotBlank(tequest.getReviewCheckAttach())) {
					eir.setReviewCheckAttach(tequest.getReviewCheckAttach());
				}
				equipInstallService.saveEquipInstallWork(eir);
			}
		}
		if(StringUtils.isNotBlank(tequest.getReviewCheckAttach())) {
			setTerminalFileAttach(eir.getReviewId(), tequest.getReviewCheckAttach());
		}
		return SUCCESS;
	}

	// 保存设备的拆卸作业保存
	public String saveEquipDismantleWork() {
		Tequest tequest = getTerminalMessage();
		EquipDismantle ed = new EquipDismantle();
		if(tequest.getEquipAmount() == 1) {			//整机拆卸
			ed.setDismantleTheme(tequest.getProjectName() + "的拆卸" + DateUtil.getCurrentDateStr());
			long flowId = (tequest.getFlowId());
			EquipFlow e = new EquipFlow();
			e.setFlowId(flowId);
			ed.setEquipFlow(e);
			ed.setEquipAmount(tequest.getEquipAmount());
			ed.setStartdisDate(tequest.getStartdisDate());
			ed.setEnddisDate(tequest.getEnddisDate());
			ed.setFileAttaches(tequest.getFileAttaches());
			ed.setCheckAttach(tequest.getCheckAttach());
			
			EquipInstall ei = equipInstallService.get(tequest.getInstallId());
			ed.setKnotDisQty(ei.getKnotCounts());
			ed.setWallAttacheDisQty(ei.getWallAttacheQty());
			ed.setWallAttachePoleQty(ei.getWallAttachePoleCount());
			ed.setWallAttacheFrameQty(ei.getWallAttacheFrameCount());
			
			ed.setDismantleHeight(ei.getCurrentInstallHeight()==null?"0":ei.getCurrentInstallHeight());
			ed.setDismantleLocation(tequest.getDismantleLocation());
			ed.setInstallId(tequest.getInstallId());
			ed.setSpendTime((ed.getEnddisDate().getTime() - ed.getStartdisDate().getTime()) / (1000 * 60 * 60));
			ed.setUserId(ApplicationContainer.getCurrentUserId());
			ed.setUserName(ApplicationContainer.getCurrentUser().getUsername());
			Department dep = new Department();
			dep.setDepId(ApplicationContainer.getCurrentUser().getDepartment().getDepId());
			ed.setDepartment(dep);
			ed.setApplyforState(Status.Applyfor.waitSubmit);
			ed.setDelFlag("1");
			ed.setProvidedDate(DateUtil.getCurrentLinkDateStr());
			ed.setDisclosureId(tequest.getDisclosureId());
			ed.setFileAttaches(tequest.getFileAttaches());
			if(StringUtils.isNotBlank(tequest.getCheckAttach())) {
				ed.setCheckAttach(tequest.getCheckAttach());
			}
			ed.setPartake(tequest.getPartake());
			ed.setRemark(tequest.getRemark());
			ed.setDismantleHeight(tequest.getDismantleHeight());
			ed.setAppDismantleState(Status.wechatDismantle.deal);
			equipDismantleService.saveOrMergeForEdit(ed);
				
			TechnicalDisclosure technicalDisclosure = technicalDisclosureService.get(tequest.getDisclosureId());
			technicalDisclosure.setRelateId(ed.getDismantleId());
			technicalDisclosure.setRelateModule("EQUIP_DISMANTLE");
			technicalDisclosureService.update(technicalDisclosure);
			setTerminalFileAttach(ed.getDismantleId(), String.valueOf(tequest.getFileAttaches()));
			setTerminalFileAttach(ed.getDismantleId(), String.valueOf(tequest.getCheckAttach()));
		} else if(tequest.getEquipAmount() == 0) {			//拆卸降节
			EquipAddReduceDetail eard = new EquipAddReduceDetail();
			EquipInstall ei = equipInstallService.get(tequest.getInstallId());
			eard.setInstallHeight(new BigDecimal(tequest.getDismantleHeight()==null?"0":tequest.getDismantleHeight()));
			eard.setKnotNum(tequest.getKnotNum());
			eard.setWallAttacheNum(tequest.getWallAttacheNum());
			eard.setWallAttachePoleNum(tequest.getWallAttachePoleNum());
			eard.setWallAttacheFrameNum(tequest.getWallAttacheFrameNum());
			eard.setWallAttacheDisQty(tequest.getWallAttacheDisQty());
			eard.setKnotDisQty(tequest.getKnotDisQty());
			eard.setWallAttachePoleQty(tequest.getWallAttachePoleQty());
			eard.setWallAttacheFrameQty(tequest.getWallAttacheFrameQty());
			eard.setPartake(tequest.getPartake());
			eard.setRemark(tequest.getRemark());
			eard.setStartinDate(tequest.getStartdisDate());
			eard.setEndinDate(tequest.getEnddisDate());
			eard.setSpendTime((eard.getStartinDate().getTime() - eard.getEndinDate().getTime()) / (1000 * 60 * 60));
			eard.setUserId(ApplicationContainer.getCurrentUserId());
			eard.setUserName(ApplicationContainer.getCurrentUser().getUsername());
			eard.setExecuteDate(DateUtil.getCurrentLinkDateStr());
			eard.setExecuterId(ApplicationContainer.getCurrentUserId());
			eard.setExecuterName(ApplicationContainer.getCurrentUser().getUsername());
			eard.setFileAttaches(tequest.getFileAttaches());
			eard.setCheckAttach(tequest.getCheckAttach());
			eard.setRelateId(tequest.getInstallId());
			eard.setInstallId(tequest.getInstallId());
			eard.setRelateModule("EQUIP_DISMANTLE_REDUCE");
			eard.setDisclosureId(tequest.getDisclosureId());
			Equipment equip = new Equipment();
            equip.setEquipId(ei.getEquipFlow().getEquipId());
			eard.setEquipment(equip);
			eard.setAppDismantleState(Status.wechatDismantle.deal);
			equipAddReduceDetailService.save(eard);
			
			long disclosureId = (tequest.getDisclosureId());
			TechnicalDisclosure technicalDisclosure = technicalDisclosureService.get(disclosureId);
			technicalDisclosure.setRelateId(tequest.getInstallId());
			technicalDisclosure.setRelateModule("EQUIP_DISMANTLE_REDUCE");
			technicalDisclosureService.save(technicalDisclosure);
			setTerminalFileAttach(disclosureId, String.valueOf(tequest.getFileAttaches()));
			setTerminalFileAttach(disclosureId, String.valueOf(tequest.getCheckAttach()));
		}
		return SUCCESS;
	}

	// 保存设备的拆卸验收
	public String saveEquipDismantleReview() {
		Tequest tequest = getTerminalMessage();
		EquipInstallReview eir = new EquipInstallReview();
		eir.setReviewConclusion(tequest.getReviewConclusion());
		eir.setReviewStatus(tequest.getReviewStatus());
		eir.setRejectReason(tequest.getRejectReason());
		if(tequest.getEquipAmount()==1) {
			if("0".equals(tequest.getState())){
				if (eir.getReviewStatus().equals("通过")) {
						EquipDismantle t = equipDismantleService.get(tequest.getDismantleId());
						t.setAppDismantleState(Status.wechatDismantle.confirmed);
						t.setApplyforState(Status.Applyfor.waitApprove);
						equipDismantleService.update(t);
						EquipInstall ei = equipInstallService.get(t.getInstallId());
						ei.setCurrentInstallHeight("0");
						equipInstallService.merge(ei);
						FormApprove fa = new FormApprove();
						fa.setRelateId(t.getDismantleId());
						fa.setRelateModule("EQUIP_DISMANTLE");
						fa.setApproveUserid(ApplicationContainer.getCurrentUserId());
						fa.setApproveUsername(ApplicationContainer.getCurrentUser().getUsername());
						fa.setApproveDep(ApplicationContainer.getCurrentUser().getDepartment().getDepName());
						fa.setApproveOpinion("1");
						fa.setApproveTime(new Date());
						formApproveService.save(fa);
						equipDismantleService.passApproveApplication(fa);
				}else {
					EquipDismantle t = equipDismantleService.get(tequest.getDismantleId());
					t.setAppDismantleState(Status.wechatInstall.reject);
					equipDismantleService.update(t);
				}
				eir.setRelateId(tequest.getInstallId());
				eir.setRelateModule("EQUIP_DISMANTLE");
			}
		} else {
			if("1".equals(tequest.getState())){
				eir.setRelateId(tequest.getAddReduceId());
				eir.setRelateModule("EQUIP_DISMANTLE_REDUCE");
				if (eir.getReviewStatus().equals("通过")) {
					   EquipAddReduceDetail eard = equipAddReduceDetailService.get(tequest.getAddReduceId());
						eard.setAppDismantleState(Status.wechatInstall.confirmed);
						eard.setApplyforState(Status.Applyfor.waitApprove);
						EquipInstall ei = equipInstallService.get(eard.getInstallId());
						
						//对安装单进行减法
						Integer knotNum = eard.getKnotDisQty();
						Integer atta = eard.getWallAttacheDisQty();
						Integer frame = eard.getWallAttacheFrameQty();
						Integer pole = eard.getWallAttachePoleQty();
						
						ei.setKnotCounts(ei.getKnotCounts() == null ? 0 : ei.getKnotCounts()-knotNum);
						ei.setWallAttacheQty(ei.getWallAttacheQty() == null ? 0 : ei.getWallAttacheQty() - atta);
					    ei.setWallAttacheFrameCount(ei.getWallAttacheFrameCount() == null ? 0 : ei.getWallAttacheFrameCount() - frame);
					    ei.setWallAttachePoleCount(ei.getWallAttachePoleCount() == null ? 0 : ei.getWallAttachePoleCount() - pole);
					    BigDecimal bd = new BigDecimal(ei.getCurrentInstallHeight() == null ? "0" : ei.getCurrentInstallHeight());
					    ei.setCurrentInstallHeight(String.valueOf(bd.subtract(eard.getInstallHeight())));
						equipInstallService.merge(ei);
						equipAddReduceDetailService.merge(eard);
						
						FormApprove fa = new FormApprove();
						fa.setRelateId(tequest.getAddReduceId());
						fa.setRelateModule("EQUIP_DISMANTLE_REDUCE");
						fa.setApproveUserid(ApplicationContainer.getCurrentUserId());
						fa.setApproveUsername(ApplicationContainer.getCurrentUser().getUsername());
						fa.setApproveDep(ApplicationContainer.getCurrentUser().getDepartment().getDepName());
						fa.setApproveOpinion("1");
						fa.setApproveTime(new Date());
						formApproveService.save(fa);
						equipAddReduceDetailService.passApproveApplication(fa);
				}else {
					EquipAddReduceDetail ear = equipAddReduceDetailService.get(tequest.getAddReduceId());
					ear.setAppDismantleState(Status.wechatDismantle.reject);
					equipAddReduceDetailService.save(ear);
				}
			}
		}
		if(StringUtils.isNotBlank(tequest.getReviewCheckAttach())) {
			eir.setReviewCheckAttach(tequest.getReviewCheckAttach());
		}
		equipInstallService.saveEquipInstallWork(eir);
		setTerminalFileAttach(eir.getReviewId(), tequest.getReviewCheckAttach());
		return SUCCESS;
	}
	// 保存设备安拆的整改信息
	public String saveEquipInstallRectification() {
		Tequest tequest = getTerminalMessage();
		RectificationRecord rec = new RectificationRecord();
		rec.setRectificaDate(tequest.getRectificaDate());
		rec.setRectificaDetail(tequest.getRectificaDetail());
		rec.setRectificaImage(tequest.getRectificaImage());
		rec.setReviewId(tequest.getReviewId());
		String state = tequest.getState();
		if("0".equals(state)) {
			if(tequest.getConstructId()==0) {
				EquipDismantle t = equipDismantleService.get(tequest.getDismantleId());
				t.setAppDismantleState(Status.wechatDismantle.confirm);
				equipDismantleService.update(t);
			}else {
				EquipInstall e = equipInstallService.get(tequest.getInstallId());
				e.setAppInstallState(Status.wechatInstall.confirm);
				equipInstallService.update(e);
			}
		}else {
			EquipAddReduceDetail ed = equipAddReduceDetailService.get(tequest.getInstallId());
			if(tequest.getConstructId()==0) {
				ed.setAppDismantleState(Status.wechatInstall.confirm);
			}else {
				ed.setAppInstallState(Status.wechatInstall.confirm);
			}
			equipAddReduceDetailService.merge(ed);
		}
		equipInstallService.saveEquipInstallRectification(rec);
		setTerminalFileAttach(rec.getRectificaId(), tequest.getRectificaImage());
		return SUCCESS;
	}

	/*我的安装列表(已修改)**/
	public String myInstallList() {
		Query query = getTerminalMessage().getQuery();
		StringBuffer depId = new StringBuffer() ;
		if(StringUtils.isNotBlank(query.getAccount()) && !query.getAccount().equals("0")){
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
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String state = query.getState();
		Long userId = query.getCreatBy();
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
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_install_all_list", start,
				pageSize, keyword, state,userId,ApplicationContainer.getCurrentUser().getDataPermission(),depId.toString(),year,startDate,endDate);
//		System.out.println(ApplicationContainer.getCurrentUser().getDataPermission());
//		System.out.println(ApplicationContainer.getCurrentUser()+"0000000000");
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*设备安装列表**/
	public String equipmentInstallList() {
		Query query = getTerminalMessage().getQuery();
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_equip_install_list", start,
				pageSize, keyword, ApplicationContainer.getCurrentUser().getDataPermission());
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*顶升加节列表**/
	public String jackupSectionList() {
		Query query = getTerminalMessage().getQuery();
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_jackup_section_list", start,
				pageSize, keyword, ApplicationContainer.getCurrentUser().getDataPermission());
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*安全交底列表(已修改)**/
	public String equipTechnicalDisclosureList() {
		Query query = getTerminalMessage().getQuery();
		StringBuffer depId = new StringBuffer() ;
		if(StringUtils.isNotBlank(query.getAccount()) && !query.getAccount().equals("0")){
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
		String keyword = query.getKeyword();
		Integer pageSize = query.getPageSize();
		String relateModule = query.getRelateModule();
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
		String permission = ApplicationContainer.getCurrentUser().getDataPermission();
		
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_equip_installing_list",
				start, pageSize, keyword, relateModule,permission,depId.toString(),year,startDate,endDate);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*顶升加节详情**/
	public String jackupDetail() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getInstallId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_jackup_detail", keyword);
		for (Map<String, Object> map : result) {
			map.put("checkAttachList", getFilePath(String.valueOf(map.get("checkAttach"))));
			map.put("fileAttachsList", getFilePath(String.valueOf(map.get("fileAttachs"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*安装完成详情**/
	public String installedDetail() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getInstallId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_install_pass_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("checkAttachList", getFilePath(String.valueOf(map.get("checkAttach"))));
			map.put("fileAttachsList", getFilePath(String.valueOf(map.get("fileAttachs"))));
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*现场安装之整改验收详情**/
	public String rectificaDetail() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getInstallId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_install_rectifica_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("disclosurePhotoList", getFilePath(String.valueOf(map.get("disclosurePhoto"))));
			map.put("checkAttachList", getFilePath(String.valueOf(map.get("checkAttach"))));
			map.put("fileAttachsList", getFilePath(String.valueOf(map.get("fileAttachs"))));
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
			map.put("rectificaImageList", getFilePath(String.valueOf(map.get("rectificaImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*现场安装之整改验收记录列表**/
	public String rectificaCheckList() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getInstallId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_rectifica_check_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
			map.put("rectificaImageList", getFilePath(String.valueOf(map.get("rectificaImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*现场拆卸通用列表(已修改)**/
	public String dismantleGeneralList() {
		Query query = getTerminalMessage().getQuery();
		StringBuffer depId = new StringBuffer() ;
		if(StringUtils.isNotBlank(query.getAccount()) && !query.getAccount().equals("0")){
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
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String state = query.getState();
		Long userId = query.getCreatBy();
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
		//T.appDismantleState <> '0' AND
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_dismantle_all_list", start,
				pageSize, keyword, state,userId,ApplicationContainer.getCurrentUser().getDataPermission(),depId.toString(),year,startDate,endDate);
//		System.out.println(ApplicationContainer.getCurrentUser().getDataPermission());
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*待拆卸列表未做降节(已修改)**/
	public String waitDismantleList() {
		Query query = getTerminalMessage().getQuery();
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_wait_dismantle_list", start,
				pageSize, keyword, ApplicationContainer.getCurrentUser().getDataPermission());
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*待拆卸列表已做过降节(已修改)**/
	public String waitDismantleComponentList() {
		Query query = getTerminalMessage().getQuery();
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_wait_dismantleComponent_list", start,
				pageSize, keyword, ApplicationContainer.getCurrentUser().getDataPermission());
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*现场拆卸之整改验收记录列表**/
	public String dismantleCheckList() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getDismantleId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_dismantle_check_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
			map.put("rectificaImageList", getFilePath(String.valueOf(map.get("rectificaImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*现场拆卸之整改验收详情(整机拆卸)**/
	public String dismantleRectificaDetail() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getDismantleId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_dismantle_rectifica_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("disclosurePhotoList", getFilePath(String.valueOf(map.get("disclosurePhoto"))));
			map.put("checkAttachList", getFilePath(String.valueOf(map.get("checkAttach"))));
			map.put("fileAttachsList", getFilePath(String.valueOf(map.get("fileAttachs"))));
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
			map.put("rectificaImageList", getFilePath(String.valueOf(map.get("rectificaImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*现场安装之整改验收详情(加节)**/
	public String addRectificaDetail() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getInstallId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_install_add_rectifica_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("disclosurePhotoList", getFilePath(String.valueOf(map.get("disclosurePhoto"))));
			map.put("checkAttachList", getFilePath(String.valueOf(map.get("checkAttach"))));
			map.put("fileAttachsList", getFilePath(String.valueOf(map.get("fileAttachs"))));
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
			map.put("rectificaImageList", getFilePath(String.valueOf(map.get("rectificaImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*现场拆卸之整改验收详情(降节)**/
	public String reduceRectificaDetail() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getDismantleId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_dismantle_reduce_rectifica_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("disclosurePhotoList", getFilePath(String.valueOf(map.get("disclosurePhoto"))));
			map.put("checkAttachList", getFilePath(String.valueOf(map.get("checkAttach"))));
			map.put("fileAttachsList", getFilePath(String.valueOf(map.get("fileAttachs"))));
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
			map.put("rectificaImageList", getFilePath(String.valueOf(map.get("rectificaImage"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/*拆卸完成详情**/
	public String dismantleedDetail() {
		Query query = getTerminalMessage().getQuery();
		Long keyword = query.getInstallId();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_dismantle_pass_detail",
				keyword);
		for (Map<String, Object> map : result) {
			map.put("checkAttachList", getFilePath(String.valueOf(map.get("checkAttach"))));
			map.put("fileAttachsList", getFilePath(String.valueOf(map.get("fileAttachs"))));
			map.put("reviwCheckAttachList", getFilePath(String.valueOf(map.get("reviwCheckAttach"))));
		}
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/*拆卸中列表**/
	public String dismantleingList() {
		Query query = getTerminalMessage().getQuery();
		String keyword = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_dismantleing_list", start,
				pageSize, keyword);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
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
	
	/**小程序领导首页之设备租赁情况*/
	public String leadEquipCount() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		String keyword = query.getSecondKeyword();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.equip_count",time,keyword);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**小程序领导首页之年度装机情况*/
	public String leadInstallYear() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		String keyword = query.getSecondKeyword();
		Map<String, Object> map = new HashMap();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.equip_install_year_count",time,keyword);
		List<Map<String, Object>> list = equipmentService.queryByScript("equipdoc.equip_install_month_count",time,keyword);
		map.put("result", result);
		map.put("list", list);
		successResponse(GsonUtil.toJson(map, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**小程序领导首页之年度财务收款历史和年度统计*/
	public String leadFinanceYear() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		String keyword = query.getSecondKeyword();
		Map<String, Object> map = new HashMap();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.receive_year_count",time,keyword);
		List<Map<String, Object>> list = equipmentService.queryByScript("equipdoc.receive_month_count",time,keyword);
		map.put("result", result);
		map.put("list", list);
		successResponse(GsonUtil.toJson(map, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**小程序领导首页之月度合同签署情况*/
	public String leadContractDetail() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		String keyword = query.getSecondKeyword();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.contract_month_count",time,keyword);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**小程序领导首页之本月安全巡检情况下方总数*/
	public String leadMonthInspectCollect() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		String keyword = query.getSecondKeyword();
		Map<String, Object> map = new HashMap();
		List<Map<String,Object>> result = equipmentService.queryByScript("equipdoc.lead_month_inspect_collect",time,keyword);
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.lead_month_inspect_table",time,keyword);
		map.put("result", result);
		map.put("list", list);
		successResponse(GsonUtil.toJson(map, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/**小程序统计设备*/
	public String leadAllEquip() {
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.lead_equip_broken_count");
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**小程序统计收款*/
	public String leadAllReceive() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		Map<String, Object> map = new HashMap();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.lead_contract_settle_count",time);
		List<Map<String, Object>> list = equipmentService.queryByScript("equipdoc.lead_receive_not_count",time);
		map.put("result", result);
		map.put("list", list);
		successResponse(GsonUtil.toJson(map));
		return SUCCESS;
	}
	/**小程序统计收款月*/
	public String leadAllReceiveMonth() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.lead_contract_settle_month",time);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/**小程序统计装机*/
	public String leadAllInstall() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.lead_equip_review_count",time);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/**小程序统计装机月*/
	public String leadAllInstallMonth() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		List<Map<String, Object>> list = equipmentService.queryByScript("equipdoc.lead_equip_review_month",time);
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/**小程序统计巡检*/
	public String leadAllRepair() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		Map<String, Object> map = new HashMap();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.lead_repair_count",time);
		List<Map<String, Object>> list = equipmentService.queryByScript("equipdoc.lead_repair_inspect",time);
		map.put("result", result);
		map.put("list", list);
		successResponse(GsonUtil.toJson(map, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/**小程序统计巡检月*/
	public String leadAllRepairMonth() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		List<Map<String, Object>> list2 = equipmentService.queryByScript("equipdoc.lead_repair_inspect_month",time);
		successResponse(GsonUtil.toJson(list2, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/**小程序统计合同*/
	public String leadAllContract() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.lead_contract_time_count",time);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**现场安装总数*/
	public String installCaculate() {
		Query query = getTerminalMessage().getQuery();
		Long creatBy = query.getCreatBy();
		List<Map<String, Object>> waitInstallNum = equipmentService.queryByScript("terminal.wechat_equip_installing_list", 0,
				25, null,"EQUIP_INSTALL", ApplicationContainer.getCurrentUser().getDataPermission(),"",null,null,null);
		List<Map<String, Object>> maplist = equipmentService.queryByScript("terminal.wechat_equip_install_count", creatBy);
		for (Map<String, Object> map : maplist) {
			map.put("fourNum", waitInstallNum.get(0) == null ? 0 : waitInstallNum.get(0).get("count"));
		}
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**现场拆卸总数*/
	public String dismantleCaculate() {
		Query query = getTerminalMessage().getQuery();
		Long creatBy = query.getCreatBy();
		List<Map<String, Object>> waitDismantleNum = equipmentService.queryByScript("terminal.wechat_equip_installing_list", 0,
				25, null,"EQUIP_DISMANTLE", ApplicationContainer.getCurrentUser().getDataPermission(),"",null,null,null);
		List<Map<String, Object>> maplist = equipmentService.queryByScript("terminal.wechat_equip_dismantle_count", creatBy);
		for (Map<String, Object> map : maplist) {
			map.put("fourNum", waitDismantleNum.get(0) == null ? 0 : waitDismantleNum.get(0).get("count"));
		}
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/**拆卸中列表*/
	public String DismantlingList() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		String keyword = query.getSecondKeyword();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_wait_dismantling_list",  start,
				pageSize, keyword);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	/**小程序统计巡检异常每月详情*/
	public String leadInspectMonthDetail() {
		Query query = getTerminalMessage().getQuery();
		String time = query.getKeyword();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		List<Map<String, Object>> result = equipmentService.queryByScript("equipdoc.lead_inspect_month_detail",start,pageSize,time);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	/**人员签到设备选择*/
	public String practiSignProject() {
		Query query = getTerminalMessage().getQuery();
		Long userId = query.getUserId();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		String equipGeneric = query.getEquipGeneric();
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_practi_project_list",start,pageSize,userId,equipGeneric);
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	/**安全巡检总数*/
	public String inspectCount(){
		List<Map<String, Object>> result = equipmentService.queryByScript("terminal.wechat_inspect_all_count",ApplicationContainer.getCurrentUser().getDataPermission());
		successResponse(GsonUtil.toJson(result, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
}
