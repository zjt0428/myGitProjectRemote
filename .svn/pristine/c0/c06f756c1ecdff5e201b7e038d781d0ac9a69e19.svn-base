/**
 *====================================================
 * 文件名称: MaterialsRepairAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.MaterialsRepair;
import com.knight.emms.service.MaterialsRepairService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: MaterialsRepairAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:32:28
 */
public class MaterialsRepairAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private MaterialsRepair materialsRepair;

	@Setter
	@Getter
	private Long materialsRepairId;

	@Resource
	private MaterialsRepairService materialsRepairService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsRepair> list = materialsRepairService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		MaterialsRepair c = materialsRepairService.getTranslate(materialsRepairId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新周材维修信息")
	public String save() {
		if (materialsRepair.getMaterialsRepairId() == null) {
			this.isCreateFileAttach = true;
			materialsRepair.setApplyforState(Status.Applyfor.waitSubmit);
			materialsRepair.setDelFlag(Constant.ENABLED);
		} else {
			MaterialsRepair p = materialsRepairService.editLoad(materialsRepair);
			if (!Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				throw new BusinessException("信息不在状态,无法修改!");
			}
			if (StringUtils.isBlank(materialsRepair.getRepairSerial())) {
				materialsRepair.setRepairSerial(p.getRepairSerial());
			}
			materialsRepair.setApplyforState(p.getApplyforState());
		}
		materialsRepairService.saveOrMergeForEdit(materialsRepair);
		createFileAttach(materialsRepair.getMaterialsRepairId());
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(materialsRepair.getApplyforId());
		sb.append("}");
		this.jsonString = sb.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除周材维修后信息")
	public String multiDelAfter() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			materialsRepairService.deleteAfter(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除周材维修前信息")
	public String multiDelBefore() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			materialsRepairService.deleteBefore(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除维修信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsRepair P = materialsRepairService.get(new Long(id));
            P.setDelFlag(Constant.DISENABLED);
            materialsRepairService.update(P);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交周材维修信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			MaterialsRepair p = materialsRepairService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) { // 0:新增
				p.setApplyforState(Status.Applyfor.waitApprove);
				materialsRepairService.save(p);
//				contractLeaseService.sendSms(p);
			}
		}
		return SUCCESS;
	}
	
	/*public String listBefore() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BeforeMaterialsRepair> list = materialsRepairService.queryBeforeRepairAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}*/
}
