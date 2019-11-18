/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SystemSqlAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.support.DesCipher;
import com.knight.core.util.DateUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.service.SystemSqlService;

/**
 * @ClassName: SystemSqlAction
 * @Description: sql操作
 * @author chenxy
 * @date 2013-8-26 上午11:45:22
 */
public class SystemSqlAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private String sql;

	@Setter
	@Getter
	private String cryptogram;

	@Resource
	private SystemSqlService systemSqlService;

	public String open() {
		try {
			String proclaim = DesCipher.getInstance().decrypt(cryptogram);
			if (DateUtil.getCurrentDateStr().equals(proclaim)) {
				getRequest().getSession().setAttribute("loadsqlvalidate", Boolean.TRUE);
				return "success";
			}
		} catch (Exception e) {
			logger.error("", e);
		}
		return "fail";
	}

	public String query() {
		Object validate = getRequest().getSession().getAttribute("loadsqlvalidate");
		if (!Boolean.TRUE.equals(validate)) {
			return "fail";
		}
		getRequest().setAttribute("sql", sql);
		logger.info("查询sql:" + sql);
		try {
			PagingBean pb = new PagingBean(0, 5000);
			pb.setLimitSize("true".equals(getRequest().getParameter("limited")));
			List<Map<String, Object>> result = systemSqlService.query(sql, pb);
			if (!result.isEmpty()) {
				Map<String, Object> matedate = result.get(0);
				getRequest().setAttribute("matedate", matedate.keySet());
			}
			getRequest().setAttribute("message", "共可查询记录数为:" + pb.getTotalItems() + ", 实际显示记录为:" + result.size());
			getRequest().setAttribute("result", result);
		} catch (Exception e) {
			getRequest().setAttribute("message", e.getMessage());
		}
		return "query";
	}

	public String update() {
		Object validate = getRequest().getSession().getAttribute("loadsqlvalidate");
		if (!Boolean.TRUE.equals(validate)) {
			return "fail";
		}
		getRequest().setAttribute("sql", sql);
		logger.info("执行sql:" + sql);
		try {
			int number = systemSqlService.excute(sql);
			getRequest().setAttribute("message", "影响记录数:" + number);
		} catch (Exception e) {
			getRequest().setAttribute("message", e.getMessage());
		}
		return "update";
	}

}
