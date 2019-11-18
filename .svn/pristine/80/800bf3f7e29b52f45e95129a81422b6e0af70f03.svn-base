package com.knight.emms.model;

import java.util.Date;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.VetFlowMethod;

import lombok.Data;

@Data
public class FormOpinion extends BaseModel implements VetFlowMethod{
	private static final long serialVersionUID = 1L;

	@Expose
	private Long opinionId;

	@Expose
	private Long relateId;
	
	@Expose
	private String opinionType;

	@Expose
	private String relateModule;

	@Expose
	private Long opinionUserid;

	@Expose
	private String opinionUsername;

	@Expose
	private String opinionDep;

	@Expose
	private Date opinionTime;

	@Expose
	private String opinionContent;

	@Expose
	private String opinionRemark;

	@Expose
	private String warning;

	private String extendMessage;

	public Object getVetFlow() {
		return this;
	}

	public String getOpinion() {
		return this.opinionContent;
	}

	public void setOpinion(String opinion) {
		this.opinionContent = opinion;
	}

	public String getVetRemark() {
		return this.opinionRemark;
	}

	public void setVetRemark(String remark) {
		this.opinionRemark = remark;
	}

	public boolean isVetWarning() {
		return Constant.ENABLED.equals(this.warning);
	}

}
