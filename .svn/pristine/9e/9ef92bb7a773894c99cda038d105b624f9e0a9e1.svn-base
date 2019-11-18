/**
 *====================================================
 * 文件名称: RecipientList.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：收货管理清单
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
 * @ClassName: RecipientList
 * @Description: 收货管理清单
 * @author 陈光毅
 * @date 2017年8月20日
 */
@Data
@ToString(exclude = {"listId"})
@EqualsAndHashCode(callSuper=false, exclude = {"listId"})
@PersistantDeclare
@Table(name = "T_RECIPIENT_LIST")
@Entity
public class RecipientList extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIST_ID")
	private Long listId;
	
	@Expose
	@Column(name = "RECIPIENT_ID", nullable = false, updatable = false)
	private Long recipientId;
	
	@Expose
	@Column(name = "SPECIFICATIONS_ID", nullable = false)
	private Long specificationsId;
	
	@Expose
	@Column(name = "COMMODITY_ID", nullable = false)
	private Long commodityId;
	
	@Expose
	@Column(name = "MNEMONICS", nullable = false)
	private String mnemonics;
	
	@Expose
	@Column(name = "COMMODITY", nullable = false)
	private String commodity;
	
	@Expose
	@Column(name = "SPECIFICATIONS", nullable = false)
	private String specifications;
	
	@Expose
	@Column(name = "MEASUREMENT_UNIT", nullable = false)
	private String measurementUnit;
	
	@Expose
	@Column(name = "RECIPIENT_QUANTITY", nullable = false)
	private String recipientQuantity;
	
	@Expose
	@Column(name = "ASSIST_UNIT", nullable = false)
	private String assistUnit;
	
	@Expose
	@Column(name = "ASSIST_QUANTITY", nullable = false)
	private String assistQuantity;
	
	@Expose
	@Column(name = "COEFFICIENT", nullable = false)
	private String coefficient;
	
	@Expose
	@Column(name = "REMARKS")
	private String remarks;
}
