package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.MaterialsRemodel;
import com.knight.emms.service.MaterialsRemodelService;

import lombok.Getter;
import lombok.Setter;

public class MaterialsRemodelAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
    @Setter
    private Long remodelId;

	@Resource
    private MaterialsRemodelService materialsRemodelService;
	
	
	@Getter
    @Setter
	private MaterialsRemodel materialsRemodel;
	
	
	public String list() {
        QueryFilter filter = new QueryFilter(getRequest());
        List<MaterialsRemodel> list = materialsRemodelService.queryTranslateAll(filter);
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }
	
	public String load() {
		MaterialsRemodel p = materialsRemodelService.getTranslateFull(remodelId);
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }
	
	@ActionLog(description = "新增或更新信息")
    public String save() {
		if(materialsRemodel.getRemodelId()==null){
			materialsRemodel.setApplyforState(Status.Applyfor.waitSubmit);
			materialsRemodel.setDelFlag(Constant.ENABLED);
		}else{
			materialsRemodel.setApplyforState(Status.Applyfor.waitSubmit);
			materialsRemodel.setDelFlag(Constant.ENABLED);
		}
		materialsRemodelService.saveOrMergeForEdit(materialsRemodel);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(materialsRemodel.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "提交周材改型")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsRemodel p = materialsRemodelService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				materialsRemodelService.save(p);
			}
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除周材改型")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	MaterialsRemodel P = materialsRemodelService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
        	materialsRemodelService.update(P);
        }
        return SUCCESS;
    }
	
	@ActionLog(description = "删除改型后")
	public String multiDelAfter() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			materialsRemodelService.deleteAfter(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除改型前")
	public String multiDelBefore() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			materialsRemodelService.deleteBefore(new Long(id));
		}
		return SUCCESS;
	}
	
	

}
