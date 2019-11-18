
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
import com.knight.emms.model.DepotTransfers;
import com.knight.emms.model.TransfersEquipDetail;
import com.knight.emms.service.DepotTransfersService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: AllocationDepotAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class DepotTransfersAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private DepotTransfers depotTransfers;

	@Setter
	@Getter
	private Long depottId;

	@Resource
	private DepotTransfersService depotTransfersService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<DepotTransfers> list = depotTransfersService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		depotTransfers = depotTransfersService.getTranslateFull(depottId);
		for(TransfersEquipDetail t : depotTransfers.getTransfersEquipDetailSet()){
			CodeServiceImpl.translate(t.getEquipment());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(depotTransfers, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新项目调拨信息")
	public String save() {
		if (depotTransfers.getDepottId() == null) {
			depotTransfers.setDelFlag("1");
			depotTransfersService.saveCreate(depotTransfers);
		} else {
			DepotTransfers p = depotTransfersService.editLoad(depotTransfers);
			depotTransfers.setTransfersNum(p.getTransfersNum());
			depotTransfers.setApplyforState(p.getApplyforState());
			depotTransfers.setDelFlag(p.getDelFlag()); 
			depotTransfers.setSubAllocation();
			depotTransfersService.merge(depotTransfers);
		}
		this.jsonString = "{success:true,applyforId:" + depotTransfers.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除配件调拨清单信息")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			depotTransfersService.deletedDetail(new Long(id));
		}
		return SUCCESS;
	}

	/*删除设备调拨清单信息**/
	public String multiDelEquip(){
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			depotTransfersService.deleteEquipDetail(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交项目调拨信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			depotTransfersService.submitDepot(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除调拨信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			DepotTransfers c = depotTransfersService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(c.getApplyforState())) {   
				c.setDelFlag(Constant.DISENABLED);
				depotTransfersService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印仓库调拨")
	public String printForm() {
		DepotTransfers ad = depotTransfersService.getTranslateFull(depottId);
		ad.setTransfersDate(DateUtil.changeObj2DateStr(ad.getTransfersDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("depotTransfers", ad);
		return "printForm";
	}
}
