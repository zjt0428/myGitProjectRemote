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

import java.util.List;

import javax.annotation.Resource;


import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.LaborSettle;
import com.knight.emms.service.LaborSettleService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LaborSettleAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:32:28
 */
public class LaborSettleAction extends ExportBaseAction<LaborSettle> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private LaborSettle laborSettle;

	@Setter
	@Getter
	private Long laborSettId;

	@Resource
	private LaborSettleService laborSettleService;
	

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LaborSettle> list = laborSettleService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "保存或更新劳务结算信息")
	public String save(){
		LaborSettle ls = laborSettleService.get(laborSettle.getLaborSettId());
		ls.setPractiType(laborSettle.getPractiType());
		ls.setDeductions(laborSettle.getDeductions());
		ls.setLaborFree(laborSettle.getLaborFree());
		ls.setTaxPoint(laborSettle.getTaxPoint());
		ls.setRiskFee(laborSettle.getRiskFee());
		ls.setEquipFee(laborSettle.getEquipFee());
		ls.setManagerFee(laborSettle.getManagerFee());
		ls.setPractiFee(laborSettle.getPractiFee());
		laborSettleService.update(ls);
		return SUCCESS;
	}
	
	/**删除结算单*/
	public String multiDel(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			LaborSettle ls = laborSettleService.get(new Long(id));
			ls.setDelFlag(Constant.DISENABLED);
			laborSettleService.update(ls);
		}
		return SUCCESS;
	}
	
	/**提交结算单*/
	public String submit(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			LaborSettle ls = laborSettleService.get(new Long(id));
			ls.setApplyforState(Status.Applyfor.waitApprove);
			laborSettleService.update(ls);
		}
		return SUCCESS;
	}
	
	/**加载结算单明细*/
	public String load(){
		laborSettle = laborSettleService.getTranslateAll(laborSettId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(laborSettle, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
}
