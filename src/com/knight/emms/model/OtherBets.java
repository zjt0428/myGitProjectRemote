package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;

@Data
@PersistantDeclare(isExportable = true, exportName = "其他业务管理信息汇总", sheetName = "其他业务管理信息")
@SerialNumberStrategy(name = "otherBetsSerial", strategy = "QT{yyyyMMdd}", maxseq = 999)
public class OtherBets extends ApplyforState  implements ExportModel{


	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long otherBetsId;
	
	/**状态*/
	@Expose
	@CodeFieldDeclare(codeId = "OTHER_BUSINESS_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;
	
	@Expose
	private String applyforStateName;
	
	@Expose
	private Long userId;
	
	/**制单人*/
	@Expose
	private String userName;
	
	/**其他业务单号*/
	@Expose
	private String otherBetsSerial;
	
	/**收费时间*/
	@Expose
	private String chargeableTime;
	
	@Expose
	private Long contractId;
	
	/**合同编号*/
	@Expose
	private String contractNo;
	
	@Expose
	private String projectName;
	
	/**承租单位*/
	@Expose
	private String paEntName;
	
	/**费用合计*/
	@Expose
	private String totalCosts;
	
	/**附属单号*/
	@Expose
	private String affiliatedSerial;
	
	/**合同流水号*/
	@Expose
	private String contractNumber;	
	
	/*设备自编号*/
    @Expose
    private String equipSerial;
    
    /*生产厂家*/
    @Expose
    private String equipVender;
    
    /*设备型号*/
    @Expose
    @CodeFieldDeclare(codeId = "equipSpecific", valueField = "equipSpecificName")
    private String equipSpecific;
    
    @Expose
    private String equipSpecificName;
	
	private String delFlag;
	
	@Expose
	private String remark;
	
	@Expose
	private String feeTypeName;
	
	public Long getApplyforId() {
		return this.otherBetsId;
	}
	
	public void setModelSerial(String serial) {
		this.otherBetsSerial = serial;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<OtherBetsDetail> otherBetsDetailSet = new HashSet<OtherBetsDetail>();
	
	private String otherBetsDetails = "";
	
	public void setSubOtherBets(){
		Set<OtherBetsDetail> otherBetsDetailSet = GsonUtil.fromJson(this.otherBetsDetails, new TypeToken<Set<OtherBetsDetail>>() {});
		if (otherBetsDetailSet != null) {
			for (OtherBetsDetail c : otherBetsDetailSet) {
				c.setOtherBetsId(this.getOtherBetsId());
			}
			this.setOtherBetsDetailSet(otherBetsDetailSet);
		}
	}
}
