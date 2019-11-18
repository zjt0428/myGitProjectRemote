package com.knight.emms.web.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ScrapContract;
import com.knight.emms.model.ScrapHandle;
import com.knight.emms.service.ScrapHandleService;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class ScrapHandleAction extends ExportBaseAction<ScrapHandle> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ScrapHandle scrapHandle;
	
	@Getter
	@Setter
	private Long handleId;
	
	@Resource
	private ScrapHandleService scrapHandleService;
	
	public String list() {
		String filterName = "nameEqualFilter";
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("name","relateModule");
		map.put("value",Constant.SCRAP_HANDLE);
		QueryFilter filter = new QueryFilter(getRequest());
		List<ScrapHandle> list = scrapHandleService.findByFilter(filter, filterName,map);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String load() {
		String filterName = "nameEqualFilter";
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("name","relateModule");
		map.put("value",Constant.SCRAP_HANDLE);
		ScrapHandle c = scrapHandleService.getByFilter(handleId,filterName,map);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新报废处理")
	public String save() {
		if (scrapHandle.getHandleId() == null) {
			scrapHandle.setStatus(Status.HandleResult.untreated);
			scrapHandle.setDelFlag(Constant.ENABLED);
			scrapHandle.setApplyforState(Status.Applyfor.waitSubmit);
			scrapHandleService.saveCreate(scrapHandle);
			setFileAttach(scrapHandle.getHandleId());
		} else {
			ScrapHandle a = scrapHandleService.get(scrapHandle.getHandleId());
			scrapHandle.setStatus(a.getStatus());
			scrapHandle.setApplyforState(a.getApplyforState());
			scrapHandle.setDelFlag(a.getDelFlag());
			scrapHandleService.saveCreate(scrapHandle);
		}
		this.jsonString = "{success:true,applyforId:" + scrapHandle.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "提交报废处理")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ScrapHandle p = scrapHandleService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitApprove);
			scrapHandleService.save(p);
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除报废处理")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	ScrapHandle P = scrapHandleService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
        	scrapHandleService.update(P);
        }
		return SUCCESS;
	}
	@ActionLog(description = "打印报废合同")
	public String printForm() {
		ScrapHandle b = scrapHandleService.getTranslateFull(handleId);


	
		getRequest().setAttribute("ScrapHandle", b);
		
		return "printFormss";
	}
}
