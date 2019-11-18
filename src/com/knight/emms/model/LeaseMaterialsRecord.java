/**
 *====================================================
 * 文件名称: LeaseMaterialsRecord.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：周材租借记录
 */
package com.knight.emms.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;
import com.knight.core.annotation.FieldComment;
import com.knight.core.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: LeaseMaterialsRecord
 * @Description: 周材租借记录
 * @author 陈光毅
 * @date 2017年11月20日
 */
@Data
@Entity
@Table(name = "T_LEASE_MATERIALS_RECORD")
@ToString(exclude = { "recordId" })
@EqualsAndHashCode(callSuper = false, exclude = { "recordId" })
public class LeaseMaterialsRecord extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "RECORD_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Expose
	@FieldComment(description = "主键ID")
	private Long recordId;
	
	@Expose
	@Column(name = "LEASE_ID")
	@FieldComment(description = "租借合同")
	private Long leaseId;
	
	@Expose
	@FieldComment(description = "周材规格")
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "SPECIFICATIONS_ID")
	private MaterialsSpecifications materialsSpecifications;
}
