/**
 *====================================================
 * 文件名称: Inventory.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: Inventory
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-26 下午9:49:41
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "inventorySerial", strategy = "PD{yyyyMMdd}", maxseq = 99)
public class Inventory extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long inventoryId;

	@Expose
	private String inventorySerial;

	@Expose
	private String inventoryTheme;

	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "repertoryCategoryName")
	private String repertoryCategory;

	@Expose
	private String repertoryCategoryName;

	@Expose
	private Date startTime;

	@Expose
	private Date endTime;

	private Long userId;

	@Expose
	private String userName;

	private Long depId;

	@Expose
	private String providedDate;

	private String delFlag;

	@Expose
	private Department department;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<InventoryCategory> inventoryCategorySet = new HashSet<InventoryCategory>();

	private String inventoryCategorys = "";

	public void setModelSerial(String serial) {
		this.inventorySerial = serial;
	}

	// ========================================================================================//
	public void setSubInventory() {
		Set<InventoryCategory> inventoryCategorySet = GsonUtil.fromJson(this.getInventoryCategorys(), new TypeToken<Set<InventoryCategory>>() {});
		if (inventoryCategorySet != null) {
			for (InventoryCategory p : inventoryCategorySet) {
				p.setInventoryId(this.inventoryId);
			}
		}
		this.setInventoryCategorySet(inventoryCategorySet);
	}

}
