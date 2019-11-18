/**
 *====================================================
 * 文件名称: ContractArrangeAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ContractArrange;
import com.knight.emms.model.ContractArrangeEquipment;
import com.knight.emms.model.ContractLease;
import com.knight.emms.service.ContractArrangeService;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.FormApproveService;
import com.knight.system.service.CodeService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ContractArrangeAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:50:04
 */
public class ContractArrangeAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ContractArrange contractArrange;

	@Getter
	@Setter
	private Long arrangeId;

	@Resource
	private ContractArrangeService contractArrangeService;

	@Resource
	private CodeService codeService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	@Resource
	private FormApproveService formApproveService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		//设备档案关联单据
		String equipId = getRequest().getParameter("equipIds");
		if(equipId!=null) {
			List<Map<String, Object>> calist = contractArrangeService.queryByScript("dispatch.equip_contract_arrange_info", equipId);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<calist.size();i++) {
				sb.append(String.valueOf(calist.get(i).get("ARRANGE_ID"))+",");
			}
			if(sb.length()>0) {
				String sa = sb.substring(0, sb.length()-1).toString();
				filter.addValuesDisjunctFilter("QVO_arrangeId_L_EQ", sa);
			} else {
				return SUCCESS;
			}
		}
		List<ContractArrange> list = contractArrangeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ContractArrange c = contractArrangeService.getTranslate(arrangeId);
		for(ContractArrangeEquipment e : c.getContractArrangeEquipmentSet()){
			e.setEquipGeneric(codeService.getCode("equipGeneric",e.getEquipGenericName()));
            e.setEquipSpecific(codeService.getCode("equipSpecific",e.getEquipSpecificName()));
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新业务申请信息")
	public String save() {
		if (contractArrange.getArrangeId() == null) {
			contractArrange.setApplyforState(Status.Applyfor.waitSubmit);
		} else {
			ContractArrange a = contractArrangeService.editLoad(contractArrange);
			contractArrange.setApplyforState(a.getApplyforState());
		}
		contractArrangeService.saveOrMergeForEdit(contractArrange);
		this.jsonString = "{success:true,applyforId:" + contractArrange.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除业务申请")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractArrange arrange = contractArrangeService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(arrange.getApplyforState())) {
				contractArrangeService.remove(arrange);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除业务关联设备")
	public String multiDelArrangeEquipment() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractArrangeService.deleteEquipment(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交业务申请")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractArrange p = contractArrangeService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				contractArrangeService.save(p);
				contractArrangeService.sendSms(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		contractArrange = contractArrangeService.getTranslate(arrangeId);
		return getRequest().getParameter("formpage");
	}

	public String rollback() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_arrangeId_L_EQ", id);
			filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
			List<ContractLease> list = contractLeaseService.getAll(filter);
			if(list!=null && list.size()>0) {
				throw new BusinessException("该业务申请已做过合同无法回退！");
			}else {
				formApproveService.rollbackRecord(new Long(id), "CONTRACT_ARRANGE");
				ContractArrange contractArrange = contractArrangeService.get(new Long(id));
				contractArrange.setApplyforState(Status.Applyfor.waitSubmit);
				contractArrangeService.save(contractArrange);
			}
		}
		return SUCCESS;
	}
}
