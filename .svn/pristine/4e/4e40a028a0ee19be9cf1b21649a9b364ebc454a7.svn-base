/**
 *====================================================
 * 文件名称: PractiCertAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.PractiCert;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.PractiCertService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.support.StatusAnalyze;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.FileAttachService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: PractiCertAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:06:33
 */
public class PractiCertAction extends ExportBaseAction<PractiCert> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private PractiCert practiCert;

	@Setter
	@Getter
	private Long certId;

	@Resource
	private PractiCertService practiCertService;
	
	@Resource
	private PractitionerService practitionerService;

	@Resource
	private FileAttachService fileAttachService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 3:
			return ((Practitioner) value).getPractiName();
		case 4:
			return ((Practitioner) value).getIdCard();
		default:
			return null;
		}
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PractiCert> list = practiCertService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(filter.getPagingBean().getTotalItems()).append(",\"result\":");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		PractiCert cert = practiCertService.getTranslate(certId);
		StringBuffer sb = new StringBuffer("{\"success\":true,\"data\":[");
		sb.append(GsonUtil.toJson(cert, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新从业人员证书")
	public String save() {
		if (practiCert.getCertId() == null) {
			practiCert.setQstate(StatusAnalyze.parserArchivesValid(practiCert.getEffectDate()));
			practiCert.setDelFlag(Constant.ENABLED);
			practiCertService.save(practiCert);
			setFileAttach(practiCert.getCertId());
		} else {
			PractiCert c = practiCertService.get(practiCert.getCertId());
			practiCert.setPractitioner(c.getPractitioner());
			practiCert.setQstate(StatusAnalyze.parserArchivesValid(practiCert.getEffectDate()));
			practiCert.setDelFlag(c.getDelFlag());
			practiCertService.merge(practiCert);
		}
		Practitioner p = practitionerService.get(practiCert.getPractitioner().getPractiId());
		if(p.getCertFlag().equals(Constant.DISENABLED)) {
			p.setCertFlag(Constant.ENABLED);
			practitionerService.merge(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除从业人员证书")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiCert c = practiCertService.get(new Long(id));
			c.setDelFlag(Constant.DISENABLED);
			practiCertService.save(c);
		}
		return SUCCESS;
	}

	@ActionLog(description = "注销从业人员证书")
	public String multiCancel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiCert c = practiCertService.get(new Long(id));
			c.setQstate(Status.Archives.cancel);
			practiCertService.save(c);
		}
		return SUCCESS;
	}

	@ActionLog(description = "恢复从业人员证书")
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiCert c = practiCertService.get(new Long(id));
			if (Status.Archives.cancel.equals(c.getQstate())) {
				c.setQstate(StatusAnalyze.parserArchivesValid(c.getEffectDate()));
				practiCertService.save(c);
			}
		}
		return SUCCESS;
	}

	public String display() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("remainddays.cert");
		String remainddate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		filter.addConjunctFilter("Q_effectDate_S_LE", remainddate);
		filter.addSorted("effectDate", "desc");
		List<PractiCert> list = practiCertService.queryTranslateAll(filter);
		getRequest().setAttribute("displayList", list);
		return "display";
	}

	public String displayContract() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("remainddays.cert");
		String remainddate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		filter.addConjunctFilter("Q_contractDate_S_LE", remainddate);
		filter.addConjunctFilter("Q_contractDate_S_GT", DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE));
		filter.addSorted("contractDate", "desc");
		List<PractiCert> list = practiCertService.queryTranslateAll(filter);
		getRequest().setAttribute("displayList", list);
		return "displayContract";
	}

}
