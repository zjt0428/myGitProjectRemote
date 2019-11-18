/**
 *====================================================
 * 文件名称: LogisticsTransport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-22			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


/**
 * @ClassName: LogisticsTransport
 * @Description: 物流运输
 * @author chenxy
 * @date 2014-4-22 下午9:26:34
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "物流信息汇总", sheetName = "物流信息")
@SerialNumberStrategy(name = "transportSerial", strategy = "WL{yyyyMMdd}", maxseq = 999)
public class LogisticsTransport extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long transportId;
	
	@Expose
	private Long dispatchId;

	@Expose
	private String transportSerial;

	private String transportTheme;

	private String batchNumber;

	@Expose
	private String deliveryDate;

	private String expectedArriveDate;

	@Expose
	private String deliveryMan;

	private String deliveryPhone;

	@Expose
	private Long deliveryEntId;

	@Expose
	private String deliveryEntName;

	private String receiveMan;

	private String receivePhone;

	@Expose
	private Long receiveEntId;

	@Expose
	private String receiveEntName;

	private String materialPark;

	@Expose
	private Integer knotCounts;

	@Expose
	private Integer strengthenCounts;

	@Expose
	private Integer knotBoltCounts;

	@Expose
	private Integer wallAttacheQty;

	@Expose
	private String projectPrincipal;

	@Expose
	private BigDecimal finishedAmount;

	@Expose
	private BigDecimal remainderAmount;

	@Expose
	private BigDecimal transportAmount;

	@Expose
	private Long projectId;

	@Expose
	private String projectName;

	@Expose
	private String projectSerial;

	@Expose
	private String address;

	private String signMan;

	@Expose
	private String signDate;

	@Expose
	private String signResult;
	@Expose
	private String remark;

	@Expose
	private BigDecimal summary;

	@Expose
	private String transportEntName;

	@Expose
	private String transportContactTel;

	@Expose
	private String transportBankDeposit;

	@Expose
	private String transportBankAccount;

	@Expose
	@CodeFieldDeclare(codeId = "autocraneDepend", valueField = "autocraneDependName")
	private String autocraneDepend;

	@Expose
	private String autocraneDependName;

	private String kilometers;

	@Expose
	@CodeFieldDeclare(codeId = "LOGISTICS_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	@Expose
	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;
	
	@Expose
	@CodeFieldDeclare(codeId = "LOGISTI_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	/*发货主题*/
	@Expose
	private String shipmentsTheme;
	/*调度时间*/
	@Expose
	private String dispatchDate;
	/*合同编号*/
	@Expose
	private String relateSerial;
	/*制单人*/
	@Expose
	private String originator;
	/*司机*/
	@Expose
	private String driver;
	/*联系电话*/
	@Expose
	private String driverPhone;
	/*审核时间*/
	@Expose
	private Date acceptTime;
	/*审批时间*/
	@Expose
	private Date approveTime;
	/*原单据编号*/
	@Expose
	private String originalSerial;

	@Expose
	private Equipment equipment;

	private String delFlag;
	
	@Expose
	private String licensePlate;

	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<LogisticsTrandetail> logisticsTrandetailSet = new HashSet<LogisticsTrandetail>(0);

	private String logisticsTrandetails = "";

	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<LogisticsTrancarfee> logisticsTrancarfeeSet = new HashSet<LogisticsTrancarfee>(0);

	private String logisticsTrancarfees = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<LogisticsDestribution> logisticsDestributionSet = new HashSet<LogisticsDestribution>(0);
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<LogisticsTranDestribution> logisticsTranDistributionbutionSet = new HashSet<LogisticsTranDestribution>(0);

	private String logisticsTranDistributionbutions="";
	
	private String logisticsDestributions = "";

	public String getModelSerial() {
		return this.transportSerial;
	}

	public void setModelSerial(String serial) {
		this.transportSerial = serial;
	}

	public String getTransportTheme() {
		if (this.transportTheme == null) {
			this.transportTheme = this.projectName + "-的物流" + DateUtil.getCurrentTimeStr();
		}
		return this.transportTheme;
	}

	public void setSubLogisticsTransport() {
		Set<LogisticsTrandetail> logisticsTrandetailSet = GsonUtil.fromJson(this.getLogisticsTrandetails(), new TypeToken<Set<LogisticsTrandetail>>() {});
		if (logisticsTrandetailSet != null) {
			for (LogisticsTrandetail d : logisticsTrandetailSet) {
				int c= d.getDispatchCompon().getCounts();
				d.getDispatchCompon().setCounts(c+d.getCounts());
				d.setTransportId(this.getTransportId());
			}
		}
		this.setLogisticsTrandetailSet(logisticsTrandetailSet);
		Set<LogisticsTrancarfee> logisticsTrancarfeeSet = GsonUtil.fromJson(this.getLogisticsTrancarfees(), new TypeToken<Set<LogisticsTrancarfee>>() {});
		if (logisticsTrancarfeeSet != null) {
			for (LogisticsTrancarfee d : logisticsTrancarfeeSet) {
				d.setTransportId(this.getTransportId());
			}
		}
		this.setLogisticsTrancarfeeSet(logisticsTrancarfeeSet);
		Set<LogisticsDestribution> logisticsDestributionSet = GsonUtil.fromJson(this.getLogisticsDestributions(), new TypeToken<Set<LogisticsDestribution>>() {});
		if (logisticsDestributionSet != null) {
			for (LogisticsDestribution d : logisticsDestributionSet) {
				d.setTransportId(this.getTransportId());
			}
		}
		this.setLogisticsDestributionSet(logisticsDestributionSet);
		Set<LogisticsTranDestribution> logisticsTranDistributionbutionSet = GsonUtil.fromJson(this.getLogisticsTranDistributionbutions(), new TypeToken<Set<LogisticsTranDestribution>>() {});
		Set<LogisticsTranDestribution> newLogisticsTranDistributionbutionSet = new HashSet<LogisticsTranDestribution>();
		if (logisticsTranDistributionbutionSet != null) {
			for (LogisticsTranDestribution d : logisticsTranDistributionbutionSet) {
				//当装车数量（fillCount）为零时不保存
				if(!d.getFillCounts().toString().equals("0")) {
					d.setTransportId(this.getTransportId());
					newLogisticsTranDistributionbutionSet.add(d);
				}
			}
		}
		this.setLogisticsTranDistributionbutionSet(newLogisticsTranDistributionbutionSet);
	}

	@Override
	public Long getUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Long getApplyforId() {
		// TODO Auto-generated method stub
		return transportId;
	}

}
