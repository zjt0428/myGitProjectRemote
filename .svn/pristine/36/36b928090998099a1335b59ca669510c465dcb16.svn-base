/**
 *====================================================
 * 文件名称: SettlementList.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月30日		陈光毅(创建:创建文件)
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
 * @ClassName: SettlementList
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月30日
 */
@Entity
@Data
@ToString(exclude = {"listId"})
@EqualsAndHashCode(callSuper = false, exclude = {"listId"})
@Table(name = "T_SETTLEMENT_LIST")
public class SettlementList extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@Column(name = "LIST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long listId;
	
	@Expose
	@Column(name = "SETTLEMENT_ID", nullable = false)
	private Long settlementId;
	
	@Expose
	@Column(name = "COMMODITY_ID", nullable = false, updatable = false)
	private Long commodityId;
	
	@Expose
	@Column(name = "COMMODITY", nullable = false, updatable = false)
	private String commodity;
	
	@Expose
	@Column(name = "SPECIFICATIONS_ID", nullable = false, updatable = false)
	private Long specificationsId;
	
	@Expose
	@Column(name = "SPECIFICATIONS", nullable = false, updatable = false)
	private String specifications;
	
	@Expose
	@Column(name = "RECEIPT_DATE", updatable = false)
	private String receiptDate;
	
	@Expose
	@Column(name = "RECEIPT_TYPE", updatable = false)
	private String receiptType;
	
	@Expose
	@Column(name = "MNEMONICS", updatable = false)
	private String mnemonics;
	
	@Expose
	@Column(name = "QUANTITY")
	private String quantity;
	
	@Expose
	@Column(name = "AUXILIARY_NUM")
	private String auxiliaryNum;
	
	@Expose
	@Column(name = "DAILY_RENT")
	private String dailyRent;
	
	@Expose
	@Column(name = "MEASUREMENT_UNIT")
	private String measurementUnit;
	
	@Expose
	@Column(name = "UNIT_CONVERSION")
	private String unitConversion;
	
	@Expose
	@Column(name = "CONVERTED_QUANTITY")
	private String convertedQuantity;
	
	@Expose
	@Column(name = "CONVERSION_DAYS")
	private String conversionDays;
	
	@Expose
	@Column(name = "AMOUNT")
	private String amount;
	
	@Expose
	@Column(name = "BEGIN_DATE")
	private String beginDate;
	
	@Expose
	@Column(name = "STOP_DATE")
	private String stopDate;
	
	@Expose
	@Column(name = "RELATE_SERIAL")
	private String relateSerial;

	@Expose
	@Column(name = "TOTAL_RENT")
	private String totalRent;
}
