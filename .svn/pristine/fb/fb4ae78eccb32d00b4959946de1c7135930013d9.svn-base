/**
 *====================================================
 * 文件名称: CorpInfo.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: CorpInfo
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-25 下午9:57:41
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class CorpAccount extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long corpAccountId;

	@Expose
	private Long corpId;

	@Expose
	private String bankDeposit;

	@Expose
	private String account;

	@Expose
	private BigDecimal balance;

	@Expose
	private String address;

}
