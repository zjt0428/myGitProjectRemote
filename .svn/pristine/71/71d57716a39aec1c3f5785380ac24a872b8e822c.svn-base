package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.TakeStock;
import com.knight.emms.service.TakeStockService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

public class TakeStockAction extends ExportBaseAction<TakeStock> {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private TakeStock takeStock;
	
	@Getter
	@Setter
	private Long takeStockId;
	
	@Resource
	private TakeStockService takeStockService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TakeStock> list = takeStockService.queryTranslateAllFull(filter);
		for(int i = 0;i < list.size();i++){
			list.get(i).setApplyforStateName(CodeServiceImpl.fastValue("TAKE_STOCK_APPLYFOR_STATE", list.get(i).getApplyforState()));
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		TakeStock t = takeStockService.getTranslateFull(takeStockId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(t, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "保存或更新盘点信息")
	public String save() {
		if (takeStock.getTakeStockId() == null) {
			takeStock.setApplyforState(Status.Applyfor.waitSubmit);
			takeStock.setDelFlag(Constant.ENABLED);	
			takeStockService.creatSerial(takeStock);
			takeStockService.save(takeStock);
			setFileAttach(takeStock.getTakeStockId());
		} else {
			TakeStock t = takeStockService.get(takeStock.getTakeStockId());
			takeStock.setApplyforState(Status.Applyfor.waitSubmit);
			takeStock.setSubTakeStock();
		}
		takeStock.setSubTakeStock();
		takeStockService.merge(takeStock);
		this.jsonString = "{success:true,takeStockId:" + takeStock.getTakeStockId() + "}";
		return SUCCESS;
	}
	@ActionLog(description = "提交盘点管理")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TakeStock t = takeStockService.get(new Long(id));
			t.setApplyforState(Status.Applyfor.waitAccept);
			takeStockService.save(t);
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "删除盘点管理")
	public String multiDel(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			TakeStock takeStock = takeStockService.get(new Long(id));
			if(Status.ContractApplyfor.waitSubmit.equals(takeStock.getApplyforState())){
				takeStock.setDelFlag(Constant.DISENABLED);
				takeStockService.save(takeStock);
			}else{
				throw new BusinessException("状态不符合要求!");
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除盘点明细信息")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			takeStockService.deletedDetail(new Long(id));
		}
		return SUCCESS;
	}
}
