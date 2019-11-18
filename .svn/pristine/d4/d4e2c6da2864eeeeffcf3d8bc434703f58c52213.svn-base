/**
 *====================================================
 * 文件名称: LeaseList.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月18日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: LeaseList
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月18日
 */
@Data
@ToString(exclude = {"listId"})
@EqualsAndHashCode(callSuper=false, exclude = {"listId"})
@PersistantDeclare
@Entity
@Table(name="T_LEASE_LIST")
public class LeaseList extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIST_ID")
	private Long listId;
	
	/** 关联母表(租借申请表) */
	@Expose
	@Column(name = "APPLICATION_ID", updatable = false, nullable = false)
	private Long applicationId;
	
	/** 周材规格ID */
	@Column(name = "SPECIFICATIONS_ID", nullable = false)
	private Long specificationsId;
	
	/** 周材大类ID */
	@Expose
	@Column(name = "COMMODITY_ID", nullable = false)
	private Long commodityId;
	
	/** 周材品名 */
	@Expose
	@Column(name = "COMMODITY", nullable = false)
	private String commodity;
	
	/** 周材编号 */
	@Expose
	@Column(name = "MNEMONICS")
	private String mnemonics;
	
	/** 规格型号 */
	@Expose
	@Column(name = "SPECIFICATIONS")
	private String specifications;
	
	/** 计量单位 */
	@Expose
	@Column(name = "MEASUREMENT_UNIT")
	private String measurementUnit;
	
	/** 数量 */
	@Expose
	@Column(name = "QUANTITY")
	private String quantity;
	
	/** 含税单价 */
	@Expose
	@Column(name = "TAX_UNIT_PRICE")
	private String taxUnitPrice;
	
	/** 预计金额 */
	@Expose
	@Column(name = "ESTIMATED_AMOUNT")
	private String estimatedAmount;
}
