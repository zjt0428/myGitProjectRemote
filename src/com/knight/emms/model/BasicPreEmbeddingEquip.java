package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class BasicPreEmbeddingEquip extends BaseModel{

	private static final long serialVersionUID = 1L;

	@Expose
	private Long preEmbeddingEquipId;
	
	@Expose
	private Long preEmbeddingNoticeId;

	@Expose
	private String equipGenericName;

	@Expose
	private String equipSpecificName;
	
	@Expose
	private Integer counts;
	
}
