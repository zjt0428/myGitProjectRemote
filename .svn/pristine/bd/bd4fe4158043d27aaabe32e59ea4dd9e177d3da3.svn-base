/**
 *====================================================
 * 文件名称: LeaseScrapCompensation.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月15日		陈光毅(创建:创建文件)
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
import com.knight.core.annotation.FieldComment;
import com.knight.core.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: LeaseScrapCompensation
 * @Description: 报废赔偿(租借合同子表)
 * @author 陈光毅
 * @date 2017年11月15日
 */
@Data
@Entity
@ToString(exclude = {"compensationId"})
@EqualsAndHashCode(callSuper = false, exclude = {"compensationId"})
@Table(name = "T_LEASE_SCRAP_COMPENSATION")
public class LeaseScrapCompensation extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@Column(name = "COMPENSATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@FieldComment(description = "主键ID", column = "compensationId")
	private Long compensationId;
	
	@Expose
	@Column(name = "LEASE_ID")
	@FieldComment(description = "租借合同ID", column = "leaseId")
	private Long leaseId;
	
	@Expose
	@Column(name = "SCRAP_ID")
	@FieldComment(description = "报废赔偿ID	", column = "scrapId")
	private Long scrapId;
	
	@Expose
	@Column(name = "COMMODITY_ID")
	@FieldComment(description = "周材大类ID", column = "commodityId")
	private Long commodityId;
	
	@Expose
	@Column(name = "COMMODITY")
	@FieldComment(description = "周材品名", column = "commodity")
	private String commodity;
	
	@Expose
	@Column(name = "SCRAP_TYPE")
	@FieldComment(description = "报废类型", column = "scrapType")
	private String scrapType;
	
	@Expose
	@Column(name = "SCRAP_UNIT_PRICE")
	@FieldComment(description = "报废单价", column = "scrapUnitPrice")
	private String scrapUnitPrice;
	
	@Expose
	@Column(name = "MEASUREMENT_UNIT")
	@FieldComment(description = "计量单位", column = "measurementUnit")
	private String measurementUnit;
}
