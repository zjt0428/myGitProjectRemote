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
@SerialNumberStrategy(name = "reportSerial", strategy = "BG{yyyyMMdd}", maxseq = 99)
public class AccidentReport extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long accidentReportId;

	@Expose
	private String reportSerial;

	@Expose
	private String providedDate;

	@Expose
	private String providedUnit;

	@Expose
	private String prevent;

	@Expose
	private String participants;

	@Expose
	private Accident accident;

	public void setModelSerial(String serial) {
		this.reportSerial = serial;
	}

}
