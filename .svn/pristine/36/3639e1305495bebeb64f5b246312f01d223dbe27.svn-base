/**
 *====================================================
 * 文件名称: IndisProtocolEquip.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
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
 * @ClassName: IndisProtocolEquip
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午7:13:22
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class IndisProtocolEquip extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long protocolEquipId;

	@Expose
	private Long protocolId;

	@Expose
	private Integer quantity;

	@Expose
	private BigDecimal height;

	@Expose
	private BigDecimal amount;

	@Expose
	private BigDecimal summary;

	@Expose
	private Equipment equipment;

}
