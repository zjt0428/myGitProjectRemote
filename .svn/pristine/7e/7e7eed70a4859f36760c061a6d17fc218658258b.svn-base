/**
 *====================================================
 * 文件名称: EquipInspectSchema.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import com.knight.emms.constant.Status;
import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.model.SchemaMethod;

/**
 * @ClassName: EquipInspectSchema
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午10:54:29
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipInspectSchema extends BaseModel implements SchemaMethod, Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long inspectSchemaId;
	
	@Expose
	private Long userId;
	
	@Expose
	private String userName;
	
	@Expose
	private String applyDate;

	@Expose
	private Long flowId;

	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateModule;

	/**周期起始日期*/
	@Expose
	private Date cycleActivateDate;

	/**巡检周期天数*/
	@Expose
	private Integer cycleDays;

	/**巡检频率*/
	@Expose
	private Integer timesInCycle;

	private String description;
	
	@Expose
	@CodeFieldDeclare(codeId = "belongToArea", valueField = "belongToAreaName")
	private String belongToArea;
	
	@Expose
	private String belongToAreaName;

	@Expose
	private Integer createTimes;
	
	@Expose
	private Integer inspectTimes;

	/**周期次数*/
	private Integer cycleTimes;

	/**周期内执行次数*/
	private Integer cycleDaysTimes;

	/** 当前周期起始日期*/
	private Date thisStartCycleDate;

	/**当前周期截止日期*/
	private Date thisEndCycleDate;

	/** 下一任务生成时间*/
	private Date nextFormTime;

	/**下一周期起始日期*/
	private Date nextStartCycleDate;

	@Expose
	private String active;

	private String delFlag;

	@Expose
	private EquipDiary equipDiary;

	// =======================================================================//
	private String relateIds;

	/**生成周期*/
	@Expose
	@CodeFieldDeclare(codeId = "GENERATED_CYCLE", valueField = "generatedCycleName")
	private String generatedCycle;
	
	@Expose
	private String generatedCycleName;
	
	/**巡检频率*/
	private Integer inspectFrequency;
	
	/**生成时间*/
	@Expose
	@CodeFieldDeclare(codeId = "GENERATED_OPPORTUNITY", valueField = "generatedOpportunityName")
	private String generatedOpportunity;
	
	@Expose
	private String generatedOpportunityName;
	
	/**激活时间*/
	@Expose
	private String activateTime;
	
	private EquipFlow equipFlow;
	
	public EquipInspectSchema clone() {
		try {
			return (EquipInspectSchema) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

}
