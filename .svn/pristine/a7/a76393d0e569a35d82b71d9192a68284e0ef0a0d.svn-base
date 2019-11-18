/**
 *====================================================
 * 文件名称: EquipRepairVehicle.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年10月4日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: EquipRepairVehicle
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年10月4日 上午8:51:07
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipRepairVehicle extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long repairVehicleId;

	@Expose
	private Long repairId;

	@Expose
	private String licensePlate;

	@Expose
	private String vehicleModel;

	@Expose
	private BigDecimal vehicleAmount;

	@Expose
	private String remark;

}
