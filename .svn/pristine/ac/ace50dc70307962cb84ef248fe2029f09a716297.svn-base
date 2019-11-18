/**
 *====================================================
 * 文件名称: LeaseMaterialsRecordAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：周材租借记录
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.AnnotationAction;
import com.knight.emms.model.LeaseMaterialsRecord;
import com.knight.emms.service.LeaseMaterialsRecordService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LeaseMaterialsRecordAction
 * @Description: 周材租借记录
 * @author 陈光毅
 * @date 2017年11月20日
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({@Result(name = "success", location = "/jsonString.jsp")})
@Controller("LeaseMaterialsRecordAction")
@Scope("prototype")
public class LeaseMaterialsRecordAction extends AnnotationAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long recordId;
	
	@Getter
	@Setter
	private LeaseMaterialsRecord leaseMaterialsRecord;

	@Resource
	private LeaseMaterialsRecordService leaseMaterialsRecordService;
	
	@Action("listLeaseMaterialsRecord")
	public String list () {
		QueryFilter filter = new QueryFilter(getRequest());
		List<LeaseMaterialsRecord> list = leaseMaterialsRecordService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@Action("loadLeaseMaterialsRecord")
	public String load () {
		LeaseMaterialsRecord r = leaseMaterialsRecordService.get(recordId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(r, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
}
