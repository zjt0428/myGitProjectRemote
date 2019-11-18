
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.AllocationDepot;
import com.knight.emms.service.AllocationDepotService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: AllocationDepotAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class AllocationDepotAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AllocationDepot allocationDepot;

	@Setter
	@Getter
	private Long allocationId;

	@Resource
	private AllocationDepotService allocationDepotService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AllocationDepot> list = allocationDepotService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		allocationDepot = allocationDepotService.getTranslateFull(allocationId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(allocationDepot, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新项目调拨信息")
	public String save() {
		if (allocationDepot.getAllocationId() == null) {
			allocationDepotService.saveCreate(allocationDepot);
		} else {
			AllocationDepot p = allocationDepotService.editLoad(allocationDepot);
			allocationDepot.setAllocationSerial(p.getAllocationSerial());
			allocationDepot.setApplyforState(p.getApplyforState());
			allocationDepot.setDelFlag(p.getDelFlag()); 
			allocationDepot.setSubAllocation();
			allocationDepotService.merge(allocationDepot);
		}
		this.jsonString = "{success:true,applyforId:" + allocationDepot.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除调拨清单信息")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			allocationDepotService.deletedDetail(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交项目调拨信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			allocationDepotService.submitAllocation(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除调拨信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AllocationDepot c = allocationDepotService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(c.getApplyforState())) {
				c.setDelFlag(Constant.DISENABLED);
				allocationDepotService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印仓库调拨")
	public String printForm() {
		AllocationDepot ad = allocationDepotService.getTranslateFull(allocationId);
		ad.setAllocationDate(DateUtil.changeObj2DateStr(ad.getAllocationDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("allocationDepot", ad);
		return "printForm";
	}
}
