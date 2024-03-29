/**
 *====================================================
 * 文件名称: ContractLeaseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.reflect.TypeToken;
import com.knight.core.FreemarkerContextHelper;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.EmmsConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ContractEquipBriefDao;
import com.knight.emms.model.ContractArrange;
import com.knight.emms.model.ContractEquipBrief;
import com.knight.emms.model.ContractInoutFree;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.ContractLeaseVersion;
import com.knight.emms.model.ContractOperatorFree;
import com.knight.emms.model.SafetyMonitorSettleList;
import com.knight.emms.service.ComponIntoStoreService;
import com.knight.emms.service.ContractArrangeService;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.ContractLeaseVersionService;
import com.knight.emms.service.ContractMaterialsService;
import com.knight.emms.service.DispatchService;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipInstallService;
import com.knight.emms.service.LogisticsTransportService;
import com.knight.emms.service.SettleContractService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;
import com.knight.system.service.DepartmentService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ContractLeaseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:32:28
 */
public class ContractLeaseAction extends ExportBaseAction<ContractLease> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ContractLease contractLease;

	@Setter
	@Getter
	private Long contractId;

	@Resource
	private ContractLeaseService contractLeaseService;
	
	@Resource
	private ContractArrangeService contractArrangeService;
	
	@Resource
	private DispatchService dispatchService;

	@Resource
	private ContractMaterialsService contractMaterialsService;
	
	@Resource
	private DepartmentService departmentService;
	
	@Resource
	private LogisticsTransportService logisticsTransportService;
	
	@Resource
	private AppUserService appUserService;
	
	@Resource
	private EquipFlowService equipFlowService;
	
	@Resource
	private EquipInstallService equipInstallService;
	
	@Resource
	private SettleContractService settleContractService;
	
	@Resource
	private ComponIntoStoreService componIntoStoreService;
	
	@Resource
	private ContractLeaseVersionService contractLeaseVersionService;
	
	@Resource
	private ContractEquipBriefDao contractEquipBriefDao;
	
	public String display() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		List<ContractLease> contractLeaseList = contractLeaseService.getAll(filter);
		getRequest().setAttribute("displayList", contractLeaseList);
		return "display";
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> celist = contractLeaseService.queryByScript("dispatch.equip_contract_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<celist.size();i++) {
				sb.append(String.valueOf(celist.get(i).get("CONTRACT_ID"))+",");
			}
			if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_contractId_L_EQ", sa);
			}else {
				return SUCCESS;
			}
		}
		String province= getRequest().getParameter("province");
		String city= getRequest().getParameter("city");
		String county= getRequest().getParameter("county");
		if(province!=null||city!=null||county!=null) {
			//拼接地址
			String address = contractMaterialsService.concatAddress(province, city, county);
			if(address!=""){
				filter.addConjunctFilter("Q_address_S_LK", address);
			}
		}
		List<ContractLease> list = contractLeaseService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String listByTransStatus() {
		String contractSerial = getRequest().getParameter("contractNo");
		String projectName = getRequest().getParameter("projectName");
		String equipSerial = getRequest().getParameter("equipSerial");
		String dataPermission = "";
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
			dataPermission = ApplicationContainer.getCurrentUser().getDataPermission();
		}
		List<Map<String,Object>>  list = contractLeaseService.queryByScript("dispatch.list_by_trans_status",contractSerial,projectName,equipSerial,dataPermission);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ContractLease c = contractLeaseService.getTranslateFull(contractId);
		if (c.getBargain() != null) {
			c.setFillContent(true);
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新合同信息")
	public String save() {
//		contractLeaseService.contractNoExist(contractLease.getContractId(), contractLease.getContractNo());
		ContractArrange contractArrange = contractArrangeService.get(contractLease.getArrangeId());
		Integer equipCount = Integer.valueOf(contractLease.getEquipCount()+"");
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter.addConjunctFilter("Q_arrangeId_L_EQ", contractLease.getArrangeId()+"");
		if(contractLease.getContractId() != null){
			filter.addConjunctFilter("Q_contractId_L_NEQ", contractLease.getContractId()+"");
		}
		List<ContractLease> list = contractLeaseService.getAll(filter);
		if(list.size()>0){
			for(ContractLease cl:list){
				equipCount = equipCount+Integer.valueOf(cl.getEquipCount()+"");
			}
		}
		if(equipCount==contractArrange.getQuantity()){
			contractArrange.setInuse("1");
		}else if(equipCount>contractArrange.getQuantity()){
			throw new BusinessException("合同签订的设备数量不能超过业务申请的需求数量!");
		}
		if (contractLease.getContractId() == null) {
//			QueryFilter filter = new QueryFilter();
//			filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
//			filter.addConjunctFilter("Q_contractNo_S_EQ",contractLease.getContractNo());
//			List<ContractLease> list=contractLeaseService.getAll(filter);
//			if(list.size()>0){
//				throw new BusinessException("合同编号已存在，请更换合同编号!");
//			}
			this.isCreateFileAttach = true;
			contractLease.setDebitReceivable(EmmsConstant.ZERO);
			contractLease.setEffective(Constant.DISENABLED);
			contractLease.setApplyforState(Status.ContractApplyfor.waitSubmit);
			contractLease.setDelFlag(Constant.ENABLED);
			if (StringUtils.isBlank(contractLease.getContractTheme())) {
				contractLease.setContractTheme(contractLease.getProjectName() + "的合同" + DateUtil.getCurrentDateStr());
			}
		} else {
			ContractLease p = contractLeaseService.editLoad(contractLease);
			if (!Status.ContractApplyfor.waitSubmit.equals(p.getApplyforState())) {
				throw new BusinessException("合同不在状态,无法修改!");
			}
			if (contractLease.getContractSerial()!= null) {
				contractLease.setContractSerial(p.getContractSerial());
			}
			contractLease.setBargain(p.getBargain());
			contractLease.setDebitReceivable(p.getDebitReceivable());
			contractLease.setEffective(p.getEffective());
			contractLease.setApplyforState(p.getApplyforState());
			contractLease.setDelFlag(p.getDelFlag());
		}
		//添加数据权限（根据部门划分数据的归属）
		String permissionFlag = departmentService.bindingDepartmentPermission(contractLease.getCompetentDepartmentId());
		departmentService.grantPermission(contractLease, permissionFlag);
		contractLeaseService.saveOrMergeForEdit(contractLease);
		createFileAttach(contractLease.getContractId());
		contractArrangeService.update(contractArrange);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(contractLease.getApplyforId());
		List<Map<String, Object>> notEnoughCategory = contractLeaseService.queryByScript("contract.set_equip_margin", contractLease.getContractId());
		List<Map<String, Object>> notEnoughPracti = contractLeaseService.queryByScript("contract.set_practi_margin", contractLease.getContractId());
		if (!notEnoughCategory.isEmpty() || !notEnoughPracti.isEmpty()) {
			sb.append(",msg:\"注意,");
			if (!notEnoughCategory.isEmpty()) {
				sb.append("以下当前闲置设备数量,不满足合同要求数量:</br>");
				for (Map<String, Object> e : notEnoughCategory) {
					if(e.get("EQUIP_CATEGORY_NAME")!=null){
					sb.append("[").append(e.get("EQUIP_CATEGORY_NAME").toString()).append(":缺少").append(e.get("QUANTITY").toString()).append("],");
				}
				}
				sb.deleteCharAt(sb.length() - 1);
				sb.append("</br>");
			}
			if (!notEnoughPracti.isEmpty()) {
				sb.append("以下工种人员,不满足合同要求数量:</br>");
				for (Map<String, Object> e : notEnoughPracti) {
					sb.append("[").append(e.get("KIND_WORK_NAME").toString()).append(":缺少").append(e.get("QUANTITY").toString()).append("],");
				}
				sb.deleteCharAt(sb.length() - 1);
			}
			sb.append("\"");
		}
		sb.append("}");
		this.jsonString = sb.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除合同设备分类信息")
	public String multiDelEquipBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteEquipBrief(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除安装费用")
	public String multiDelInstallPriceSet() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteInstallPriceSet(new Long(id));
		}
		return SUCCESS;
	}
	@ActionLog(description = "删除汽吊费用")
	public String multiDelTruckCranePriceSet() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteTruckCranePriceSet(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除合同设备信息")
	public String multiDelEquip() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteEquip(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除合同设备费用")
	public String multiDelEquipOutlay() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteEquipOutlay(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除合同设备相关费用")
	public String multiDelEquipCost() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteEquipCost(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除合同人员清单信息")
	public String multiDelPractiBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deletePractiBrief(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除合同其他费用信息")
	public String multiDelCostitem() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteCostitem(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除合同信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractLease p = contractLeaseService.get(new Long(id));
			if (Status.ContractApplyfor.waitSubmit.equals(p.getApplyforState()) || Status.ContractApplyfor.nullify.equals(p.getApplyforState())) { // 待审、作废
				p.setDelFlag(Constant.DISENABLED);
				contractLeaseService.save(p);
				ContractArrange ca = contractArrangeService.get(p.getArrangeId());
				ca.setInuse(null);
				contractArrangeService.update(ca);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交合同信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractLease p = contractLeaseService.get(new Long(id));
			if (Status.ContractApplyfor.waitSubmit.equals(p.getApplyforState())) { // 0:新增
				p.setApplyforState(Status.ContractApplyfor.waitAccept);
				contractLeaseService.save(p);
				contractLeaseService.sendSms(p);
			}
		}
		return SUCCESS;
	}
	@ActionLog(description = "一键审批合同信息")
	public String approval() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {   
			ContractLease p = contractLeaseService.get(new Long(id));
			if (Status.ContractApplyfor.waitApprove.equals(p.getApplyforState())||
					Status.ContractApplyfor.waitSubmit.equals(p.getApplyforState())||
					Status.ContractApplyfor.waitAccept.equals(p.getApplyforState())) { // 0:新增
				p.setApplyforState(Status.ContractApplyfor.waitDispatch);
				contractLeaseService.save(p);
				//contractLeaseService.sendSms(p);
			}
		}
		return SUCCESS;
	}
	@ActionLog(description = "初始化合同信息")
	public String init() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractLease p = contractLeaseService.get(new Long(id));
			if (Status.ContractApplyfor.waitDispatch.equals(p.getApplyforState())) { // 0:新增
				p.setApplyforState(Status.ContractApplyfor.waitSubmit);
				contractLeaseService.save(p);
				//contractLeaseService.sendSms(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "修改合同编号")
	public String change() {
		String contractNo = getRequest().getParameter("number");
		String id = getRequest().getParameter("ids");
		if(StringUtils.isNotBlank(id) && StringUtils.isNotBlank(contractNo)){
				contractLeaseService.changeContractNo(Long.valueOf(id), contractNo);
		}
		return SUCCESS;
	}
	
	

	@ActionLog(description = "作废合同信息")
	public String multiDeprecate() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractLease p = contractLeaseService.get(new Long(id));
			if (Status.ContractApplyfor.waitDispatch.equals(p.getApplyforState())) { // 3:待调度状态允许作废申请
				p.setApplyforState(Status.ContractApplyfor.nullifyAccept);
				contractLeaseService.save(p);
			}
		}
		return SUCCESS;
	}

	public String editContent() {
		contractLease = contractLeaseService.getTranslateFull(contractId);
		String event = getRequest().getParameter("EVENT");
		String content = "";
		if (event != null && "SAVE".equals(event)) {
			content = getRequest().getParameter("content1");
			contractLease.setBargain(content);
			contractLeaseService.save(contractLease);
		}
		if (event != null && "PRINT".equals(event)) {
			if (content == null || "".equals(content)) {
				content = getRequest().getParameter("content1");
				contractLease.setBargain(content);
				contractLeaseService.save(contractLease);
			}
			try {
				getRequest().setCharacterEncoding("UTF-8");
				content = contractLease.getBargain();
				if (content != null && !"".equals(content)) {
					byte[] bytes = content.getBytes("UTF-8"); // bf.tostring()
					getResponse().reset();
					getResponse().setContentType("application/msword");
					getResponse().setHeader("Content-disposition", "inline; filename=case_print.doc"); // inline
					getResponse().setCharacterEncoding("UTF-8");
					getResponse().setContentLength(bytes.length);
					ServletOutputStream ouputStream = getResponse().getOutputStream();
					ouputStream.write(bytes, 0, bytes.length);
					ouputStream.flush();
					ouputStream.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("contractLease", contractLease);
		if (StringUtils.isBlank(contractLease.getBargain())) {
			if (!"1".equals(contractLease.getSubcontract())) {
				contractLease.setBargain(FreemarkerContextHelper.process(ApplicationContainer.getSystemParam("contract.lease").toString(), data));// 租赁合同
			} else {
				contractLease.setBargain(FreemarkerContextHelper.process(ApplicationContainer.getSystemParam("contract.subcontract").toString(), data));// 一体化合同
			}
		}
		getRequest().setAttribute("content", contractLease.getBargain());
		getRequest().setAttribute("contractId", contractId);
		return getRequest().getParameter("formpage");
	}

	
	 public String listEquipBrief(){
		 String ctId = getRequest().getParameter("contractId");
		 ContractLease cl = contractLeaseService.get(new Long(ctId));
		 String esName = getRequest().getParameter("equipSpecific");
		 ContractEquipBrief ceb = new ContractEquipBrief();
		 if(cl!=null){
			 for(ContractEquipBrief ce  : cl.getContractEquipBriefSet()){
				 if(ce.getEquipSpecific()!=null && ce.getEquipSpecific().equals(esName)){
					 ceb = ce;
				 }
			 }
		 }
		 StringBuffer sb = new StringBuffer("{success:true,data:[");
		 sb.append(GsonUtil.toJson(ceb, GsonUtil.SINCE_VERSION_20, false));
		 sb.append("]}");
		 setJsonString(sb.toString());
		 return SUCCESS;
	 }
	 
	public String binding() {
		String contractIds = getRequest().getParameter("contractId");
		String userIds = getRequest().getParameter("userId");
		String[] userIdArr = userIds.split(",");
		String[] contractIdArr = contractIds.split(",");
		for (String contractId : contractIdArr) {
			ContractLease cl = contractLeaseService.get(new Long(contractId));
			for (String userId : userIdArr) {
				userId = "s" + userId + "e,";
				if (cl.getPermissionFlag() == null) {
					cl.setPermissionFlag(userId);
				} else if (!cl.getPermissionFlag().contains(userId)) {
					cl.setPermissionFlag(cl.getPermissionFlag() + userId);
				}
			}
			contractLeaseService.update(cl);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除进出场费用")
	public String multiDelcontractInout() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteContractInoutFree(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除操作人员费用")
	public String multiDelcontractOperator() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteContractOperatirFree(new Long(id));
		}
		return SUCCESS;
	}
	
	/**修改合同类别*/
	public String modifyCategory() {
		String contractIds = getRequest().getParameter("contractIds");
		String contractCategory = getRequest().getParameter("contractCategory");
		String[] ids = contractIds.split(",");
		for (String id : ids) {
			ContractLease cl = contractLeaseService.get(new Long(id));
			cl.setContractCategory(contractCategory);
			contractLeaseService.update(cl);
		}
		return SUCCESS;
	}
	
	/** 申请修订合同 */
	public String applyEdit(){
		String contractId = getRequest().getParameter("contractId");
		ContractLease cl = contractLeaseService.get(Long.valueOf(contractId));
		if(Integer.valueOf(cl.getApplyforState())<3 || ("9").equals(cl.getApplyforState())){
			throw new BusinessException("状态不合法，保存失败！");
		}
		ContractLeaseVersion clv = new ContractLeaseVersion();
		List<Map<String,Object>> list = contractLeaseVersionService.queryByScript("contract.lease_serial_list", cl.getContractId());
		if(list!=null && list.size()==0){
			//保存第一版的合同
			contractLeaseVersionService.saveOrMergeForEdit(clv, cl);
		}
		ContractLeaseVersion clv2 = new ContractLeaseVersion();
		if (contractLease.getContractSerial()!= null) {
			contractLease.setContractSerial(cl.getContractSerial());
		}
		contractLease.setPaEntName(cl.getPaEntName());
		contractLease.setPbEntName(cl.getPbEntName());
		contractLease.setContractCategory(cl.getContractCategory());
		contractLease.setProjectName(cl.getProjectName());
		if(cl.getApplicableTaxRate()!=null && contractLease.getApplicableTaxRate()==null){
			contractLease.setApplicableTaxRate(cl.getApplicableTaxRate());
		}
		if(cl.getInvoiceType()!=null && contractLease.getInvoiceType()==null){
			contractLease.setInvoiceType(cl.getInvoiceType());
		}
		contractLease.setBillUnitId(cl.getBillUnitId());
		contractLease.setBillUnitName(cl.getBillUnitName());
		contractLease.setDebitReceivable(cl.getDebitReceivable());
		contractLease.setEffective(cl.getEffective());
		contractLease.setApplyforState(cl.getApplyforState());
		contractLease.setDelFlag(cl.getDelFlag());
		
		//修改的合同保存到历史版本表
		contractLeaseVersionService.saveOrMergeForEdit(clv2, contractLease);
		
		cl.setEditApproveState(Constant.DISENABLED);
		contractLeaseService.merge(cl);
		return SUCCESS;
	}
	
	/** 审批修订合同 */
	public String approveEdit(){
		String leaseVersionId = getRequest().getParameter("leaseVersionId");
		ContractLeaseVersion clv = contractLeaseVersionService.get(Long.valueOf(leaseVersionId));
		ContractLease cl = contractLeaseService.get(clv.getContractId());
		//版本覆盖到当前合同
		BeanUtils.copyProperties(clv, cl);
		BeanUtils.copyProperties(clv.getContractEquipBriefVersionSet(), cl.getContractEquipBriefSet());
		BeanUtils.copyProperties(clv.getSafetyMonitorSettleListVersionSet(), cl.getSafetyMonitorSettleListSet());
		BeanUtils.copyProperties(clv.getContractInoutFreeVersionSet(), cl.getContractInoutFreeSet());
		BeanUtils.copyProperties(clv.getContractOperatorFreeVersionSet(), cl.getContractOperatorFreeSet());
		cl.setEditApproveState(Constant.ENABLED);
		cl.setSubContractLease();
		if (cl.getContractEquipBriefSet() != null) {
			for(ContractEquipBrief c : cl.getContractEquipBriefSet()) {
				c.setApproveable("1");
			}
		}
		if (cl.getSafetyMonitorSettleListSet() != null) {
			for(SafetyMonitorSettleList c : cl.getSafetyMonitorSettleListSet()) {
				c.setApproveable("1");
			}	
		}
		if (cl.getContractInoutFreeSet() != null) {
			for(ContractInoutFree c : cl.getContractInoutFreeSet()) {
				c.setApproveable("1");
			}
		}
		if (cl.getContractOperatorFreeSet() != null) {
			for(ContractOperatorFree c : cl.getContractOperatorFreeSet()) {
				c.setApproveable("1");
			}
		}
		contractLeaseService.merge(cl);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(cl.getApplyforId());
		
		sb.append("}");
		this.jsonString = sb.toString();
		return SUCCESS;
	}
	
	/** 临时添加合同修订功能 */
	public String update(){
		ContractLease p = contractLeaseService.get(contractLease.getContractId());
//		ContractLease p = contractLeaseService.editLoad(contractLease);
		if (contractLease.getContractSerial()!= null) {
			contractLease.setContractSerial(p.getContractSerial());
		}
		contractLease.setPaEntName(p.getPaEntName());
		contractLease.setPbEntName(p.getPbEntName());
		contractLease.setContractCategory(p.getContractCategory());
		contractLease.setProjectName(p.getProjectName());
		if(p.getApplicableTaxRate()!=null && contractLease.getApplicableTaxRate()==null){
			contractLease.setApplicableTaxRate(p.getApplicableTaxRate());
		}
		if(p.getInvoiceType()!=null && contractLease.getInvoiceType()==null){
			contractLease.setInvoiceType(p.getInvoiceType());
		}
		contractLease.setBillUnitId(p.getBillUnitId());
		contractLease.setBillUnitName(p.getBillUnitName());
		contractLease.setDebitReceivable(p.getDebitReceivable());
		contractLease.setBargain(p.getBargain());
		contractLease.setDebitReceivable(p.getDebitReceivable());
		contractLease.setEffective(p.getEffective());
		contractLease.setApplyforState(p.getApplyforState());
		contractLease.setDelFlag(p.getDelFlag());
		contractLease.setInvoiceType(p.getInvoiceType());
		String permissionFlag = departmentService.bindingDepartmentPermission(contractLease.getCompetentDepartmentId());
		departmentService.grantPermission(contractLease, permissionFlag);
		contractLeaseService.saveOrMergeForEdit(contractLease);
		createFileAttach(contractLease.getContractId());
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(contractLease.getApplyforId());
		List<Map<String, Object>> notEnoughCategory = contractLeaseService.queryByScript("contract.set_equip_margin", contractLease.getContractId());
		List<Map<String, Object>> notEnoughPracti = contractLeaseService.queryByScript("contract.set_practi_margin", contractLease.getContractId());
		if (!notEnoughCategory.isEmpty() || !notEnoughPracti.isEmpty()) {
			sb.append(",msg:\"注意,");
			if (!notEnoughCategory.isEmpty()) {
				sb.append("以下当前闲置设备数量,不满足合同要求数量:</br>");
				for (Map<String, Object> e : notEnoughCategory) {
					if(e.get("EQUIP_CATEGORY_NAME")!=null){
					sb.append("[").append(e.get("EQUIP_CATEGORY_NAME").toString()).append(":缺少").append(e.get("QUANTITY").toString()).append("],");
				}
				}
				sb.deleteCharAt(sb.length() - 1);
				sb.append("</br>");
			}
			if (!notEnoughPracti.isEmpty()) {
				sb.append("以下工种人员,不满足合同要求数量:</br>");
				for (Map<String, Object> e : notEnoughPracti) {
					sb.append("[").append(e.get("KIND_WORK_NAME").toString()).append(":缺少").append(e.get("QUANTITY").toString()).append("],");
				}
				sb.deleteCharAt(sb.length() - 1);
			}
			sb.append("\"");
		}
		sb.append("}");
		this.jsonString = sb.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "删除合同安全监控系统费用信息")
	public String multiDelSafetyMonitor() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractLeaseService.deleteSafetyMonitor(new Long(id));
		}
		return SUCCESS;
	}
}
