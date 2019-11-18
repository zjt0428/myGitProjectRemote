/**
 *====================================================
 * 文件名称: MaterialsPlanAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;
import com.knight.emms.model.DemandDetail;
import com.knight.emms.model.MaterialsPlan;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;
import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.service.MaterialsPlanService;

/**
 * @ClassName: MaterialsPlanAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:50:04
 */
public class MaterialsPlanAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private MaterialsPlan materialsPlan;
	
	@Getter
	@Setter
	private Long materialsPlanId;
	
	@Resource
	private MaterialsPlanService materialsPlanService;

	@Resource
	private CodeService codeService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsPlan> list = materialsPlanService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		MaterialsPlan c = materialsPlanService.getTranslate(materialsPlanId);
//		for(DemandDetail e : c.getDemandDetailSet()){
////			e.setCommodity(codeService.getCode("commodity",e.getCommodity()));
//			e.setMnemonicCode(codeService.getCode("mnemonicCode",e.getMnemonicCode()));
////			e.setSpecifications(codeService.getCode("specifications",e.getSpecifications()));
//		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新周材计划信息")
	public String save() {
		if (materialsPlan.getMaterialsPlanId() == null) {
			materialsPlan.setApplyforState(Status.MaterialApplyfor.waitSubmit);
		} else {
			MaterialsPlan a = materialsPlanService.editLoad(materialsPlan);
			materialsPlan.setApplyforState(a.getApplyforState());
		}
		materialsPlanService.saveOrMergeForEdit(materialsPlan);
		this.jsonString = "{success:true,applyforId:" + materialsPlan.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除周材计划")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsPlan materials = materialsPlanService.get(new Long(id));
			if (Status.MaterialApplyfor.waitSubmit.equals(materials.getApplyforState())) {
				materialsPlanService.remove(materials);
			}
		}
		return SUCCESS;
	}

//	@Action(description = "删除业务关联设备")
//	public String multiDelArrangeEquipment() {
//		String[] ids = getRequest().getParameterValues("ids");
//		for (String id : ids) {
//			contractArrangeService.deleteEquipment(new Long(id));
//		}
//		return SUCCESS;
//	}

	@ActionLog(description = "提交业务申请")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsPlan p = materialsPlanService.get(new Long(id));
			if (Status.MaterialApplyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.MaterialApplyfor.waitApproval);
				materialsPlanService.save(p);
//				materialsPlanService.sendSms(p);
			}
		}
		return SUCCESS;
	}

//	public String print() {
//		contractArrange = contractArrangeService.getTranslate(arrangeId);
//		return getRequest().getParameter("formpage");
//	}

}
