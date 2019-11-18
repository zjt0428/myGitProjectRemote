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

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: Accident
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:34:46
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "accidentSerial", strategy = "SG{yyyyMMdd}", maxseq = 99)
public class Accident extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long accidentId;

	@Expose
	private String accidentSerial;

	@Expose
	private String accidentDate;

	@Expose
	private String responsibleUnit;

	@Expose
	private String responsible;

	@Expose
	private String accidentCategory;

	@Expose
	@CodeFieldDeclare(codeId = "ACCIDENT_LEVEL", valueField = "accidentLevelName")
	private String accidentLevel;

	@Expose
	private String accidentLevelName;

	private Integer injuries;

	private Integer deaths;

	private String economicLosses;

	private String accidentDesc;

	private String accidentReason;

	private String accidentResult;

	private String equipRepairDesc;

	@Expose
	private String providedDate;

	@Expose
	private String address;

	private Long accidentReportId;

	@Expose
	private String status;

	@Expose
	private Equipment equipment;

	@Expose
	private Project project;

	public void setModelSerial(String serial) {
		this.accidentSerial = serial;
	}

}
