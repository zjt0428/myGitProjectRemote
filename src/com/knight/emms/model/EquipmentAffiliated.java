/**
 *====================================================
 * 文件名称: EquipmentExtend.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年5月13日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: EquipmentExtend
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年5月13日 下午8:07:45
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipmentAffiliated extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long equipAffiliatedId;

	@Expose
	private Long equipId;

	@Expose
	private String componGenericName;
	
	@Expose
	@CodeFieldDeclare(codeId = "componSpecific", valueField = "componSpecificName")
	private String componSpecific;
	
	@Expose
	private String componSpecificName;

	@Expose
	private String unit;
	
	@Expose
	private BigDecimal quantity;
	
	@Expose
	private String dimensions;
	
	@Expose
	private String remark;

}
