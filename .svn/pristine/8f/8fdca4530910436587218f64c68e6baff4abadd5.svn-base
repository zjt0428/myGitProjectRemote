package com.knight.emms.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.util.GsonUtil;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class ExitFactoryNotice extends BaseModel{
	
	@Expose
	private Long exitFactoryNoticeId;

	@Expose
	private String userName;

	@Expose
	private String providedDate;
	
	@Expose
	private String projectTel;

	@Expose
	private Date startDate;
	
	@Expose
	private Date installDate;
	
	@Expose
	private String conditions;
	
	@Expose
	private Long craneFee;
	
	@Expose
	private String startLincense;
	
	@Expose
	@CodeFieldDeclare(codeId="regulators", valueField = "regulatorsName")
	private String regulators;
	
	private String regulatorsName;
	
	@Expose
	private String otherContent;
	
	@Expose
	private String DelFlag;

	@Expose
	private Long projectId;
	
	@Expose
	private Long practiId;
	
	@Expose
	private Project project;
	
	@Expose
	private Practitioner practitioner;
	
	@Expose(deserialize = false, serialize = true)
	@Since(value = 2.0)
	private Set<ExitFactoryEquip> exitFactoryEquipSet = new HashSet<ExitFactoryEquip>();
	
	private String exitFactoryEquips = "";

	public void setSubExitFactoryNotice(){
		Set<ExitFactoryEquip> exitFactoryEquipSet = GsonUtil.fromJson(this.exitFactoryEquips, new TypeToken<Set<ExitFactoryEquip>>() {});
		if(exitFactoryEquipSet != null){
			this.setExitFactoryEquipSet(exitFactoryEquipSet);
		}
	}
	
}
