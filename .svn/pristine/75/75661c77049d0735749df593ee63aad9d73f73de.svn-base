/**
 *====================================================
 * 文件名称: SideSystemAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-7-3			KI·C(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.app.model.SideSystem;
import com.knight.app.service.SideSystemService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;

/**
 * @ClassName: SideSystemAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author KI·C
 * @date 2017-7-3 	8:54:40
 */
public class SideSystemAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long sideId;
	
	@Getter
	@Setter
	private SideSystem sideSystem;
	
	@Resource
	private SideSystemService sideSystemService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());	
		List<SideSystem> list = sideSystemService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		SideSystem s = sideSystemService.get(sideId);
		StringBuffer buff = new StringBuffer("{success:true,data:[");
		buff.append(GsonUtil.toJson(s, false));
		buff.append("]}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "删除旁站记录")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			sideSystemService.remove(new Long(id));
		}
		return SUCCESS;
	}
	
	public String print(){
		sideSystem = sideSystemService.get(sideId);
		return getRequest().getParameter("formpage");
	}
	
}
