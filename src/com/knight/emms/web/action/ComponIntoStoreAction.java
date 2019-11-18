/**
 *====================================================
 * 文件名称: EquipWarehouseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.AttachmentStorage;
import com.knight.emms.model.ComponIntoStore;
import com.knight.emms.model.ComponIntoStoreDetail;
import com.knight.emms.model.ComponentPrintModel;
import com.knight.emms.service.ComponIntoStoreDetailService;
import com.knight.emms.service.ComponIntoStoreService;
import com.knight.emms.service.ComponentService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipWarehouseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午10:50:07
 */
public class ComponIntoStoreAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ComponIntoStore componIntoStore;

	@Getter
	@Setter
	private Long rowId;

	@Resource
	private ComponIntoStoreService componIntoStoreService;
	
	@Resource
	private ComponIntoStoreDetailService componIntoStoreDetailService;
	
	@Resource
	private ComponentService componentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ComponIntoStore> list = componIntoStoreService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ComponIntoStore p = componIntoStoreService.getTranslateFull(rowId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新入库信息")
	public String save() {
		if (componIntoStore.getRowId() == null) {
			componIntoStore.setApplyforState(Status.Applyfor.waitSubmit);
			componIntoStore.setDelFlag(Constant.ENABLED);
		} else {
			ComponIntoStore p = componIntoStoreService.editLoad(componIntoStore);
			componIntoStore.setSerial(p.getSerial());
			componIntoStore.setApplyforState(p.getApplyforState());
			componIntoStore.setDelFlag(p.getDelFlag());
		}
		componIntoStoreService.saveOrMergeForEdit(componIntoStore);

		StringBuffer sb = new StringBuffer("{success:true,applyforId:");
		sb.append(componIntoStore.getApplyforId());
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "删除入库信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			componIntoStoreService.delete(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交入库信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ComponIntoStore p = componIntoStoreService.get(new Long(id));
			p.setApplyforState(Status.Applyfor.waitApprove);
			componIntoStoreService.save(p);
		}
		return SUCCESS;
	}
	
	public String query(){
		QueryFilter filter = new QueryFilter(getRequest());		
		List<ComponIntoStoreDetail> list = componIntoStoreDetailService.queryTranslateAll(filter);
		for(ComponIntoStoreDetail csd:list){
			CodeServiceImpl.translate(csd.getComponent(),componentService.getPersistantStruct());
		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "打印配件入库清单")
	public String print() {
		ComponIntoStore p = componIntoStoreService.getTranslateFull(rowId);
		List<ComponentPrintModel>  list = new ArrayList<ComponentPrintModel>();
		BigDecimal damageTotalAmount = BigDecimal.ZERO;		//损坏赔偿费用合计
		if(p.getEquipWarehouseComponSet()!=null && p.getEquipWarehouseComponSet().size()>0) {
			TreeSet<ComponIntoStoreDetail> ts = new TreeSet<ComponIntoStoreDetail>(new Comparator<Object>(){
				@Override
				public int compare(Object o1, Object o2) {
					ComponIntoStoreDetail lt1 = (ComponIntoStoreDetail)o1;
					ComponIntoStoreDetail lt2 = (ComponIntoStoreDetail)o2;
					return lt2.getDetailId().compareTo(lt1.getDetailId());
				}
			});
			ts.addAll(p.getEquipWarehouseComponSet());
			for(ComponIntoStoreDetail lt : ts) {
				ComponentPrintModel cpm = new ComponentPrintModel();
				cpm.setComponSpecificName(lt.getComponent().getComponSpecificName());
				cpm.setEquipVenderName(lt.getComponent().getEquipVenderName());
				cpm.setComponGenericName(lt.getComponent().getComponGenericName());
				cpm.setDimensions(lt.getComponent().getDimensions());
				cpm.setCalculate(lt.getComponent().getCalculate());
				cpm.setCounts(lt.getCounts().toString());
				cpm.setRemark(lt.getRemark());
				if(lt.getDamageAmount() != null) {
					damageTotalAmount = damageTotalAmount.add(lt.getDamageAmount());
				}
				list.add(cpm);
			}
		}
	
		if(p.getAttachmentStorageSet()!=null && p.getAttachmentStorageSet().size()>0) {
			TreeSet<AttachmentStorage> ts = new TreeSet<AttachmentStorage>(new Comparator<Object>(){
				@Override
				public int compare(Object o1, Object o2) {
					AttachmentStorage lt1 = (AttachmentStorage)o1;
					AttachmentStorage lt2 = (AttachmentStorage)o2;
					return lt1.getAttachmentId().compareTo(lt2.getAttachmentId());
				}
			});
			ts.addAll(p.getAttachmentStorageSet());
			for(AttachmentStorage ltd : ts) {
				ComponentPrintModel cpm = new ComponentPrintModel();
				cpm.setComponSpecificName(ltd.getComponSpecific());
				cpm.setEquipVenderName(ltd.getComponVender());
				cpm.setComponGenericName(ltd.getComponGeneric());
				cpm.setDimensions(ltd.getDimensions());
				cpm.setCalculate(ltd.getMeasurementUnit());
				cpm.setCounts(ltd.getCounts());
				cpm.setRemark(ltd.getRemark());
				if(ltd.getDamageAmount() != null) {
					damageTotalAmount = damageTotalAmount.add(ltd.getDamageAmount());
				}
				list.add(cpm);
			}
		}
		getRequest().setAttribute("componIntoStore", p);
		getRequest().setAttribute("componentPrintModelSet", list);
		getRequest().setAttribute("damageTotalAmount", damageTotalAmount);
		return "printForm";
	}
	
}
