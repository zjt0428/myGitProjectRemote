/**
 *====================================================
 * 文件名称: VerifySelfAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.VerifySelf;
import com.knight.emms.model.VerifyStandard;
import com.knight.emms.service.VerifySelfService;
import com.knight.emms.support.VerifyStandardSupport;

/**
 * @ClassName: VerifySelfAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-26 下午11:49:43
 */
public class VerifySelfAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private VerifySelf verifySelf;

	@Getter
	@Setter
	private Long selfId;

	@Resource
	private VerifySelfService verifySelfService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<VerifySelf> list = verifySelfService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		VerifySelf v = verifySelfService.getTranslateFull(selfId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(v, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存自检报告")
	public String save() {
		if (verifySelf.getSelfId() == null) {
			verifySelf.setDelFlag(Constant.ENABLED);
		} else {
			VerifySelf vs = verifySelfService.get(verifySelf.getSelfId());
			verifySelf.setProvidedDate(vs.getProvidedDate());
			verifySelf.setDelFlag(vs.getDelFlag());
		}
		verifySelfService.saveOrMerge(verifySelf);
		return SUCCESS;
	}

	@ActionLog(description = "删除自检报告")
	public String multiDel() {
		String[] selfIds = getRequest().getParameterValues("ids");
		for (String selfId : selfIds) {
			VerifySelf vs = verifySelfService.get(new Long(selfId));
			vs.setDelFlag(Constant.DISENABLED);
			verifySelfService.save(vs);
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印自检报告")
	public String print() {
		verifySelf = verifySelfService.getTranslateFull(selfId);
		Map<String, List<VerifyStandard>> verifyStandards = VerifyStandardSupport.groupingLevel1(verifySelf.getSelfStandardSet());
		getRequest().setAttribute("verifyStandards", verifyStandards);
		String formpage = getRequest().getParameter("formpage");
		String verifyType = verifySelf.getEquipFlow().getEquipDiary().getVerifyType();
		if ("T".equals(verifyType)) {
			formpage = formpage + "TowerCrane";
		} else {
			formpage = formpage + "Lift";
		}
		return formpage;
	}

}
