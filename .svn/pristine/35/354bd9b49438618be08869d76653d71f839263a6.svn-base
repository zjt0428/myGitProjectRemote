
package com.knight.emms.web.action;

import java.text.DecimalFormat;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ChargeHandle;
import com.knight.emms.model.TemporaryReturn;
import com.knight.emms.service.TemporaryReturnService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: TemporaryReturnAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenzj
 * @date 2018年3月27日08:50:26
 */
public class TemporaryReturnAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TemporaryReturn temporaryReturn;

	@Getter
	@Setter
	private Long returnId;

	@Resource
	private TemporaryReturnService temporaryReturnService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TemporaryReturn> list = temporaryReturnService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		TemporaryReturn p = temporaryReturnService.getTranslate(returnId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新物流信息")
	public String save() {
		if(temporaryReturn.getReturnId()==null) {
			temporaryReturn.setApplyforState(Status.Applyfor.waitSubmit);
			temporaryReturn.setDelFlag(Constant.ENABLED);
		}else{
			TemporaryReturn t = temporaryReturnService.get(temporaryReturn.getReturnId());
			temporaryReturn.setApplyforState(t.getApplyforState());
			temporaryReturn.setDelFlag(Constant.ENABLED);
		}
		temporaryReturnService.saveOrMergeForEdit(temporaryReturn);
		this.jsonString = "{success:true,applyforId:" + temporaryReturn.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "提交现场装车")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TemporaryReturn p = temporaryReturnService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				temporaryReturnService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除物流清单记录")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			temporaryReturnService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}

	public String multiDelHandle() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			temporaryReturnService.deleteHandle(new Long(id));
		}
		return SUCCESS;
	}

	
	@ActionLog(description = "删除物流信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TemporaryReturn p = temporaryReturnService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			temporaryReturnService.save(p);
		}
		return SUCCESS;
	}


	@ActionLog(description = "打印现场装车清单")
	public String printForm() {
		TemporaryReturn p = temporaryReturnService.getTranslate(returnId);
	
		float cashCost = 0;
		float transferCost = 0;
		float checkCost = 0;
		if(p.getChargeHandleSet().size()>0) {
			for(ChargeHandle cd : p.getChargeHandleSet()) {
				if(cd.getChargeMode().equals("1")){
					cashCost += Float.valueOf(cd.getChargeAmount());
				}
				if(cd.getChargeMode().equals("2")){
					transferCost += Float.valueOf(cd.getChargeAmount());
				}
				if(cd.getChargeMode().equals("3")){
					checkCost += Float.valueOf(cd.getChargeAmount());
				}
				cd.setChargeMode(CodeServiceImpl.fastValue("paymentType",cd.getChargeMode()));
			}
		}
		DecimalFormat decimalFormat=new DecimalFormat("0.00");
		p.setPackageDate(DateUtil.changeObj2DateStr(p.getPackageDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("cashCost", decimalFormat.format(cashCost));
		getRequest().setAttribute("transferCost", decimalFormat.format(transferCost));
		getRequest().setAttribute("checkCost", decimalFormat.format(checkCost));
		getRequest().setAttribute("temporaryReturn", p);
		return "printForm";
	}
	

}
