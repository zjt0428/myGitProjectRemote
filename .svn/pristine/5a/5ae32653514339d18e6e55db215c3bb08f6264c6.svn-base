/**
 *====================================================
 * 文件名称: LogisticsBacksport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月5日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: LogisticsBacksport
 * @Description: 回场物流
 * @author chenxy
 * @date 2014年10月5日 下午7:59:37
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "backsportSerial", strategy = "WL{yyyyMMdd}", maxseq = 99)
public class LogisticsBacksport extends BusinessModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long backsportId;

	@Expose
	private String backsportSerial;

	private String backsportTheme;

	private String batchNumber;

	@Expose
	private String deliveryDate;

	private String expectedArriveDate;

	@Expose
	private String deliveryMan;

	private String deliveryPhone;

	private String receiveMan;

	private String receivePhone;

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
	private BigDecimal backsportAmount;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@Expose
	private String address;

	private String signMan;

	@Expose
	private String signDate;
	
	@Expose
	private String signResult;

	private String remark;
	
	@Expose
	private String isCompon;

	@Expose
	private Long rowId;

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
	private BigDecimal summary;

	@Expose
	private String backsportEntName;

	@Expose
	private String backsportContactTel;

	@Expose
	private String backsportBankDeposit;

	@Expose
	private String backsportBankAccount;

	private String delFlag;

	@Expose
	private Equipment equipment;

	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<LogisticsBackdetail> logisticsBackdetailSet = new HashSet<LogisticsBackdetail>(0);

	private String logisticsBackdetails = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<LogisticsBackdetail2> logisticsBackdetail2Set = new HashSet<LogisticsBackdetail2>(0);

	private String logisticsBackdetail2s = "";

	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<LogisticsBackcarfee> logisticsBackcarfeeSet = new HashSet<LogisticsBackcarfee>(0);

	private String logisticsBackcarfees = "";

	public String getModelSerial() {
		return this.backsportSerial;
	}

	public void setModelSerial(String serial) {
		this.backsportSerial = serial;
	}

	public String getBacksportTheme() {
		if (this.backsportTheme == null) {
			this.backsportTheme = this.projectName + "-的回场" + DateUtil.getCurrentTimeStr();
		}
		return this.backsportTheme;
	}

	public void setSubLogisticsBacksport() {
		Set<LogisticsBackdetail> logisticsBackdetailSet = GsonUtil.fromJson(this.getLogisticsBackdetails(), new TypeToken<Set<LogisticsBackdetail>>() {});
		if (logisticsBackdetailSet != null) {
			for (LogisticsBackdetail d : logisticsBackdetailSet) {
				d.setBacksportId(this.getBacksportId());
			}
		}
		this.setLogisticsBackdetailSet(logisticsBackdetailSet);
		
		Set<LogisticsBackdetail2> logisticsBackdetail2Set = GsonUtil.fromJson(this.getLogisticsBackdetail2s(), new TypeToken<Set<LogisticsBackdetail2>>() {});
		if (logisticsBackdetail2Set != null) {
			for (LogisticsBackdetail2 d : logisticsBackdetail2Set) {
				d.setComponId(d.getComponent().getComponId());
				d.setBacksportId(this.getBacksportId());
			}
		}
		this.setLogisticsBackdetail2Set(logisticsBackdetail2Set);
		
		Set<LogisticsBackcarfee> logisticsBackcarfeeSet = GsonUtil.fromJson(this.getLogisticsBackcarfees(), new TypeToken<Set<LogisticsBackcarfee>>() {});
		if (logisticsBackcarfeeSet != null) {
			for (LogisticsBackcarfee d : logisticsBackcarfeeSet) {
				d.setBacksportId(this.getBacksportId());
			}
		}
		this.setLogisticsBackcarfeeSet(logisticsBackcarfeeSet);
	}

}
