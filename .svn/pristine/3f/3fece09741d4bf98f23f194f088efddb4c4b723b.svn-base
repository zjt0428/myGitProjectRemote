/**
 *====================================================
 * 文件名称: InsureEquipAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.InsureClaim;
import com.knight.emms.model.InsureEquip;
import com.knight.emms.service.InsureEquipService;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: InsureEquipAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:39:39
 */
public class InsureEquipAction extends ExportBaseAction<InsureEquip> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private InsureEquip insureEquip;

	@Setter
	@Getter
	private Long insureId;

	@Resource
	private InsureEquipService insureEquipService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 2:
			return ((Equipment) value).getRecordId();
		case 3:
			return ((Equipment) value).getExwSerial();
		case 4:
			return ((Equipment) value).getPropertyName();
		default:
			return null;
		}
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InsureEquip> list = insureEquipService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		InsureEquip c = insureEquipService.getTranslateFull(insureId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新保险信息")
	public String save() {
		insureEquip.setInsureProgram(StringUtils.join(getRequest().getParameterValues("insureEquip.insureProgram"), ","));
		if (insureEquip.getProject().getPractiId() == null) {
			insureEquip.setProject(null);
		}
		if (insureEquip.getInsureId() == null) {
			insureEquip.setDelFlag(Constant.ENABLED);
			insureEquipService.save(insureEquip);
		} else {
			InsureEquip p = insureEquipService.get(insureEquip.getInsureId());
			insureEquip.setDelFlag(p.getDelFlag());
			insureEquip.setInsureClaimSet(p.getInsureClaimSet());
			insureEquipService.merge(insureEquip);
		}
		return SUCCESS;
	}

	@ActionLog(description = "更新保险理赔信息")
	public String saveClaim() {
		String insureClaims = getRequest().getParameter("insureClaims");
		Set<InsureClaim> contractEquipSet = GsonUtil.fromJson(insureClaims, new TypeToken<Set<InsureClaim>>() {});
		if (contractEquipSet.isEmpty()) {
			return SUCCESS;
		}
		InsureEquip p = insureEquipService.get(insureId);
		for (InsureClaim ic : contractEquipSet) {
			ic.setInsureId(p.getInsureId());
			ic.setInsureSerial(p.getInsureSerial());
			ic.setEquipId(p.getEquipment().getEquipId());
		}
		insureEquipService.saveOrMergeClaim(contractEquipSet);
		return SUCCESS;
	}

	@ActionLog(description = "删除保险理赔信息")
	public String multiDelClaim() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			insureEquipService.deleteClaim(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除保险信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			InsureEquip p = insureEquipService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			insureEquipService.save(p);
		}
		return SUCCESS;
	}

	public String display() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		int remainddays_insure = (Integer) ApplicationContainer.getSysConfig().get("remainddays.insure");
		String remainddate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_insure), DateUtil.LINK_DISPLAY_DATE);
		filter.addConjunctFilter("Q_endInsureDate_S_LE", remainddate);
		filter.addSorted("endInsureDate", "desc");
		List<InsureEquip> list = insureEquipService.queryTranslateAll(filter);
		getRequest().setAttribute("displayList", list);
		return "display";
	}

}
