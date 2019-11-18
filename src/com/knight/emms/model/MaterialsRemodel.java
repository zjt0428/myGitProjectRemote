package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;

@Data
@PersistantDeclare()
@SerialNumberStrategy(name = "remodelSerial", strategy = "GX{yyyyMMdd}", maxseq = 99)
public class MaterialsRemodel extends ApplyforState {

	private static final long serialVersionUID = 1L;
	
	@Expose	
	private Long remodelId;
	
	/**状态*/
	@Expose
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "applyforStateName")
	private String applyforState;
	
	@Expose
	private String applyforStateName;
	
	/**改型单号*/		
	@Expose	
	private String remodelSerial;
	
	/**仓库*/	
    @Expose
	private BaseDepot baseDepot;
    
	@Expose	
	private Long userId;
	
	/**制单人*/	
	@Expose
	private String userName;
	
	/**单据日期*/	
	@Expose
	private String applyDate;
	
	/**资产属性*/	
	@Expose
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;
	
	@Expose
	private String assetsPropertyName;
	
	@Expose
	private Long producerId;
	
	/**制作人员*/	
	@Expose
	private String producer;
	
	/**制作主题*/	
	@Expose
	private String producationTheme;
	
	/**改型类别*/	
	@Expose
	@CodeFieldDeclare(codeId = "remodelType", valueField = "remodelTypeName")
	private String remodelType;
	
	@Expose
	private String remodelTypeName;
	
	/**计划完成时间*/	
	@Expose
	private String planFinishDate;
	
	/**审核人员*/	
	@Expose
	private String approveMan;
	
	/**审核时间*/	
	@Expose
	private String approveDate;
	
	/**审核时间*/	
	@Expose
	private String remark;
	
	private String delFlag;
	
	public Long getApplyforId() {
		return this.remodelId;
	}
	
	public void setModelSerial(String serial) {
		this.remodelSerial = serial;
	}

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<BeforeRemodel> beforeRemodelSet = new HashSet<BeforeRemodel>();
	
	private String beforeRemodels = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AfterRemodel> afterRemodelSet = new HashSet<AfterRemodel>();
	
	private String afterRemodels = "";
	
	// ========================================================================//
	
	public void setSubMaterialsRemodel() {
		Set<BeforeRemodel> beforeRemodelSet = GsonUtil.fromJson(this.beforeRemodels, new TypeToken<Set<BeforeRemodel>>() {});
		if (beforeRemodelSet != null) {
			for (BeforeRemodel c : beforeRemodelSet) {
				c.setRemodelId(this.getRemodelId());
			}
			this.setBeforeRemodelSet(beforeRemodelSet);
		}
		Set<AfterRemodel> afterRemodelSet = GsonUtil.fromJson(this.afterRemodels, new TypeToken<Set<AfterRemodel>>() {});
		if (afterRemodelSet != null) {
			for (AfterRemodel c : afterRemodelSet) {
				c.setRemodelId(this.getRemodelId());
			}
			this.setAfterRemodelSet(afterRemodelSet);
		}
	}
}
