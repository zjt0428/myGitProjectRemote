/**
 *====================================================
 * 文件名称: SettlementInfo.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年9月04日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: SettlementInfo
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年9月04日
 */
@Entity
@Data
@ToString(exclude = {"infoId"})
@EqualsAndHashCode(callSuper = false, exclude = {"infoId"})
@Table(name = "T_SETTLEMENT_INFO")
public class SettlementInfo extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@Column(name = "INFO_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long infoId;
	
	@Expose
	@Column(name = "PAYMENT_ID", nullable = false)
	private Long paymentId;
	
	@Expose
	@Column(name = "COMMODITY_ID", nullable = false)
	private Long commodityId;
	
	@Expose
	@Column(name = "MNEMONICS")
	private String mnemonics;
	
	@Expose
	@Column(name = "COMMODITY", nullable = false)
	private String commodity;
	
	@Expose
	@Column(name = "SPECIFICATIONS", nullable = false)
	private String specifications;
	
	@Expose
	@Column(name = "SETTLEMENT_DAYS")
	private String settlementDays;
	
	@Expose
	@Column(name = "MEASUREMENT_UNIT")
	private String measurementUnit;
	
	@Expose
	@Column(name = "QUANTITY")
	private String quantity;
	
	@Expose
	@Column(name = "UNIT_PRICE")
	private String unitPrice;
	
	@Expose
	@Column(name = "AMOUNT")
	private String amount;
	
	@Expose
	@Column(name = "REMARKS")
	private String remarks;
}
