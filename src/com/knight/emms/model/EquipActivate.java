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

import com.google.gson.annotations.Expose;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: EquipActivate
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-23 下午8:01:02
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "起租信息汇总", sheetName = "起租信息")
@SerialNumberStrategy(name = "activateSerial", strategy = "QY{yyyyMMdd}", maxseq = 999)
public class EquipActivate extends BusinessModel implements ExportModel{

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
	private String contractNo;
	
	@Expose
	private String rentStandard;
	
	@Expose
	private String deliveryEntName;
	
	@Expose
	private String verifyDate;
	
	@Expose
	private String measurement;

	@Expose
	private EquipFlow equipFlow;

	private Department department;

	/**生效时间*/
	private String effectiveDate;
	
	public void setModelSerial(String serial) {
		this.activateSerial = serial;
	}

}
