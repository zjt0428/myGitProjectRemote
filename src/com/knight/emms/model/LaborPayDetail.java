package com.knight.emms.model;

import java.math.BigDecimal;

import org.apache.commons.lang.builder.HashCodeBuilder;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: LaborPayDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "detailSerial", strategy = "LWZF-{yyyyMMdd}", maxseq = 999999)
public class LaborPayDetail extends BusinessModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;

	@Expose
	private Long laborPayId;
	
	@Expose
	private String detailSerial;
	
	/**支付时间*/
	@Expose
	private String payDate;
	
	/**应收金额*/
	@Expose
	private BigDecimal receivableAmount;
	
	/**应付金额*/
	@Expose
	private BigDecimal copeAmount;
	
	/**已付金额*/
	@Expose
	private BigDecimal paidAmount;
	
	/**本期支付金额*/
	@Expose
	private BigDecimal issueAmount;
	
	/**待付金额*/
	@Expose
	private BigDecimal pendingAmount;
	
	/**结余 */
	@Expose
	private BigDecimal balanceAmount;
	
	@Expose
	private String delFlag = "1";
	

	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.detailId).toHashCode();
	}


	@Override
	public void setModelSerial(String serial) {
		// TODO Auto-generated method stub
		this.detailSerial = serial;
	}
   
   
   
  
   
   
   
}
