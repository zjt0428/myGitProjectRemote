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
public class BasicPreEmbeddingNotice extends BaseModel{

	@Expose
	private Long preEmbeddingNoticeId;
	
	@Expose
	private String userName;

	@Expose
	private String providedDate;
	
	@Expose
	private Long projectId;
	
	@Expose
	private String projectTel;

	@Expose
	private Long practiId;
	
	@Expose
	private Date startDate;
	
	@Expose
	private Date installDate;
	
	@Expose
	private String reinforcementCondition;
	
	@Expose
	private String conditions;
	
	@Expose
	private Long craneFee;
	
	@Expose
	private String otherContent;
	
	@Expose
	private Project project;
	
	@Expose
	private Practitioner practitioner;
	
	@Expose
	private String DelFlag;

	@Expose(deserialize = false, serialize = true)
	@Since(value = 2.0)
	private Set<BasicPreEmbeddingEquip> basicPreEmbeddingEquipSet = new HashSet<BasicPreEmbeddingEquip>();

	private String basicPreEmbeddingEquips = "";
	
	public void setSubBasicPreEmbeddingNotice() {
		Set<BasicPreEmbeddingEquip> basicPreEmbeddingEquipSet = GsonUtil.fromJson(this.basicPreEmbeddingEquips, new TypeToken<Set<BasicPreEmbeddingEquip>>() {});
		if (basicPreEmbeddingEquipSet != null) {
			this.setBasicPreEmbeddingEquipSet(basicPreEmbeddingEquipSet); 
		}
	}
	
	
}
