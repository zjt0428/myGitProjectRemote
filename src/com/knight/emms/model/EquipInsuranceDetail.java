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
import com.knight.core.model.ExportModel;
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
public class EquipInsuranceDetail extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;

	@Expose
	private Long insureId;

	@Expose
	private Long equipId;
	
	@Expose
	private Equipment equipment;

	@Expose
	private EquipInsurance equipInsurance;

	/**设备价值*/
	@Expose
	private String equipWorth;

	/**保险种类*/
	@Expose
	private String insuranceCategory;

	/**保费*/
	@Expose
	private BigDecimal premium;

	@Expose
	private Long contractId;

	/**合同编号*/
	@Expose
	private String contractNo;

	/**当前项目*/
	@Expose
	private String projectName;
	
	/**存放地址*/
	private String address;
	
	@Expose
	private String remark;
	//累计保费
	@Expose
	private BigDecimal acculmatedpremium;
	//累计理赔
	@Expose
	private BigDecimal acculmatedclaim;
	
	@Expose
	private String startInsureDate;
	
	@Expose
	private String defaultFlag;

   
   
   
  
   
   
   
}
