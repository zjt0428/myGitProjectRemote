/**
 *====================================================
 * 文件名称: ContractMaterialsAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.emms.service.ContractMaterialsService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ContractMaterialsAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:32:28
 */
public class ContractMaterialsAction extends ExportBaseAction<ContractMaterials>{

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ContractMaterials contractMaterials;
	
	@Getter
	@Setter
	private AppUser appUser;
	
	@Getter
	@Setter
	private AppRole appRole;

	@Setter
	@Getter
	private Long contractmaId;

	@Resource
	private ContractMaterialsService contractMaterialsService;
	
	@Resource
	private ContractJoinUserService contractJoinUserService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		String str =  getRequest().getParameter("allocationProject");
		String province= getRequest().getParameter("province");
		String city= getRequest().getParameter("city");
		String county= getRequest().getParameter("county");
		if(province!=null||city!=null||county!=null) {
			//拼接地址
			String address = contractMaterialsService.concatAddress(province, city, county);
			if(address!=""){
				filter.addConjunctFilter("Q_address_S_LK", address);
			}
		}
		//项目用户，只显示用户相关联项目的合同；项目调拨，调入合同显示全部合同
		if("2".equals(ApplicationContainer.getCurrentUser().getUserType()) && !"allocationProject".equals(str)) {
			String contractIds = contractJoinUserService.concatGrantedContractId(ApplicationContainer.getCurrentUserId());
			filter.addValuesDisjunctFilter("Q_contractmaId_L_EQ", contractIds);
		}
		List<ContractMaterials> list = contractMaterialsService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ContractMaterials c = contractMaterialsService.getTranslate(contractmaId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新合同信息")
	public String save() {
		if (contractMaterials.getContractmaId() == null) {
			this.isCreateFileAttach = true;
			contractMaterials.setApplyforState(Status.ContractMaterialsApplyfor.waitSubmit);
			contractMaterials.setDelFlag(Constant.ENABLED);
//			if (StringUtils.isBlank(contractMaterials.getContractTheme())) {
				contractMaterials.setContractTheme(contractMaterials.getProjectName() + "的周材合同" + DateUtil.getCurrentDateStr());
//			}
		} else {
			ContractMaterials p = contractMaterialsService.editLoad(contractMaterials);
			if (!Status.ContractMaterialsApplyfor.waitSubmit.equals(p.getApplyforState())) {
				throw new BusinessException("合同不在状态,无法修改!");
			}
//			if (StringUtils.isBlank(contractMaterials.getContractSerial())) {
//				contractMaterials.setContractSerial(p.getContractSerial());
//			}
			contractMaterials.setApplyforState(p.getApplyforState());
			contractMaterials.setDelFlag(p.getDelFlag());
		}
		Long userId = null ;
		if(appUser!=null && appUser.getUsername()!=null) {
			//创建用户
			AppUser au = contractMaterialsService.createAppUser(appUser,appRole);
			userId = au.getUserId();
			contractMaterials.setGrantedUserId(userId);
		}
		contractMaterialsService.saveOrMergeForEdit(contractMaterials);
		createFileAttach(contractMaterials.getContractmaId());
		if(userId != null) {
			//用户关联合同
			contractJoinUserService.saveCreate(contractMaterials.getContractmaId()+"", userId+"", "CONTRACT_MATERIALS");
		}
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(contractMaterials.getApplyforId());
		sb.append("}");
		this.jsonString = sb.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除合同信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractMaterials p = contractMaterialsService.get(new Long(id));
			if (Status.ContractMaterialsApplyfor.waitSubmit.equals(p.getApplyforState())) { 
				p.setDelFlag(Constant.DISENABLED);
				contractMaterialsService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除周材明细")
	public String multiDelMaterialsDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractMaterialsService.deleteMaterialsDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除价格设定信息")
	public String multiDelPriceSetting() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractMaterialsService.deletePriceSetting(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除损坏赔偿信息")
	public String multiDelMatDamage() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractMaterialsService.deleteMatDamage(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除费用处理信息")
	public String multiDelCostHandle() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractMaterialsService.deleteCostHandle(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除费用处理信息")
	public String multiDelScrap() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractMaterialsService.deleteScrap(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "提交合同信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractMaterials p = contractMaterialsService.get(new Long(id));
			if (Status.ContractMaterialsApplyfor.waitSubmit.equals(p.getApplyforState())) { // 0:新增
				p.setApplyforState(Status.ContractMaterialsApplyfor.waitAccept);
				contractMaterialsService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "作废合同信息")
	public String invalid() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ContractMaterials p = contractMaterialsService.get(new Long(id));
			p.setApplyforState(Status.ContractMaterialsApplyfor.invalid);
			contractMaterialsService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "合同树")
	public String tree() {
		StringBuffer buff = new StringBuffer();
		StringBuffer bf_equip = new StringBuffer("");
		StringBuffer bf_materials = new StringBuffer("");
		StringBuffer bf_truck = new StringBuffer("");

		List<Map<String,Object>> equip = contractMaterialsService.queryByScript("materials.paEnt_equip");
		for (int i=0;i<equip.size();i++) {	
			Map<String, Object> map = equip.get(i);
			bf_equip.append("{id:'" + map.get("PA_ENT") + "',text:'" +map.get("PA_ENT_NAME") + "',");  //
			if(map.get("PA_ENT")!= null){
				bf_equip.append(findChild((Long)map.get("PA_ENT"),"equip"));
			}
		}
		if (!(equip.isEmpty())) {
			bf_equip.deleteCharAt(bf_equip.length() - 1);
		}
		bf_equip.append("]}");
		
		List<Map<String,Object>> materials = contractMaterialsService.queryByScript("materials.paEnt_materials");
		for (int i=0;i<materials.size();i++) {	
			Map<String, Object> map = materials.get(i);
			bf_materials.append("{id:'" + map.get("PA_ENT") + "',text:'" +map.get("PA_ENT_NAME") + "',");		//
			if(map.get("PA_ENT")!= null){
				bf_materials.append(findChild((Long)map.get("PA_ENT"),"materials"));
			}
		}
		if (!(materials.isEmpty())) {
			bf_materials.deleteCharAt(bf_materials.length() - 1);
		}
		bf_materials.append("]}");
		
		List<Map<String,Object>> truck = contractMaterialsService.queryByScript("materials.paEnt_truck");
		for (int i=0;i<truck.size();i++) {	
			Map<String, Object> map = truck.get(i);
			bf_truck.append("{id:'" + map.get("PA_ENT") + "',text:'" +map.get("PA_ENT_NAME") + "',");		//checked:false,
			if(map.get("PA_ENT")!= null){
				bf_truck.append(findChild((Long)map.get("PA_ENT"),"truck"));
			}
		}
		if (!(truck.isEmpty())) {
			bf_truck.deleteCharAt(bf_truck.length() - 1);
		}
		bf_truck.append("]}");
		
		buff.append("[{id:'0',text:'设备合同',expanded:true,children:["+bf_equip+",{id:'1',text:'周材合同',expanded:true,children:["+bf_materials+",{id:'2',text:'泵车合同',expanded:true,leaf:true}]");    //当泵车合同有数据时用  children:["+bf_truck+"]  替换    leaf:true}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	public String findChild(Long paEnt,String str) {
		StringBuffer bf = new StringBuffer("");
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		if("materials".equals(str)){
			list = contractMaterialsService.queryByScript("materials.materials_list",paEnt);
		}
		if("equip".equals(str)){
			list = contractMaterialsService.queryByScript("materials.equip_list",paEnt);
		}
		if("truck".equals(str)){
			list = contractMaterialsService.queryByScript("materials.truck_list",paEnt);
		}
		bf.append("children:[");
		for (int i=0;i<list.size();i++) {
			Map<String, Object> map = list.get(i);
			bf.append("{id:'" + map.get("CONTRACT_ID") + "',text:'" + map.get("CONTRACT_THEME") + "',leaf:true},");  //checked:false,
		}
		bf.deleteCharAt(bf.length() - 1);
		bf.append("]},");
		return bf.toString();
	}
}
