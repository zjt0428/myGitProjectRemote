/**
 *====================================================
 * 文件名称: DispatchAllocate.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年5月15日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: DispatchAllocate
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年5月15日 上午9:50:47
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class DispatchAllocate extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long dispatchAllocateId;

	@Expose
	private Long dispatchId;
	
	@Expose
	private Long repairId;

	@Expose
	private String allocateType;

	@Expose
	private String componGenericName;

	@Expose
	private String calculate;

	@Expose
	private Integer quantity;

	@Expose
	private String defective;

	@Expose
	private String reissue;

	@Expose
	private String verify;

	@Expose
	private String specification;

	@Expose
	private String remark;
	
	@Expose
	private String delFlag;


}
