/**
 *====================================================
 * 文件名称: TechnicalDisclosureAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.TechnicalDisclosure;
import com.knight.emms.service.TechnicalDisclosureService;

/**
 * @ClassName: TechnicalDisclosureAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:42:54
 */
public class TechnicalDisclosureAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TechnicalDisclosure technicalDisclosure;

	@Getter
	@Setter
	private Long disclosureId;

	@Resource
	private TechnicalDisclosureService technicalDisclosureService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TechnicalDisclosure> list = technicalDisclosureService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		TechnicalDisclosure c = technicalDisclosureService.getTranslateFull(disclosureId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新技术交底")
	public String save() {
		if (technicalDisclosure.getDisclosureId() == null) {
			technicalDisclosureService.saveSerialModel(technicalDisclosure);
			setFileAttach(technicalDisclosure.getDisclosureId());
		} else {
			technicalDisclosureService.save(technicalDisclosure);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除技术交底")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			technicalDisclosureService.remove(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		technicalDisclosure = technicalDisclosureService.getTranslateFull(disclosureId);
		return getRequest().getParameter("formpage");
	}
	public String loadDetail() {
		Long disclosureId = Long.valueOf(getRequest().getParameter("disclosureId"));
		List<Map<String, Object>> celist = technicalDisclosureService.queryByScript("equipdoc.pc_technical_disclosure_detail", disclosureId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(celist.size()).append(",result:");
		buff.append(GsonUtil.toJson(celist, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

}
