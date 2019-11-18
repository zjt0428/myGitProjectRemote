/**
 *====================================================
 * 文件名称: HandleMake.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月03日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: HandleMake
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年11月03日
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "制作处理", sheetName = "制作处理信息")
@SerialNumberStrategy(name = "handleSerial", strategy = "CL{yyyyMMdd}", maxseq = 99)
public class HandleMake extends ApplyforState implements ExportModel {
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long handleId;
	
	/**处理单号*/
	@Expose
	private String handleSerial;
	
	/**处理主题*/
	@Expose
	private String handleTheme;
	
	/**制单人id*/
	@Expose
	private Long userId;
	
	/**制单人*/
	@Expose
	private String userName;
	
	/**处理日期*/
	@Expose
	private String fillDate;
	
	/**制作人员*/
	@Expose
	private String producers;
	
	/**申请id*/
	@Expose
	private Long applyMakeId;
	
	@Expose
	private ApplyMake applyMake;
	
	/**计划完成时间*/
	@Expose
	private String planFinishDate;
	
	/**备注*/
	@Expose
	private String remarks;
	
	/**状态*/
	@Expose
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "statusName")
	private String status;
	
	@Expose
	private String statusName;
	
	/**审批人*/
	@Expose
	private String approveMan;

	/**审批时间*/
	@Expose
	private Date approveDate;
	
	/*制作班组ID*/
	@Expose
	private Long teamId;
	
	/*制作班组*/
	@Expose
	private String teamName;
	
	private String delFlag;

	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<MakeProduct> makeProductSet = new HashSet<MakeProduct>(0);
	
	private String makeProducts = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<ConsumeProduct> consumeProductSet = new HashSet<ConsumeProduct>(0);
	
	private String consumeProducts = "";
	
	@Override
	public Long getApplyforId() {
		return this.handleId;
	}

	@Override
	public void setApplyforState(String applyforState) {
		this.status = applyforState;
	}

	@Override
	public String getApplyforState() {
		return this.status;
	}

	@Override
	public void setModelSerial(String serial) {
		this.handleSerial = serial;
	}
	
	public void setSubHandleMake() {
		Set<MakeProduct> makeProductSet = GsonUtil.fromJson(this.getMakeProducts(), new TypeToken<Set<MakeProduct>>() {});
		if (makeProductSet != null) {
			for (MakeProduct m : makeProductSet) {
				m.setHandleId(this.getHandleId());
			}
		}
		this.setMakeProductSet(makeProductSet);
		
		Set<ConsumeProduct> consumeProductSet = GsonUtil.fromJson(this.getConsumeProducts(), new TypeToken<Set<ConsumeProduct>>() {});
		if (consumeProductSet != null) {
			for (ConsumeProduct m : consumeProductSet) {
				m.setHandleId(this.getHandleId());
			}
		}
		this.setConsumeProductSet(consumeProductSet);
	}
}
