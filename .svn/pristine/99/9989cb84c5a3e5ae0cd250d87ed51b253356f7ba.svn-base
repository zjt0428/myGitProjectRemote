/**
 *====================================================
 * 文件名称: SecureProtocolAction.java
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
import com.knight.emms.model.SecureProtocol;
import com.knight.emms.service.SecureProtocolService;

/**
 * @ClassName: SecureProtocolAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:42:09
 */
public class SecureProtocolAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private SecureProtocol secureProtocol;

	@Getter
	@Setter
	private Long protocolId;

	@Resource
	private SecureProtocolService secureProtocolService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SecureProtocol> list = secureProtocolService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		SecureProtocol c = secureProtocolService.getTranslateFull(protocolId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新安全协议")
	public String save() {
		if (secureProtocol.getProtocolId() == null) {
			secureProtocolService.saveSerialModel(secureProtocol);
			setFileAttach(secureProtocol.getProtocolId());
		} else {
			secureProtocolService.save(secureProtocol);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除安全协议")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			secureProtocolService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		secureProtocol = secureProtocolService.getTranslateFull(protocolId);
		return getRequest().getParameter("formpage");
	}

}
