/**
 *====================================================
 * 文件名称: SettleEquipBrief.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
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
 * @ClassName: SettleEquipBrief
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午4:02:24
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class OtherExpenseStatement extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long statementId;

	@Expose
	private Long settleId;

	@Expose
	private Long equipId;
	@Expose
	private Equipment equipment;

	@Expose
	private String expenseItem;

	@Expose
	private Integer number;

	@Expose
	private BigDecimal price;

	@Expose
	private String unit;
	
	@Expose
	private BigDecimal amount;

	@Expose
	private String taxRate;

	@Expose
	private String preTaxAmount;

	@Expose
	private String afterTaxAmount;

	@Expose
	private String taxes;
	
	@Expose
	private String buildingNum;
	
	@Expose
	private String equipSerial;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private String equipSpecificName;
	
	@Expose
	private Long contractId;
	
	@Expose
	private Long equipDiaryId;
}
