/**
 *====================================================
 * 文件名称: Accident.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: ElevatorMonitor
 * @Description: 远程故障表
 * @author chenxy
 * @date 2015年4月1日 下午5:34:46
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ElevatorMonitor implements ExportModel {

	private static final long serialVersionUID = 1L;


	@Expose
	private Long _id;
	@Expose
	private Long monitorId;
	@Expose
	private String monitorAddress;
	@Expose
	private String equipmentNumber;
	@Expose
	private String equipmentStatus;
	@Expose
	private String fault;
	@Expose
	private String faultCurrent;
	@Expose
	private String breakdownVoltage;
	@Expose
	private String failureFrequency;
	@Expose
	private String weightOfFailure;
	@Expose
	private String faultFloor;
	@Expose
	private String inputVoltage;
	@Expose
	private String position;
	@Expose
	private String hours;
	@Expose
	private String minutes;
	@Expose
	private String createDateTime;
	@Expose
	private String switchFault1; 		//开关故障1
	@Expose
	private String switchFault2; 		//开关故障2
	@Expose
	private String switchFault3; 		//开关故障3

	
	@Expose
	private Equipment equipment;
	
	}
	
