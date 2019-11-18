/**
 *====================================================
 * 文件名称: ContractInoutFree.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: ContractInoutFree
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:34:07
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ContractInoutFreeVersion extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long inoutVersionId;
	
	@Expose
	private Long leaseVersionId;

	@Expose
	private Long inoutId;
	
	@Expose
	private Long contractId;

	@Expose
	private String equipGenericName;
	
	@Expose
	private String equipSpecificName;

	@Expose
	private BigDecimal rent;
	
	@Expose
	private String rentUnit;

}
