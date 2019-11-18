/**
 *====================================================
 * 文件名称: TechnicalDisclosureAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.EquipInstallReview;
import com.knight.emms.model.TechnicalDisclosure;
import com.knight.emms.service.EquipInstallReviewService;
import com.knight.emms.service.TechnicalDisclosureService;

/**
 * @ClassName: TechnicalDisclosureAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:42:54
 */
public class EquipInstallReviewAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipInstallReview equipInstallReview;

	@Getter
	@Setter
	private Long reviewId;

	@Resource
	private EquipInstallReviewService equipInstallReviewService;

	public String reviewlist() {
		List<Map<String, Object>> relist = equipInstallReviewService.queryByScript("equipdoc.equip_install_dismantle_detail");
		StringBuffer buff = new StringBuffer("{\"success\":true,\"result\":");
		buff.append(GsonUtil.toJson(relist));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	public String load() {
		Long reviewId = Long.valueOf(getRequest().getParameter("reviewId"));
		List<Map<String, Object>> celist = equipInstallReviewService.queryByScript("equipdoc.pc_rectify_review_detail", reviewId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(celist.size()).append(",result:");
		buff.append(GsonUtil.toJson(celist, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	/*@ActionLog(description = "保存或更新技术交底")
	public String save() {
		if (equipInstallReview.getReviewId() == null) {
			equipInstallReviewService.saveSerialModel(equipInstallReview);
			setFileAttach(equipInstallReview.getReviewId());
		} else {
			equipInstallReviewService.save(equipInstallReview);
		}
		return SUCCESS;
	}*/

	@ActionLog(description = "删除技术交底")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipInstallReviewService.remove(new Long(id));
		}
		return SUCCESS;
	}

	/*public String print() {
		equipInstallReviewService = equipInstallReviewService.getTranslateFull(reviewId);
		return getRequest().getParameter("formpage");
	}
*/
}
