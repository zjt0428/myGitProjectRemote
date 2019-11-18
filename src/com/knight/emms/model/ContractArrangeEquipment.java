/**
 *====================================================
 * 文件名称: ContractArrangeEquipment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: ContractArrangeEquipment
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:41:01
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ContractArrangeEquipment extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long arrangeEquipId;

	@Expose
	private Long arrangeId;

	@Expose
	private String equipGeneric;

	@Expose
	private String equipGenericName;

	@Expose
	private String equipVender;

	@Expose
	private String equipSpecific;

	@Expose
	private String equipSpecificName;
/*
	@Expose
	private Integer quantity;*/

	@Expose
	private BigDecimal overallHeight;

/*	@Expose
	private BigDecimal appearanceCost;

	@Expose
	private BigDecimal embeddedCost;

	@Expose
	private String settleMethod;*/
	
	@Expose
	private BigDecimal aboveZeroHeight;
	
	@Expose
	private BigDecimal baseHeight;
	
	@Expose
	private BigDecimal mololayerArea;
	
	@Expose
	private BigDecimal brachium;
	@Expose
	private String buildingNum;
	
	@Expose
	private BigDecimal initialHeight;
	
	@Expose
	private BigDecimal finalHeight;
	
	@Expose
	private String supplierName;
	
	@Expose
	private String startDate;
	
	@Expose
	private String endDate;
	
	@Expose
	private String planEndDate;
	
	@Expose
	private String recordId;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private Long equipId;
	
	
	

}
