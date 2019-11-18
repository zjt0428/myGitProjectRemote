package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.model.DispatchAllocateInit;
import com.knight.emms.service.DispatchAllocateInitService;

import lombok.Getter;
import lombok.Setter;

public class DispatchAllocateInitAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long disAllInitId;
	
	@Getter
	@Setter
	private DispatchAllocateInit dispatchallocateInit;

	@Resource
	private DispatchAllocateInitService dispatchAllocateInitService;

	public String lists() {
		String pagesize = getRequest().getParameter("pagesize");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("disAllInitId", "ASC");
//		filter.setPagingBean(new PagingBean(0, Integer.parseInt(pagesize)));
		List<DispatchAllocateInit> list = dispatchAllocateInitService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<DispatchAllocateInit> list = dispatchAllocateInitService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");	
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String loads() {
		DispatchAllocateInit c = dispatchAllocateInitService.getTranslate(disAllInitId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "读取配置信息")
	public String load(){
		QueryFilter filterT = new QueryFilter();
		QueryFilter filterS = new QueryFilter();
		if((Integer)getRequest().getAttribute("limit") != 0){
			filterT.setPagingBean(new PagingBean(0, 1000));
			filterS.setPagingBean(new PagingBean(0, 1000));
		}
		filterT.addConjunctFilter("Q_initStatus_S_EQ", "Tower");
		List<DispatchAllocateInit> towerInit = dispatchAllocateInitService.queryTranslateAll(filterT);
		filterS.addConjunctFilter("Q_initStatus_S_EQ", "Lift");
		List<DispatchAllocateInit> liftInit = dispatchAllocateInitService.queryTranslateAll(filterS);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(towerInit, GsonUtil.SINCE_VERSION_20));
		sb.append(",");
		sb.append(GsonUtil.toJson(liftInit, GsonUtil.SINCE_VERSION_20));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新塔吊/升降机清单设置")
	public String save() {
//		if ("Tower".equals(getRequest().getParameter("type"))) {
//			dispatchallocateInit.setInitStatus("Tower");
//		} else if ("Lift".equals(getRequest().getParameter("type"))) {
//			dispatchallocateInit.setInitStatus("Lift");
//		}
		dispatchAllocateInitService.merge(dispatchallocateInit);
		return SUCCESS;
	}

	@ActionLog(description = "删除塔吊/升降机清单设置")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dispatchAllocateInitService.remove(new Long(id));;
		}
		return SUCCESS;
	}
}
