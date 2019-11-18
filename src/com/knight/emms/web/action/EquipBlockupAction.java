/**
 *====================================================
 * 文件名称: EquipBlockupAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.HashMap;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipBlockup;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipWarehouse;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.EquipBlockupService;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipWarehouseService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.support.EmmsApplicationSupport;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipBlockupAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-23 上午7:08:18
 */
public class EquipBlockupAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipBlockup equipBlockup;
	

	@Getter
	@Setter
	private Long blockupId;
	
	@Getter
	@Setter
	private Boolean isScraped;

	@Resource
	private EquipBlockupService equipBlockupService;
	
	@Resource
	private EquipmentService equipmentService;

	@Resource
	private EquipFlowService equipFlowService;
	
	@Resource
	private EquipWarehouseService equipWarehouseService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipBlockup> list = equipBlockupService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipDismantleStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipBlockup p = equipBlockupService.getTranslateFull(blockupId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, false, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新停用信息")
	public String save() {
		if(equipBlockup.getIsScraped()){
			EquipWarehouse	equipWarehouse =	equipWarehouseService.get(equipBlockup.getWarehouseId());
			equipWarehouse.setIsScraped(Status.ISSCRAPED.scraped);
			equipWarehouseService.merge(equipWarehouse);
		}
		if (equipBlockup.getBlockupId() == null) {
			super.isCreateFileAttach = true;
		}
		if(equipBlockup.getEquipFlow().getEquipId() != null){
			Equipment e = equipmentService.get(equipBlockup.getEquipFlow().getEquipId());
			e.setStatus("4");
			e.setBusinessStatus("7");
			e.setStatusDate(DateUtil.getCurrentDate());
			equipmentService.merge(e);
		}
		/*if(equipBlockup.getBlockupType().equals("1")) {
			
		}else if(equipBlockup.getBlockupType().equals("0")){
			if(equipBlockup.getEquipFlow().getEquipId() != null){
				Equipment e = equipmentService.get(equipBlockup.getEquipFlow().getEquipId());
				e.setStatus("4");
				e.setBusinessStatus("7");
				e.setStatusDate(DateUtil.getCurrentDate());
				equipmentService.merge(e);
			}
		}*/
		equipBlockupService.saveOrUpdate(equipBlockup);
		super.createFileAttach(equipBlockup.getBlockupId());
		return SUCCESS;
	}

	@ActionLog(description = "恢复停用信息")
	public String multiActivate() {
		String[] ids = getRequest().getParameter("ids").replaceAll("[|]", "").split(",");
		String reactivateDate = getRequest().getParameter("reactivateDate");
		for (String id : ids) {
			equipBlockupService.activate(new Long(id), reactivateDate);
		}
		return SUCCESS;
	}

	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");		
		for (String id : ids) {
			EquipBlockup p = equipBlockupService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				equipBlockupService.effective(p);
			}
		}
		return SUCCESS;
	}

	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipBlockup p = equipBlockupService.get(new Long(id));
			if (Constant.ENABLED.equals(p.getEffective())) {
				equipBlockupService.loseEffective(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		equipBlockup = equipBlockupService.getTranslateFull(blockupId);
		String blockupDate = DateUtil.changeDateToStr(equipBlockup.getBlockupDate(), DateUtil.CN_DISPLAY_DATE_HOUR);
		getRequest().setAttribute("blockupDate", blockupDate);
		String activateDate = DateUtil.changeDateToStr(DateUtil.changeStrToDate(equipBlockup.getEquipFlow().getEquipActivate().getActivateDate()), DateUtil.CN_DISPLAY_DATE);
		getRequest().setAttribute("activateDate", activateDate);
		getRequest().setAttribute("companyName", EmmsApplicationSupport.getAppuserCorpName());
		return getRequest().getParameter("formpage");
	}
	
	@ActionLog(description = "批量新增停用管理信息")
	public String saveBatch() {
		String[] relateIds = equipBlockup.getRelateIds().split(",");
		for(String flowId : relateIds){
			EquipBlockup eb = equipBlockup.clone();
			EquipFlow ef = equipFlowService.get(new Long(flowId));
			if(ef.getEquipId() != null){
				Equipment e = equipmentService.get(ef.getEquipId());
				e.setStatus("4");
				e.setBusinessStatus("7");
				e.setStatusDate(DateUtil.getCurrentDate());
				equipmentService.merge(e);
			}
			eb.setEquipFlow(ef);
			equipBlockupService.saveOrUpdate(eb);
		}
		
		return SUCCESS;
	}
	
	@ActionLog(description = "删除停用信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	EquipBlockup eb = equipBlockupService.get(new Long(id));
        	eb.setDelFlag(Constant.DISENABLED);
        	equipBlockupService.update(eb);
        }
        return SUCCESS;
    }
	
	public String lastAndCurrMonth() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); 
		//获取上个月的第一天
        Calendar c1 = Calendar.getInstance();
        c1.add(Calendar.MONTH, -1);
        c1.set(Calendar.DAY_OF_MONTH,1);
        String firstDay_lastMonth = format.format(c1.getTime());
        
        //获取当前月第一天：
        Calendar c2 = Calendar.getInstance();    
        c2.add(Calendar.MONTH, 0);
        c2.set(Calendar.DAY_OF_MONTH,1);
        String firstDay_currMonth = format.format(c2.getTime());
        
        //获取下个月第一天：
        Calendar c3 = Calendar.getInstance();    
        c3.add(Calendar.MONTH, 1);
        c3.set(Calendar.DAY_OF_MONTH,1);
        String firstDay_nextMonth = format.format(c3.getTime());
        
	    String flowId = getRequest().getParameter("flowId");
	    List<Map<String , Object>> list = equipBlockupService.queryByScript("equipFlow.lastMonth_blockup", flowId,firstDay_lastMonth,firstDay_currMonth);
	    List<Map<String , Object>> currlist = equipBlockupService.queryByScript("equipFlow.currMonth_blockup", flowId,firstDay_currMonth,firstDay_nextMonth);
	    if(currlist.size()>0) {
	    	if(list.size()>0) {
	    		list.get(0).put("currBlockDate", currlist.get(0).get("currBlockDate"));
	    		list.get(0).put("currReactivateDate", currlist.get(0).get("currReactivateDate"));
	    	}else {
	    		Map<String , Object> map = new HashMap<String, Object>();
	    		map.put("currBlockDate", currlist.get(0).get("currBlockDate"));
	    		map.put("currReactivateDate", currlist.get(0).get("currReactivateDate"));
	    	    list.add(map);
	    	}
	    }
	    StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}