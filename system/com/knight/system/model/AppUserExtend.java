/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserExtend.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-6-22			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.model;

import lombok.Data;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

/**
 * @ClassName: AppUserExtend
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-6-22 下午11:09:44
 */
@Data
public class AppUserExtend extends UserExtend {

	private static final long serialVersionUID = 1L;

	private Long extendId;

	private Long userId;

	private Long foreignId;

	private String foreignName;

	private String foreignModule;
	
	public boolean equals(Object obj) {
		if (!(obj instanceof AppUserExtend)) {
			return false;
		}
		AppUserExtend rhs = (AppUserExtend) obj;
		return new EqualsBuilder().append(this.userId, rhs.userId).append(this.foreignId, rhs.foreignId).append(this.foreignModule, rhs.foreignModule).isEquals();
	}

	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.userId).append(this.foreignId).append(this.foreignModule).toHashCode();
	}

}
