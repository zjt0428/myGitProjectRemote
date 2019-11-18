package com.knight.emms.web.action;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.MaterialsRecycleCountTempDao;
import com.knight.emms.model.BaseDepot;
import com.knight.emms.model.CompensationDamage;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.MaterialsRecycleCountTemp;
import com.knight.emms.model.RecycleManage;
import com.knight.emms.model.RecycleManageFee;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.emms.service.RecycleManageService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

public class RecycleManageAction extends ExportBaseAction<RecycleManage> {

	private static final long serialVersionUID = 1L;
	
	@Getter
    @Setter
    private Long recycleId;

	@Resource
    private RecycleManageService recycleManageService;
	
	@Resource
	private MaterialsRecycleCountTempDao materialsRecycleCountTempDao;
	
	@Getter
    @Setter
	private RecycleManage recycleManage;
	
	@Resource
	private ContractJoinUserService contractJoinUserService;
	
	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 5:
			return ((ContractMaterials) value).getContractSerial();
		case 6:
			return ((ContractMaterials) value).getProjectName();
		case 13:
			return ((BaseDepot) value).getDepotName();
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}
	
	public String list() throws ParseException {
        QueryFilter filter = new QueryFilter(getRequest());
		//项目用户只显示具备合同权限的单据
		if("2".equals(ApplicationContainer.getCurrentUser().getUserType())) {
			String contractIds = contractJoinUserService.concatGrantedContractId(ApplicationContainer.getCurrentUserId());
			filter.addValuesDisjunctFilter("Q_contractMaterials.contractmaId_L_EQ", contractIds);
		}
        List<RecycleManage> list = recycleManageService.queryTranslateAll(filter);
        for(RecycleManage re : list){
        	//时间格式转换
        	if(re.getApplyDate().length()>16){
        		Date date = DateUtil.changeStrToDate(re.getApplyDate());
            	re.setApplyDate(DateUtil.changeDateToStr(date, DateUtil.LINK_DISPLAY_DATE_MINUTE));
        	}
        	if(re.getBaseDepot()==null && re.getRecycleType().equals("3")){
        		BaseDepot baseDepot = new BaseDepot();
                baseDepot.setDepotName("项目调拨");
                re.setBaseDepot(baseDepot);
        	}
        }
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }
	
	public String load() {
		RecycleManage p = recycleManageService.getTranslateFull(recycleId);
		if(p.getApplyDate().length()>16 || p.getRecycleDate().length()>10){
    		Date date = DateUtil.changeStrToDate(p.getApplyDate());
        	p.setApplyDate(DateUtil.changeDateToStr(date, DateUtil.LINK_DISPLAY_DATE_MINUTE));
        	Date date2 = DateUtil.changeStrToDate(p.getRecycleDate());
        	p.setApplyDate(DateUtil.changeDateToStr(date2, DateUtil.LINK_DISPLAY_DATE));
    	}
		if(p.getBaseDepot()==null && p.getRecycleType().equals("3")){
			BaseDepot baseDepot = new BaseDepot();
			baseDepot.setDepotId(Long.valueOf("0"));
            baseDepot.setDepotName("项目调拨");
            p.setBaseDepot(baseDepot);
		}
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }
	
	@ActionLog(description = "新增或更新信息")
    public String save() {
		if(recycleManage.getRecycleId()==null){
			recycleManage.setApplyforState(Status.Applyfor.waitSubmit);
			recycleManage.setDelFlag(Constant.ENABLED);
		}else{
			recycleManage.setApplyforState(Status.Applyfor.waitSubmit);
			recycleManage.setDelFlag(Constant.ENABLED);
		}
		recycleManageService.saveOrMergeForEdit(recycleManage);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(recycleManage.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "提交回收信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			RecycleManage p = recycleManageService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				recycleManageService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "修改回收日期")
	public String changeDate() {
		String recycleId = getRequest().getParameter("recycleId");
		String recycleDate = getRequest().getParameter("recycleDate");

		RecycleManage p = recycleManageService.get(Long.parseLong(recycleId));
		p.setRecycleDate(recycleDate);
		recycleManageService.merge(p);

		return SUCCESS;
	}
	
	@ActionLog(description = "删除回收信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	RecycleManage P = recycleManageService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
        	recycleManageService.update(P);
        }
        return SUCCESS;
    }
	
	@ActionLog(description = "删除清单")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			recycleManageService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除费用")
	public String multiDelFee() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			recycleManageService.deleteFee(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除损坏赔偿")
	public String multiDelDamage() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			recycleManageService.deleteDamage(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除暂存清单")
	public String multiDelTemporaryStorage() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			recycleManageService.delTemporaryStorage(new Long(id));
		}
		return SUCCESS;
	}
	
	public String listInputCount() {
        QueryFilter filter = new QueryFilter(getRequest());
        List<MaterialsRecycleCountTemp> list = materialsRecycleCountTempDao.getAll(filter);
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }
	
	@ActionLog(description = "回收管理打印单")
	public String printForm() {
		RecycleManage p = recycleManageService.getTranslateFull(recycleId);
		//现金，转账，支票
		float cashCost = 0;
		float transferCost = 0;
		float checkCost = 0;
		
		float damageCost = 0;
		if(p.getRecycleManageFeeSet().size()>0) {
			for(RecycleManageFee rmf : p.getRecycleManageFeeSet()) {
				if(rmf.getChargeWay().equals("1")){
					cashCost += Float.valueOf(rmf.getChargeAmount());
				}
				if(rmf.getChargeWay().equals("2")){
					transferCost += Float.valueOf(rmf.getChargeAmount());
				}
				if(rmf.getChargeWay().equals("3")){
					checkCost += Float.valueOf(rmf.getChargeAmount());
				}
				rmf.setChargeWayName(CodeServiceImpl.fastValue("paymentType", rmf.getChargeWay()));
			}
		}
		if(p.getCompensationDamageSet().size()>0){
			Iterator<CompensationDamage> it = p.getCompensationDamageSet().iterator();
			while(it.hasNext()) {
				CompensationDamage cd = it.next();
				if(cd.getQuantity()==null||"0".equals(cd.getQuantity())) {
					it.remove();
				}else{
					damageCost += Float.valueOf(cd.getDamageAmount());
				}
			}
		}
		List<Map<String, Object>> unAccessGather = recycleManageService.queryByScript("dispatch.recycle_detail_num", recycleId);
		DecimalFormat decimalFormat=new DecimalFormat("0.00");
		getRequest().setAttribute("cashCost", decimalFormat.format(cashCost));
		getRequest().setAttribute("transferCost", decimalFormat.format(transferCost));
		getRequest().setAttribute("checkCost", decimalFormat.format(checkCost));
		getRequest().setAttribute("unAccessGather", unAccessGather.get(0).get("DETAIL_NO"));
		getRequest().setAttribute("damageCost", decimalFormat.format(damageCost));
		getRequest().setAttribute("recycleManage", p);
		getRequest().setAttribute("recycleDate", DateUtil.changeObj2DateStr(p.getRecycleDate(), DateUtil.CN_DISPLAY_DATE));
		return "printForm";
	}

}
