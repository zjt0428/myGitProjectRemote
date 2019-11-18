/**
 *====================================================
 * 文件名称: ReturnGoods.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月25日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：退货管理
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.OrderBy;

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

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: ReturnGoods
 * @Description: 退货管理
 * @author 陈光毅
 * @date 2017年8月25日
 */
@Entity
@Data
@ToString(exclude = {"returnId"})
@EqualsAndHashCode(callSuper = false, exclude = {"returnId"})
@PersistantDeclare
@SerialNumberStrategy(name = "returnSerial", strategy = "TH{yyyyMMdd}", maxseq = 999)
@Table(name = "T_RETURN_GOODS")
public class ReturnGoods extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "RETURN_ID")
	@FieldComment(description = "主键ID", column = "returnId")
	private Long returnId;
	
	@Expose
	@Column(name = "RETURN_SERIAL")
	@FieldComment(description = "退货流水号", column = "returnSerial")
	private String returnSerial;
	
	@Expose
	@Column(name = "RETURN_THEME")
	@FieldComment(description = "退货主题", column = "returnTheme")
	private String returnTheme;
	
	@Expose
	@Column(name = "USER_ID", updatable = false, nullable = false)
	@FieldComment(description = "制单人ID", column = "userId")
	private Long userId;
	
	@Expose
	@Column(name = "USER_NAME", updatable = false, nullable = false)
	@FieldComment(description = "制单人", column = "userName")
	private String userName;
	
	@Expose
	@Column(name = "FILL_DATE", updatable = false, nullable = false)
	@FieldComment(description = "制单日期", column = "fillDate")
	private String fillDate;
	
	@Expose
	@Column(name = "DEPOT_ID", nullable = false)
	@FieldComment(description = "周材仓库ID", column = "depotId")
	private Long depotId;
	
	@Expose
	@Column(name = "DEPOT_NAME")
	@FieldComment(description = "周材仓库", column = "depotName")
	private String depotName;
	
	@Expose
	@Column(name = "LOCATION_ID", nullable = false)
	@FieldComment(description = "入库库位ID", column = "locationId")
	private Long locationId;
	
	@Expose
	@Column(name = "LOCATION_NAME")
	@FieldComment(description = "入库库位", column = "locationName")
	private String locationName;
	
	@Expose
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "LEASE_ID")
	@FieldComment(description = "管理租借合同", column = "leaseContract")
	private LeaseContract leaseContract;
	
	@Expose
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "PROJECT_ID")
	@FieldComment(description = "关联项目", column = "project")
	private Project project;
	
	@Expose
	@Column(name = "LEASE_UNIT")
	@FieldComment(description = "租借单位", column = "leaseUnit")
	private String leaseUnit;
	
	@Expose
	@Column(name = "LESSEE_UNIT")
	@FieldComment(description = "承租单位", column = "lesseeUnit")
	private String lesseeUnit;
	
	@Expose
	@Column(name = "RETURN_DATE")
	@FieldComment(description = "回收日期", column = "returnDate")
	private String returnDate;
	
	@Expose
	@Column(name = "SUBSIDIARY_SERIAL")
	@FieldComment(description = "附属单据号", column = "subsidiarySerial")
	private String subsidiarySerial;
	
	@Expose
	@Column(name = "RETURN_TYPE")
	@FieldComment(description = "回收类型", column = "returnType")
	private String returnType;
	
	@Expose
	@Column(name = "TRANSPORT_VEHICLE")
	@FieldComment(description = "运输车辆", column = "transportVehicle")
	private String transportVehicle;
	
	@Expose
	@Column(name = "TRANSPORT_PERSONNEL")
	@FieldComment(description = "运输人员", column = "transportPersonnel")
	private String transportPersonnel;
	
	@Expose
	@Column(name = "AUDITOR")
	@FieldComment(description = "审核人", column = "auditor")
	private String auditor;
	
	@Expose
	@Column(name = "APPROVE_DATE")
	@FieldComment(description = "审核时间", column = "approveDate")
	private String approveDate;
	
	@Expose
	@Column(name = "SUBSIDIARY_AUDITOR")
	@FieldComment(description = "单据审核人", column = "subsidiaryAuditor")
	private String subsidiaryAuditor;
	
	@Expose
	@Column(name = "SUBSIDIARY_APPROVE_DATE")
	@FieldComment(description = "单据审核时间", column = "subsidiaryApproveDate")
	private String subsidiaryApproveDate;
	
	@Expose
	@Column(name = "REMARKS")
	@FieldComment(description = "备注", column = "remarks")
	private String remarks;
	
	@Expose
	@Column(name = "STATUS")
	@FieldComment(description = "状态码", column = "status")
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "statusName")
	private String status;
	
	@Expose
	@Transient
	@FieldComment(description = "状态值", column = "statusName")
	private String statusName;
	
	@Column(name = "DEL_FLAG")
	@FieldComment(description ="删除标识", column = "delFlag")
	private String delFlag;
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "RETURN_ID")
	@OrderBy(clause="COMMODITY_ID DESC,SPECIFICATIONS_ID ASC")
	private Set<ReturnList> returnListSet = new HashSet<ReturnList>(0);
	
	@Transient
	private String returnLists = "";
	
	@Override
	public void setModelSerial(String serial) {
		this.returnSerial = serial;
	}
	
	@Override
	public Long getApplyforId() {
		return this.returnId;
	}
	
	@Override
	public void setApplyforState(String applyforState) {
		this.status = applyforState;
	}
	
	@Override
	public String getApplyforState() {
		return this.status;
	}
	
	public void setSubReturnGoods () {
		Set<ReturnList> returnListSet = GsonUtil.fromJson(this.getReturnLists(), new TypeToken<Set<ReturnList>> () {});
		if (returnListSet != null) {
			for (ReturnList r : returnListSet) {
				r.setReturnId(this.getReturnId());
			}
		}
		this.setReturnListSet(returnListSet);
	}
}
