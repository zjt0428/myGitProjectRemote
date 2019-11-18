/**
 *====================================================
 * 文件名称: EquipWarehouseAbnormal.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月30日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.util.GsonUtil;

/**
 * @ClassName: EquipWarehouseAbnormal
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月30日 上午8:21:26
 */
@Data
@ToString(callSuper = false)
public class EquipWarehouseAbnormal extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long abnormalId;

	@Expose
	private Long warehouseId;

	@Expose
	private String projectName;

	@Expose
	private String address;

	@Expose
	private String principal;

	@Expose
	private String recordId;

	@Expose
	private String equipGenericName;

	@Expose
	private String equipSpecificName;

	@Expose
	private String exwSerial;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipWarehouseAbnormalCompon> equipWarehouseAbnormalComponSet = new HashSet<EquipWarehouseAbnormalCompon>();

	private String equipWarehouseAbnormalCompons = "";

	// ========================================================================//
	public void setSubEquipWarehouseAbnormal() {
		Set<EquipWarehouseAbnormalCompon> equipWarehouseAbnormalComponSet = GsonUtil.fromJson(this.equipWarehouseAbnormalCompons, new TypeToken<Set<EquipWarehouseAbnormalCompon>>() {});
		if (equipWarehouseAbnormalComponSet != null) {
			for (EquipWarehouseAbnormalCompon c : equipWarehouseAbnormalComponSet) {
				c.setAbnormalId(this.abnormalId);
			}
			this.setEquipWarehouseAbnormalComponSet(equipWarehouseAbnormalComponSet);
		}
	}

}
