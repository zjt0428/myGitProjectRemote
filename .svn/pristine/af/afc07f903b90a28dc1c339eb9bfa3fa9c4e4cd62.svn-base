
package com.knight.emms.web.action;
import java.math.BigDecimal;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.xwork.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.LaborPay;
import com.knight.emms.model.LaborPayDetail;
import com.knight.emms.model.LaborSettle;
import com.knight.emms.service.LaborPayService;
import com.knight.emms.service.LaborSettleService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LaborPayAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class LaborPayAction  extends ExportBaseAction<LaborPay> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private LaborPay laborPay;
	
	@Getter
	@Setter
	private LaborPayDetail laborPayDetail;

	@Setter
	@Getter
	private Long laborPayId;
	
	@Resource
	private LaborPayService laborPayService;
	
	@Resource
	private LaborSettleService laborSettleService;

	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
		List<LaborPay> list = laborPayService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "保存或更新劳务支付信息")
	public String save(){
		if(laborPay.getLaborPayId()==null){
			laborPay.setDelFlag(Constant.ENABLED);
			laborPay.setPayState(Status.payState.unpaid);
			laborPay.setCreateDate(DateUtil.getCurrentLinkTimeStr());
			if(laborPay.getPaidAmount() == laborPay.getCopeAmount()){
				laborPay.setPayState(Status.payState.paid);
				laborPay.setEndPayDate(DateUtil.getCurrentLinkTimeStr());
			}else{
				laborPay.setPayState(Status.payState.partPay);
				laborPay.setPeriodPayDate(DateUtil.getCurrentLinkTimeStr());
			}
		}else{
			LaborPay lp = laborPayService.get(laborPay.getLaborPayId());
			laborPay.setDelFlag(lp.getDelFlag());
			if(laborPay.getPendingAmount().compareTo(BigDecimal.ZERO)==0){
				laborPay.setPayState(Status.payState.paid);
				laborPay.setEndPayDate(DateUtil.getCurrentLinkTimeStr());
				laborPay.setPeriodPayDate(lp.getPeriodPayDate());
			}else{
				laborPay.setPayState(Status.payState.partPay);
				if(StringUtils.isBlank(lp.getPeriodPayDate())){
					laborPay.setPeriodPayDate(DateUtil.getCurrentLinkTimeStr());
				}else{
					laborPay.setPeriodPayDate(lp.getPeriodPayDate());
				}
			}
		}
		laborPayService.saveOrMerge(laborPay);
		return SUCCESS;
	}
	
	/**加载支付单明细*/
	public String load(){
		laborPay = laborPayService.getTranslateFull(laborPayId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(laborPay, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**删除支付单*/
	public String multiDel(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			LaborPay lp = laborPayService.get(new Long(id));
			lp.setDelFlag(Constant.DISENABLED);
			laborPayService.update(lp);
			LaborSettle ls =  laborSettleService.get(lp.getLaborSettId());
			ls.setPaidAmount(BigDecimal.valueOf(0.00));
			ls.setPayState(Status.payState.unfinished);
			laborSettleService.update(ls);
		}
		return SUCCESS;
	}
	
}
