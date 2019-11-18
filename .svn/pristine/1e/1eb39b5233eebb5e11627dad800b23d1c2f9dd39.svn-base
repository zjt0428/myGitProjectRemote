/**
 *====================================================
 * 文件名称: CorpInfoAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.app.model.TFlowDefine;
import com.knight.app.service.TFlowDefineService;
import com.knight.app.service.TFlowNodeService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.system.model.AppRole;
import com.knight.system.service.AppRoleService;

/**
 * @ClassName: CorpInfoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:07:05
 */
public class AppFlowDefineAction extends ExportBaseAction<TFlowDefine> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TFlowDefine flowDefine;

	@Setter
	@Getter
	private Long flowid;

	@Resource
	private TFlowDefineService defineService;
	
	@Resource
	private TFlowNodeService nodeService;
	
	@Resource
	private AppRoleService appRoleService;


	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TFlowDefine> list = defineService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}


	public String load() {
		TFlowDefine c = defineService.getTranslate(flowid);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存流程信息")
	public String save() {
		if (flowDefine.getFlowid() == null) {			
			flowDefine.setDelFlag(1);
			defineService.save(flowDefine);
		} else {
			TFlowDefine c = defineService.get(flowDefine.getFlowid());
			flowDefine.setCreateBy(c.getCreateBy());
			flowDefine.setCreateDt(c.getCreateDt());
			flowDefine.setDelFlag(c.getDelFlag());
			defineService.merge(flowDefine);
		}
		flowDefine.setSubNodes();;
		defineService.merge(flowDefine);
		return SUCCESS;
	}


	@ActionLog(description = "删除流程信息")
	public String del() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TFlowDefine c = defineService.get(new Long(id));
			c.setDelFlag(0);
			defineService.save(c);
		}
		return SUCCESS;
	}
	
	public String roleList() {
		List<AppRole> list = appRoleService.getAll();
		StringBuffer buff = new StringBuffer("[");
		for (AppRole entry : list) {
			buff.append("['" + entry.getRoleId() + "','" + entry.getRoleName() + "'],");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
}
