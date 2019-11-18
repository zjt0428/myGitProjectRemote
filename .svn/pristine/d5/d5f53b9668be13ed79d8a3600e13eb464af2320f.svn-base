/**
 *====================================================
 * 文件名称: CorpCertAction.java
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

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.MenuAuthority;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.CorpCert;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.service.CorpCertService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.support.StatusAnalyze;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: CorpCertAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:06:49
 */
public class CorpCertAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private CorpCert corpCert;

	@Setter
	@Getter
	private Long certId;

	@Resource
	private CorpCertService corpCertService;

	@Resource
	private CorpInfoService corpInfoService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<CorpCert> list = corpCertService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@MenuAuthority(text = "加载企业资质", iconCls = "btn-receive")
	public String load() {
		CorpCert cert = corpCertService.getTranslate(certId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(cert, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@MenuAuthority(id = "Edit,Add", text = "修改企业资质,新增企业资质", iconCls = "btn-head-edit,btn-head-add", array = 2)
	@ActionLog(description = "保存或更新企业证书")
	public String save() {
		if (corpCert.getCorpId() == null) {
			throw new BusinessException("企业信息加载失败,无法保存企业资质信息!");
		}
		CorpInfo corpInfo = corpInfoService.get(corpCert.getCorpId());
		if (corpInfo == null) {
			throw new BusinessException("企业信息加载失败,无法保存企业资质信息!");
		}
		corpCert.setCorpInfo(corpInfo);
		if (corpCert.getCertId() == null) {
			corpCert.setCorpCode(corpInfo.getCorpCode());
			corpCert.setIsvalid(StatusAnalyze.parserArchivesValid(corpCert.getEndDate()));
			corpCert.setDelFlag(Constant.ENABLED);
			super.isCreateFileAttach = true;
		} else {
			CorpCert c = corpCertService.get(corpCert.getCertId());
			corpCert.setCorpId(c.getCorpId());
			corpCert.setCorpCode(corpInfo.getCorpCode());
			corpCert.setIsvalid(StatusAnalyze.parserArchivesValid(corpCert.getEndDate()));
			corpCert.setDelFlag(c.getDelFlag());
		}
		corpCertService.saveOrUpdate(corpCert);
		createFileAttach(corpCert.getCertId());
		return SUCCESS;
	}

	@ActionLog(description = "删除企业资质")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			CorpCert c = corpCertService.get(new Long(id));
			c.setDelFlag(Constant.DISENABLED);
			corpCertService.save(c);
		}
		
		
		return SUCCESS;
	}

	@ActionLog(description = "注销企业资质")
	public String multiCancel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			CorpCert c = corpCertService.get(new Long(id));
			c.setIsvalid(Status.Archives.cancel);
			corpCertService.save(c);
		}
		return SUCCESS;
	}

	@ActionLog(description = "恢复企业资质")
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			CorpCert c = corpCertService.get(new Long(id));
			if (Status.Archives.cancel.equals(c.getIsvalid())) {
				c.setIsvalid(StatusAnalyze.parserArchivesValid(c.getEndDate()));
				corpCertService.save(c);
			}
		}
		return SUCCESS;
	}

	public String display() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("remainddays.cert");
		String remainddate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		filter.addConjunctFilter("Q_endDate_S_LE", remainddate);
		filter.addConjunctFilter("Q_endDate_S_GT", DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE));
		filter.addSorted("endDate", "desc");
		List<CorpCert> list = corpCertService.queryTranslateAll(filter);
		getRequest().setAttribute("displayList", list);
		return "display";
	}

}
