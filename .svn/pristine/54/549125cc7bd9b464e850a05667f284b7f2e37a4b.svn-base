/**
 *====================================================
 * 文件名称: FormReviewServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.HashMap;
import java.util.Map;

import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.Type;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.dao.FormReviewDao;
import com.knight.emms.model.FormReview;
import com.knight.emms.service.FormReviewService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: FormReviewServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-7 上午8:09:26
 */
public class FormReviewServiceImpl extends BusinessLongPKServiceImpl<FormReview> implements FormReviewService {

	private FormReviewDao formReviewDao;

	@Setter
	private Map<String, BusinessFlowService<ApplyforState>> businessFlowServices = new HashMap<String, BusinessFlowService<ApplyforState>>();

	public FormReviewServiceImpl(FormReviewDao dao) {
		super(dao);
		this.formReviewDao = dao;
	}

	private void checkApplyfor(FormReview formReview) {
		if (businessFlowServices.containsKey(formReview.getRelateModule())) {
			BusinessFlowService<ApplyforState> flowService = businessFlowServices.get(formReview.getRelateModule());
			if (Type.Applyfor.pass.equals(formReview.getReviewOpinion())) {
				flowService.passReviewApplication(formReview);
			} else {
				flowService.rejectReviewApplication(formReview);
			}
		} else {
			throw new BusinessException("受理类型未定义,不支持该受理信息!");
		}
	}

	public void parserReview(FormReview formReview) {
		checkApplyfor(formReview);
		formReviewDao.save(formReview);
	}

}
