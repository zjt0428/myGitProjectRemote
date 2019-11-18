/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserKeyExtend.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-6-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.model;

import lombok.Data;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

import com.knight.core.model.BaseModel;

/**
 * @ClassName: AppUserKeyExtend
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-6-23 上午7:25:03
 */
@Data
public class AppUserKeyExtend extends BaseModel {

	private static final long serialVersionUID = 1L;

	private Long keyExtendId;

	private Long keyId;

	private Long foreignId;

	private String foreignName;

	private String foreignModule;

	public boolean equals(Object obj) {
		if (!(obj instanceof AppUserKeyExtend)) {
			return false;
		}
		AppUserKeyExtend rhs = (AppUserKeyExtend) obj;
		return new EqualsBuilder().append(this.keyId, rhs.keyId).append(this.foreignId, rhs.foreignId).append(this.foreignModule, rhs.foreignModule).isEquals();
	}

	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.keyId).append(this.foreignId).append(this.foreignModule).toHashCode();
	}

}
