/**
 *====================================================
 * 文件名称: EquipFlowAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.strategy.SpecificClassExclusionStrategy;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.ProjectService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipFlowAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-1 上午9:47:59
 */
public class EquipFlowAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipFlow equipFlow;

	@Getter
	@Setter
	private Long flowId;

	@Resource
	private EquipFlowService equipFlowService;

	@Resource
	private ProjectService projectService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipFlow> list = equipFlowService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, GsonUtil.SINCE_VERSION_10, ExclusionStrategyConstant.equipFlowStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Double version = GsonUtil.SINCE_VERSION_10;
		equipFlow = equipFlowService.getTranslateFull(flowId);
		String loadProject = getRequest().getParameter("loadProject");
		if (loadProject != null) {
			equipFlow.setProject(projectService.get(equipFlow.getContractLease().getProjectId()));
		}
		String subversion = getRequest().getParameter("subversion");
		if (subversion != null) {
			version = GsonUtil.SINCE_VERSION_20;
			CodeServiceImpl.translate(equipFlow.getEquipInstall().getPractiDiarySet());
			CodeServiceImpl.translate(equipFlow.getEquipInstall().getComponDiarySet());
		}
		SpecificClassExclusionStrategy equipflowstrategy = ExclusionStrategyConstant.equipFlowStrategy;
		String loadwhole = getRequest().getParameter("loadwhole");
		if (loadwhole != null) {
			equipflowstrategy = ExclusionStrategyConstant.equipFlowWholeStrategy;
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(equipFlow, version, false, equipflowstrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
}
