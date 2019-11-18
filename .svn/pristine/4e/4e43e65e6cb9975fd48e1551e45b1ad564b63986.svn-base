package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.dao.BaseDepotPermissionDao;
import com.knight.emms.model.BaseDepot;
import com.knight.emms.model.BaseDepotPermission;
import com.knight.emms.model.BasedepotJoinMaterials;
import com.knight.emms.model.BasedepotJoinUser;
import com.knight.emms.model.MaterialsSpecifications;
import com.knight.emms.service.BaseDepotJoinUserService;
import com.knight.emms.service.BaseDepotService;
import com.knight.emms.service.BasedepotJoinMaterialsService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;

import lombok.Getter;
import lombok.Setter;

public class BaseDepotAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long depotId;
	@Getter
	@Setter
	private Long storeId;

	@Getter
	@Setter
	private Long storeMaterialsId;

	@Getter
	@Setter
	private Long userId;

	@Getter
	@Setter
	private BaseDepot baseDepot;

	@Resource
	private BaseDepotService baseDepotService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;

	@Resource
	private BaseDepotPermissionDao baseDepotPermissionDao;

	@Resource
	private BasedepotJoinMaterialsService basedepotJoinMaterialsService;

	@Getter
	@Setter
	private AppUser appUser;

	@Resource
	private AppUserService appUserService;

	@Resource
	private BaseDepotJoinUserService baseDepotJoinUserService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BaseDepot> list = baseDepotService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String arrayList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BaseDepot> list = baseDepotService.getAll(filter);
		StringBuffer buff = new StringBuffer("[");
		for (BaseDepot t : list) {
			for (BaseDepotPermission str : t.getBaseDepotPermissionSet()) {
				if (str.getUserId() == userId) {
					buff.append("['" + str.getUserId() + "','" + str.getDepotName() + "'],");
				}
			}
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		BaseDepot m = baseDepotService.getTranslate(depotId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "根据当前用户查找仓库（权限）")
	public String listPermission() {
		String depotName = getRequest().getParameter("depotName");
		if(StringUtils.isBlank(depotName)) {
			depotName = "";
		}
		Long userId = ApplicationContainer.getCurrentUserId();
		List<Map<String,Object>> list = baseDepotJoinUserService.queryByScript("materials.basedepot_join_user", userId,"%"+depotName+"%");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新仓库")
	public String save() {
		baseDepot.setDelFlag(Constant.ENABLED);
		if (baseDepot.getDepotId() == null) {
			baseDepotService.save(baseDepot);
		}
		baseDepot.setSubBaseDepot();
		baseDepotService.merge(baseDepot);

		return SUCCESS;
	}

	@ActionLog(description = "删除仓库")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			BaseDepot bd = baseDepotService.get(new Long(id));
			bd.setDelFlag(Constant.DISENABLED);
			baseDepotService.update(bd);
		}
		return SUCCESS;
	}

	@ActionLog(description = "添加周材到仓库")
	public String addSpecific() throws JSONException {
		String[] ids = getRequest().getParameterValues("ids");
		String counts = getRequest().getParameter("counts");
		String id = null;
		Integer count = null;
		for (String s : counts.replace("[", "").replace("]", "").trim().split("},")) {
			if (s.lastIndexOf("}") + 1 != s.length()) {
				s = s.concat("}");
			}
			JSONObject myJsonObject = new JSONObject(s);
			// 获取对应的值
			id = myJsonObject.getString("id");
			count = myJsonObject.getInt("counts");

			MaterialsSpecifications p = materialsSpecificationsService.get(new Long(id));
			BasedepotJoinMaterials bm = new BasedepotJoinMaterials();
			BaseDepot bd = baseDepotService.get(depotId);
			bm.setMaterialsSpecifications(p);
			bm.setBaseDepot(bd);
			bm.setCounts(Long.valueOf(count));
			basedepotJoinMaterialsService.save(bm);
		}

		return SUCCESS;
	}

	@ActionLog(description = "指定仓库周材信息")
	public String listSpecific() {
		QueryFilter filter = new QueryFilter(getRequest());

		List<BasedepotJoinMaterials> list = basedepotJoinMaterialsService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "移除仓库周材信息")
	public String delSpecific() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			basedepotJoinMaterialsService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "查询关联人员")
	public String listOnDepotId() {
		List<Map<String, Object>> list = basedepotJoinMaterialsService.queryByScript("materials.basedepot_user_list",
				depotId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "添加人员关联")
	public String importUser() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", storeId.toString());
			filter.addConjunctFilter("Q_appUser.userId_L_EQ", id.toString());
			List<BasedepotJoinUser> list = baseDepotJoinUserService.getAll(filter);
			if(list.size()>0) {
				throw new BusinessException("用户已关联此仓库，请勿重复添加！");
			}
			appUser = appUserService.get(new Long(id));
			BaseDepot bd = baseDepotService.get(storeId);
			BasedepotJoinUser pja = new BasedepotJoinUser();
			pja.setAppUser(appUser);
			pja.setBaseDepot(bd);
			baseDepotJoinUserService.save(pja);
		}
		return SUCCESS;
	}

	@ActionLog(description = "移除人员关联")
	public String removeUser() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			BasedepotJoinUser pja = baseDepotJoinUserService.get(new Long(id));
			baseDepotJoinUserService.remove(pja);
		}
		return SUCCESS;
	}

}
