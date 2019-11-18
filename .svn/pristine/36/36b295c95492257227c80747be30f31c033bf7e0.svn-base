/**
 *====================================================
 * 文件名称: DeductPracti.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: DeductPracti
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午3:00:37
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class DeductPracti extends BaseModel {

	private static final long serialVersionUID = 1L;

	private Long deductPractiId;

	private Long deductId;

	private Long practiId;

	private String practiName;

	private BigDecimal proportion;

	private BigDecimal reward;

	@CodeFieldDeclare(codeId = "DEDUCT_PICKUP_STATUS", valueField = "pickupStatusName")
	private String pickupStatus;

	private String pickupStatusName;
}
