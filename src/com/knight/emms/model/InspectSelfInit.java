package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;


import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InspectSelfInit extends BaseModel{
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long initId;
	
	/** 检查类型 */
	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_INSPECTION_TYPE", valueField = "inspectTypeName")
	private String inspectType;
	
	@Expose
	private String inspectTypeName;
	
	/** 检查项（大项）*/
	@Expose
	private String inspectItem;
	
	private Set<InspectSelfInitDetail> inspectSelfInitDetailSet = new HashSet<InspectSelfInitDetail>();
	
	private String inspectSelfInitDetails = "";
	
	public void complete() {
		Set<InspectSelfInitDetail> inspectSelfInitDetailSet = GsonUtil.fromJson(this.inspectSelfInitDetails, new TypeToken<Set<InspectSelfInitDetail>>() {});
		if (inspectSelfInitDetailSet != null) {
			for (InspectSelfInitDetail p : inspectSelfInitDetailSet) {
				p.setInitId(this.initId);
				p.setInspectType(this.inspectType);
			}
		}
		this.setInspectSelfInitDetailSet(inspectSelfInitDetailSet);
	}
	
}
