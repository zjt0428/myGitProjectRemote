/**
 *====================================================
 * 文件名称: InsureClaim.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
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
 * @ClassName: InsureClaim
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InsureClaim extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long insureClaimId;

	@Expose
	private Long insureId;

	@Expose
	private String insureSerial;

	@Expose
	private String bankDeposit;

	@Expose
	private String account;

	@Expose
	private Long equipId;

	@Expose
	private String claimDate;

	@Expose
	private String claimReson;

	@Expose
	private BigDecimal wastageAmount;

	@Expose
	private BigDecimal compensateAmount;

}
