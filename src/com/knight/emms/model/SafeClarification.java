package com.knight.emms.model;


import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: SafeClarification
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "安全交底信息汇总", sheetName = "安全交底信息")
@SerialNumberStrategy(name = "clarificaSerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class SafeClarification extends BaseModel implements ExportModel{

	private static final long serialVersionUID = 1L;

	@Expose
	private Long clarificaId;

	/**安全交底单号*/
	@Expose
	private String clarificaSerial;
	
	@Expose
	private Long projectId;
	
	@Expose
	private String projectName;
	
	@Expose
	private String address;
	
	@Expose
	private Long copeId;
	
	@Expose
	private String copeName;
	
	/**安全交底负责人ID*/
	@Expose
	private Long clarificaHeadId;
	
	/**安全交底负责人*/
	@Expose
	private String clarificaHead;
	
	
	/**安全交底人ID*/
	@Expose
	private String clarificaManId;
	
	/**安全交底人*/
	@Expose
	private String clarificaMan;
	
	@Expose
	private String remark;
	
	/**安全交底照片*/
	@Expose
	private String clarificaImage;
	
	/**安全交底时间*/
	@Expose
	private String clarificaTime;
	
	@Expose
	private String delFlag;
	
	@Expose
	private Long userId;
}
