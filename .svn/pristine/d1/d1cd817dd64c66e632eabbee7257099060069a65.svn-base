/**
 *====================================================
 * 文件名称: PickupAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.*;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.service.PickupService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.ProjectService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: PickupAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 上午8:40:56
 */
public class PickupAction extends ExportBaseAction<Pickup> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Pickup pickup;
	
	@Resource
	private PractitionerService practitionerService;
	
	@Resource
	private ComponDiaryService componDiaryService;

	@Resource
	private ProjectService projectService;

	@Getter
	@Setter
	private Long pickupId;

	@Resource
	private PickupService pickupService;

	@Override
	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 9:
			return ((Equipment) value).getRecordId();
		case 10:
			return ((Equipment) value).getExwSerial();
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Pickup> list = pickupService.queryTranslateAll(filter);
        for(Pickup p :list){
            QueryFilter filterProject = new QueryFilter();
            filterProject.addConjunctFilter("Q_projectName_S_EQ",p.getProjectName());
            Project pro = projectService.getAll(filterProject).get(0);
            p.setProject(pro);
        }
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Pickup p = pickupService.getTranslateFull(pickupId);
		if (p.getEquipment() == null) {
			p.setEquipment(new Equipment());
		}
        QueryFilter filter = new QueryFilter();
        filter.addConjunctFilter("Q_projectName_S_EQ",p.getProjectName());
        Project pro = projectService.getAll(filter).get(0);
        p.setProject(pro);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新领用信息")
	public String save() {
		if (pickup.getPickupId() == null) {
			pickup.setPickupStatus(Status.Pickup.waiting);
			pickup.setApplyforState(Status.Applyfor.waitSubmit);
			pickup.setDelFlag(Constant.ENABLED);
			if (pickup.getEquipment() == null || pickup.getEquipment().getEquipId() == null) {
				pickup.setEquipment(null);
			}
		} else {
			Pickup p = pickupService.editLoad(pickup);
			pickup.setEquipment(p.getEquipment());
			pickup.setPickupSerial(p.getPickupSerial());
			pickup.setPickupStatus(p.getPickupStatus());
			pickup.setApplyforState(p.getApplyforState());
			pickup.setDelFlag(p.getDelFlag());
		}
		pickupService.saveOrMergeForEdit(pickup);
		this.jsonString = "{success:true,applyforId:" + pickup.getApplyforId() + "}";
		return SUCCESS;
	}

	public String multiDelComponent() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			pickupService.deletedComponent(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除领用信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Pickup p = pickupService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setDelFlag(Constant.DISENABLED);
				pickupService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交领用信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Pickup p = pickupService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				pickupService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "归还领用零配件")
	public String returnComponent() {
		Set<PickupComponent> pickupComponentSet = GsonUtil.fromJson(getRequest().getParameter("returnComponents"), new TypeToken<Set<PickupComponent>>() {});
		Map<Long, PickupComponent> pickupComponents = new HashMap<Long, PickupComponent>();
		if (pickupComponentSet != null) {
			for (PickupComponent p : pickupComponentSet) {
				pickupComponents.put(p.getPickupComponId(), p);
			}
		}
		pickupService.returnPickup(pickupId, pickupComponents);
		return SUCCESS;
	}
	
	@ActionLog(description = "一键审批零配件")
	public String onekeyApprove() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Pickup p = pickupService.get(new Long(id));
				p.setApplyforState(Status.Applyfor.passed);
				p.setPickupStatus("1");
				for (PickupComponent pc : p.getPickupComponentSet()) {
					pc.setStatus(Status.Pickup.execute);
				}
				componDiaryService.startPickupComponDiary(p, p.getPickupComponentSet());
				pickupService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "打印采购单")
	public String printForm() {
		Pickup p = pickupService.getTranslateFull(pickupId);
		p.setPickupSerial(p.getPickupSerial().substring(0, 8)+p.getPickupSerial().substring(8, p.getPickupSerial().length()));
		BigDecimal summary = BigDecimal.ZERO;
		for(PickupComponent pc : p.getPickupComponentSet()){
			summary = summary.add(pc.getSummary());
		}
		getRequest().setAttribute("pickup", p);
		getRequest().setAttribute("summary", summary);
		if(!summary.equals(new BigDecimal("0.00"))&&!summary.equals(BigDecimal.ZERO)){
			getRequest().setAttribute("SUMMARY", BigDecimalUtil.parserDigAmount(summary));
		}else{
			getRequest().setAttribute("SUMMARY", "零圆整");
		}
		AppUser user = ApplicationContainer.getCurrentUser();
		QueryFilter qf = new QueryFilter();
		qf.addConjunctFilter("Q_userId_L_EQ", user.getUserId()+"");
		List<Practitioner> list = practitionerService.getAll(qf);
		if(list.size()>0){
		getRequest().setAttribute("CorpName", list.get(0).getCorpInfo().getCorpName());
		}
//		getRequest().setAttribute("CorpName", user.getDepName());
		return "printForm";
	}

}
