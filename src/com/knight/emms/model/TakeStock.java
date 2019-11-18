package com.knight.emms.model;


import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "盘点管理信息汇总", sheetName = "盘点管理信息")
@SerialNumberStrategy(name = "invoicesSerial", strategy = "PD{yyyyMMdd}", maxseq = 99)
public class TakeStock extends ApplyforState implements ExportModel{
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long takeStockId;
	
	/*单据编号*/
	@Expose
	private String invoicesSerial;
	
	/*制单人Id*/
	@Expose
	private Long userId;
	
	/*制单人名称*/
	@Expose
	private String userName;
	
	/*盘点日期*/
	@Expose
	private String takeStockDate;
	
	/*仓库id*/
	@Expose
	private Long storeId;
	
	/*仓库名称*/
	@Expose
	private String storeName;
	
	/*审批状态*/
	@Expose
	@CodeFieldDeclare(codeId = "TAKE_STOCK_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;
	/*审批状态名称*/
	@Expose
	private String applyforStateName;
	/*备注*/
	@Expose
	private String remark;
	@Expose
	private String delFlag = Constant.ENABLED;
	
	/*仓库库位id*/
	@Expose
	private Long locationId;
	
	/*仓库库位名称*/
	@Expose
	private String locationName;
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<Baldetail> baldetailSet = new HashSet<Baldetail>(0);

	private String baldetails = "";
	
	public void setSubTakeStock(){
		Set<Baldetail> baldetailSet = GsonUtil.fromJson(this.getBaldetails(), new TypeToken<Set<Baldetail>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (baldetailSet != null) {
			for (Baldetail b : baldetailSet) {
				b.setTakeStockId(this.takeStockId);
			}
		}
		this.setBaldetailSet(baldetailSet);
		
	}
	
	public void setModelSerial(String serial) {
		this.invoicesSerial = serial;
	}
	
	public Long getApplyforId() {
		return this.takeStockId;
	}

}
