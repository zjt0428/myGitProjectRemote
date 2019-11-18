package com.knight.emms.web.action;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.CostDetail;
import com.knight.emms.model.MaterialsPackage;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.emms.service.MaterialsPackageService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class MaterialsPackageAction extends ExportBaseAction<MaterialsPackage> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private MaterialsPackage materialsPackage;
	
	@Getter
	@Setter
	private Long packageId;
	
	@Resource
	private MaterialsPackageService materialsPackageService;
	
	@Resource
	private ContractJoinUserService contractJoinUserService;
	
	
	public String list() throws ParseException {
		QueryFilter filter = new QueryFilter(getRequest());
		//项目用户只显示具备合同权限的单据
		if("2".equals(ApplicationContainer.getCurrentUser().getUserType())) {
			String contractIds = contractJoinUserService.concatGrantedContractId(ApplicationContainer.getCurrentUserId());
			filter.addValuesDisjunctFilter("Q_contractId_L_EQ", contractIds);
		}
		List<MaterialsPackage> list = materialsPackageService.queryTranslateAllFull(filter);
		for(MaterialsPackage mp : list){
			if(mp.getRentType().equals("2")){
				Date date = DateUtil.changeStrToDate(mp.getApplyDate());
				String appplyDate = DateUtil.changeDateToStr(date,DateUtil.LINK_DISPLAY_DATE_MINUTE);
				mp.setApplyDate(appplyDate);
			}
			if(mp.getRentType().equals("1")||mp.getRentType().equals("2")){
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");  
			    Date date = sdf.parse(mp.getApplyDate());  
				mp.setAcceptTime(date);
				mp.setApproveTime(date);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String load() {
		MaterialsPackage c = materialsPackageService.getTranslateFull(packageId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新报废申请")
	public String save() {
		if (materialsPackage.getPackageId() == null) {
			materialsPackage.setStatus(Status.HandleResult.untreated);
			materialsPackage.setDelFlag(Constant.ENABLED);
			materialsPackage.setApplyforState(Status.Applyfor.waitSubmit);
			materialsPackage.setSignFlag(Constant.DISENABLED);
			materialsPackageService.saveCreate(materialsPackage);
			setFileAttach(materialsPackage.getPackageId());
		} else {
			MaterialsPackage a = materialsPackageService.get(materialsPackage.getPackageId());
			materialsPackage.setStatus(a.getStatus());
			materialsPackage.setApplyforState(a.getApplyforState());
			materialsPackage.setDelFlag(a.getDelFlag());
			materialsPackage.setSignFlag(a.getSignFlag());
			materialsPackageService.saveCreate(materialsPackage);
		}
		this.jsonString = "{success:true,applyforId:" + materialsPackage.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "提交现场装车")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsPackage p = materialsPackageService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitAccept);
			materialsPackageService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除现场装车单")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	MaterialsPackage P = materialsPackageService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
            materialsPackageService.update(P);
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "删除费用清单")
	public String multiDelCost() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	materialsPackageService.deleteCost(new Long(id));
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "现场装车申请单")
	public String printForm() {
		MaterialsPackage b = materialsPackageService.getTranslateFull(packageId);
		//现金，转账，支票
		float cashCost = 0;
		float transferCost = 0;
		float checkCost = 0;
		if(b.getCostDetailSet().size()>0) {
			for(CostDetail cd : b.getCostDetailSet()) {
				if(cd.getChargeMode().equals("1")){
					cashCost += Float.valueOf(cd.getChargeAmount());
				}
				if(cd.getChargeMode().equals("2")){
					transferCost += Float.valueOf(cd.getChargeAmount());
				}
				if(cd.getChargeMode().equals("3")){
					checkCost += Float.valueOf(cd.getChargeAmount());
				}
				cd.setChargeModeName(CodeServiceImpl.fastValue("paymentType",cd.getChargeMode()));
			}
		}
		List<Map<String, Object>> unAccessGather = materialsPackageService.queryByScript("dispatch.materials_detail_num", packageId);
		DecimalFormat decimalFormat=new DecimalFormat("0.00");
		getRequest().setAttribute("materialsPackage", b);
		getRequest().setAttribute("cashCost", decimalFormat.format(cashCost));
		getRequest().setAttribute("unAccessGather", unAccessGather.get(0).get("DETAIL_NO"));
		getRequest().setAttribute("transferCost", decimalFormat.format(transferCost));
		getRequest().setAttribute("checkCost", decimalFormat.format(checkCost));
		getRequest().setAttribute("packageDate", DateUtil.changeObj2DateStr(b.getPackageDate(), DateUtil.CN_DISPLAY_DATE));
		return "printForm";
	}
}
