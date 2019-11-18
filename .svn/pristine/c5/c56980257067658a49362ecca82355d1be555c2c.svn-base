package com.knight.emms.web.action;

import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.LeaseBlockUp;
import com.knight.emms.model.LeaseContract;
import com.knight.emms.service.LeaseBlockUpService;
import com.knight.emms.service.LeaseContractService;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class LeaseBlockUpAction extends ExportBaseAction<LeaseBlockUp> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private LeaseBlockUp leaseBlockUp;
	
	@Getter
	@Setter
	private Long blockId;
	
	@Resource
	private LeaseBlockUpService leaseBlockUpService;
	
	@Resource
	private LeaseContractService leaseContractService;
	
	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 6:
			return ((LeaseContract) value).getLeaseIdentifier();
		case 7:
			return ((LeaseContract) value).getProject().getProjectName();
		case 8:
			return ((LeaseContract) value).getLeaseUnit();
		default:
			return null;
		}
	}
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LeaseBlockUp> list = leaseBlockUpService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String load() {
		LeaseBlockUp c = leaseBlockUpService.getTranslateFull(blockId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新报停申请")
	public String save() {
		leaseBlockUp.setStatus(Constant.DISENABLED);
		leaseBlockUp.setDelFlag(Constant.ENABLED);
		leaseBlockUpService.saveOrUpdate(leaseBlockUp);
		return SUCCESS;
	}
	
	private List<Map<String,Object>> caculation(String startDate,String endDate,Long leaseId,int days,String backOff) {
		LeaseContract lc = leaseContractService.getTranslate(leaseId);
		String sql="";
		if("1".equals(backOff)) {//否
			sql = "settle.lease_blockup_fee";
		}else if("0".equals(backOff)) {//是
			sql = "settle.lease_blockup_fee_backOff";
		}else{
			throw new BusinessException("【倒扣租金】 取值异常！");
		}
		List<Map<String,Object>> list = leaseBlockUpService.queryByScript(sql,startDate,endDate,leaseId,days); 
		BigDecimal leaseBlockUpFee = (BigDecimal)list.get(0).get("totalAmount")==null? BigDecimal.ZERO :(BigDecimal)list.get(0).get("totalAmount");
		BigDecimal rentalAmount = leaseBlockUpFee.multiply(lc.getDiscountRentalRate()==null? BigDecimal.ZERO :new BigDecimal(lc.getDiscountRentalRate()));
		BigDecimal totalAmount = leaseBlockUpFee.subtract(rentalAmount);
		List<Map<String,Object>> list2  = new ArrayList<Map<String,Object>>();
		Map<String,Object> map = null;
		map = new HashMap<String, Object>();
		map.put("item", "报停费用");
		map.put("amount", new DecimalFormat("#.00").format(leaseBlockUpFee));
		list2.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "优惠费用");
		map.put("amount", new DecimalFormat("#.00").format(rentalAmount));
		list2.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "本期结算合计");
		map.put("amount", new DecimalFormat("#.00").format(totalAmount));
		list2.add(map);
		
		//计算内部报停费用
		BigDecimal insideBlockUpFee = (BigDecimal)list.get(0).get("totalAmount_inside")==null? BigDecimal.ZERO :(BigDecimal)list.get(0).get("totalAmount_inside");
		BigDecimal insideRentalAmount = insideBlockUpFee.multiply(lc.getDiscountRentalRate()==null? BigDecimal.ZERO :new BigDecimal(lc.getDiscountRentalRate()));
		BigDecimal insideTotalAmount = insideBlockUpFee.subtract(rentalAmount);
		map = new HashMap<String, Object>();
		map.put("item", "报停费用");
		map.put("amount", new DecimalFormat("#.00").format(insideBlockUpFee));
		list2.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "优惠费用");
		map.put("amount", new DecimalFormat("#.00").format(insideRentalAmount));
		list2.add(map);
		map = new HashMap<String, Object>();
		map.put("item", "本期结算合计");
		map.put("amount", new DecimalFormat("#.00").format(insideTotalAmount));
		list2.add(map);
		return list2;
	}
	
	@ActionLog(description = "租借报停清单")
	public String caculate() {
		Long leaseId = new Long(getRequest().getParameter("leaseId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String accountingMethod = getRequest().getParameter("accountingMethod"); //算头不算尾
		String backOff = getRequest().getParameter("backOff"); //倒扣租金    否：1，是：0
		int days = 1;
		if("0".equals(accountingMethod)||"1".equals(accountingMethod)) {
			days = 1;
		}else if("2".equals(accountingMethod)) {
			days = 2;
		}else if("3".equals(accountingMethod)) {
			days = 0;
		}
		List<Map<String,Object>> list = this.caculation(startDate,endDate,leaseId,days,backOff);
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "删除报停申请")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	LeaseBlockUp P = leaseBlockUpService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
        	leaseBlockUpService.update(P);
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");		
		for (String id : ids) {
			LeaseBlockUp leaseBlockUp = leaseBlockUpService.get(new Long(id));
			if (Constant.DISENABLED.equals(leaseBlockUp.getStatus())) {
				leaseBlockUp.setStatus(Constant.ENABLED);
				leaseBlockUpService.save(leaseBlockUp);
			}
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseBlockUp leaseBlockUp = leaseBlockUpService.get(new Long(id));
			if (Constant.ENABLED.equals(leaseBlockUp.getStatus())) {
				leaseBlockUp.setStatus(Constant.DISENABLED);
				leaseBlockUpService.save(leaseBlockUp);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "打印报停申请单")
	public String printForm() {
		LeaseBlockUp b = leaseBlockUpService.getTranslateFull(blockId);
		getRequest().setAttribute("leaseBlockUp", b);
		return "printForm";
	}
	
	//TODO  LEASE_ID
	@ActionLog(description = "批量保存或更新周材结算")
	public String multiSave() {
		Long startTime = System.currentTimeMillis();
		String leaseIds = getRequest().getParameter("leaseIds");
		String backOff = getRequest().getParameter("backOff");
		String[] ids = leaseIds.replace("[","").replace("]","").split(",");
		int days = 1;
		int count = 0;
		StringBuffer str = new StringBuffer("批量新增").append(ids.length).append("个合同，");
		try {
			for(String id : ids){
				LeaseBlockUp cr =  new LeaseBlockUp();
				LeaseContract cm = leaseContractService.getTranslate(new Long(id));
				if("0".equals(cm.getAccountingMethod())||"1".equals(cm.getAccountingMethod())) {
					days = 1;
				}else if("2".equals(cm.getAccountingMethod())) {
					days = 2;
				}else if("3".equals(cm.getAccountingMethod())) {
					days = 0;
				}
				cr.setStatus(Constant.DISENABLED);
				cr.setDelFlag(Constant.ENABLED);
				cr.setApplyDate(leaseBlockUp.getApplyDate());
				cr.setStartDate(leaseBlockUp.getStartDate());
				cr.setEndDate(leaseBlockUp.getEndDate());
				cr.setBlockTitle(leaseBlockUp.getBlockTitle());
				cr.setBackOff(leaseBlockUp.getBackOff());
				cr.setUserId(leaseBlockUp.getUserId());
				cr.setUserName(leaseBlockUp.getUserName());
				cr.setLeaseContract(cm);
				cr.setTranportCaculateType(cm.getAccountingMethod());
				cr.setCaculateRule(leaseBlockUp.getCaculateRule());
				List<Map<String,Object>> list = this.caculation(leaseBlockUp.getStartDate(),leaseBlockUp.getEndDate(),cm.getLeaseId(),days,backOff);
				cr.setSettledAmount(list.get(2).get("amount").toString());
				cr.setInsideAmount(list.get(5).get("amount").toString());
				cr.setLeaseBlockUpDetails("["
						+list.get(0).toString()+","
						+list.get(1).toString()+","
						+list.get(2).toString()
						+"]");
				cr.setInsideBlockUpDetails("["
						+list.get(3).toString()+","
						+list.get(4).toString()+","
						+list.get(5).toString()
						+"]");
				leaseBlockUpService.saveOrUpdate(cr);
				count++;
			}
		} catch(Exception e) {
			str.append("成功").append(count).append("个;失败").append(ids.length-count).append("个");
			throw new BusinessException(str.toString());
		} 
		
		Long endTime = System.currentTimeMillis();
		if(endTime-startTime>30000&&(count+"").equals(ids.length+"")) {
			str.append("成功").append(count).append("个");
			try {
				OutputStream out = getResponse().getOutputStream();
				out.write(("{\"success\":true,\"msg\":\"" + str + "\"}").getBytes("UTF-8"));
				out.flush();
				out.close();
			} catch (Exception e) {
				logger.error("", e);
			}
		}
		return SUCCESS;
	}
	//费用清单
	public String getDetail() {
		Long leaseId = new Long(getRequest().getParameter("leaseId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String tranportCaculateType = getRequest().getParameter("tranportCaculateType"); //算头不算尾
		int days = 1;
		
		List<Map<String, Object>> 	amountList = leaseBlockUpService.queryByScript("settle.lease_blockup_list",startDate,endDate,leaseId,days);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String getInsideDetail() {
		Long leaseId = new Long(getRequest().getParameter("leaseId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		String tranportCaculateType = getRequest().getParameter("tranportCaculateType"); //算头不算尾
		int days = 1;
		
		List<Map<String, Object>> 	amountList = leaseBlockUpService.queryByScript("settle.lease_blockup_list_inside",startDate,endDate,leaseId,days);
		
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(amountList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
