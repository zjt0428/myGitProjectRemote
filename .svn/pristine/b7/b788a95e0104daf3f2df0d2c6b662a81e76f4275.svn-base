/**
 *====================================================
 * 文件名称: CustomerAccount.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: CustomerAccount
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午8:31:29
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class CustomerAccount extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long customerAccountId;

	@Expose
	private Long customerId;

	@Expose
	private String bankDeposit;

	@Expose
	private String account;

	@Expose
	private String address;

	/** 默认标识 */
	@Expose
	private boolean defaultFlag;

}
