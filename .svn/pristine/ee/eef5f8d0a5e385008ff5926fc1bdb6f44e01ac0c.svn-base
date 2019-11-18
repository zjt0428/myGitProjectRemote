package com.knight.emms.model;


import java.util.List;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: SafetyEducation
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "安全教育信息汇总", sheetName = "安全教育信息")
@SerialNumberStrategy(name = "safetySerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class SafetyEducation extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long safetyId;
	
	/**安全教育主题*/
	@Expose
	private String safetySerial;
	
	/**安全教育内容*/
	@Expose
	private String safetyDetail;
	
	/**安全教育授课人ID*/
	@Expose
	private Long teachManId;
	
	/**安全教育授课人*/
	@Expose
	private String teachMan;
	
	/**安全教育受教育人ID*/
	@Expose
	private String educaManId;
	
	/**安全教育受教育人*/
	@Expose
	private String educaMan;
	
	/**安全教育备注*/
	@Expose
	private String remark;
	
	/**安全教育教育图片*/
	@Expose
	private String edcationImage;
	
	/**安全教育教育时间*/
	@Expose
	private String edcationTime;
	
	/**删除标识*/
	@Expose
	private String delFlag;
	
	@Expose
	private Integer count;
	
	@Expose
	private Long userId;
	
	
	/**照片*/
	@Expose
	private List<String> edcationImageList;
}
