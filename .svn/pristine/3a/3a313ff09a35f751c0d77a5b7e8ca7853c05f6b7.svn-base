/**
 *====================================================
 * 文件名称: TechnicalDisclosure.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: TechnicalDisclosure
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午7:43:43
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "addReduceSerial", strategy = "AR{yyyyMMdd}", maxseq = 99)
public class EquipAddReduceDetail extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long addReduceId;

	@Expose
	private String addReduceSerial;
	
	@Expose
	private String relateModule;
	
	@Expose
	private Long executerId;
	@Expose
	private String executerName;
	
	@Expose
	private String executeDate;
	
	@Expose
	private Integer knotNum;
	
	@Expose
	private Integer wallAttacheNum;
	
	@Expose
	private Integer wallAttachePoleCount;
	
	@Expose
	private Integer wallAttacheFrameCount;
	
	@Expose
	private Integer wallAttachePoleNum;//此次新增的附墙杆数量
	
	@Expose
	private Integer wallAttacheFrameNum;//此次新增的附墙框数量
	@Expose
	private Integer wallAttachePoleQty;//此次减少的附墙杆数量
	
	@Expose
	private Integer wallAttacheFrameQty;//此次减少的附墙框数量
	
	@Expose
	private Integer wallAttacheDisQty;//此次拆卸的附墙数量
	@Expose
	private Integer knotDisQty;//此次拆卸的附墙数量
	

	@Expose
	private Equipment equipment;

	@Expose
	private String fileAttaches;
	
	@Expose
	private String checkAttach;//自检照片
	
	@Expose
	private Long relateId;
	
	@Expose 
	private  Integer knotCounts;//拆卸标准节总数
	
	@Expose
	private Integer wallAttacheQty;//拆卸的附墙总数
	@Expose
	private BigDecimal installHeight;
	@Expose
	private BigDecimal brachium;
	
	@Expose
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm")
	private Date startinDate;

	@Expose
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm")
	private Date endinDate;

	private Long spendTime;
	
	/*private String dismantleHeight;*/
	
	private Long disclosureId;
	
	@Expose
	@CodeFieldDeclare(codeId = "APP_INSTALL_STATUS", valueField = "appInstallStateName")
	private String appInstallState;
	@Expose
	private String appInstallStateName;
	
	@Expose
	@CodeFieldDeclare(codeId = "APP_DISMANTLE_STATE", valueField = "appDismantleStateName")
	private String appDismantleState;

	@Expose
	private String appDismantleStateName;
	
	@Expose
	private String partake;
	
	@Expose
	private String remark;
	
	@Expose
	private Long installId;
	
	private Long userId;

	private String userName;
	
	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	@Override
	public void setModelSerial(String serial) {
		this.addReduceSerial = serial;
	}

	@Override
	public Long getApplyforId() {
		return this.addReduceId;
	}


}
