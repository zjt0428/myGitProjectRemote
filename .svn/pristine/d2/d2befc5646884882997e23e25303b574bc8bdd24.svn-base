/**
 *====================================================
 * 文件名称: ComponentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
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
import com.knight.emms.model.Component;
import com.knight.emms.model.ComponentHold;
import com.knight.emms.service.ComponentService;
import com.knight.emms.support.StatusAnalyze;
import com.knight.emms.support.UploadTerminalFileParser;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

/**
 * @ClassName: ComponentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午2:30:57
 */
public class ComponentAction extends ExportBaseAction<Component> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Component component;

	@Setter
	@Getter
	private Long componId;

	@Resource
	private ComponentService componentService;

	@Resource
	private FileAttachService fileAttachService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 5:
			return DateUtil.changeObj2DateStr(value, DateUtil.LINK_DISPLAY_DATE);
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Component> list = componentService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String listOnStore() {
		String storeId = getRequest().getParameter("storeId");
		List<Map<String,Object>> list = componentService.queryByScript("store.store_compo_list", storeId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Component c = componentService.getTranslate(componId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, DateUtil.LINK_DISPLAY_DATE, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String upload() {
		Long fileId = new Long(getRequest().getParameter("fileId"));
		FileAttach fileAttach = fileAttachService.get(fileId);
		try {
			List<Component> list = UploadTerminalFileParser.parserFile(fileAttach.getFilePath(), UploadTerminalFileParser.T_COMPONENT);
			if (!list.isEmpty()) {
				componentService.saveUpload(list);
			}
		} catch (Exception e) {
			if (e instanceof BusinessException) {
				throw (BusinessException) e;
			}
			throw new BusinessException("上传零配件信息文件解析异常!", e);
		}
		return SUCCESS;
	}

	@ActionLog(description = "保存零配件信息")
	public String save() {
		if (component.getComponId() == null) {
			componentService.saveCreate(component);
			setFileAttach(component.getComponId());
		} else {
			Component c = componentService.get(component.getComponId());
			component.setPickupDate(c.getPickupDate());
			component.setDepreciateDate(c.getDepreciateDate());
			component.setStatusDate(c.getStatusDate());
			component.setTotalRate(c.getTotalRate());
			component.setBatchNumber(c.getBatchNumber());
			component.setComponSerial(c.getComponSerial());
			component.setConsumeFlag(c.getConsumeFlag());
			component.setKnotFlag(c.getKnotFlag());
			component.setBoltFlag(c.getBoltFlag());
			component.setParachuteFlag(c.getParachuteFlag());
			component.setWallAttacheFlag(c.getWallAttacheFlag());
			component.setStatus(StatusAnalyze.parserECValid(component.getScrapDate(), c.getStatus()));
			component.setDelFlag(c.getDelFlag());
			component.setStoreHouses(c.getStoreHouses());
			if (!Constant.ENABLED.equals(component.getConsumeFlag())) {
				component.setConsumeFlag(Constant.DISENABLED);
			}
			if (!Constant.ENABLED.equals(component.getParachuteFlag())) {
				component.setParachuteFlag(Constant.DISENABLED);
			}
			if (!Constant.ENABLED.equals(component.getWallAttacheFlag())) {
				component.setWallAttacheFlag(Constant.DISENABLED);
			}
			if (!Constant.ENABLED.equals(component.getKnotFlag())) {
				component.setKnotFlag(Constant.DISENABLED);
			}
			/*component.setAssetValue(component.getUnitprice().multiply(new BigDecimal(component.getConsumeCounts())));*/
			component.setAssetValue(component.getUnitprice().multiply(new BigDecimal(0)));
			componentService.saveCreate(component);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除零配件信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Component c = componentService.get(new Long(id));
			if (!Status.EquipCompon.unused.equals(c.getStatus())) {
				c.setDelFlag(Constant.DISENABLED);
				componentService.save(c);
			}
		}
		return SUCCESS;
	}


	public String displayParachute() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		List<Component> componentList = componentService.queryTranslateAll(filter);
		getRequest().setAttribute("displayList", componentList);
		return "displayParachute";
	}

	public String confirm() {
		String ids[]=getRequest().getParameterValues("ids");
		for(String id:ids){
			Component c=componentService.get(new Long(id));
			/*c.setStatus(status);*/
			c.setStatus("1");
			componentService.save(c);
		}
		
		
		return SUCCESS;
	}

	public String fix(){
		componentService.fix();
        return SUCCESS;
	}
	
	public String line(){
		String taskId = getRequest().getParameter("taskId");
		
		List<Map<String, Object>>  ucAccountList = componentService.queryByScript("terminal.list_component_store", taskId);
//		List<Map<String, Object>>  list = componentService.queryByScript("terminal.list_component_store_counts", taskId);
		QueryFilter filter = new QueryFilter(getRequest());
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(ucAccountList));
//		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		System.out.println(ucAccountList);
		return SUCCESS;
		
	}
	
	public String listDetail(){
		
		return SUCCESS;
	}

}
