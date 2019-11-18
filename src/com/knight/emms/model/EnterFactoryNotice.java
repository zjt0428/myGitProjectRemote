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
public class EnterFactoryNotice extends BaseModel {

	@Expose
	private Long factoryNoticeId;

	@Expose
	private String userName;

	@Expose
	private String projectTel;

	@Expose
	private String conditions;
	
	@Expose
	private String startLincense;
	
	@Expose
	@CodeFieldDeclare(codeId="regulators", valueField = "regulatorsName")
	private String regulators;
	
	private String regulatorsName;
	
	@Expose
	private String lawContent;
	
	@Expose
	private String commandContent;
	
	@Expose
	private String otherContent;
	
	@Expose
	private String providedDate;
	
	@Expose
	private Date startDate;
	
	@Expose
	private Date installDate;
	
	@Expose
	private Long projectId;
	
	@Expose
	private Long practiId;
	
	@Expose
	private Long craneFee;
	
	@Expose
	private Project project;
	
	@Expose
	private Practitioner practitioner;
	
	@Expose
	private String DelFlag;
	
	@Expose(deserialize = false, serialize = true)
	@Since(value = 2.0)
	private Set<EnterFactoryEquip> enterFactoryEquipSet = new HashSet<EnterFactoryEquip>();

	private String enterFactoryEquips = "";
	
	public void setSubEnterFactoryNotice() {
		Set<EnterFactoryEquip> enterFactoryEquipSet = GsonUtil.fromJson(this.enterFactoryEquips, new TypeToken<Set<EnterFactoryEquip>>() {});
		if (enterFactoryEquipSet != null) {
			this.setEnterFactoryEquipSet(enterFactoryEquipSet);
		}
	}
}
