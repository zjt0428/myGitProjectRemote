/**
 *====================================================
 * 文件名称: EquipmentDiaryAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.dao.OperatorSalaryStatementDao;
import com.knight.emms.dao.SafetyMonitorSettleStatementDao;
import com.knight.emms.dao.SettleEquipBriefDao;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.OperatorSalaryStatement;
import com.knight.emms.model.SafetyMonitorSettleStatement;
import com.knight.emms.model.SettleContract;
import com.knight.emms.model.SettleEquipBrief;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.SettleContractService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipmentDiaryAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:39:21
 */
public class EquipmentDiaryAction extends ExportBaseAction<EquipDiary> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipDiary equipDiary;

	@Setter
	@Getter
	private Long equipDiaryId;

    @javax.annotation.Resource
    private com.knight.emms.service.EquipDiaryService equipDiaryService;
    
    @Resource
    private SettleContractService settleContractService;
    
    @Resource
    private SettleEquipBriefDao settleEquipBriefDao;
    
    @Resource
    private SafetyMonitorSettleStatementDao safetyMonitorSettleStatementDao;
    
    @Resource
    private OperatorSalaryStatementDao operatorSalaryStatementDao;
    
    @Resource
    private EquipmentService equipmentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipDiary> list = equipDiaryService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, filter.getPagingBean().isLimitSize()));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除设备调配计划信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipDiary c = equipDiaryService.get(new Long(id));
			if (Constant.DISENABLED.equals(c.getActive())) {
				equipDiaryService.remove(c);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "启用日+1")
	public String newList() {
		String a = getRequest().getParameter("no");
		QueryFilter filter = new QueryFilter();
		QueryFilter filter1 = new QueryFilter();
		filter.addConjunctFilter("Q_contractId_L_EQ", getRequest().getParameter("contractId"));
		filter.addConjunctFilter("Q_effective_S_EQ", "1");
		filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter.addSorted("settleId", "Desc");
		List<SettleContract> list = settleContractService.queryTranslateAll(filter);
		if(list.size()!=0){
			filter1.addConjunctFilter("Q_settleId_L_EQ", String.valueOf(list.get(0).getSettleId()));
			if(a.equals("1")){
				List<SettleEquipBrief> newList = settleEquipBriefDao.getAll(filter1);
				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter1.getPagingBean().getTotalItems()).append(",result:");
				buff.append(GsonUtil.toJson(newList, filter.getPagingBean().isLimitSize()));
				buff.append("}");
				this.jsonString = buff.toString();
			}else if(a.equals("2")){
				List<SafetyMonitorSettleStatement> newList = safetyMonitorSettleStatementDao.getAll(filter1);
				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter1.getPagingBean().getTotalItems()).append(",result:");
				buff.append(GsonUtil.toJson(newList, filter.getPagingBean().isLimitSize()));
				buff.append("}");
				this.jsonString = buff.toString();
			}else {
				filter1.addConjunctFilter("Q_settleId_L_EQ", String.valueOf(list.get(0).getSettleId()));
				List<OperatorSalaryStatement> newList = operatorSalaryStatementDao.getAll(filter1);
				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter1.getPagingBean().getTotalItems()).append(",result:");
				buff.append(GsonUtil.toJson(newList, filter.getPagingBean().isLimitSize()));
				buff.append("}");
				this.jsonString = buff.toString();
			}
		}else {
			String str = "{success:true,'totalCounts':0,result:[]}";
			this.jsonString = str;
		}
		return SUCCESS;
	}
	
	public String getLastSettleDate() {
		String tabFlag = getRequest().getParameter("tabFlag");
		String contractIds = getRequest().getParameter("contractIds");
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		if("SettleEquipBrief".equals(tabFlag)) {
			list = equipDiaryService.queryByScript("settle.last_end_settle_date_1", contractIds);
		}else if("OperatorSalaryStatement".equals(tabFlag)) {
			list = equipDiaryService.queryByScript("settle.last_end_settle_date_2", contractIds);
		}else if("SafetyMonitorSettleStatement".equals(tabFlag)) {
			list = equipDiaryService.queryByScript("settle.last_end_settle_date_3", contractIds);
		}
		StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
}
