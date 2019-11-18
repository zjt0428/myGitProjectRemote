
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: AttachmentStorage
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午9:53:21
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AttachmentStorage extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long attachmentId;

	@Expose
	private Long rowId;

	@Expose
	private String componGeneric;

	@Expose
	private String componSpecific;
	
	@Expose
	private String componVender;

	@Expose
	private String componCategory;

	@Expose
	private String dimensions;

	@Expose
	private String measurementUnit;

	@Expose
	private String projectCounts;
	
	@Expose
	private String counts;
	
	@Expose
	private Long disAllInitId;
	
	/**备注*/
	@Expose
	private String remark;
	
	/**损坏描述*/
	@Expose
	private String damageDescription;
	
	/**损坏数量*/
	@Expose
	private Integer damageCount;
	
	/**计量单位*/
	@Expose
	private String damageUnit;
	
	/**损坏单价*/
	@Expose
	private BigDecimal damagePrice;
	
	/**损坏金额*/
	@Expose
	private BigDecimal damageAmount;

}
