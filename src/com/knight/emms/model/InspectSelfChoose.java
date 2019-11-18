package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
public class InspectSelfChoose extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long chooseId;
	
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
	
	private Set<InspectSelfChooseDetail> inspectSelfChooseDetailSet = new HashSet<InspectSelfChooseDetail>();
	
	private String inspectSelfChooseDetails = "";
	
//	public void complete() {
//		Set<InspectSelfChooseDetail> inspectSelfInitDetailSet = GsonUtil.fromJson(this.inspectSelfChooseDetails, new TypeToken<Set<InspectSelfChooseDetail>>() {});
//		if (inspectSelfInitDetailSet != null) {
//			for (InspectSelfChooseDetail p : inspectSelfChooseDetailSet) {
//				p.setChooseId(this.getChooseId());
//			}
//		}
//		this.setInspectSelfChooseDetailSet(inspectSelfChooseDetailSet);
//	}
	
}
