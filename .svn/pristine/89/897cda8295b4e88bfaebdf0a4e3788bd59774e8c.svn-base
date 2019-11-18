
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: LostHandle
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare(isExportable = true, exportName = "丢失处理信息汇总", sheetName = "丢失处理信息")
@SerialNumberStrategy(name = "lostSerial", strategy = "DS{yyyyMMdd}", maxseq = 99)
public class LostHandle extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long lostId;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	private String lostSerial;
	
	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private String lostDate;
	
	@Expose
	private Long contractId;
	
	@Expose
	private String contractNo;//合同编号
	
	@Expose
	private String contractSerial;//合同流水号

	@Expose
	private String paEntName;

	@Expose
	private String pbEntName;
	
	@Expose
	private Long projectId;

	@Expose
	private String projectName;
	
	@Expose
	private String projectAddress;
	
	@Expose
	private String costTotal;
	
	@Expose
	private String subsidiarySerial;
	
	private Department department;
	
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

	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<LostDetail> lostDetailSet = new HashSet<LostDetail>();

	private String lostDetails = "";

	public Long getApplyforId() {
		return this.lostId;
	}

	public void setModelSerial(String serial) {
		this.lostSerial = serial;
	}

	// ========================================================================//
	public void setSubLostDetail() {
		Set<LostDetail> lostDetailSet = GsonUtil.fromJson(this.lostDetails, new TypeToken<Set<LostDetail>>() {});
		if (lostDetailSet != null) {
			for (LostDetail c : lostDetailSet) {
//				c.setComponId(c.getComponent().getComponId());
				c.setLostId(this.getLostId());
			}
			this.setLostDetailSet(lostDetailSet);
		}
	}

}
