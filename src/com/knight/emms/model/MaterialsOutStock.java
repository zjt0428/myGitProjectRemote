/**
 *====================================================
 * 文件名称: MaterialsOutStock.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年12月04日		Chen·G·Y(创建:创建文件)
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
import com.knight.core.model.ExportModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: MaterialsOutStock
 * @Description: 周材出库
 * @author Chen·G·Y
 * @date 2017年12月04日
 */
@Data
@ToString(exclude = { "outId" })
@EqualsAndHashCode(callSuper = false, exclude = { "outId" })
@Entity
@Table(name = "T_MATERIALS_OUT_STOCK")
public class MaterialsOutStock extends BaseModel implements ExportModel {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "OUT_ID")
	private Long outId;
	
	/** 品名 */
	@Expose
	@Column(name = "COMMODITY", updatable = false, nullable = false)
	private String commodity;

	/** 规格 */
	@Expose
	@Column(name = "SPECIFICATIONS", updatable = false, nullable = false)
	private String specifications;

	/** 单位 */
	@Expose
	@Column(name = "UNIT", updatable = false, nullable = false)
	private String unit;
	
	/** 数量 */
	@Expose
	@Column(name = "QUANTITY", updatable = false, nullable = false)
	private String quantity;
	
	/** 辅助数量 */
	@Expose
	@Column(name = "AUXILIARY_QUANTITY", updatable = false, nullable = false)
	private String auxiliaryQuantity;
	
	/** 出库时间 */
	@Expose
	@Column(name = "OUT_DATE", updatable = false, nullable = false)
	private String outDate;
	
	/** 出库类型 */
	@Expose
	@Column(name = "OUT_TYPE", updatable = false, nullable = false)
	private String outType;
	
	/** 出库库位ID */
	@Expose
	@Column(name = "LOCATION_ID", updatable = false)
	private Long locationId;
	
	/** 出库库位 */
	@Expose
	@Column(name = "LOCATION_NAME", updatable = false)
	private String locationName;
	
	/** 出库仓库ID */
	@Expose
	@Column(name = "DEPOT_ID", updatable = false)
	private Long depotId;
	
	/** 出库仓库 */
	@Expose
	@Column(name = "DEPOT_NAME", updatable = false)
	private String depotName;
	
	/** 关联业务 */
	@Expose
	@Column(name = "RELATE_BUSINESS", updatable = false, nullable = false)
	private String relateBusiness;
	
	/** 单据号 */
	@Expose
	@Column(name = "SERIAL", updatable = false, nullable = false)
	private String serial;
	
	/** 备注 */
	@Expose
	@Column(name = "REMARK", updatable = false)
	private String remark;
}
