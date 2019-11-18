/**
 *====================================================
 * 文件名称: Deduct.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

/**
 * @ClassName: DeductScale
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午2:53:31
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class DeductScale extends BaseModel {

	private static final long serialVersionUID = 1L;

	public static final Long SIMPLE = 1L;

	private Long deductScaleId;

	private BigDecimal scaleStart;

	private BigDecimal scaleEnd;

	private BigDecimal scalePercent;

	private String scaleType;

	// ========================================================================//
	private Set<DeductScale> deductScaleSet = new HashSet<DeductScale>(0);

	private String deductScales = "";

	public void setSubDeductScale() {
		Set<DeductScale> dispatchEquipSet = GsonUtil.fromJson(this.getDeductScales(), new TypeToken<Set<DeductScale>>() {});
		if (dispatchEquipSet != null) {
			for (DeductScale p : dispatchEquipSet) {
				p.setScaleType("1");
			}
		}
		this.setDeductScaleSet(dispatchEquipSet);
	}
}
