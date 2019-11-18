package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "reportSerial", strategy = "FK{yyyyMMdd}", maxseq = 99)
public class RiskReport extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long riskReportId;

	@Expose
	private String reportSerial;

	@Expose
	private String checkPosition;

	@Expose
	private String improvePerson;

	@Expose
	private String completeDate;

	private String improveDesc;

	@Expose
	private String improveResult;

	private String remark;

	@Expose
	private Risk risk;

	public void setModelSerial(String serial) {
		this.reportSerial = serial;
	}

}
