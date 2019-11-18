/**
 *====================================================
 * 文件名称: ReturnList.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月25日		陈光毅(创建:创建文件)
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
 * @ClassName: ReturnList
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月25日
 */
@Entity
@Data
@ToString(exclude = {"listId"})
@EqualsAndHashCode(callSuper = false, exclude = {"listId"})
@PersistantDeclare
@Table(name = "T_RETURN_LIST")
public class ReturnList extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIST_ID")
	private Long listId;
	
	@Expose
	@Column(name = "RETURN_ID", updatable = false, nullable = false)
	private Long returnId;
	
	@Expose
	@Column(name = "SPECIFICATIONS_ID", nullable = false)
	private Long specificationsId;
	
	@Expose
	@Column(name = "COMMODITY_ID", nullable = false)
	private Long commodityId;
	
	@Expose
	@Column(name = "MNEMONICS")
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
	@Column(name = "ASSIST_UNIT", nullable = false)
	private String assistUnit;
	
	@Expose
	@Column(name = "ASSIST_QUANTITY", nullable = false)
	private String assistQuantity;
	
	@Expose
	@Column(name = "RETURN_QUANTITY", nullable = false)
	private String returnQuantity;
	
	@Expose
	@Column(name = "COEFFICIENT", nullable = false)
	private String coefficient;
	
	@Expose
	@Column(name = "REMARKS")
	private String remarks;
}
