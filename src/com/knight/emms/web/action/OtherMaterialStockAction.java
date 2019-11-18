package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.OtherMaterialStock;
import com.knight.emms.service.OtherMaterialStockService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

public class OtherMaterialStockAction extends ExportBaseAction<OtherMaterialStock>{

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long otherMaterialStockId;
	
	@Getter
	@Setter
	private OtherMaterialStock otherMaterialStock;
	
	@Resource
	private OtherMaterialStockService otherMaterialStockService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<OtherMaterialStock> list = otherMaterialStockService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		OtherMaterialStock oms = otherMaterialStockService.getTranslate(otherMaterialStockId);
//		oms.setHandleType(oms.getHandleTypeName());
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(oms, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新其他出入库处理单")
	public String save() {
		if(otherMaterialStock.getOtherMaterialStockId() == null){
			otherMaterialStock.setApplyforState(Status.Applyfor.waitSubmit);
			otherMaterialStock.setDelFlag(Constant.ENABLED);
			otherMaterialStockService.creatSerial(otherMaterialStock);
			otherMaterialStockService.save(otherMaterialStock);
			setFileAttach(otherMaterialStock.getOtherMaterialStockId());
		}else{
			OtherMaterialStock oms = otherMaterialStockService.get(otherMaterialStock.getOtherMaterialStockId());
			otherMaterialStock.setApplyforState(oms.getApplyforState());
			otherMaterialStock.setDelFlag(oms.getDelFlag());
		}
		otherMaterialStock.setSubOtherMaterialStock();
		otherMaterialStockService.merge(otherMaterialStock);
		this.jsonString = "{success:true,otherMaterialStockId:" + otherMaterialStock.getOtherMaterialStockId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "删除其他出入库处理")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			OtherMaterialStock oms = otherMaterialStockService.get(new Long(id));
			if(Status.ContractApplyfor.waitSubmit.equals(oms.getApplyforState())){
				oms.setDelFlag(Constant.DISENABLED);
				otherMaterialStockService.merge(oms);	
			}else{
				throw new BusinessException("状态不符合要求!");
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "提交其他出入库处理单")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			OtherMaterialStock oms = otherMaterialStockService.get(new Long(id));
			if(Status.Applyfor.waitSubmit.equals(oms.getApplyforState())){
				oms.setApplyforState(Status.Applyfor.waitApprove);
				otherMaterialStockService.merge(oms);
			}else{
				throw new BusinessException("状态不符合要求!");
			}
			
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除其他出入库申请明细信息")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			otherMaterialStockService.deletedDetail(new Long(id));
		}
		return SUCCESS;
	}

}
