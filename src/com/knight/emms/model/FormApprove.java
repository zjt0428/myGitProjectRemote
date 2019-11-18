/**
 *====================================================
 * 文件名称: FormApprove.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.VetFlowMethod;

/**
 * @ClassName: FormApprove
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:59:22
 */
@Data
@ToString(callSuper = false)
public class FormApprove extends BaseModel implements VetFlowMethod {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long approveId;

	@Expose
	private Long relateId;

	@Expose
	private String relateModule;

	@Expose
	private Long approveUserid;

	@Expose
	private String approveUsername;

	@Expose
	private String approveDep;

	@Expose
	private Date approveTime;

	@Expose
	private String approveOpinion;

	@Expose
	private String approveRemark;

	@Expose
	private String approveAddress;

	@Expose
	private String warning;

	private String extendMessage;

	public Object getVetFlow() {
		return this;
	}

	public String getOpinion() {
		return this.approveOpinion;
	}

	public void setOpinion(String opinion) {
		this.approveOpinion = opinion;
	}

	public String getVetRemark() {
		return this.approveRemark;
	}

	public void setVetRemark(String remark) {
		this.approveRemark = remark;
	}

	public boolean isVetWarning() {
		return Constant.ENABLED.equals(this.warning);
	}

}
