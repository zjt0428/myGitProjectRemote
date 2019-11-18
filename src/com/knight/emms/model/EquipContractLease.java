/**
 *====================================================
 * 文件名称: EquipActivate.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: EquipActivate
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-23 下午8:01:02
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
@SerialNumberStrategy(name = "activateSerial", strategy = "QY{yyyyMMdd}", maxseq = 99)
public class EquipContractLease extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long activateId;

	@Expose
	private String activateSerial;

	@Expose
	private String activateDate;

	private Long emEnt;

	@Expose
	private String emEntName;

	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;

	private Long userId;

	private String userName;

	private String providedDate;

	private String delFlag;

	@Expose
	private String acceptanceDate;

	@Expose
	private String appointmentDate;

	@Expose
	private String contractSerial;
	
	@Expose
	private Long equipId;
	
	@Expose
	private Equipment equipment;
	
	@Expose
	private String installSerial;//安装告知
	
	@Expose
	private String propertyName;//产权单位
	
	@Expose
	private String installTheme;//安装主题
	
	@Expose
	private String installHeight;//安装高度
	
	@Expose
	private String projectSerial;//项目编号
	
	@Expose
	private String startinDate;//安装日期
	
	@Expose
	private String projectName;//项目名称
	
	@Expose
	private String address; //项目所属地
	
	@Expose
	private String recordSerial; //启用设备
	
	@Expose
	private String equipSpecificName; //规格型号
	
	@Expose
	private String equipCategoryName; //设备类别
	
	@Expose
	private String recordId; //备案编号
	
	@Expose
	private String equipGenericName; //设备名称
	
	@Expose
	private String exwSerial; //出厂编号

	private Department department;

	public void setModelSerial(String serial) {
		this.activateSerial = serial;
	}

}
