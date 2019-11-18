/**
 *====================================================
 * 文件名称: SafeCheckAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-1-23			chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.SafeCheck;
import com.knight.emms.service.SafeCheckService;

import lombok.Getter;
import lombok.Setter;
/**
 * @ClassName: SafeCheckAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017-1-23 下午2:11:10
 */
public class SafeCheckAction extends BaseAction{

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private SafeCheck safeCheck;
	
	@Getter
	@Setter
	private Long safeCheckId;
	
	@Resource
	private SafeCheckService safeCheckService;

	
	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
		List<SafeCheck> list = safeCheckService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load(){
		SafeCheck safeCheck = safeCheckService.getTranslateFull(safeCheckId);
		StringBuffer buff = new StringBuffer("{success:true,data:[");
		buff.append(GsonUtil.toJson(safeCheck,GsonUtil.SINCE_VERSION_20,false));
		buff.append("]}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	@ActionLog(description="新增或更新安全检查信息")
	public String save(){
		if(safeCheck.getComponent() != null && safeCheck.getComponent().getComponId() == null){
			safeCheck.setComponent(null);
		}
		if(safeCheck.getProject() != null && safeCheck.getProject().getProjectId() == null){
			safeCheck.setProject(null);
		}
		if(safeCheck.getSafeCheckId() == null){
			super.isCreateFileAttach = true ;
		} 
		safeCheckService.saveOrUpdate(safeCheck);
		super.createFileAttach(safeCheck.getSafeCheckId());
		return SUCCESS;
	}
	
	@ActionLog(description="删除安全检查信息")
	public String multiDelAll(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			safeCheckService.deleteAll(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description="删除安全检查信息")
	public String multiDelContent(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			safeCheckService.deleteContent(new Long(id));
		}
		return SUCCESS;
	}
	
	public String printData(){
		safeCheck = safeCheckService.getTranslateFull(safeCheckId);
		return getRequest().getParameter("formpage");
	}
}
