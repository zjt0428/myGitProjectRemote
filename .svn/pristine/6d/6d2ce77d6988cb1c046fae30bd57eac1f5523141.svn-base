/**
 *====================================================
 * 文件名称: EquipBlockup.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: EquipBlockup
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @param <BlockupStandard>
 * @date 2014-5-23 上午7:01:13
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
@SerialNumberStrategy(name = "blockupSerial", strategy = "TY{yyyyMMdd}", maxseq = 9999)
public class EquipBlockup extends BusinessModel implements Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long blockupId;
	
	@Expose
	private String relateIds;

	@Expose
	private String blockupSerial;
	
	@Expose
	private Date blockupDate;

	@Expose
	private String reactivateDate;
	
	@Expose
	private String remark;

	private Long userId;
	
	@Expose
	private Long corpId;
	
	@Expose
	private Long warehouseId;

	private String userName;

	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;
	
	@Expose
	private Boolean isScraped;
	
	@Expose
	@CodeFieldDeclare(codeId = "BLOCKUP_TYPE", valueField = "blockupTypeName")
	private String blockupType;
	
	@Expose
	private String blockupTypeName;
	
	@Expose
	private String delFlag;

	@Expose
	private EquipFlow equipFlow;

	private Department department;
	
	private String effectiveDate;
     
	public void setModelSerial(String serial) {
		this.blockupSerial = serial;
	}
	
	public EquipBlockup clone() {
		try {
			return (EquipBlockup) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}
}
