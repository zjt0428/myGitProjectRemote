/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FileDetailAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.web.action.BaseAction;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

/**
 * 
 * @ClassName:FileDetailAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:00:56
 * @since JDK Version 1.5
 */
public class FileDetailAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;

	@Resource
	private FileAttachService fileAttachService;

	@Getter
	@Setter
	private FileAttach fileAttach;

	@Getter
	@Setter
	private Long fileId;

	public String execute() throws Exception {
		this.fileAttach = ((FileAttach) this.fileAttachService.get(this.fileId));
		return SUCCESS;
	}

}
