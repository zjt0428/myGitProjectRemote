/**
 *====================================================
 * 文件名称: AnnounceUser.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: AnnounceUser
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:27:43
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AnnounceUser extends BaseModel {

	protected static final long serialVersionUID = 1L;

	@Expose
	private Long announceUserId;

	private Long userId;

	private String userName;

	private Long announceId;

	@Expose
	private Date publishTime;

	@Expose
	private String readFlag;

	private String delFlag;

	@Expose
	private Announce announce;
}
