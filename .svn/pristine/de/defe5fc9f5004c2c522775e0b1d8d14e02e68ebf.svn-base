
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: ApplyMake
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author xuenz
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "makeSerial", strategy = "ZZ{yyyyMMdd}", maxseq = 99)
public class ApplyMake extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long applyMakeId;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	/**制作单号*/
	@Expose
	private String makeSerial;
	
	/**申请人*/
	@Expose
	private String makeMan;
	
	/**申请日期*/
	@Expose
	private String makeDate;

	/**资产属性*/
	@Expose
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;

	@Expose
	private String assetsPropertyName;
	
	/**仓库Id*/
	@Expose
	private Long storeId;
	
	/**仓库名称*/
	@Expose
	private String storeName;

	/**制作主题*/
	@Expose
	private String makeTheme;

	/**审批人*/
	@Expose
	private String approveMan;

	/**审批时间*/
	@Expose
	private Date approveDate;
	
	/**计划开始时间*/
	@Expose
	private String startDate;
	
	/**计划完成时间*/
	@Expose
	private String completeDate;

	/**备注*/
	@Expose
	private String remark;
	
	@Expose
	private String delFlag;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ProductMake> productMakeSet = new HashSet<ProductMake>();

	private String productMakes = "";

	public void setModelSerial(String serial) {
		this.makeSerial = serial;
	}
	
	public String getModelSerial() {
		return this.makeSerial;
	}

	public Long getApplyforId() {
		return this.applyMakeId;
	}

	@Override
	public Long getUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	// ==============================================================================//
	public void setSubApplyMake() {
		Set<ProductMake> productMakeSet = GsonUtil.fromJson(this.getProductMakes(), new TypeToken<Set<ProductMake>>() {});
		if (productMakeSet != null) {
			for (ProductMake p : productMakeSet) {
				p.setApplyMakeId(applyMakeId);
			}
		}
		this.setProductMakeSet(productMakeSet);
	}

}
