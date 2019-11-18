/**
 *====================================================
 * 文件名称: EquipRepairCompon.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月6日			Administrator(创建:创建文件)
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
 * @ClassName: EquipRepairCompon
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月6日 上午8:52:45
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipRepairCompon extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long repairComponId;

	@Expose
	private Long repairId;

	@Expose
	private Integer counts;

	@Expose
	private String remark;

	@Expose
	private String type;

	@Expose
	private BigDecimal unitPrice;

	@Expose
	private BigDecimal summary;

	@Expose
	private Component component;
	
	@Expose
	private String faultLocation;

	@Expose
	private String unit;
	
	@Expose
	private String componGenericName;
	
	@Expose
	private String componSpecificName;
}
