/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: StoreHouseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-1-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.JSONException;
import org.json.JSONObject;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Component;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.ProjectJoinAnnex;
import com.knight.emms.model.StoreComponStock;
import com.knight.emms.model.StoreEquipStock;
import com.knight.emms.model.StoreHouse;
import com.knight.emms.model.StoreJoinComponent;
import com.knight.emms.model.StoreJoinUser;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.StoreComponStockService;
import com.knight.emms.service.StoreEquipStockService;
import com.knight.emms.service.StoreHouseService;
import com.knight.emms.service.StoreJoinComponentService;
import com.knight.emms.service.StoreJoinUserService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: StoreHouseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-1-13 下午8:54:52
 */
public class StoreHouseAction extends BaseAction  {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private StoreHouse storeHouse;
	
	@Getter
	@Setter
	private AppUser appUser;

	@Getter
	@Setter
	private Long storeId;
	
	@Getter
	@Setter
	private Long componId;

	@Resource
	private StoreHouseService storeHouseService;

	@Resource
	private StoreEquipStockService storeEquipStockService;

	@Resource
	private StoreComponStockService storeComponStockService;

	@Resource
	private EquipmentService equipmentService;

	@Resource
	private ComponentService componentService;
	
	@Resource
	private StoreJoinComponentService storeJoinComponentService;
	
	@Resource
	private StoreJoinUserService storeJoinUserService;
	
	@Resource
	private AppUserService appUserService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<StoreHouse> list = storeHouseService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listByUser() {
		AppUser appUser = ApplicationContainer.getCurrentUser();
		if(appUser.getRights().contains("__ALL")){
			QueryFilter filter = new QueryFilter(getRequest());
			List<StoreHouse> list = storeHouseService.queryTranslateAll(filter);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff.append(GsonUtil.toJson(list));
			buff.append("}");
			this.jsonString = buff.toString();
			return SUCCESS;
		}
		List<Map<String,Object>> list = storeHouseService.queryByScript("store.store_list_by_user", String.valueOf(appUser.getUserId()));
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String arraylist() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<StoreHouse> list = storeHouseService.getAll(filter);
		StringBuffer buff = new StringBuffer("[");
		for (StoreHouse t : list) {
			buff.append("['" + t.getStoreId() + "','" + t.getStoreName() + "'],");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listEquipStock() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<StoreEquipStock> list = storeEquipStockService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listComponStock() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<StoreComponStock> list = storeComponStockService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		StoreHouse p = storeHouseService.getTranslate(storeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新仓库信息")
	public String save() {
		if (storeHouse.getStoreId() == null) {
			storeHouse.setDelFlag(Constant.ENABLED);
			storeHouseService.saveSerialModel(storeHouse);
		} else {
			StoreHouse p = storeHouseService.get(storeHouse.getStoreId());
			storeHouse.setDelFlag(p.getDelFlag());
			storeHouseService.merge(storeHouse);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除仓库信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			StoreHouse p = storeHouseService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			storeHouseService.save(p);
		}
		equipmentService.updateScirpt("store.clean_equip_relation");
		equipmentService.updateScirpt("store.clean_compon_relation");
		return SUCCESS;
	}

	@ActionLog(description = "添加仓库设备")
	public String importEquipment() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment p = equipmentService.get(new Long(id));
			p.setStoreId(storeId);
			p.setStoreStatus(Status.EquipComponStore.warehoused);
			equipmentService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "移除仓库设备")
	public String removeEquipment() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Equipment p = equipmentService.get(new Long(id));
			p.setStoreId(null);
			p.setStoreStatus(null);
			equipmentService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "添加仓库零配件")
	public String importComponent() {
		String[] ids = getRequest().getParameterValues("ids");
		String counts = getRequest().getParameter("counts");
	   String id = null;
	   Long count = null;
				  try
					  {
					  StoreJoinComponent sc ;
					  storeHouse = storeHouseService.get(storeId);
						  for(String s : counts.replace("[", "").replace("]", "").trim().split("},")){
							  sc = new StoreJoinComponent();
							  if(s.lastIndexOf("}")+1 != s.length()){
								  s=s.concat("}");
							  }
							   JSONObject myJsonObject = new JSONObject(s);
							   Component p = null ;
							   //获取对应的值
							   id = myJsonObject.getString("id");
							   count = myJsonObject.getLong("counts");
							   
							   
							   QueryFilter filter = new QueryFilter();
							   filter.addConjunctFilter("Q_storeHouse.storeId_L_EQ", String.valueOf(storeId));
							   filter.addConjunctFilter("Q_component.componId_L_EQ", id);
							   List<StoreJoinComponent>  sjc =   storeJoinComponentService.queryTranslateAll(filter);
							   if(sjc.size()>0){
								    sc = sjc.get(0);
								    sc.setCounts(sc.getCounts()+count);
								    storeJoinComponentService.merge(sc);
							   }else{
								   p = componentService.get(new Long(id));
								   sc.setComponent(p);
								   sc.setStoreHouse(storeHouse);
								   sc.setCounts(count);
								   storeJoinComponentService.save(sc);
							   }
						  }
					  }
				  catch (JSONException e){
				  }
		return SUCCESS;
		
	}

	@ActionLog(description = "移除仓库零配件")
	public String removeComponent() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Component p = componentService.get(new Long(id));
//			p.setStoreId(null);
			componentService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "库存明细统计 ")
	public String countStore() {
		
		List<Map<String,Object>> list = storeJoinComponentService.queryByScript("store.count_component_detail", String.valueOf(componId));
		
		Long totalCounts = 0l ;
		for(Map<String,Object> map : list){
			totalCounts = totalCounts + (Long) map.get("counts");
		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(totalCounts).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	@ActionLog(description = "添加人员关联")
	public String importUser() {
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			appUser = appUserService.get(new Long(id));
			storeHouse = storeHouseService.get(storeId);
			StoreJoinUser pja = new StoreJoinUser();
			pja.setAppUser(appUser);
			pja.setStoreHouse(storeHouse);
			storeJoinUserService.save(pja);
		}
		return SUCCESS;
	}
	
	
	
	@ActionLog(description = "移除人员关联")
	public String removeUser() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			StoreJoinUser pja = storeJoinUserService.get(new Long(id));
			storeJoinUserService.remove(pja);
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "查询关联人员")
	public String listOnStore() {
		String storeId = getRequest().getParameter("storeId");
		List<Map<String,Object>> list = storeHouseService.queryByScript("store.store_user_list", storeId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "修改仓库名称")
	public String change() {
		storeHouseService.changeStoreName(storeHouse);
		return SUCCESS;
	}
}
