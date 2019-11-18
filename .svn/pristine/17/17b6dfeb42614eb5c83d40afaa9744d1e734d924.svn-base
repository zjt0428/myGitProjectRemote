/**
 *====================================================
 * 文件名称: LogisticsBacksportAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月5日			chenxy(创建:创建文件)
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
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.LogisticsBacksport;
import com.knight.emms.service.LogisticsBacksportService;
import com.knight.emms.support.EmmsApplicationSupport;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: LogisticsBacksportAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月5日 下午8:22:50
 */
public class LogisticsBacksportAction extends ExportBaseAction<LogisticsBacksport> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private LogisticsBacksport logisticsBacksport;

	@Getter
	@Setter
	private Long backsportId;

	@Resource
	private LogisticsBacksportService logisticsBacksportService;

	@Override
	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 4:
			return ((Equipment) value).getRecordId();
		case 5:
			return CodeServiceImpl.fastValue("equipSpecific", ((Equipment) value).getEquipSpecific());
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LogisticsBacksport> list = logisticsBacksportService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;	
	}

	public String load() {
		LogisticsBacksport p = logisticsBacksportService.getTranslateFull(backsportId);
		if (p.getEquipment() == null) {
			p.setEquipment(new Equipment());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新物流信息")
	public String save() {
		if (logisticsBacksport.getEquipment() == null || logisticsBacksport.getEquipment().getEquipId() == null) {
			logisticsBacksport.setEquipment(null);
		}
		if (logisticsBacksport.getBacksportId() == null) {
			logisticsBacksport.setFinishedAmount(Constant.ZERO);
			logisticsBacksport.setRemainderAmount(logisticsBacksport.getBacksportAmount().subtract(logisticsBacksport.getFinishedAmount()));
			logisticsBacksport.setStatus(Status.Logistics.transport);
			logisticsBacksport.setFundStatus(Status.Fund.payment);
			logisticsBacksport.setDelFlag(Constant.ENABLED);
			super.isCreateFileAttach = true;
		} else {
			LogisticsBacksport p = logisticsBacksportService.get(logisticsBacksport.getBacksportId());
			logisticsBacksport.setBacksportTheme(p.getBacksportTheme());
			logisticsBacksport.setFinishedAmount(p.getFinishedAmount());
			logisticsBacksport.setRemainderAmount(logisticsBacksport.getBacksportAmount().subtract(logisticsBacksport.getFinishedAmount()));
			logisticsBacksport.setStatus(p.getStatus());
			logisticsBacksport.setFundStatus(p.getFundStatus());
			logisticsBacksport.setDelFlag(p.getDelFlag());
		}
		logisticsBacksportService.saveOrMergeForEdit(logisticsBacksport);
		createFileAttach(logisticsBacksport.getBacksportId());
		return SUCCESS;
	}

	@ActionLog(description = "删除物流清单记录")
	public String multiDelBackdetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			logisticsBacksportService.deletedBackdetail(new Long(id));
		}
		return SUCCESS;
	}

	public String multiDelBackcarfee() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			logisticsBacksportService.deletedBackcarfee(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除物流信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LogisticsBacksport p = logisticsBacksportService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			logisticsBacksportService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "签收物流信息")
	public String received() {
		LogisticsBacksport p = logisticsBacksportService.get(logisticsBacksport.getBacksportId());
		p.setSignDate(logisticsBacksport.getSignDate());
		p.setSignMan(logisticsBacksport.getSignMan());
		p.setSignResult(logisticsBacksport.getSignResult());
		logisticsBacksportService.received(p);
		return SUCCESS;
	}

	public String print() {
		logisticsBacksport = logisticsBacksportService.getTranslateFull(backsportId);
		logger.error(logisticsBacksport.getEquipment().getExwSerial());
		List<Map<String, Object>> backdetails = logisticsBacksportService.queryByScript("dispatch.count_logistics_backdetail", backsportId);
		getRequest().setAttribute("backdetails", backdetails);
		getRequest().setAttribute("corpInfo", EmmsApplicationSupport.getAppuserCorpInfo());
		return getRequest().getParameter("formpage");
	}

}
