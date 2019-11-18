
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ComponIntoStore;
import com.knight.emms.model.LostDetail;
import com.knight.emms.model.LostHandle;
import com.knight.emms.service.LostHandleService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LostHandleAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date
 */
public class LostHandleAction extends ExportBaseAction<LostHandle> {
	
	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private LostHandle lostHandle;

	@Getter
	@Setter
	private Long lostId;

	@Resource
	private LostHandleService lostHandleService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LostHandle> list = lostHandleService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		LostHandle p = lostHandleService.getTranslateFull(lostId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新丢失处理信息")
	public String save() {
		if (lostHandle.getLostId() == null) {
			lostHandle.setApplyforState(Status.Applyfor.waitSubmit);
//			lostHandle.setDelFlag(Constant.ENABLED);
		} else {
			LostHandle p = lostHandleService.editLoad(lostHandle);
			lostHandle.setLostSerial(p.getLostSerial());
			lostHandle.setApplyforState(p.getApplyforState());
//			lostHandle.setDelFlag(p.getDelFlag());
		}
		lostHandleService.saveOrMergeForEdit(lostHandle);

		StringBuffer sb = new StringBuffer("{success:true,applyforId:");
		sb.append(lostHandle.getApplyforId());
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "删除丢失处理信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			lostHandleService.delete(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交丢失处理信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LostHandle p = lostHandleService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitApprove);
			lostHandleService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除配件信息")
	public String multiDelCompon() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			lostHandleService.deletedCompon(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		LostHandle p = lostHandleService.getTranslateFull(lostId);
		Integer allCost = 0;
		if(p.getLostDetailSet()!=null && !p.getLostDetailSet().isEmpty()) {
			for(LostDetail ld : p.getLostDetailSet()) {
				allCost += Integer.valueOf(ld.getTotals());
			}
		}
		getRequest().setAttribute("lostHandle", p);
		getRequest().setAttribute("allCost", allCost);
		return "printForm";
	}
}
