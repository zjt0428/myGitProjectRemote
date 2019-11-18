/**
 *====================================================
 * 文件名称: AnnounceCategory.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: AnnounceCategory
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:27:20
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AnnounceCategory extends BaseModel {

	protected static final long serialVersionUID = 1L;

	private Long announceCategoryId;

	private Long announceId;

	private Long userId;

	private String userName;

	private Long depId;

	private String depName;

	private Long scopeDepId;

	private String scopeDepName;

	private String category;

}
