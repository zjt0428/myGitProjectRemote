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

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: InsureClaim
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipInsuranceClaimRecord  extends BaseModel  {

	private static final long serialVersionUID = 1L;


	@Expose
	private Long claimId;
	
	@Expose
	private Long insureId;
	/**保险理赔单号*/
	@Expose
	private String insureSerial;
	@Expose
	private String bankDeposit;
	/**账号*/
	@Expose
	private String depositAccount;
	/**理赔时间*/
	@Expose
	private String claimDate;
	//损失数
	@Expose
	private BigDecimal costAmount;
	//理赔数
	@Expose
	private BigDecimal claimAmount;
	/**理赔事由*/
	@Expose
	private String claimReason;
	
	@Expose
	private Long equipId;
	
	@Expose
	private Equipment equipment;
	
	@Expose
	private Long contractId;

	/**当前项目*/
	@Expose
	private String projectName;
	
	@Expose
	private String remark;
	
	private String delFlag;
	

	
	
}
