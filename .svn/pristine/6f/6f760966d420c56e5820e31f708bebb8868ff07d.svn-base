/**
 *====================================================
 * 文件名称: LeaseSpoiledIndemnity.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月15日		chengy(创建:创建文件)
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
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: LeaseSpoiledIndemnity
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017年8月15日 下午5:12:52
 */
@Data
@Entity
@ToString(exclude = {"spoiledId"})
@EqualsAndHashCode(callSuper = false, exclude = {"spoiledId"})
@PersistantDeclare
@Table(name = "T_LEASE_SPOILED_INDEMNITY")
public class LeaseSpoiledIndemnity extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@Column(name = "SPOILED_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long spoiledId;
	
	@Expose
	@Column(name = "LEASE_ID")
	private Long leaseId;
	
	@Expose
	@Column(name = "DAMAGE_ID")
	private Long damageId;
	
	@Expose
	@Column(name = "COMMODITY_ID")
	private Long commodityId;
	
	@Expose
	@Column(name = "COMMODITY")
	private String commodity;
	
	@Expose
	@Column(name = "DAMAGE_TYPE")
	private String damageType;
	
	@Expose
	@Column(name = "MEASUREMENT_UNIT")
	private String measurementUnit;
	
	@Expose
	@Column(name = "DAMAGE_UNIT_PRICE")
	private String damageUnitPrice;
}
