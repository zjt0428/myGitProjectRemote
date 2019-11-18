package com.knight.emms.web.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ScrapContract;
import com.knight.emms.service.FormReviewService;
import com.knight.emms.service.ScrapContractService;
import com.knight.system.service.AppUserService;

import lombok.Getter;
import lombok.Setter;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class ScrapContractAction extends ExportBaseAction<ScrapContract> /*BaseAction */{
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ScrapContract scrapContract;
	
	@Getter
	@Setter
	private Long contractId;
	
	@Resource
	private ScrapContractService scrapContractService;
	
	@Resource
	private FormReviewService formReviewService;
	
	@Resource
	private AppUserService appUserService;
	
	public String list() {
		String filterName = "nameEqualFilter";
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("name","relateModule");
		map.put("value",Constant.SCRAP_CONTRACT);
		QueryFilter filter = new QueryFilter(getRequest());
		List<ScrapContract> list = scrapContractService.findByFilter(filter, filterName,map);
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
		map.put("value",Constant.SCRAP_CONTRACT);
		ScrapContract c = scrapContractService.getByFilter(contractId,filterName,map);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新报废合同")
	public String save() {
		if (scrapContract.getContractId() == null) {
			scrapContract.setStatus(Status.HandleResult.untreated);
			scrapContract.setDelFlag(Constant.ENABLED);
			scrapContract.setApplyforState(Status.Applyfor.waitSubmit);
			scrapContractService.saveCreate(scrapContract);
			setFileAttach(scrapContract.getContractId());
		} else {
			ScrapContract a = scrapContractService.get(scrapContract.getContractId());
			scrapContract.setStatus(a.getStatus());
			scrapContract.setApplyforState(a.getApplyforState());
			scrapContract.setDelFlag(a.getDelFlag());
			scrapContractService.saveCreate(scrapContract);
		}
		this.jsonString = "{success:true,applyforId:" + scrapContract.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "提交报废合同")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ScrapContract p = scrapContractService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitAccept);
			scrapContractService.save(p);
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除报废合同")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	ScrapContract sc = scrapContractService.get(new Long(id));
        	if(Status.Applyfor.waitSubmit.equals(sc.getApplyforState())) {
        		sc.setDelFlag(Constant.DISENABLED);
             	scrapContractService.update(sc);
        	}
            throw new BusinessException("状态非法，无法删除！");
        }
		return SUCCESS;
	}
	
	@ActionLog(description = "打印报废合同")
	public String printForm() {
		ScrapContract b = scrapContractService.getTranslateFull(contractId);

//		b.setApplyDate(DateUtil.changeObj2DateStr(b.getApplyDate(), DateUtil.CN_DISPLAY_DATE));
	
		getRequest().setAttribute("scrapContract", b);
		
		return "printForms";
	}
}
