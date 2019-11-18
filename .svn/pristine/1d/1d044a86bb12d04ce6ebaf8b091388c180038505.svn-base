/**
 *====================================================
 * 文件名称: RentEquipBrief.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月11日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: RentEquipBrief
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月11日 下午10:38:25
 */
@Data
@PersistantDeclare()
public class RentEquipBrief extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long rentEquipBriefId;

	@Expose
	private Long rentId;

	@Expose
	private Long equipId;

	@Expose
	private String recordSerial;

	@Expose
	private String recordId;

	@Expose
	private String exwSerial;

	@Expose
	private String equipCategoryName;

	@Expose
	private String equipSpecificName;

	@Expose
	private String buildingNum;

	@Expose
	private String unit;

	@Expose
	private String startRentDate;

	@Expose
	private String endRentDate;

	@Expose
	private Integer rentDays;

	@Expose
	private BigDecimal rentStandard;

	@Expose
	private String measurement;

	@Expose
	private Integer quantity;

	@Expose
	private BigDecimal daysRent;

	@Expose
	private BigDecimal deductRent;

	@Expose
	private BigDecimal summary;

	@Expose
	private String remark;
	
	@Expose
	private String monthTag;

	public String getSpecificKey() {
		return this.buildingNum + this.equipCategoryName + this.equipSpecificName + this.recordId;
	}

}
