/**
 *====================================================
 * 文件名称: PractiDiaryAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
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
import com.knight.emms.constant.Constant;
import com.knight.emms.model.PractiDiary;
import com.knight.emms.service.PractiDiaryService;

/**
 * @ClassName: PractiDiaryAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:39:47
 */
public class PractiDiaryAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private PractiDiary practiDiary;

	@Setter
	@Getter
	private Long practiDiaryId;

	@Resource
	private PractiDiaryService practiDiaryService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PractiDiary> list = practiDiaryService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除人员任务计划信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiDiary c = practiDiaryService.get(new Long(id));
			if (Constant.DISENABLED.equals(c.getActive())) {
				practiDiaryService.remove(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除已调配人员")
	public String fulfil() {
		practiDiaryService.fulfil(practiDiaryId);
		return SUCCESS;
	}

}
