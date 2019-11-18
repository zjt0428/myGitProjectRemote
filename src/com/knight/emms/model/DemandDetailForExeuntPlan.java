/**
 *====================================================
 * 文件名称: DemandDetail.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;


@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class DemandDetailForExeuntPlan extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long demandId;

	@Expose
	private Long exeuntPlanId;

	@Expose
	private String mnemonicCode;
	
	@Expose
	private Long commodityId;

	@Expose
	private String commodity;

	@Expose
	private String demandSerial;

	@Expose
	private String specifications;

	@Expose
	private String brand;
	
	@Expose
	private String unit;
	
	@Expose
	private String demandNum;
	
	@Expose
	private String auxiliaryUnit;
	
	@Expose
	private String auxiliaryNum;
	
	@Expose
	private String exeuntDate;
	
	@Expose
	private Long relateId;
	
	@Expose
	private String relateModule;

	
}
