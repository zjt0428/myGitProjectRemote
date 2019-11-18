/**
 *====================================================
 * 文件名称: DispatchAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.*;
import com.knight.emms.service.*;
import com.knight.emms.support.UploadTerminalFileParser;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @ClassName: DispatchAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:35:18
 */
public class DispatchAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Dispatch dispatch;

	@Setter
	@Getter
	private Long dispatchId;

	@Resource
	private DispatchService dispatchService;

	@Resource
	private DispatchAutocraneService dispatchAutocraneService;

	@Resource
	private FileAttachService fileAttachService;

    @Resource
    private IndisNoticeService indisNoticeService;

	@Resource
	private LogisticsTransportService logisticsTransportService;
	
	@Resource
	private FormApproveService formApproveService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	@Resource
	private ProjectService projectService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> calist = dispatchService.queryByScript("dispatch.equip_dispatch_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<calist.size();i++) {
				sb.append(String.valueOf(calist.get(i).get("DISPATCH_ID"))+",");
			}
			if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_dispatchId_L_EQ", sa);
			}else {
				return SUCCESS;
			}
		}
		List<Dispatch> list = dispatchService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listByTransStatus() {
		// 取得分页的信息
//		Integer start = 0;
//		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
//
//		String s_start = getRequest().getParameter("start");
//		String s_limit = getRequest().getParameter("limit");
//		if (StringUtils.isNotEmpty(s_start)) {
//			start = new Integer(s_start);
//		}
//		if (StringUtils.isNotEmpty(s_limit)) {
//			limit = new Integer(s_limit);
//		}
//		String projectName = "";
//		String dispatchTheme = "";
//		Enumeration<String> paramEnu = getRequest().getParameterNames();
//		while(paramEnu.hasMoreElements()){
//			String paramName = paramEnu.nextElement();
//			String paramValue = getRequest().getParameter(paramName);
//			if(paramName.equals("projectName")){
//				projectName=paramValue;
//				continue;
//			}
//			if(paramName.equals("dispatchTheme")){
//				dispatchTheme=paramValue;
//				continue;
//			}
//		}
//		System.out.println(projectName);
//		List<Dispatch> list1 =  new ArrayList<Dispatch>();
//		List<Dispatch> list2 =  new ArrayList<Dispatch>();
//		String hql = "";
//		if(projectName!=""||dispatchTheme!=""){
//			hql = "select d from Dispatch d where d.delFlag=1 and d.effective=1 and d.applyforState=3 and (d.dispatchId in (select distinct dc.dispatchId from DispatchCompon dc where dc.counts != dc.iniCounts) or d.dispatchId not in (select dispatchId from DispatchCompon)) and d.projectName like ? and d.dispatchTheme like ? order by d.providedDate desc";
//			Object[] params = {'%'+projectName+'%','%'+dispatchTheme+'%'};
//			List<Dispatch> list = dispatchService.findByHql(hql, params);
//			list1 = list;
//		}else{
//			 hql = "select d from Dispatch d where d.delFlag=1 and d.effective=1 and d.applyforState=3 and (d.dispatchId in (select distinct dc.dispatchId from DispatchCompon dc where dc.counts != dc.iniCounts) or d.dispatchId not in (select dispatchId from DispatchCompon)) order by d.providedDate desc";
//			 List<Dispatch> list = dispatchService.findByHql(hql, null);
//			 list1 = list;
//		}
//		for(int i=0;i<limit;i++){
//			if(i<(list1.size())-start){
//				list2.add(list1.get(start+i));
//			}
//		}
//		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list1.size()).append(",result:");
//		buff.append(GsonUtil.toJson(list2));
//		buff.append("}");
//		this.jsonString = buff.toString();
//		return SUCCESS;
		QueryFilter filter = new QueryFilter(getRequest());
		List<Dispatch> list = dispatchService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String listPracti() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<DispatchPracti> list = dispatchService.queryPractiTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listCompon() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<DispatchCompon> list = dispatchService.queryComponTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listEquip() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<DispatchEquip> list = dispatchService.queryEquipTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listAutocrane() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<DispatchAutocrane> list = dispatchAutocraneService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		dispatch = dispatchService.getTranslateFull(dispatchId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(dispatch, GsonUtil.SINCE_VERSION_20, false));
        if ((Boolean) ApplicationContainer.getSystemParam("schemaNoticeSwitch")&&getRequest().getParameter("equipId")!=null) {
            QueryFilter filter = new QueryFilter();
            filter.addConjunctFilter("Q_relateModule_S_EQ", SystemConstant.MODULE_EQUIP_INSTALL);
            filter.addConjunctFilter("Q_indisSchema.equipment.equipId_L_EQ", getRequest().getParameter("equipId") + "");
            filter.addConjunctFilter("Q_indisSchema.project.projectId_L_EQ", dispatch.getProjectId() + "");
            List<IndisNotice> n = indisNoticeService.getAll(filter);
            if(n.size()!=0){
                sb.append(",").append(GsonUtil.toJson(n.get(0), GsonUtil.SINCE_VERSION_20, false)).append("]}");
                setJsonString(sb.toString());
                return SUCCESS;
            }
        }
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String upload() {
		Long fileId = new Long(getRequest().getParameter("fileId"));
		FileAttach fileAttach = fileAttachService.get(fileId);
		try {
			List<Dispatch> list = UploadTerminalFileParser.parserDispatchFile(fileAttach.getFilePath());
			if (!list.isEmpty()) {
				dispatchService.saveUpload(list);
			}
		} catch (Exception e) {
			if (e instanceof BusinessException) {
				throw (BusinessException) e;
			}
			throw new BusinessException("上传调度信息文件解析异常!", e);
		}
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新调度信息")
	public String save() {
		if (dispatch.getDispatchId() == null) {
			dispatch.setEffective(Constant.ENABLED);
			dispatchService.saveCreate(dispatch);
		} else {
			Dispatch p = dispatchService.editLoad(dispatch);
			dispatch.setEffective(Constant.ENABLED);
			dispatch.setFundStatus(p.getFundStatus());
			dispatch.setDispatchSerial(p.getDispatchSerial());
			dispatch.setApplyforState(p.getApplyforState());
			dispatch.setDelFlag(p.getDelFlag());
			dispatch.setSubDispatch();
			dispatchService.merge(dispatch);
		}
		this.jsonString = "{success:true,applyforId:" + dispatch.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除调度设备信息")
	public String multiDelEquip() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dispatchService.deletedEquip(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除调度零配件信息")
	public String multiDelCompon() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dispatchService.deletedCompon(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除调度人员信息")
	public String multiDelPracti() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dispatchService.deletedPracti(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除汽车吊信息")
	public String multiDelAutocrane() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dispatchService.deletedAutocrane(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除配件清单信息")
	public String multiDelAllocate() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dispatchService.deletedAllocate(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除调度信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Dispatch c = dispatchService.get(new Long(id));
			if (Status.DispatchApplyfor.waitSubmit.equals(c.getApplyforState()) || Status.DispatchApplyfor.rejected.equals(c.getApplyforState())) {
				c.setDelFlag(Constant.DISENABLED);
				dispatchService.deleteChange(c);
				dispatchService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交调度信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dispatchService.submitDispatch(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "调度失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Dispatch c = dispatchService.get(new Long(id));
			if (Constant.ENABLED.equals(c.getEffective())) {
				dispatchService.loseEffective(c);
			}
		}
		return SUCCESS;
	}
	
	public String print() {
		dispatch = dispatchService.get(dispatchId);
		Set<DispatchEquip> dispatchEquips = dispatch.getDispatchEquipSet();
		Set<DispatchCompon> dispatchCompons = dispatch.getDispatchComponSet();
		Set<Component> comSet = new HashSet<Component>(0);
		DispatchEquip dispatchEquip = null;
		if (!dispatchEquips.isEmpty()) {
			dispatchEquip = dispatchEquips.iterator().next();
			CodeServiceImpl.translate(dispatchEquip.getEquipment());
		} else {
			dispatchEquip = new DispatchEquip();
			dispatchEquip.setEquipment(new Equipment());
		}
		for(DispatchEquip de : dispatchEquips) {
			Component c =new Component();
			c.setEquipVenderName(de.getEquipment().getEquipVender());
			c.setComponSpecificName(de.getEquipment().getEquipSpecificName());
			c.setComponSerial(de.getEquipment().getEquipSerial());
			c.setComponGenericName(null);
			c.setCalculate(null);
			c.setInuseCounts(null);
			c.setStoreName(de.getRemark());
			comSet.add(c);
		}
		for(DispatchCompon dc : dispatchCompons) {
			CodeServiceImpl.translate(dc.getComponent());
			Component c = dc.getComponent();
			c.setComponSerial(null);
			c.setInuseCounts(dc.getIniCounts());
			c.setStoreName(dc.getRemark());
			comSet.add(c);
		}
		dispatch.setProvidedDate(DateUtil.changeObj2DateStr(dispatch.getProvidedDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("dispatch", dispatch);
		getRequest().setAttribute("dispatchComponentSet", comSet);
		return "printForm";
	}
	
	public String rollback() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_dispatchId_L_EQ", id);
			filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
			List<LogisticsTransport> list = logisticsTransportService.getAll(filter);
			if(list!=null && list.size()>0) {
				throw new BusinessException("该发货调度已做过装车物流无法回退！");
			}else {
				formApproveService.rollbackRecord(new Long(id), "DISPATCH");
				Dispatch dispatch = dispatchService.get(new Long(id));
				dispatch.setApplyforState(Status.DispatchApplyfor.waitSubmit);
				ContractLease contractLease = contractLeaseService.get(dispatch.getRelateId());
				contractLease.setApplyforState(Status.ContractApplyfor.waitDispatch); 
				Project project = projectService.get(contractLease.getProjectId());
				if (Status.Project.finished.equals(project.getStatus())) {
					project.setStatus(Status.Project.conclude);
					projectService.save(project);
				}
				contractLeaseService.save(contractLease);
				dispatchService.save(dispatch);
			}
		}
		return SUCCESS;
	}

}
