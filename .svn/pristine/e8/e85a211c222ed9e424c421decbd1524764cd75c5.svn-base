/**
 *====================================================
 * 文件名称: EquipMaintSchema.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月6日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.model.SchemaMethod;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: EquipMaintSchema
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月6日 下午1:50:14
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipMaintSchema extends BaseModel implements SchemaMethod,Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long maintSchemaId;

	@Expose
	private Long flowId;

	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateModule;

	@Expose
	private Date cycleActivateDate;

	@Expose
	private Integer cycleDays;

	@Expose
	private Integer timesInCycle;

	@Expose
	@CodeFieldDeclare(codeId = "MAINT_TYPE", valueField = "maintTypeName")
	private String maintType;

	@Expose
	private String maintTypeName;

	private String description;

	@Expose
	private Integer maintTimes;

	private Integer cycleTimes;

	private Integer cycleDaysTimes;

	private Date thisStartCycleDate;

	private Date thisEndCycleDate;

	private Date nextFormTime;

	private Date nextStartCycleDate;

	@Expose
	private String active;

	private String delFlag;

/*	@Expose
	private EquipDiary equipDiary;*/
	
	@Expose
	private Equipment equipment;
	

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<VerifyStandard> maintSchemaStandardSet = new HashSet<VerifyStandard>(0);

	private String maintSchemaStandards = "";

	// ==========================================================================================//
	private String relateIds;

	public EquipMaintSchema clone() {
		try {
			return (EquipMaintSchema) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

	public void setSubEquipMaint() {
		Set<VerifyStandard> maintSchemaStandardSet = GsonUtil.fromJson(this.maintSchemaStandards, new TypeToken<Set<VerifyStandard>>() {});
		if (maintSchemaStandardSet != null) {
			for (VerifyStandard s : maintSchemaStandardSet) {
				s.setRelateId(this.maintSchemaId);
				s.setRelateModule(SystemConstant.MODULE_EQUIP_MAINT_SCHEMA);
			}
			this.setMaintSchemaStandardSet(maintSchemaStandardSet);
		}
	}

}
