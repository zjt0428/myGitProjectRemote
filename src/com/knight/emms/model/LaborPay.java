package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: LaborPay
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:00:19
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "劳务支付汇总", sheetName = "劳务支付")
@SerialNumberStrategy(name = "laborPaySerial", strategy = "LWZF{yyyyMMdd}", maxseq = 999999)
public class LaborPay extends BusinessModel implements ExportModel{

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long laborPayId;
	
	/**结算编号*/
	@Expose
	private String laborPaySerial;
	
	/**合同编号*/
	@Expose
	private String contractNo;
	
	/**项目名称*/
	@Expose
	private String projectName;
	
	/**工地经理*/
	@Expose
	private String leaseProjectHead;
	
	/**承租方*/
	private Long paEnt;
	private String paModule;
	@Expose
	private String paEntName;
	
	/**结算开始时间*/
	@Expose
	private String startSettleDate;
	
	/**截止时间*/
	@Expose
	private String endSettleDate;
	
	@Expose
	private Long equipId;
	
	@Expose
	private Equipment equipment;
	
	@Expose
	private Long laborSettId;
	
	@Expose
	private LaborSettle laborSettle;
	
	/**税率*/
	@Expose
	private String rate;
	
	@Expose
	private String delFlag;
	
	/**创建时间*/
	@Expose
	private String createDate;
	
	/**上期支付时间*/
	@Expose
	private String periodPayDate;
	
	/**末期支付时间*/
	@Expose
	private String endPayDate;
	
	/**支付状态*/
	@Expose
	@CodeFieldDeclare(codeId = "PAY_STATE", valueField = "payStateName")
	private String payState;
	@Expose
	private String payStateName;
	
	/**应付金额*/
	@Expose
	private BigDecimal copeAmount;	
	
	/**已付金额*/
	@Expose
	private BigDecimal paidAmount;	
	
	/**待付金额*/
	@Expose
	private BigDecimal pendingAmount;
	
	/**结余*/
	@Expose
	private BigDecimal afterTaxAmount;
	
	private Set<LaborPayDetail> laborPayDetailSet = new HashSet<LaborPayDetail>(0);

	private String laborPayDetails = "";

	// ================================================================================//
	public void setSubInsureClaim() {
		Set<LaborPayDetail> laborPayDetailSet = GsonUtil.fromJson(this.laborPayDetails, new TypeToken<Set<LaborPayDetail>>() {});
		if (laborPayDetailSet != null) {
			for (LaborPayDetail p : laborPayDetailSet) {
				p.setLaborPayId(this.laborPayId);
			}
		}
		this.setLaborPayDetailSet(laborPayDetailSet);
	}

	@Override
	public void setModelSerial(String serial) {
		// TODO Auto-generated method stub
		this.laborPaySerial = serial;
	}
	
}
