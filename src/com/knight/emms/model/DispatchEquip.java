/**
 *====================================================
 * 文件名称: DispatchEquip.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Status;

/**
 * @ClassName: DispatchEquip
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:01:21
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class DispatchEquip extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long dispatchEquipId;

	@Expose
	private Long dispatchId;

	@Expose
	private Long equipId;

	@Expose
	private String buildingNum;

	@Expose
	private Date startDate;

	@Expose
	private Date endDate;

	@Expose
	private BigDecimal installHeight;

	@Expose
	private String workStatus = Status.EquipComponDispatch.allocate;

	@Expose
	private Equipment equipment;
	
	@Expose
	private String remark;
	

}
