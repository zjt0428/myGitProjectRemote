/**
 *====================================================
 * 文件名称: ContractArrangeSituationAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年5月12日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.ContractArrangeSituation;
import com.knight.emms.service.ContractArrangeSituationService;

/**
 * @ClassName: ContractArrangeSituationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年5月12日 上午9:38:05
 */
public class ContractArrangeSituationAction extends ExportBaseAction<ContractArrangeSituation> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ContractArrangeSituation contractArrangeSituation;

	@Getter
	@Setter
	private Long arrangeSituationId;

	@Resource
	private ContractArrangeSituationService contractArrangeSituationService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ContractArrangeSituation> list = contractArrangeSituationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ContractArrangeSituation c = contractArrangeSituationService.getTranslate(arrangeSituationId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String save() {
		contractArrangeSituationService.save(contractArrangeSituation);
		return SUCCESS;
	}

	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contractArrangeSituationService.remove(new Long(id));
		}
		return SUCCESS;
	}

}
