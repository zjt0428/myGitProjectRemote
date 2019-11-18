package com.knight.emms.model;


import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

@Data
@ToString(callSuper = false)
@PersistantDeclare(isExportable = true, exportName = "离职记录汇总", sheetName = "离职记录")
public class PractiLeave extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long leaveId;

	//离职时间
	@Expose
	private String leaveTime;
	
	//离职原因
	@Expose
	private String remark;
	
	@Expose
	private Long userId;

	@Expose
	private String userName;
	
	@Expose
	private String createTime;
	
	/**离职状态（0未生效1已生效） */
	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;
	
	@Expose
	private String effectiveName;

	@Expose
	private Long practiId;

	@Expose
	private Practitioner practitioner;

}
