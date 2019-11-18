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
public class ProjectDepotInit extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose	
	private Long projectInitId;

	@Expose	
	private Long contractId;
	
	@Expose	
	private Long projectId;

	@Expose
	private String projectSerial;
	
	@Expose
	private String projectName;
	
	/**施工单位*/
	@Expose
	private String unCustomName;
	
	@Expose
	private String address;
	
	@Expose
	private String total;
	
	/**初始日期*/
	@Expose
	private String initDate;
	
	/**初始化人员*/
	@Expose
	private String initPerson;
	
	/**合同编号*/
	@Expose
	private String contractSerial;
	
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
	private Set<ProjectDepotInitDetail> projectDepotInitDetailSet = new HashSet<ProjectDepotInitDetail>(0);
	
	private String projectDepotInitDetails="";
	
	public void setSubProjectDepotInit(){
		Set<ProjectDepotInitDetail> projectDepotInitDetailSet =GsonUtil.fromJson(this.getProjectDepotInitDetails(), new TypeToken<Set<ProjectDepotInitDetail>>() {});
		if (projectDepotInitDetailSet != null) {
			for (ProjectDepotInitDetail bdp : projectDepotInitDetailSet) {
				bdp.setProjectInitId(this.getProjectInitId());
			}
		}
		this.setProjectDepotInitDetailSet(projectDepotInitDetailSet);
	}
}
