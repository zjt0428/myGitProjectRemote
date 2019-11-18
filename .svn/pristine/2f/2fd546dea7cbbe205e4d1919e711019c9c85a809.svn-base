/**
 *====================================================
 * 文件名称: PractiResumeAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.PractiResume;
import com.knight.emms.service.PractiResumeService;

/**
 * @ClassName: PractiResumeAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-6 下午6:28:57
 */
public class PractiResumeAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private PractiResumeService practiResumeService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PractiResume> list = practiResumeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除从业记录信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiResume p = practiResumeService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			practiResumeService.save(p);
		}
		return SUCCESS;
	}

}
