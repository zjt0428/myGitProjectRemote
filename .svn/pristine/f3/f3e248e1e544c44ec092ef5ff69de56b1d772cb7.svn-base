package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: PractiInsuranceClaimRecord
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PractiInsuranceClaimRecord  extends BaseModel  {

	private static final long serialVersionUID = 1L;


	@Expose
	private Long claimId;
	
	@Expose
	private Long insureId;
	/**保险理赔单号*/
	@Expose
	private String insureSerial;
	/**开户行*/
	@Expose
	private String bankDeposit;
	/**账号*/
	@Expose
	private String depositAccount;
	/**理赔时间*/
	@Expose
	private String claimDate;
	//损失数额
	@Expose
	private BigDecimal costAmount;
	//理赔数额
	@Expose
	private BigDecimal claimAmount;
	/**理赔事由*/
	@Expose
	private String claimReason;
	/**理赔电话*/
	@Expose
	private String claimPhone;
	
	@Expose
	private Long practiId;
	
	@Expose
	private Practitioner practitioner;
	
	@Expose
	private Long contractId;
	
	/**当前项目ID*/
	@Expose
	private Long projectId;

	/**当前项目*/
	@Expose
	private String projectName;
	
	@Expose
	private String remark;
	
	private String delFlag;
	

	
	
}
