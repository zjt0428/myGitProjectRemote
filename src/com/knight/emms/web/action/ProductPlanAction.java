/**
 *====================================================
 * 文件名称: EquipActivateAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.ProductPlan;
import com.knight.emms.service.EquipActivateService;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.ProductPlanService;
import com.knight.emms.support.EmmsApplicationSupport;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipActivateAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-23 下午8:10:24
 */
public class ProductPlanAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ProductPlan productPlan;

	@Getter
	@Setter
	private Long productPlanId;

	@Resource
	private ProductPlanService productPlanService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ProductPlan> list = productPlanService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipActivateStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ProductPlan p = productPlanService.getTranslateFull(productPlanId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipActivateStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新生产计划信息")
	public String save() {
		if (productPlan.getProductPlanId() == null) {
			productPlan.setDelFlag(Constant.ENABLED);
			productPlanService.save(productPlan);
		} else {
			ProductPlan p = productPlanService.get(productPlan.getProductPlanId());
			productPlan.setDelFlag(p.getDelFlag());
			productPlanService.merge(productPlan);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除生产计划信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ProductPlan p = productPlanService.get(new Long(id));

				p.setDelFlag(Constant.DISENABLED);
				productPlanService.save(p);
		}
		return SUCCESS;
	}


}
