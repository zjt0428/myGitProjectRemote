/**
 *====================================================
 * 文件名称: LogisticsTransportAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-22			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.DispatchComponDao;
import com.knight.emms.dao.LogisticsTrandetailDao;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.LogisticsTransport;
import com.knight.emms.service.LogisticsTransportService;
import com.knight.emms.support.EmmsApplicationSupport;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LogisticsTransportAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-22 下午9:43:32
 */
public class LogisticsTransportAction extends ExportBaseAction<LogisticsTransport> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private LogisticsTransport logisticsTransport;

	@Getter
	@Setter
	private Long transportId;

	@Resource
	private LogisticsTransportService logisticsTransportService;
	
	@Resource
	private LogisticsTrandetailDao logisticsTrandetailDao;
	
	@Resource
	private DispatchComponDao dispatchComponDao;

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
		List<LogisticsTransport> list = logisticsTransportService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		LogisticsTransport p = logisticsTransportService.getTranslateFull(transportId);
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
		
		if (logisticsTransport.getEquipment() == null || logisticsTransport.getEquipment().getEquipId() == null) {
			logisticsTransport.setFinishedAmount(Constant.ZERO);
			logisticsTransport.setEquipment(null);
		}
		if (logisticsTransport.getTransportId() == null) {
			if (logisticsTransport.getTransportAmount() == null) {
				logisticsTransport.setTransportAmount(Constant.ZERO);
			}
			if (logisticsTransport.getFinishedAmount() == null) {
				logisticsTransport.setFinishedAmount(Constant.ZERO);
			}
			logisticsTransport.setRemainderAmount(logisticsTransport.getTransportAmount().subtract(logisticsTransport.getFinishedAmount()));
			logisticsTransport.setStatus(Status.Logistics.transport);
			logisticsTransport.setApplyforState(Status.Applyfor.waitSubmit);
			logisticsTransport.setFundStatus(Status.Fund.payment);
			logisticsTransport.setDelFlag(Constant.ENABLED);
			super.isCreateFileAttach = true;
		} else {
			LogisticsTransport p = logisticsTransportService.get(logisticsTransport.getTransportId());
			//logisticsTransport.setFinishedAmount(p.getFinishedAmount());
			//logisticsTransport.setRemainderAmount(logisticsTransport.getTransportAmount().subtract(logisticsTransport.getFinishedAmount()));
			logisticsTransport.setTransportTheme(p.getTransportTheme());
			logisticsTransport.setApplyforState(p.getApplyforState());
			logisticsTransport.setStatus(p.getStatus());
			logisticsTransport.setFundStatus(p.getFundStatus());
			logisticsTransport.setDelFlag(p.getDelFlag());
		}
		logisticsTransportService.saveOrMergeForEdit(logisticsTransport);
		createFileAttach(logisticsTransport.getTransportId());
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(logisticsTransport.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "提交现场装车")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LogisticsTransport p = logisticsTransportService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				logisticsTransportService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除物流清单记录")
	public String multiDelTrandetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			logisticsTransportService.deletedTrandetail(new Long(id));
		}
		return SUCCESS;
	}

	public String multiDelTrancarfee() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			logisticsTransportService.deletedTrancarfee(new Long(id));
		}
		return SUCCESS;
	}
	public String multiDelDestribution() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			logisticsTransportService.deletedDestribution(new Long(id));
		}
		return SUCCESS;
	}
	public String multiDelTranDestribution() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			logisticsTransportService.deletedTranDestribution(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除物流信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LogisticsTransport p = logisticsTransportService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			logisticsTransportService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "签收物流信息")
	public String received() { 
		LogisticsTransport p = logisticsTransportService.get(logisticsTransport.getTransportId());
		p.setSignDate(logisticsTransport.getSignDate());
		p.setSignMan(logisticsTransport.getSignMan());
		p.setSignResult(logisticsTransport.getSignResult());
		p.setStatusName(logisticsTransport.getStatusName());
		p.setFundStatusName(logisticsTransport.getFundStatusName());
		p.setLogisticsTrandetails(logisticsTransport.getLogisticsTrandetails());
		p.setLogisticsTrancarfees(logisticsTransport.getLogisticsTrancarfees());
		p.setLogisticsTranDistributionbutions(logisticsTransport.getLogisticsTranDistributionbutions());
		p.setLogisticsDestributions(logisticsTransport.getLogisticsDestributions());
		//p.setApplyforState(Status.Applyfor.waitAccept);
		p.setSubLogisticsTransport();
		
		logisticsTransportService.received(p);
		return SUCCESS;
	}

	public String print() {
		logisticsTransport = logisticsTransportService.getTranslateFull(transportId);
		List<Map<String, Object>> trandetails = logisticsTransportService.queryByScript("dispatch.count_logistics_trandetail", transportId);
		getRequest().setAttribute("trandetails", trandetails);
		getRequest().setAttribute("corpInfo", EmmsApplicationSupport.getAppuserCorpInfo());
		return getRequest().getParameter("formpage");
	}
 
	@ActionLog(description = "打印现场装车清单")
	public String prints() {
		LogisticsTransport p = logisticsTransportService.getTranslateFull(transportId);
//		p.setRemark(p.getRemark().replaceAll("\\r\\n", "</br>"));
		getRequest().setAttribute("logisticsTransport", p);
		return "printsForm";
	}
	
	/*@Action(description = "自动生成启用单")
	public String autoActivate(){
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LogisticsTransport p = logisticsTransportService.get(new Long(id));
			logisticsTransportService.createEquipActivate(p);
		}
		return SUCCESS;
	}*/
}
