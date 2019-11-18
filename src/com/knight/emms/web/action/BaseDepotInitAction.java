package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.BaseDepotInit;
import com.knight.emms.model.BaseDepotInitDetail;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.service.BaseDepotInitService;
import com.knight.emms.service.BaseLocationService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.MaterialsStoreService;

import lombok.Getter;
import lombok.Setter;
import lombok.SneakyThrows;

@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class BaseDepotInitAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long depotInitId;
	
	@Getter
	@Setter
	private BaseDepotInit baseDepotInit;
	
	@Resource
	private BaseDepotInitService baseDepotInitService;
	
	@Resource
	private MaterialsStoreService materialsStoreService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	@Resource
	private BaseLocationService baseLocationService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BaseDepotInit> list = baseDepotInitService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		BaseDepotInit m = baseDepotInitService.getTranslate(depotInitId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新仓库")
	public String save() {
		baseDepotInit.setDelFlag(Constant.ENABLED);
		baseDepotInit.setEffective(Constant.DISENABLED);
		if (baseDepotInit.getDepotInitId() == null) {
			baseDepotInitService.save(baseDepotInit);
		}
		baseDepotInit.setSubBaseDepotInit();
		baseDepotInitService.merge(baseDepotInit);
		return SUCCESS;
	}
	
	@ActionLog(description = "删除仓库")
	public String multiDel() {
		 String[] ids = getRequest().getParameterValues("ids");
	        for (String id : ids) {
	        	BaseDepotInit b = baseDepotInitService.get(new Long(id));
	        	b.setDelFlag(Constant.DISENABLED);
	        	baseDepotInitService.update(b);
	        }
		return SUCCESS;
	}
	
	@ActionLog(description = "初始化生效")
	@SneakyThrows(RuntimeException.class)
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			BaseDepotInit p = baseDepotInitService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				//同时将周材数量存入T_MATERIALS_STORE
				for(BaseDepotInitDetail bdid : p.getBaseDepotInitDetailSet()){
					QueryFilter filter = new QueryFilter();
					filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ",p.getBaseDepot().getDepotId()+"");
					filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ",bdid.getLocationId()+"");
					filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", p.getSpecificationsId()+"");
					List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
					MaterialsStore ms = new MaterialsStore();
					if(list.size()>0){
						ms = list.get(0);
						Integer i = Integer.valueOf(ms.getQuantity()) + Integer.valueOf(bdid.getQuantity()==null? "0" : bdid.getQuantity());
						ms.setQuantity(i.toString());
					} else {
						ms.setBaseDepot(p.getBaseDepot());
						ms.setBaseLocation(baseLocationService.get(bdid.getLocationId()));
						ms.setMaterialsSpecifications(materialsSpecificationsService.get(p.getSpecificationsId()));
						ms.setQuantity(bdid.getQuantity()==null? "0" : bdid.getQuantity());
					} 
					materialsStoreService.merge(ms);
				}
				
				p.setEffective(Constant.ENABLED);
				baseDepotInitService.save(p);
			}
		}
		return SUCCESS;
	}
}
