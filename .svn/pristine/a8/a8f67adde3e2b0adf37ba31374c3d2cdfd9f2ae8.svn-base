/**
 *====================================================
 * 文件名称: PurchasePlan.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016-12-6			liupj(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.util.GsonUtil;


/**
 * @ClassName: PurchasePlan
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author liupj
 * @date 2016-12-6 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class PurchasePlan extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long purchasePlanId;
	
	@Expose
	private String personName;
	
	@Expose
	private String fillDate;
	
	@Expose
	private String applicantName;
	
	@Expose
	private String applicantDept;
	
	@Expose
	private String inquiryName;
	
	@Expose
	private String inquiryDate;
	
	@Expose
	private Long totalCost;
	
	@Expose
	private String remark;
	
	@Expose
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	private String delflag;
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PurchasePlanInquiry> purchasePlanInquirySet = new HashSet<PurchasePlanInquiry>(0);

	private String purchasePlanInquirys = "";
	
	public void setSubPurchasePlan() {
		Set<PurchasePlanInquiry> purchasePlanInquirySet = GsonUtil.fromJson(this.getPurchasePlanInquirys(), new TypeToken<Set<PurchasePlanInquiry>>() {});
		if (purchasePlanInquirySet != null) {
			for (PurchasePlanInquiry p : purchasePlanInquirySet) {
				p.setPurchasePlanId(this.getPurchasePlanId());
			}
		}
		this.setPurchasePlanInquirySet(purchasePlanInquirySet);
	}
}
