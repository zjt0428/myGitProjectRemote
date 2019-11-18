/**
 *====================================================
 * 文件名称: AnnounceAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
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
import com.knight.emms.model.Announce;
import com.knight.emms.service.AnnounceService;

/**
 * @ClassName: AnnounceAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:45:33
 */
public class AnnounceAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Announce announce;

	@Getter
	@Setter
	private Long announceId;

	@Resource
	private AnnounceService announceService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Announce> list = announceService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Announce p = announceService.getTranslateFull(announceId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新公告信息")
	public String save() {
		if (announce.getAnnounceId() == null) {
			announce.setPublish(Constant.DISENABLED);
			announce.setDelFlag(Constant.ENABLED);
		} else {
			Announce p = announceService.get(announce.getAnnounceId());
			announce.setPublish(p.getPublish());
			announce.setDelFlag(p.getDelFlag());
		}
		announceService.saveOrMergeEdit(announce);
		this.jsonString = "{success:true,applyforId:" + announce.getAnnounceId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除公告发布范围")
	public String multiDelCategory() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			announceService.deletedCategory(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除公告信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Announce p = announceService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getPublish())) {
				p.setDelFlag(Constant.DISENABLED);
				announceService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "发布公告信息")
	public String multiPublish() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			announceService.publish(new Long(id));
		}
		return SUCCESS;
	}

}
