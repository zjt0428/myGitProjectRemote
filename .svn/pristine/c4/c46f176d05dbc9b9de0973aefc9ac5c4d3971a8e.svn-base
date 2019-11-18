/**
 *====================================================
 * 文件名称: ReviewAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.model.Review;
import com.knight.emms.service.ReviewService;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * @ClassName: ReviewAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月25日 下午9:49:58
 */
public class ReviewAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private ReviewService reviewService;

	public String submit() {
		Tequest tequest = getTerminalMessage();
		Review review = new Review();
		review.setRelateId(tequest.getRelateId());
		review.setRelateModule(tequest.getRelateModule());
		review.setContent(tequest.getContent());
		review.setReviewTime(new Date());
		review.setScore(tequest.getScore());
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		review.setUserId(currentUser.getUserId());
		review.setUserName(currentUser.getFullname());
		if (tequest.getReviewId() != null) {
			Review parent = reviewService.get(tequest.getReviewId());
			review.setReview(parent);
		}
		reviewService.save(review);
		return SUCCESS;
	}

	public String list() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		filter.addConjunctFilter("Q_relateId_L_EQ", tequest.getQuery().getRelateId() + "");
		filter.addConjunctFilter("Q_relateModule_S_EQ", tequest.getQuery().getRelateModule());
		List<Review> list = reviewService.getAll(filter);
		JSONSerializer serializer = new JSONSerializer();
		serializer.exclude("class", "review");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), new String[] { "reviewTime" });
		successResponse(serializer.serialize(list));
		return SUCCESS;
	}
	
	public String count(){
		Tequest tequest = getTerminalMessage();
		Long relateId=tequest.getRelateId();
		Long userId=tequest.getUserId();
		String relateModule=tequest.getRelateModule();
		List<Map<String,Object>> maplist = reviewService.queryByScript("terminal.review_count",relateId,relateModule);
		successResponse(GsonUtil.toJson(maplist, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
}
