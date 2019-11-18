/**
 *====================================================
 * 文件名称: Customer.java
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
 * @ClassName: Customer
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午8:30:25
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "客户信息汇总", sheetName = "客户信息")
public class Customer extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long customerId;

	@Expose
	private String customerName;
	
	@Expose
	private String customerNiceName;

	@Expose
	@CodeFieldDeclare(codeId = "customerLevel", valueField = "customerLevelName")
	private String customerLevel;

	@Expose
	private String customerLevelName;

	@Expose
	private String unitType;

	private String address;

	@Expose
	private String tel;

	@Expose
	private String mainBusiness;

	private BigDecimal regCapital;

	@Expose
	private String birthDate;

	@Expose
	private String businessArea;

	private String description;

	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "ARCHIVES_STATUS", valueField = "statusName")
	private String status = Status.Archives.enabled;

	private String statusName;

	private String delFlag;

	@Expose
	private CustomerLinker customerLinker;

	@Expose
	private CustomerAccount customerAccount;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<CustomerLinker> customerLinkerSet = new HashSet<CustomerLinker>(0);

	private String customerLinkers = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<CustomerAccount> customerAccountSet = new HashSet<CustomerAccount>(0);

	private String customerAccounts = "";
	
	@Expose
	private Long parentId;
	
	@Expose
	@CodeFieldDeclare(codeId = "customerAttribute", valueField = "customerAttributeName")
	private String customerAttribute;

	@Expose
	private String customerAttributeName;

	// ===================================================================================//

	public void setSubCustomer() {
		Set<CustomerLinker> customerLinkerSet = GsonUtil.fromJson(this.getCustomerLinkers(), new TypeToken<Set<CustomerLinker>>() {});
		if (customerLinkerSet != null) {
			for (CustomerLinker sl : customerLinkerSet) {
				sl.setCustomerId(this.getCustomerId());
			}
		}
		this.setCustomerLinkerSet(customerLinkerSet);

		Set<CustomerAccount> customerAccountSet = GsonUtil.fromJson(this.getCustomerAccounts(), new TypeToken<Set<CustomerAccount>>() {});
		if (customerAccountSet != null) {
			for (CustomerAccount a : customerAccountSet) {
				a.setCustomerId(this.getCustomerId());
			}
		}
		this.setCustomerAccountSet(customerAccountSet);
	}
}
