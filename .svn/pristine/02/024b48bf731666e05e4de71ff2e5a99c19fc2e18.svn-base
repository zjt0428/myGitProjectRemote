/**
 *====================================================
 * 文件名称: PraiseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.Praise;
import com.knight.emms.service.PraiseService;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * @ClassName: PraiseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月25日 下午9:49:51
 */
public class PraiseAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private PraiseService praiseService;

	public String submit() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		filter.addConjunctFilter("Q_relateId_L_EQ", tequest.getRelateId() + "");
		filter.addConjunctFilter("Q_relateModule_S_EQ", tequest.getRelateModule());
		filter.addConjunctFilter("Q_userId_L_EQ", currentUser.getUserId() + "");
		List<Praise> list = praiseService.getAll(filter);
		if (!list.isEmpty()) {
			throw new BusinessException("已经点赞，不要重复点击！");
		}
		Praise praise = new Praise();
		praise.setRelateId(tequest.getRelateId());
		praise.setRelateModule(tequest.getRelateModule());
		praise.setPraiseTime(new Date());
		praise.setUserId(currentUser.getUserId());
		praise.setUserName(currentUser.getFullname());
		praiseService.save(praise);
		return SUCCESS;
	}

	public String list() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		filter.addConjunctFilter("Q_relateId_L_EQ", tequest.getQuery().getRelateId() + "");
		filter.addConjunctFilter("Q_relateModule_S_EQ", tequest.getQuery().getRelateModule());
		List<Praise> list = praiseService.getAll(filter);
		JSONSerializer serializer = new JSONSerializer();
		serializer.exclude("class");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), new String[] { "praiseTime" });
		successResponse(serializer.serialize(list));
		return SUCCESS;
	}

}
