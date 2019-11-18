package com.knight.emms.web.action;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.ClosedSettleInfo;
import com.knight.emms.model.CloseSettleLog;
import com.knight.emms.service.ClosedSettleInfoService;
import com.knight.emms.service.CloseSettleLogService;
import com.knight.emms.service.SettleContractService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

public class ClosedSettleInfoAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private ClosedSettleInfo closedSettleInfo;
	
	@Getter
	@Setter
	private Long closeSettleId;
	
	@Resource
	private CloseSettleLogService closeSettleLogService;
	
	@Resource
	private ClosedSettleInfoService closedSettleInfoService;
	
	@Resource
	private SettleContractService settleContractService;
	
	//关账
	public String closed(){
		//上个月份
		Date oldDate = DateUtil.transpositionDate(DateUtil.changeStrToDate(closedSettleInfo.getMonths()),  Calendar.MONTH, -1);
		String oldmonth = DateUtil.changeDateToStr(oldDate, DateUtil.LINK_DISPLAY_DATE_MONTH);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_months_S_EQ", oldmonth);
		List<ClosedSettleInfo> list = closedSettleInfoService.getAll(filter);
		//查出上个月的关账信息
		if(list!=null && list.size()>0){
			ClosedSettleInfo csc= list.get(0);
			if(csc.getClosedStatus().equals(Constant.DISENABLED)){
				throw new BusinessException("请先关账上个月！");
			}else{
				List<Map<String, Object>> checks = closedSettleInfoService.queryByScript("settle.before_closed_settle_check", closedSettleInfo.getMonths());
				if(checks!=null && checks.size()>0){
					throw new BusinessException("存在未生效的单据，请处理后再关账！");
				}
				//查出该月份的关账信息
				QueryFilter query = new QueryFilter();
				query.addConjunctFilter("Q_months_S_EQ", closedSettleInfo.getMonths());
				List<ClosedSettleInfo> l = closedSettleInfoService.getAll(query);
				if(l!=null && l.size()>0){
					ClosedSettleInfo cs = l.get(0);
					cs.setClosedStatus(Constant.ENABLED);
					closedSettleInfoService.update(cs);
				}else{
					ClosedSettleInfo c = new ClosedSettleInfo();
					c.setClosedDate(DateUtil.getCurrentLinkTimeStr());
					c.setClosedStatus(Constant.ENABLED);
					c.setMonths(closedSettleInfo.getMonths());
					closedSettleInfoService.save(c);
					
				}
				//修改结算管理的关账状态
				settleContractService.editClosedStatus(closedSettleInfo.getMonths(),Constant.ENABLED);
				CloseSettleLog closeSettleLog = new CloseSettleLog();
				closeSettleLog.setProvidedDate(DateUtil.getCurrentLinkTimeStr());
				closeSettleLog.setProvidedId(ApplicationContainer.getCurrentUserId());
				closeSettleLog.setClosedStatus(Constant.ENABLED);
				closeSettleLog.setMonths(closedSettleInfo.getMonths());
				closeSettleLogService.save(closeSettleLog);
			}
		}else{
			ClosedSettleInfo csc = new ClosedSettleInfo();
			csc.setClosedDate(DateUtil.getCurrentLinkTimeStr());
			csc.setClosedStatus(Constant.DISENABLED);
			csc.setMonths(oldmonth);
			closedSettleInfoService.save(csc);
			throw new BusinessException("请先关账上个月！");
		}
		return SUCCESS;
	}
	
	public String maxValue(){
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter.addSorted("closeId", QueryFilter.ORDER_DESC);
		List<CloseSettleLog> list = closeSettleLogService.getAll(filter);
		CloseSettleLog csl = list.get(0);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(csl, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String list(){
		String years = getRequest().getParameter("years");
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_months_S_LK", years);
		filter.getPagingBean().setPageSize(12);
		List<ClosedSettleInfo> list = closedSettleInfoService.getAll(filter);
		if(list==null || list.size()<1){
			for(int i=1;i<=12;i++){
				String s = null;
				if(i<10){
					s = years+"-0"+i;
				}else{
					s = years+"-"+i;
				}
				ClosedSettleInfo csc = new ClosedSettleInfo();
				csc.setMonths(s);
				csc.setClosedDate(DateUtil.getCurrentLinkTimeStr());
				csc.setClosedStatus(Constant.DISENABLED);
				closedSettleInfoService.save(csc);
				list.add(csc);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	//反关账
	public String open(){
		//下个月份
		Date oldDate = DateUtil.transpositionDate(DateUtil.changeStrToDate(closedSettleInfo.getMonths()),  Calendar.MONTH, 1);
		String oldmonth = DateUtil.changeDateToStr(oldDate, DateUtil.LINK_DISPLAY_DATE_MONTH);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_months_S_EQ", oldmonth);
		List<ClosedSettleInfo> list = closedSettleInfoService.getAll(filter);
		//查出上个月的关账信息
		if(list!=null && list.size()>0){
			ClosedSettleInfo csc= list.get(0);
			if(csc.getClosedStatus().equals(Constant.ENABLED)){
				throw new BusinessException("请先反关账下个月！");
			}else{
				//查出该月份的关账信息
				QueryFilter query = new QueryFilter();
				query.addConjunctFilter("Q_months_S_EQ", closedSettleInfo.getMonths());
				List<ClosedSettleInfo> l = closedSettleInfoService.getAll(query);
				if(l!=null && l.size()>0){
					ClosedSettleInfo cs = l.get(0);
					cs.setClosedStatus(Constant.DISENABLED);
					closedSettleInfoService.update(cs);
				}else{
					ClosedSettleInfo c = new ClosedSettleInfo();
					c.setClosedDate(DateUtil.getCurrentLinkTimeStr());
					c.setClosedStatus(Constant.DISENABLED);
					c.setMonths(closedSettleInfo.getMonths());
					closedSettleInfoService.save(c);
				}
				//修改结算管理的关账状态
				settleContractService.editClosedStatus(closedSettleInfo.getMonths(),Constant.DISENABLED);
				CloseSettleLog closeSettleLog = new CloseSettleLog();
				closeSettleLog.setProvidedDate(DateUtil.getCurrentLinkTimeStr());
				closeSettleLog.setProvidedId(ApplicationContainer.getCurrentUserId());
				closeSettleLog.setClosedStatus(Constant.DISENABLED);
				closeSettleLog.setMonths(closedSettleInfo.getMonths());
				closeSettleLogService.save(closeSettleLog);
			}
		}
		return SUCCESS;
	}
}
