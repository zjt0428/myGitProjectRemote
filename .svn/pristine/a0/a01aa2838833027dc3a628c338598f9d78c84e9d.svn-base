/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: PagingBean.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.paging;

import lombok.Getter;
import lombok.Setter;

/**
 * 分页信息
 * @ClassName:PagingBean
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:56:46
 * @since JDK Version 1.5
 */
public class PagingBean {

	public static final String PAGING_BEAN = "_paging_bean";

	public static Integer DEFAULT_PAGE_SIZE = 25;

	public static Integer PORTLET_PAGE_SIZE = 8;

	@Getter
	@Setter
	public Integer start;

	@Getter
	@Setter
	private Integer pageSize;

	@Getter
	@Setter
	private Integer totalItems;

	@Getter
	@Setter
	private boolean limitSize = true;

	@Getter
	@Setter
	private boolean totalCounts = true;

	public PagingBean(int start, int limit) {
		this.pageSize = Integer.valueOf(limit);
		this.start = Integer.valueOf(start);
		if (this.pageSize < 0) {
			limitSize = false;
		}
	}

	public int getFirstResult() {
		return this.start.intValue();
	}

}
