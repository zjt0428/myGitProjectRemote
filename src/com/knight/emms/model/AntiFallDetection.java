/**
 *====================================================
 * 文件名称: EquipDetect.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;

/**
 * @ClassName: EquipDetect
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)

public class AntiFallDetection  extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long antiFallId;

	@Expose
	private String antiFallNum;
	
	@Expose
	private Long userId;
	
	@Expose
	private String detectNum;
	
	@Expose
	private Date startDate;
	
	@Expose
	private Date endDate;
	
	@Expose
	private String antiFallFee;
	
	@Expose
	private String status;
	
	@Expose
	private String projectName;
	
	@Expose
	private String recordId;
	
	@Expose
	private String exwSerial;
	

	@Expose
	private String remark;
	
	@Expose
	private String delFlag;

	@Override
	public void setModelSerial(String serial) {
		// TODO Auto-generated method stub
		
	}


}
