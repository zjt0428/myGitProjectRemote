/**
 *====================================================
 * 文件名称: EquipRepairLocation.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年3月28日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: EquipRepairLocation
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年3月28日 下午8:39:24
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipRepairLocation extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long repairLocationId;

	@Expose
	private Long repairId;

	@Expose
	private String faultLocation;

	@Expose
	private Date spendDate;

	@Expose
	private String phenomenon;

	@Expose
	private String diagnosis;

	@Expose
	private String remark;

	@Expose
	private Date troubleshootDate;

	@Expose
	private Integer repairTime;

	@Expose
	private BigDecimal unitPrice;

	@Expose
	private Integer labour;

	@Expose
	private BigDecimal labourCharges;

	@Expose
	private Integer cumulativeDowntime;
	
	@Expose
	private String repairTeam;

}
