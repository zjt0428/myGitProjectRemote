/**
 *====================================================
 * 文件名称: EquipVerifyAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.EquipVerify;
import com.knight.emms.model.VerifyStandard;
import com.knight.emms.service.EquipVerifyService;
import com.knight.emms.support.VerifyStandardSupport;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipVerifyAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:39:28
 */
public class EquipVerifyAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipVerify equipVerify;

	@Getter
	@Setter
	private Long verifyId;

	@Resource
	private EquipVerifyService equipVerifyService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipVerify> list = equipVerifyService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipVerify p = equipVerifyService.getTranslateFull(verifyId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新验收信息")
	public String save() {
		if (equipVerify.getVerifyId() == null) {
			equipVerify.setEffective(Constant.DISENABLED);
			equipVerify.setDelFlag(Constant.ENABLED);
		} else {
			EquipVerify p = equipVerifyService.get(equipVerify.getVerifyId());
			if(!Constant.DISENABLED.equals(p.getEffective())){
				throw new BusinessException("启动单已经生效，无法修改！");
			}
			equipVerify.setEquipFlow(p.getEquipFlow());
//			equipVerify.setVerifySerial(p.getVerifySerial());
			equipVerify.setDelFlag(p.getDelFlag());
			equipVerify.setEffective(p.getEffective());
		}
		equipVerifyService.saveOrUpdate(equipVerify);
		return SUCCESS;
	}

	@ActionLog(description = "删除验收信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipVerify p = equipVerifyService.get(new Long(id));
			if(Constant.DISENABLED.equals(p.getEffective())){
				p.setDelFlag(Constant.DISENABLED);
				equipVerifyService.save(p);
			}
			/*p.setDelFlag(Constant.DISENABLED);
			equipVerifyService.save(p);*/
		}
		return SUCCESS;
	}

	@ActionLog(description = "启用生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EquipVerify p = equipVerifyService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				equipVerifyService.effective(p);
			}
		}
		return SUCCESS;
	}
	public String print() {
		equipVerify = equipVerifyService.getTranslateFull(verifyId);
		Map<String, List<VerifyStandard>> verifyStandards = VerifyStandardSupport.groupingLevel1(equipVerify.getVerifyStandardSet());
		getRequest().setAttribute("verifyStandards", verifyStandards);
		return getRequest().getParameter("formpage");
	}
	public String reviewlist() {
		String recordId = getRequest().getParameter("Q_recordId_S_LK");
		String exwSerial = getRequest().getParameter("Q_exwSerial_S_LK");
		String projectName = getRequest().getParameter("Q_projectName_S_LK");
		String equipSerial = getRequest().getParameter("Q_equipSerial_S_LK");
		List<Map<String, Object>> relist = equipVerifyService.queryByScript("equipdoc.equip_install_dismantle_detail",recordId,exwSerial,projectName,equipSerial);
		StringBuffer buff = new StringBuffer("{\"success\":true,\"result\":");
		buff.append(GsonUtil.toJson(relist));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
