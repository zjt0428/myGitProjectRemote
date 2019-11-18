/**
 *====================================================
 * 文件名称: MakeProduct.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月03日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: MakeProduct
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年11月03日
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class MakeProduct extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long productId;
	
	@Expose
	private Long handleId;
	
	@Expose
	private Long commodityId;
	
	/**周材名称（品名）*/
	@Expose
	private String commodity;
	
	@Expose
	private Long specificationsId;
	
	/**规格*/
	@Expose
	private String specifications;
	
	/**助记码*/
	@Expose
	private String mnemonics;
	
	/**计量单位*/
	@Expose
	private String measurementUnit;
	
	/**制作数量*/
	@Expose
	private String makeQuantity;
	
	/**换算数量*/
	@Expose
	private	String auxiliaryQuantity;
	
	/**辅助数量*/
	@Expose
	private	String convertedQuantity;
	
	/**入库库位id*/
	@Expose
	private Long enterLocationId;
	
	/**入库库位名称*/
	@Expose
	private String enterLocationName;
}
