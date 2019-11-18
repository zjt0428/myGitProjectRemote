/**
 *====================================================
 * 文件名称: EquipmentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.ReadWriteFileUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Component;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.extend.EquipComponDocmodel;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.InstalmentService;
import com.knight.emms.service.PermissionManagerService;
import com.knight.emms.support.FundPlanSupport;
import com.knight.emms.support.StatusAnalyze;
import com.knight.emms.support.UploadTerminalFileParser;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.FileAttach;
import com.knight.system.service.AppUserService;
import com.knight.system.service.DepartmentService;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.*;

/**
 * @ClassName: EquipmentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午11:23:52
 */
public class EquipmentAction extends ExportBaseAction<Equipment> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Equipment equipment;

	@Setter
	@Getter
	private Long equipId;

	@Resource
	private EquipmentService equipmentService;

	@Resource
	private InstalmentService instalmentService;

	@Resource
	private ComponentService componentService;

	@Resource
	private FileAttachService fileAttachService;
	
	@Resource
	private AppUserService appUserService;
	
	@Resource
	private DepartmentService departmentService;

	@Resource
	private PermissionManagerService permissionManagerService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		Equipment e = (Equipment) model;
		switch (headerIndex) {
		case 6:
			return DateUtil.changeDateToStr(e.getPurchaseDate(), DateUtil.LINK_DISPLAY_DATE);
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Equipment> list = equipmentService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Equipment c = equipmentService.getTranslateFull(equipId);
		if(StringUtils.isNotBlank(c.getPermissionFlag())) {
			if(c.getPermissionFlag().contains("s")) {
				StringBuffer sb = new StringBuffer();
				List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.equip_permission_flag", c.getPermissionFlag());
				for (Iterator<Map<String, Object>> iterator = list.iterator(); iterator.hasNext();) {
					Map<String, Object> map = (Map<String, Object>) iterator.next();
					sb.append(map.get("fullName")).append(",");
				}
				c.setPermissionFlag(sb.toString());
			}
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, DateUtil.LINK_DISPLAY_DATE, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String upload() {
		Long fileId = new Long(getRequest().getParameter("fileId"));
		FileAttach fileAttach = fileAttachService.get(fileId);
		try {
			List<Equipment> list = UploadTerminalFileParser.parserFile(fileAttach.getFilePath(), UploadTerminalFileParser.T_EQUIPMENT);
			if (!list.isEmpty()) {
				equipmentService.saveUpload(list);
			}
		} catch (Exception e) {
			if (e instanceof BusinessException) {
				throw (BusinessException) e;
			}
			throw new BusinessException("上传备案信息文件解析异常!", e);
		}
		System.out.println("详明4");
		return SUCCESS;
	}

	private void serialExists(Equipment equipment) {
		if(equipment.getExwSerial()==null) {
			throw new BusinessException("出厂编号不能为空！");
		}else {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_exwSerial_S_EQ", equipment.getExwSerial());
			filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
			List<Equipment> list  = equipmentService.getAll(filter);
			if(list.size()>0) {
				throw new BusinessException("出厂编号已存在！");
			}
			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_equipSerial_S_EQ", equipment.getEquipSerial());
			filter1.addConjunctFilter("Q_delFlag_S_EQ", "1");
			List<Equipment> list1  = equipmentService.getAll(filter1);
			if(list1.size()>0) {
				throw new BusinessException("设备自编号已存在！");
			}
		}
	}
	
	@ActionLog(description = "保存设备信息")
	public String save() {
		if (equipment.getEquipId() == null) {
//			equipmentService.serialExists(equipment);
			equipmentService.saveCreate(equipment);
			this.isCreateFileAttach = true;
		} else {
			Equipment c = equipmentService.get(equipment.getEquipId());
//			if(!c.getEquipSerial().equals(equipment.getEquipSerial()) || !c.getExwSerial().equals(equipment.getExwSerial())) {
				equipmentService.serialExists(equipment);
//			}
			equipment.setFinishedAmount(c.getFinishedAmount());
			equipment.setRemainderAmount(c.getRemainderAmount());
			Date purchaseDate = c.getPurchaseDate();
			String depreciateDate = DateUtil.changeDateToStr(DateUtil.transpositionDate(purchaseDate, Calendar.YEAR, 1), DateUtil.LINK_DISPLAY_DATE);
			//--------------------------
			if (c.getDepreciateDate().equals(depreciateDate)) { // 未进行折旧处理
				equipment.setDepreciateDate(DateUtil.changeDateToStr(DateUtil.transpositionDate(equipment.getPurchaseDate(), Calendar.YEAR, 1), DateUtil.LINK_DISPLAY_DATE));
			} else {
//				equipment.setPurchaseDate(c.getPurchaseDate());
				equipment.setDepreciateDate(c.getDepreciateDate());
			}
//			equipment.setDepreciateDate(DateUtil.changeDateToStr(DateUtil.transpositionDate(equipment.getPurchaseDate(), Calendar.YEAR, 1), DateUtil.LINK_DISPLAY_DATE));

			equipment.setTotalRate(c.getTotalRate());
			equipment.setRecordSerial(c.getRecordSerial());
			if (Constant.ENABLED.equals(equipment.getMortgage())) { // 按揭贷款-付款状态
				if (equipment.getMortgageAmount().compareTo(BigDecimal.ZERO) < 1) {
					equipment.setFundStatus(Status.Fund.paymented);
				} else if (equipment.getMortgageAmount().compareTo(c.getMortgageAmount()) < 1) {
					equipment.setFundStatus(c.getFundStatus());
				} else {
					equipment.setFundStatus(Status.Fund.payment);
				}
			}

			equipment.setFlowId(c.getFlowId());
//			equipment.setProjectAddress(c.getProjectAddress());
			equipment.setProjectId(c.getProjectId());
//			equipment.setProjectName(c.getProjectName());
			equipment.setEquipDiary(c.getEquipDiary());	
			equipment.setStoreStatus(c.getStoreStatus());
			equipment.setBusinessStatus(c.getBusinessStatus());
			equipment.setStatusDate(c.getStatusDate());
			equipment.setStatus(StatusAnalyze.parserECValid(equipment.getScrapDate(), c.getStatus()));
			equipment.setDelFlag(c.getDelFlag());
			equipment.setPresentValue(equipment.getAssetValue().subtract(equipment.getAssetValue().multiply(equipment.getTotalRate())));
		}
		String permissionFlag = departmentService.bindingDepartmentPermission(equipment.getDepartment().getDepId());
		departmentService.grantPermission(equipment, permissionFlag);
		equipment.setSubEquipment();
		equipmentService.merge(equipment);
		for (Component component : equipment.getComponentSet()) {
			component = componentService.get(component.getComponId());
			component.setEquipId(equipment.getEquipId());
			componentService.update(component);
		}
		if (Constant.ENABLED.equals(equipment.getMortgage())) { // 按揭贷款
			equipment.setInstalmentSet(FundPlanSupport.createInstalment(equipment));
			instalmentService.saveOrMeger(equipment.getInstalmentSet());
		}
		createFileAttach(equipment.getEquipId());
		return SUCCESS;
	}

	@ActionLog(description = "删除设备信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			if (Status.EquipCompon.unused.equals(c.getStatus()) || Status.EquipCompon.scrap.equals(c.getStatus()) || Status.EquipCompon.losed.equals(c.getStatus())) { // 闲置报废遗失设备
				c.setDelFlag(Constant.DISENABLED);
				c.setExwSerial(c.getExwSerial()==null? "" : "_"+c.getExwSerial());
				equipmentService.save(c);
			}else{
				throw new BusinessException("设备状态不符合规定，删除失败!");
			}
		}System.out.println("详明6");
		return SUCCESS;
	}

	@ActionLog(description = "移除设备零配件信息")
	public String multiDelComponent() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			componentService.removeBindingEquipment(new Long(id));
		}System.out.println("详明7");
		return SUCCESS;
	}

	public String multiDelAffiliated() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipmentService.removeAffiliated(new Long(id));
		}System.out.println("详明8");
		return SUCCESS;
	}

	@ActionLog(description = "注销设备信息")
	public String multiCancel() {
		Date currentDate = DateUtil.getCurrentDate();
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			if (Status.EquipBusiness.disenable.equals(c.getBusinessStatus())) { // 闲置设备
				c.setBusinessStatus(Status.EquipBusiness.cancel);
				c.setStatusDate(currentDate);
				equipmentService.save(c);
			}
		}System.out.println("详明9");
		return SUCCESS;
	}

	@ActionLog(description = "恢复设备信息")
	public String recover() {
		Date currentDate = DateUtil.getCurrentDate();
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			if (Status.EquipBusiness.cancel.equals(c.getBusinessStatus())) { // 注销设备
				c.setBusinessStatus(StatusAnalyze.parserECValid(c.getScrapDate(), Status.EquipBusiness.disenable));
				c.setStatusDate(currentDate);
				equipmentService.save(c);
			}
		}System.out.println("详明10");
		return SUCCESS;
	}

	@ActionLog(description = "停用设备")
	public String multiCease() {
		Date currentDate = DateUtil.getCurrentDate();
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			if (Status.EquipCompon.inused.equals(c.getStatus())) { // 在用设备停用
				c.setBusinessStatus(Status.EquipBusiness.stop);
				c.setStatus(Status.EquipCompon.stop);
				c.setStatusDate(currentDate);
				equipmentService.save(c);
			}
		}System.out.println("详明11");
		return SUCCESS;
	}

	@ActionLog(description = "恢复停用设备")
	public String multiRun() {
		Date currentDate = DateUtil.getCurrentDate();
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			if (Status.EquipCompon.stop.equals(c.getStatus())) { // 恢复停用设备
				c.setStatus(Status.EquipCompon.inused);
				c.setStatusDate(currentDate);
				equipmentService.save(c);
			}
		}System.out.println("详明12");
		return SUCCESS;
	}

	public String release() {
		Date currentDate = DateUtil.getCurrentDate();
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			c.setStatus(Status.EquipCompon.unused);
			c.setEquipDiary(null);
			c.setFlowId(null);
			c.setProjectId(null);
			c.setProjectName(null);
			c.setProjectAddress(null);
			c.setBusinessStatus(Status.EquipBusiness.disenable);
			c.setStatusDate(currentDate);
			equipmentService.save(c);
		}
		return SUCCESS;
	}

	@ActionLog(description = "更新设备状态")
	public String refresh() {
		equipmentService.refresh();
		return SUCCESS;
	}

	@ActionLog(description = "一机一档")
	public String printDocument() {
		equipment = equipmentService.getTranslateFull(equipId);
		getRequest().setAttribute("currentDate", DateUtil.getCurrentCNDateStr());
		// 所属部件信息
		List<Map<String, Object>> componDairyList = equipmentService.queryByScript("equipdoc.include_compon_diary", equipId);
		Map<Long, EquipComponDocmodel> equipComponDairys = new HashMap<Long, EquipComponDocmodel>();
		for (Map<String, Object> data : componDairyList) {
			Long componId = (Long) data.get("COMPON_ID");
			EquipComponDocmodel compon = null;
			if (equipComponDairys.containsKey(componId)) {
				compon = equipComponDairys.get(componId);
			} else {
				compon = new EquipComponDocmodel();
				compon.setComponId(componId);
				compon.setPurchaseDate((String) data.get("PURCHASE_DATE"));
				compon.setComponGenericName((String) data.get("COMPON_GENERIC"));
				compon.setComponSpecificName((String) data.get("COMPON_SPECIFIC"));
				compon.setStatusName(CodeServiceImpl.fastValue("EQUIP_COMPON_STATUS", (String) data.get("STATUS")));
				equipComponDairys.put(componId, compon);
			}
			Map<String, String> diary = new HashMap<String, String>();
			diary.put("START_DATE", (String) data.get("START_DATE"));
			diary.put("END_DATE", (String) data.get("END_DATE"));
			diary.put("PROJECT_NAME", (String) data.get("PROJECT_NAME"));
			diary.put("ADDRESS", (String) data.get("ADDRESS"));
			compon.getComponDiarys().add(diary);
		}
		getRequest().setAttribute("equipComponDairys", equipComponDairys.values());
		// 运行状态
		List<Map<String, Object>> rentout = equipmentService.queryByScript("equipdoc.rent_out_count", equipId);
		getRequest().setAttribute("rentout", rentout.get(0).get("COUNTS"));
		List<Map<String, Object>> receivesum = equipmentService.queryByScript("equipdoc.receive_sum", equipId);
		BigDecimal receive = (BigDecimal) receivesum.get(0).get("PRESENT_AMOUNT");
		getRequest().setAttribute("receivesum", receive);
		List<Map<String, Object>> paymentsum = equipmentService.queryByScript("equipdoc.payment_sum", equipId);
		BigDecimal payment = (BigDecimal) paymentsum.get(0).get("PRESENT_AMOUNT");
		getRequest().setAttribute("paymentsum", payment);
		if (payment.compareTo(BigDecimal.ZERO) == 1) {
			getRequest().setAttribute("grossProfitRate", receive.subtract(payment).multiply(new BigDecimal(100)).divide(payment).setScale(BigDecimal.ROUND_HALF_EVEN).toString() + "%");
		} else {
			getRequest().setAttribute("grossProfitRate", "0.00%");
		}
		List<Map<String, Object>> occupancyrate = equipmentService.queryByScript("equipdoc.occupancy_rate", equipId);
		getRequest().setAttribute("occupancyrate", occupancyrate.get(0).get("OCCUPANCY_RATE") + "%");
		List<Map<String, Object>> equipdiarys = equipmentService.queryByScript("equipdoc.top2_diary", equipId);
		if (!equipdiarys.isEmpty()) {
			if (Status.EquipComponStore.warehoused.equals(equipdiarys.get(0).get("WORK_STATUS"))) { // 已入库
				getRequest().setAttribute("lastProjectName", equipdiarys.get(0).get("PROJECT_NAME"));
				getRequest().setAttribute("lastProjectAddress", equipdiarys.get(0).get("ADDRESS"));
			} else {
				getRequest().setAttribute("currentProjectName", equipdiarys.get(0).get("PROJECT_NAME"));
				getRequest().setAttribute("currentProjectAddress", equipdiarys.get(0).get("ADDRESS"));
				getRequest().setAttribute("currentActivateDate", equipdiarys.get(0).get("ACTIVATE_DATE"));
				getRequest().setAttribute("currentUnEntName", equipdiarys.get(0).get("UN_CUSTOM_NAME"));
				if (equipdiarys.size() == 2) {
					getRequest().setAttribute("lastProjectName", equipdiarys.get(1).get("PROJECT_NAME"));
					getRequest().setAttribute("lastProjectAddress", equipdiarys.get(1).get("ADDRESS"));
				}
			}
		}
		// 租赁合同
		List<Map<String, Object>> contracts = equipmentService.queryByScript("equipdoc.contract", equipId);
		for (Map<String, Object> data : contracts) {
			data.put("APPLYFOR_STATE", CodeServiceImpl.fastValue("CONTRACT_APPLYFOR_STATUS", (String) data.get("APPLYFOR_STATE")));
		}
		getRequest().setAttribute("contracts", contracts);
		// 结算信息
		List<Map<String, Object>> settles = equipmentService.queryByScript("equipdoc.settle", equipId);
		for (Map<String, Object> data : settles) {
			data.put("FUND_STATUS", CodeServiceImpl.fastValue("FUND_PLAN_STATUS", (String) data.get("FUND_STATUS")));
		}
		getRequest().setAttribute("settles", settles);
		// 调度信息
		List<Map<String, Object>> dispatchs = equipmentService.queryByScript("equipdoc.dispatch", equipId);
		for (Map<String, Object> data : dispatchs) {
			data.put("APPLYFOR_STATE", CodeServiceImpl.fastValue("DISPATCH_APPLYFOR_STATE", (String) data.get("APPLYFOR_STATE")));
		}
		getRequest().setAttribute("dispatchs", dispatchs);
		// 安装启用
		List<Map<String, Object>> installs = equipmentService.queryByScript("equipdoc.install", equipId);
		getRequest().setAttribute("installs", installs);
		//顶升加节
		List<Map<String, Object>> jjcomponts = equipmentService.queryByScript("equipdoc.jj", equipId);
		getRequest().setAttribute("jjcomponts", jjcomponts);
		// 检测信息
		List<Map<String, Object>> detects = equipmentService.queryByScript("equipdoc.detect", equipId);
		getRequest().setAttribute("detects", detects);
		// 验收信息
		List<Map<String, Object>> verifys = equipmentService.queryByScript("equipdoc.verify", equipId);
		getRequest().setAttribute("verifys", verifys);
		// 使用信息
		List<Map<String, Object>> employs = equipmentService.queryByScript("equipdoc.employ", equipId);
		getRequest().setAttribute("employs", employs);
		// 巡检信息
		List<Map<String, Object>> inspects = equipmentService.queryByScript("equipdoc.inspect", equipId);
		getRequest().setAttribute("inspects", inspects);
		// 维保记录
		List<Map<String, Object>> maints = equipmentService.queryByScript("equipdoc.maint", equipId);
		getRequest().setAttribute("maints", maints);
		// 拆卸信息
		List<Map<String, Object>> dismantles = equipmentService.queryByScript("equipdoc.dismantle", equipId);
		getRequest().setAttribute("dismantles", dismantles);
		// 保险信息
		List<Map<String, Object>> insures = equipmentService.queryByScript("equipdoc.insure", equipId);
		getRequest().setAttribute("insures", insures);
		// 收款明细
		List<Map<String, Object>> receives = equipmentService.queryByScript("equipdoc.receive", equipId);
		for (Map<String, Object> data : receives) {
			data.put("RECEIVE_STATUS", CodeServiceImpl.fastValue("FUND_STATUS", (String) data.get("RECEIVE_STATUS")));
		}
		getRequest().setAttribute("receives", receives);
		// 支出明细
		List<Map<String, Object>> payments = equipmentService.queryByScript("equipdoc.payment", equipId);
		for (Map<String, Object> data : payments) {
			data.put("PAYMENT_STATUS", CodeServiceImpl.fastValue("FUND_STATUS", (String) data.get("PAYMENT_STATUS")));
		}
		getRequest().setAttribute("payments", payments);
		return "equipDocument";
	}

	public String loadMaterialGather() throws Exception {
		String path = ApplicationContainer.getAppAbsolutePath() + "/WEB-INF/classes/resource/material.js";
		String content = ReadWriteFileUtil.readFileForStr(path);
		setJsonString(content);System.out.println("详明16");
		return SUCCESS;
	}

	public String distribute() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Map<String, Object>> list = equipmentService.queryDistributeMapInfo(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String examine(){
		Equipment c = equipmentService.get(equipment.getEquipId());
		c.setExamineDate(equipment.getExamineDate());
		equipmentService.save(c);
		System.out.println("详明18");
		return SUCCESS;
		
	}
	//确认
	public String confirm() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			c.setStatus("1");
			equipmentService.save(c);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "设备报废")
	public String scrap() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment c = equipmentService.get(new Long(id));
			if(Status.EquipCompon.unused.equals(c.getStatus())) {
				c.setStatus(Status.EquipCompon.scrap);
				equipmentService.save(c);
			}else {
				throw new BusinessException("设备状态非闲置，无法报废");
			}
			
		}
		return SUCCESS;
	}
	
	//设备看板（设备分布城市）
	public String equipDistribution() throws Exception{
		String province = getRequest().getParameter("province")!=null?getRequest().getParameter("province"):"45";
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.equip_distribution",province.substring(0, 2));
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
	
	//设备看板（设备巡检预警提醒）
	public String equipInspectWarning() throws Exception{
		QueryFilter filter = new QueryFilter();
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.equip_inspect_warning");
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		for(Map<String,Object> map : list){
			if(map.containsKey("maintCompleted")&&map.get("maintCompleted")==null){
				map.put("maintCompleted", 0);
			}
		}
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
	
	//设备看板（设备巡检本周排行）
	public String equipInspectWeekRanking() throws Exception{
		QueryFilter filter = new QueryFilter();
		String start = getRequest().getParameter("start")!=null?getRequest().getParameter("start"):"0";
		String limit = getRequest().getParameter("limit")!=null?getRequest().getParameter("limit"):"25";
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.equip_inspect_week_ranking",start,limit);
		for(Map<String,Object> map : list){
			if(map.containsKey("corpInspectPlan")&&map.get("corpInspectPlan")==null){
				map.put("corpInspectPlan", 0);
			}
			if(map.containsKey("corpInspectCompleted")&&map.get("corpInspectCompleted")==null){
				map.put("corpInspectCompleted", 0);
			}
			if(map.containsKey("corpMaintCompleted")&&map.get("corpMaintCompleted")==null){
				map.put("corpMaintCompleted", 0);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
	
	//设备看板（设备巡检本月排行）
	public String equipInspectMonthRanking() throws Exception{
		QueryFilter filter = new QueryFilter();
		String start = getRequest().getParameter("start")!=null?getRequest().getParameter("start"):"0";
		String limit = getRequest().getParameter("limit")!=null?getRequest().getParameter("limit"):"25";
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.equip_inspect_month_ranking",start,limit);
		for(Map<String,Object> map : list){
			if(map.containsKey("corpInspectPlan")&&map.get("corpInspectPlan")==null){
				map.put("corpInspectPlan", 0);
			}
			if(map.containsKey("corpInspectCompleted")&&map.get("corpInspectCompleted")==null){
				map.put("corpInspectCompleted", 0);
			}
			if(map.containsKey("corpMaintCompleted")&&map.get("corpMaintCompleted")==null){
				map.put("corpMaintCompleted", 0);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
	
	//设备看板（设备巡检本季度排行）
	public String inspectQuarterRanking() throws Exception{
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.equip_inspect_quarter_ranking");
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
		
	//设备看板（设备巡检本年排行）
	public String inspectYearRanking() throws Exception{
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.equip_inspect_year_ranking");
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}

/**
	 * 统一以字符流的方式通过前端接口调用返回给前端
	 * @param result
	 * @throws Exception
	 */
	public void printResult(String result) throws Exception{
		HttpServletResponse response = ServletActionContext.getResponse();
		HttpServletRequest request = ServletActionContext.getRequest();
		response.setCharacterEncoding("utf-8");
		PrintWriter writer = response.getWriter();
		String callback = (String)request.getParameter("callback"); 
		String retStr = callback + "(" + result + ")";  //解决问题方法
		writer.print(retStr);
		writer.flush();
		writer.close();
	}
	
	public String bindingPerson() {
		String userIds = getRequest().getParameter("userId");
		String equipIds = getRequest().getParameter("equipId");
		String[] userIdArr = userIds.split(",");
		String[] equipIdArr = equipIds.split(",");
		for(String equipId : equipIdArr) {
			Equipment eq = equipmentService.get(new Long(equipId));
			if(StringUtils.isBlank(eq.getPermissionFlag())) {
				throw new BusinessException("设备:"+eq.getEquipSerial()+"未被赋予权限标识，绑定失败，请联系管理员");
			}else {
				for(String  userId : userIdArr) {
					AppUser au = appUserService.get(new Long(userId));
					au = appUserService.addDataPermission(au, eq.getPermissionFlag());
					appUserService.update(au);
				}
			}
		}
		return SUCCESS;
	}
	
	public String bindingPermission() {
		String equipIds = getRequest().getParameter("equipId");
		String permissionSerial =  getRequest().getParameter("permissionSerial");
		String[] equipIdArr = equipIds.split(",");
		for(String equipId : equipIdArr) {
			Equipment eq = equipmentService.get(new Long(equipId));
			eq.setPermissionFlag(permissionSerial+eq.getRecordSerial());
		}
		return SUCCESS;
	}
	
	public String binding() {
		String equipIds = getRequest().getParameter("equipId");
		String userIds = getRequest().getParameter("userId");
		String[] userIdArr = userIds.split(",");
		String[] equipIdArr = equipIds.split(",");
		for(String equipId : equipIdArr) {
			Equipment eq = equipmentService.get(new Long(equipId));
			for(String  userId : userIdArr) {
				userId = "s"+userId+"e,";
				if (eq.getPermissionFlag() == null) {
					eq.setPermissionFlag(userId);
				}else if(!eq.getPermissionFlag().contains(userId)) {
					eq.setPermissionFlag(eq.getPermissionFlag()+userId);
				}
			}
			equipmentService.update(eq);
		}
		return SUCCESS;
	}
	
	public String queryListProvince() throws Exception{
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.province_list");
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		printResult(buff.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "看板本月巡检管理  计划未巡检/巡检完成/异常设备/良好设备")
	public String currentMonthInspectCollect() throws Exception {
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.current_month_inspect_collect");
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list,DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
	
	public String corpEquipDistribution() throws Exception{
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.corp_equip_distribution");
		List<Map<String,Object>> list2 = equipmentService.queryByScript("equipdoc.corp_equip_distribution2");
		if(list2.size()>0){
			for(Map<String,Object> map:list){
				for(Map<String,Object> map2:list2){
					if(map.get("DEP_ID").toString().equals(map2.get("DEP_ID").toString())){
						map.put("CorpEquipTotalCount",Integer.valueOf(map2.get("CorpEquipTotalCount").toString())+Integer.valueOf(map.get("CorpEquipTotalCount").toString()) );
						map.put("CorpTowerCount", Integer.valueOf(map2.get("CorpTowerCount").toString())+Integer.valueOf(map.get("CorpTowerCount").toString()));
						map.put("CorpTowerInuseCount",Integer.valueOf(map2.get("CorpTowerInuseCount").toString())+Integer.valueOf(map.get("CorpTowerInuseCount").toString()));
						map.put("CorpTowerIdleCount", Integer.valueOf(map2.get("CorpTowerIdleCount").toString())+Integer.valueOf(map.get("CorpTowerIdleCount").toString()));
						map.put("CorpLiftCount",Integer.valueOf(map2.get("CorpLiftCount").toString())+Integer.valueOf(map.get("CorpLiftCount").toString()));
						map.put("CorpLiftInuseCount",Integer.valueOf(map2.get("CorpLiftInuseCount").toString())+Integer.valueOf(map.get("CorpLiftInuseCount").toString()));
						map.put("CorpLiftIdleCount", Integer.valueOf(map2.get("CorpLiftIdleCount").toString())+Integer.valueOf(map.get("CorpLiftIdleCount").toString()));
					}
				}
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
	
	//看板本月巡检管理表格
	public String currentMonthInspectTable() throws Exception {
		List<Map<String,Object>> list = equipmentService.queryByScript("equipdoc.current_month_inspect_table");
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		printResult(buff.toString());
		return null;
	}
	
	@ActionLog(description = "修改设备档案")
	public String change() {
		equipmentService.changeEquip(equipment);
		return SUCCESS;
	}
}
