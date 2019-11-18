/**
 *====================================================
 * 文件名称: TruckPlanAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.emms.model.TruckPlan;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;
import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.service.TruckPlanService;

/**
 * @ClassName: TruckPlanAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:50:04
 */
public class TruckPlanAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TruckPlan truckPlan;

	@Getter
	@Setter
	private Long truckPlanId;

	@Resource
	private TruckPlanService truckPlanService;

	@Resource
	private CodeService codeService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TruckPlan> list = truckPlanService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		TruckPlan c = truckPlanService.getTranslate(truckPlanId);
		/*for(ContractArrangeEquipment e : c.getContractArrangeEquipmentSet()){
			e.setEquipGeneric(codeService.getCode("equipGeneric",e.getEquipGenericName()));
            e.setEquipSpecific(codeService.getCode("equipSpecific",e.getEquipSpecificName()));
		}*/
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新业务申请信息")
	public String save() {
		if (truckPlan.getTruckPlanId() == null) {
			truckPlan.setApplyforState(Status.TruckPlanApplyfor.waitSubmit);
		} else {
			TruckPlan a = truckPlanService.editLoad(truckPlan);
			truckPlan.setApplyforState(a.getApplyforState());
		}
		truckPlanService.saveOrMergeForEdit(truckPlan);
		this.jsonString = "{success:true,applyforId:" + truckPlan.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除业务申请")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TruckPlan truckPlan = truckPlanService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(truckPlan.getApplyforState())) {
				truckPlanService.remove(truckPlan);
			}
		}
		return SUCCESS;
	}


	@ActionLog(description = "提交业务申请")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TruckPlan p = truckPlanService.get(new Long(id));
			if (Status.TruckPlanApplyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.TruckPlanApplyfor.waitApprove);
				truckPlanService.save(p);
//				truckPlanService.sendSms(p);
			}
		}
		return SUCCESS;
	}

//	public String print() {
//		contractArrange = contractArrangeService.getTranslate(arrangeId);
//		return getRequest().getParameter("formpage");
//	}

}
