package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

import lombok.Data;

@Data
@PersistantDeclare
public class BaseDepotInit extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose	
	private Long depotInitId;

	/**仓库名称*/
	@Expose
	private String depotName;
	
	/**规格id*/
	@Expose
	private Long specificationsId;
	
	/**助记码*/
	@Expose
	private String mnemonics;

	/**品名*/
	@Expose	
	private String commodity;
	
	/**规格*/
	@Expose	
	private String specifications;
	
	/**数量*/
	@Expose	
	private String quantity;

	/**单位*/
	@Expose	
	private String unit;

	/**辅助数量*/
	@Expose	
	private String supplementQuantity;

	/**换算系数*/
	@Expose
	private String conversion;
	
	/**辅助单位*/
	@Expose	
	private String supplementUnit;
	
	/**计量数量总数*/
	@Expose	
	private String total;
	
	/**辅助数量总数*/
	@Expose	
	private String supplementTotal;
	
	/**仓库*/
	@Expose	
	private BaseDepot baseDepot;
	
	/**生效*/
	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;

	@Expose
	private String delFlag;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)	
	private Set<BaseDepotInitDetail> baseDepotInitDetailSet = new HashSet<BaseDepotInitDetail>(0);
	
	private String baseDepotInitDetails = "";
	
	public void setSubBaseDepotInit(){
		Set<BaseDepotInitDetail> baseDepotInitDetailSet =GsonUtil.fromJson(this.getBaseDepotInitDetails(), new TypeToken<Set<BaseDepotInitDetail>>() {});
		if (baseDepotInitDetailSet != null) {
			for (BaseDepotInitDetail bdp : baseDepotInitDetailSet) {
				bdp.setDepotInitId(this.depotInitId);
			}
		}
		this.setBaseDepotInitDetailSet(baseDepotInitDetailSet);
	}
}
