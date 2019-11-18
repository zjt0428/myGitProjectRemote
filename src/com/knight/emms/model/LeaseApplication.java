/**
 *====================================================
 * 文件名称: LeaseApplication.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月18日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：租借申请
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.annotation.FieldComment;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: LeaseApplication
 * @Description: 租借申请
 * @author 陈光毅
 * @date 2017年7月18日
 */
@Entity
@Data
@ToString(exclude = {"applicationId"})
@EqualsAndHashCode(callSuper=false, exclude = {"applicationId"})
@PersistantDeclare(isExportable = true, exportName = "租借申请汇总", sheetName = "租借申请信息")
@SerialNumberStrategy(name = "applicationSerial", strategy = "ZJ{yyyyMMdd}", maxseq = 999)
@Table(name = "T_LEASE_APPLICATION")
public class LeaseApplication extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "APPLICATION_ID")
	@FieldComment(description ="主键ID", column = "applicationId")
	private Long applicationId;
	
	@Expose
	@Column(name = "APPLICATION_SERIAL")
	@FieldComment(description = "单据编号", column = "applicationSerial")
	private String applicationSerial;
	
	@Expose
	@Column(name = "USER_ID", updatable = false, nullable = false)
	@FieldComment(description = "申报人ID", column = "userId")
	private Long userId;
	
	@Expose
	@Column(name = "USER_NAME", updatable = false, nullable = false)
	@FieldComment(description = "申报人", column = "userName")
	private String userName;
	
	@Expose
	@Column(name = "FILL_DATE", updatable = false, nullable = false)
	@FieldComment(description = "申请日期", column = "fillDate")
	private String fillDate;
	
	@Expose
	@Column(name = "LEASE_THEME")
	@FieldComment(description = "租借主题", column = "leaseTheme")
	private String leaseTheme;

	@Expose
	@OneToOne()
	@JoinColumn(name = "PROJECT_ID")
	@FieldComment(description = "项目名称", column = "project")
	private Project project;
	
	@Expose
	@Column(name = "ASSETS_PROPERTY")
	@FieldComment(description = "资产属性码", column = "assetsProperty")
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;
	
	@Expose
	@Transient
	@FieldComment(description = "资产属性值", column = "assetsPropertyName")
	private String assetsPropertyName;
	
	@Expose
	@Column(name = "APPLYING_UNIT")
	@FieldComment(description = "申请单位", column = "applyingUnit")
	private String applyingUnit;
	
	@Expose
	@Column(name = "TAX_RATE")
	@FieldComment(description = "税率", column = "taxRate")
	private String taxRate;
	
	@Expose
	@Column(name = "PAYMENT_METHOD")
	@FieldComment(description = "支付方式码", column = "paymentMethod")
	@CodeFieldDeclare(codeId = "paymentType", valueField = "paymentMethodName")
	private String paymentMethod;
	
	@Expose
	@Transient
	@FieldComment(description = "支付方式值", column = "paymentMethodName")
	private String paymentMethodName;
	
	@Expose
	@Column(name = "SUPPLIERS")
	@FieldComment(description = "供应单位", column = "suppliers")
	private String suppliers;
	
	@Expose
	@Column(name = "APPROACH_DATE")
	@FieldComment(description = "进场时间", column = "approachDate")
	private String approachDate;
	
	@Expose
	@Column(name = "MANUFACTURER")
	@FieldComment(description = "生产厂家", column = "manufacturer")
	private String manufacturer;
	
	@Expose
	@Column(name = "OTHER_REQUIREMENTS")
	@FieldComment(description = "质量及其他要求", column = "otherRequirements")
	private String otherRequirements;
	
	@Expose
	@Column(name = "STATUS")
	@FieldComment(description = "状态码", column = "status")
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "statusName")
	private String status;
	
	@Expose
	@Transient
	@FieldComment(description = "状态值", column = "statusName")
	private String statusName;
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "APPLICATION_ID")
	private Set<LeaseList> leaseListSet = new HashSet<LeaseList>();
	
	@Transient
	private String leaseLists = "";
	
	@Override
	public void setModelSerial(String serial) {
		this.applicationSerial = serial;
	}
	
	@Override
	public Long getApplyforId() {
		return this.applicationId;
	}
	
	@Override
	public void setApplyforState(String applyforState) {
		this.status = applyforState;
	}

	@Override
	public String getApplyforState() {
		return this.status;
	}
	
	public void setSubLeaseApplication() {
		Set<LeaseList> leaseListSet = GsonUtil.fromJson(this.getLeaseLists(), new TypeToken<Set<LeaseList>>(){});
		if (leaseListSet != null) {
			for (LeaseList l : leaseListSet) {
				l.setApplicationId(this.applicationId);
			}
		}
		this.setLeaseListSet(leaseListSet);
	}
}
