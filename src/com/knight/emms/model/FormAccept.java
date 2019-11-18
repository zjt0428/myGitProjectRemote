/**
 *====================================================
 * 文件名称: FormAccept.java
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
 * @ClassName: FormAccept
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:53:27
 */
@Data
@ToString(callSuper = false)
public class FormAccept extends BaseModel implements VetFlowMethod {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long acceptId;

	@Expose
	private Long relateId;

	@Expose
	private String relateModule;

	@Expose
	private Long acceptUserid;

	@Expose
	private String acceptUsername;

	@Expose
	private String acceptDep;

	@Expose
	private Date acceptTime;

	@Expose
	private String acceptOpinion;

	@Expose
	private String acceptRemark;

	@Expose
	private String warning;

	private String extendMessage;

	public Object getVetFlow() {
		return this;
	}

	public String getOpinion() {
		return this.acceptOpinion;
	}

	public void setOpinion(String opinion) {
		this.acceptOpinion = opinion;
	}

	public String getVetRemark() {
		return this.acceptRemark;
	}

	public void setVetRemark(String remark) {
		this.acceptRemark = remark;
	}

	public boolean isVetWarning() {
		return Constant.ENABLED.equals(this.warning);
	}

}
