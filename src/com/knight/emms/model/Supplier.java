/**
 *====================================================
 * 文件名称: Supplier.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Status;

/**
 * @ClassName: Supplier
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:18:05
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "供应商信息汇总", sheetName = "供应商")
public class Supplier extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long supplierId;

	@Expose
	private String supplierName;

	@Expose
	private String unitType;

	@Expose
	private String address;

	@Expose
	private String tel;

	@Expose
	private String mainBusiness;

	private BigDecimal regCapital;

	@Expose
	private String birthDate;

	@Expose
	private String linkMan;
	@Expose
	private String businessArea;

	private String description;

	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "WITHDRAW", valueField = "statusName")
	private String status = Status.Archives.enabled;

	private String statusName;

	private String delFlag;

	@Expose
	private String linkManPhone;

	@Expose
	private SupplierLinker supplierLinker;

	@Expose
	private SupplierAccount supplierAccount;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SupplierLinker> supplierLinkerSet = new HashSet<SupplierLinker>(0);

	private String supplierLinkers = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SupplierAccount> supplierAccountSet = new HashSet<SupplierAccount>(0);

	private String supplierAccounts = "";

	// ===================================================================================//
	public void setSubSupplier() {
		Set<SupplierLinker> supplierLinkerSet = GsonUtil.fromJson(this.supplierLinkers, new TypeToken<Set<SupplierLinker>>() {});
		if (supplierLinkerSet != null) {
			for (SupplierLinker sl : supplierLinkerSet) {
				sl.setSupplierId(this.supplierId);
			}
		}
		this.setSupplierLinkerSet(supplierLinkerSet);

		Set<SupplierAccount> supplierAccountSet = GsonUtil.fromJson(this.supplierAccounts, new TypeToken<Set<SupplierAccount>>() {});
		if (supplierAccountSet != null) {
			for (SupplierAccount sa : supplierAccountSet) {
				sa.setSupplierId(this.supplierId);
			}
		}
		this.setSupplierAccountSet(supplierAccountSet);
	}
}
