/**
 *====================================================
 * 文件名称: attendamceAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.action;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;



import com.knight.app.model.TAppRepair;
import com.knight.app.service.TAppRepairComponService;
import com.knight.app.service.TAppRepairService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.EquipHitch;
import com.knight.emms.model.EquipRepairCompon;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;
import com.knight.system.service.FileAttachService;


/**
 * @ClassName: MemoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:41:24
 */
public class AppRepairAction extends ExportBaseAction<TAppRepair> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TAppRepair repair;

	@Getter
	@Setter
	private TAppRepair appRepair;

	@Getter
	@Setter
	private Long repid;

	@Resource
	private TAppRepairService repairService;
	
	@Resource
	private TAppRepairComponService repairComponServic;
	
	@Resource
	private FileAttachService fileAttachService;
	
	@Resource
	private AppUserService appUserService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());		
		
		List<TAppRepair> list = repairService.queryTranslateAll(filter);		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		TAppRepair c = repairService.getTranslate(repid);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String save() {
		repair = repairService.getTranslate(appRepair.getRepid());
		repair.setAppRepairCostGrids(appRepair.getAppRepairCostGrids());
		repair.setState("0");
		//repair.setRepFee();
		repair.setSubScrapContract();	
		repairService.merge(repair);
		String type = this.getRequest().getParameter("TYPE");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		String curDate = format.format(new Date());
		//Long userId = ApplicationContainer.getCurrentUserId();
				

		return SUCCESS;
	}
	
	public String print() {
		repair = repairService.getTranslate(repid);
//		BigDecimal totlePresentValue = BigDecimal.ZERO;
//		int totleCounts = 0;
//		for (EquipRepairCompon compon : equipRepair.getEquipRepairNewComponSet()) {
//			totlePresentValue = totlePresentValue.add(compon.getComponent().getPresentValue());
//			totleCounts += compon.getCounts();
//		}
//		getRequest().setAttribute("totlePresentValue", totlePresentValue);
//		getRequest().setAttribute("totleCounts", totleCounts);
//
//		AppUser appUser = appUserService.get(repair.getUserId());
//		getRequest().setAttribute("appUser", appUser);
		return getRequest().getParameter("formpage");
	}
	
	@ActionLog(description = "删除")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			repairService.delete(new Long(id));
		}
		return SUCCESS;
	}
}
