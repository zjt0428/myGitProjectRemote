package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.MaterialsDispatch;
import com.knight.emms.service.MaterialsDispatchService;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class MaterialsDispatchAction extends ExportBaseAction<MaterialsDispatch> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private MaterialsDispatch materialsDispatch;
	
	@Getter
	@Setter
	private Long materialsId;
	
	@Resource
	private MaterialsDispatchService materialsDispatchService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsDispatch> list = materialsDispatchService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String load() {
		MaterialsDispatch c = materialsDispatchService.getTranslateFull(materialsId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新报废申请")
	public String save() {
		if (materialsDispatch.getMaterialsId() == null) {
			materialsDispatch.setEffective(Constant.ENABLED);
			materialsDispatch.setStatus(Status.HandleResult.untreated);
			materialsDispatch.setDelFlag(Constant.ENABLED);
			materialsDispatch.setApplyforState(Status.Applyfor.waitSubmit);
			materialsDispatch.setGeneratePackageFlag(Constant.DISENABLED);
			materialsDispatchService.saveOrMergeForEdit(materialsDispatch);
			setFileAttach(materialsDispatch.getMaterialsId());
		} else {
			MaterialsDispatch a = materialsDispatchService.get(materialsDispatch.getMaterialsId());
			materialsDispatch.setStatus(a.getStatus());
			materialsDispatch.setApplyforState(a.getApplyforState());
			materialsDispatch.setDelFlag(a.getDelFlag());
			materialsDispatch.setEffective(Constant.ENABLED);
			materialsDispatch.setGeneratePackageFlag(a.getGeneratePackageFlag());
			materialsDispatchService.saveOrMergeForEdit(materialsDispatch);
		}
		this.jsonString = "{success:true,applyforId:" + materialsDispatch.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "提交发货调度单")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsDispatch p = materialsDispatchService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitAccept);
			materialsDispatchService.save(p);
		}		
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除发货调度单")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	MaterialsDispatch P = materialsDispatchService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
        	materialsDispatchService.update(P);
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "删除调度清单")
	public String multiDelDispatch() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			materialsDispatchService.deleteDispatch(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "调度失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsDispatch p = materialsDispatchService.get(new Long(id));
			if (Constant.ENABLED.equals(p.getEffective())) {
				materialsDispatchService.loseEffective(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "打印发货调度申请单")
	public String printForm() {
		MaterialsDispatch b = materialsDispatchService.getTranslateFull(materialsId);

		b.setApplyDate(DateUtil.changeObj2DateStr(b.getApplyDate(), DateUtil.CN_DISPLAY_DATE));
	
		getRequest().setAttribute("materialsDispatch", b);
		
		return "printForm";
	}
}
