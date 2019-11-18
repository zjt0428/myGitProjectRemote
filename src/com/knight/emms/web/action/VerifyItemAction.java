/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyItemAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.VerifyItem;
import com.knight.emms.model.VerifyItemDemand;
import com.knight.emms.service.VerifyItemService;

/**
 * @ClassName: VerifyItemAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-6 下午3:05:47
 */
public class VerifyItemAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private Long itemId;

	@Setter
	@Getter
	private Long demandId;

	@Setter
	@Getter
	private Long parentItemId;

	@Setter
	@Getter
	private String itemName;

	@Setter
	@Getter
	private String vitemType;

	@Resource
	private VerifyItemService verifyItemService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<VerifyItem> list = verifyItemService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "保存检测项")
	public String save() {
		if (StringUtils.isBlank(vitemType)) {
			vitemType = "0";
		}
		verifyItemService.saveItem(parentItemId, itemId, itemName, vitemType);
		return SUCCESS;
	}

	@ActionLog(description = "删除检测项")
	public String multiDel() {
		String[] itemIds = getRequest().getParameterValues("ids");
		for (String itemId : itemIds) {
			verifyItemService.deleteItem(new Long(itemId));
		}
		return SUCCESS;
	}

	public String listDemand() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<VerifyItemDemand> list = verifyItemService.queryDemandByItem(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "保存检测要求")
	public String saveDemand() {
		String demandDes = getRequest().getParameter("demandDes");
		verifyItemService.saveDemand(itemId, demandId, demandDes);
		return SUCCESS;
	}

	@ActionLog(description = "删除检测要求")
	public String multiDelDemand() {
		String[] demandIds = getRequest().getParameterValues("ids");
		for (String demandId : demandIds) {
			verifyItemService.deleteDemand(new Long(demandId));
		}
		return SUCCESS;
	}

	public String listSelect() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Map<String, Object>> demandList = verifyItemService.queryDemand(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(demandList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

}
