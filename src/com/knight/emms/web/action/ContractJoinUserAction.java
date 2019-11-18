package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.model.ContractJoinUser;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.CodeService;

import lombok.Getter;
import lombok.Setter;

public class ContractJoinUserAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long joinId;

	@Resource
	private ContractJoinUserService contractJoinUserService;
	
	@Resource
	private CodeService codeService;
	
	public String list() {
		String start =  getRequest().getParameter("start");
		String limit =  getRequest().getParameter("limit");
		if(start==null) {
			start = "0";
		}
		if(limit==null) {
			limit = PagingBean.DEFAULT_PAGE_SIZE.toString();
		}
		String paEntName =  getRequest().getParameter("paEntName");
		String pbEntName =  getRequest().getParameter("pbEntName");
		String contractSerial =  getRequest().getParameter("contractSerial");
		String contractCategory =  getRequest().getParameter("contractCategory");
		String projectName =  getRequest().getParameter("projectName");
		String competentDepartment =  getRequest().getParameter("competentDepartment");
		String province =  getRequest().getParameter("province");
		String city =  getRequest().getParameter("city");
		String county =  getRequest().getParameter("county");
		String applyforState =  getRequest().getParameter("applyforState");
		String granting =  getRequest().getParameter("granting");
		String userId = getRequest().getParameter("userId");
		if(userId==null) {
			userId=ApplicationContainer.getCurrentUserId().toString();
		}
		Integer totalItems =0;
		String sqlId = "";
		if("granting".equals(granting)||"1".equals(userId)) {
			sqlId = "materials.contract_list";
		} else {
			sqlId = "materials.user_contract_list";
		}
		List<Map<String,Object>> list = contractJoinUserService.queryByScript(sqlId,start,limit,userId,
				pbEntName,paEntName,contractSerial,contractCategory,projectName,competentDepartment,province,city,county,applyforState);
		Map<String, String> codeMap = codeService.getCodeValueMap("CONTRACT_MATERIALS_STATUS");
		for(Map<String,Object> m : list) {
			m.put("applyforStateName", codeMap.get(m.get("applyforState")));
			totalItems=(Integer) m.get("totalItems");
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(totalItems).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "添加保存")
	public String save() {
		String[] ids = getRequest().getParameterValues("ids");
		String userId = getRequest().getParameter("userId");
		String relateModule = getRequest().getParameter("relateModule");
		
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_userId_L_EQ", userId);
		filter.addConjunctFilter("Q_relateModule_S_EQ", relateModule);
		List<ContractJoinUser> list = contractJoinUserService.queryTranslateAll(filter);
		boolean exist;
		for (String id : ids) {
			exist = false;
			for(ContractJoinUser c : list) {
				if(id.equals(c.getContractId().toString())){		//过滤掉已存在的记录
					exist = true;
				}
			}
			if(!exist) {
				contractJoinUserService.saveCreate(id, userId, relateModule);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractJoinUser cju = contractJoinUserService.get(new Long(id));
			contractJoinUserService.remove(cju);
		}
		return SUCCESS;
	}

}
