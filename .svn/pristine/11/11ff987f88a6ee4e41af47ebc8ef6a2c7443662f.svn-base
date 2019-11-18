package com.knight.emms.model;


import java.util.List;

import com.google.gson.annotations.Expose;
import com.knight.app.model.Attendamce;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.model.SerialNumberStrategy;
import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: InspectProjectRecord
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "自检项目信息", sheetName = "自检项目信息")
@SerialNumberStrategy(name = "inprojectSerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class InspectProjectRecord extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long inprojectId;
	
	/**自检编号*/
	@Expose
	private String inprojectSerial;
	
	/**自检日期*/
	@Expose
	private String inprojectDate;

	/**自检项*/
	@Expose
	private String inprojectItem;
	
	/** 检查类型 */
	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_INSPECTION_TYPE", valueField = "inprojectTypeName")
	private String inprojectType;
	
	@Expose
	private String inprojectTypeName;
	
	/**自检照片*/
	@Expose
	private String inprojectImage;
	
	/**自检状态*/
	@Expose
	private String inprojectState;
	
	@Expose
	private Long aid;
	
	@Expose
	private String delFlag;
	
	@Expose
	private Attendamce attendamce;
	@Expose
	private List<String> inprojectImageList;
}
