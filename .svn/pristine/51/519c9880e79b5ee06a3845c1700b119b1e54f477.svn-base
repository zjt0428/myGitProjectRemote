package com.knight.emms.web.action;

import java.util.HashMap;
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
import com.knight.emms.model.ScrapApply;
import com.knight.emms.service.ScrapApplyService;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class ScrapApplyAction extends ExportBaseAction<ScrapApply> {
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ScrapApply scrapApply;
	
	@Getter
	@Setter
	private Long scrapId;
	
	@Resource
	private ScrapApplyService scrapApplyService;
	
	public String list() {
//		SessionFactory sessionFactory = null;
//		Configuration configuration = new Configuration();
//		sessionFactory = configuration.buildSessionFactory();
//		Session session = sessionFactory.openSession();
		String filterName = "nameEqualFilter";
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("name","relateModule");
		map.put("value",Constant.SCRAP_APPLY);
//		session.enableFilter("nameEqualFilter").setParameter("relateModule", Constant.SCRAP_APPLY);
		QueryFilter filter = new QueryFilter(getRequest());
		List<ScrapApply> list = scrapApplyService.findByFilter(filter, filterName,map);
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
		map.put("value",Constant.SCRAP_APPLY);
		ScrapApply c = scrapApplyService.getByFilter(scrapId,filterName,map);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新报废申请")
	public String save() {
		if (scrapApply.getScrapId() == null) {
			scrapApply.setStatus(Status.HandleResult.untreated);
			scrapApply.setDelFlag(Constant.ENABLED);
			scrapApply.setApplyforState(Status.Applyfor.waitSubmit);
			scrapApplyService.saveCreate(scrapApply);
			setFileAttach(scrapApply.getScrapId());
		} else {
			ScrapApply a = scrapApplyService.get(scrapApply.getScrapId());
			scrapApply.setStatus(a.getStatus());
			scrapApply.setApplyforState(a.getApplyforState());
			scrapApply.setDelFlag(a.getDelFlag());
			scrapApplyService.saveCreate(scrapApply);
		}
		this.jsonString = "{success:true,applyforId:" + scrapApply.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "提交报废申请")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ScrapApply p = scrapApplyService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitAccept);
			scrapApplyService.save(p);
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除报废申请")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	ScrapApply P = scrapApplyService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
        	scrapApplyService.update(P);
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "删除报废清单")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	 scrapApplyService.deleteDetail(new Long(id));
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "打印报废申请单")
	public String printForm() {
		ScrapApply b = scrapApplyService.getTranslateFull(scrapId);

		b.setApplyDate(DateUtil.changeObj2DateStr(b.getApplyDate(), DateUtil.CN_DISPLAY_DATE));
	
		getRequest().setAttribute("scrapApply", b);
		
		return "printForm";
	}
}
