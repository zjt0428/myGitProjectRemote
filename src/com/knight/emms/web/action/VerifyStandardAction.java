/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyStandardAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.web.action.BaseAction;
import com.knight.emms.service.VerifyStandardService;

/**
 * @ClassName: VerifyStandardAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-6 下午3:06:05
 */
public class VerifyStandardAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private VerifyStandardService verifyStandardService;

	public String multiDel() {
		String[] standardIds = getRequest().getParameterValues("ids");
		for (String standardId : standardIds) {
			if (StringUtils.isBlank(standardId)) {
				continue;
			}
			verifyStandardService.remove(new Long(standardId));
		}
		return SUCCESS;
	}

}
