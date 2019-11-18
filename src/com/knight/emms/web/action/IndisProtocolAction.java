/**
 *====================================================
 * 文件名称: IndisProtocolAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.IndisProtocol;
import com.knight.emms.service.IndisProtocolService;

/**
 * @ClassName: IndisProtocolAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:38:39
 */
public class IndisProtocolAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private IndisProtocol indisProtocol;

	@Getter
	@Setter
	private Long protocolId;

	@Resource
	private IndisProtocolService indisProtocolService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<IndisProtocol> list = indisProtocolService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		IndisProtocol c = indisProtocolService.getTranslateFull(protocolId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新安拆协议")
	public String save() {
		if (indisProtocol.getProtocolId() == null) {
			this.isCreateFileAttach = true;
		}
		indisProtocolService.saveOrUpdate(indisProtocol);
		createFileAttach(indisProtocol.getProtocolId());
		return SUCCESS;
	}

	@ActionLog(description = "删除安拆协议中设备")
	public String multiDelEquip() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			indisProtocolService.deleteEquip(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除安拆协议")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			indisProtocolService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		indisProtocol = indisProtocolService.getTranslateFull(protocolId);
		return getRequest().getParameter("formpage");
	}

}
