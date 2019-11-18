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
@SerialNumberStrategy(name = "riskSerial", strategy = "ZG{yyyyMMdd}", maxseq = 99)
public class Risk extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long riskId;

	@Expose
	private String riskSerial;

	private String riskTheme;

	private String checkDepartment;

	private Long checkCustom;

	@Expose
	private String checkCustomName;

	private String inspector;

	private Long rectifyEnt;

	private String rectifyEntName;

	private String riskDesc;

	@Expose
	private String improvePerson;

	private String improveDate;

	private String checkPerson;

	@Expose
	private String checkDate;

	private String reviewOpinion;

	private String reviewPerson;

	private String reviewDate;

	@Expose
	private String status;

	private Long riskReportId;

	@Expose
	private Equipment equipment;

	@Expose
	private Project project;

	public void setModelSerial(String serial) {
		this.riskSerial = serial;
	}

}
