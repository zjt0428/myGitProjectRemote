package com.knight.emms.model;

import java.math.BigDecimal;

import org.apache.commons.lang.builder.HashCodeBuilder;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: PractiInsuranceDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PractiInsuranceDetail extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;

	@Expose
	private Long insureId;

	@Expose
	private Long practiId;
	@Expose
	private Practitioner practitioner;

//	private PractiInsurance practiInsurance;
	
	/**从业工种（投保时）*/
	@Expose
	@CodeFieldDeclare(codeId = "kindWork", valueField = "kindWorkName")
	private String kindWork;

	@Expose
	private String kindWorkName;
	
	/**保费*/
	@Expose
	private BigDecimal premium;

	@Expose
	private Long contractId;

	/**合同编号*/
	@Expose
	private String contractNo;
	
	/**当前项目ID（Practitioner投保时）*/
	@Expose
	private Long projectId;

	/**当前项目（Practitioner投保时）*/
	@Expose
	private String projectName;
	
	/**项目地址（投保时）*/
	private String address;
	
	@Expose
	private String remark;
	//累计保费
	@Expose
	private BigDecimal acculmatedpremium;
	//累计理赔
	@Expose
	private BigDecimal acculmatedclaim;
	
	/**生效日期（投保时的起保日期）*/
	@Expose
	private String startInsureDate;
	
	@Expose
	private String defaultFlag;
	
	@Expose
	private String delFlag = "1";
	

	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.detailId).toHashCode();
	}
   
   
   
  
   
   
   
}
