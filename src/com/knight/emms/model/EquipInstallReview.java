/**
 *====================================================
 * 文件名称: InsureEquip.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: InsureEquip
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@SerialNumberStrategy(name = "insureSerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class EquipInstallReview extends BaseModel  {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long reviewId;

	@Expose
	private String reviewCheckAttach;//验收图片

	@Expose
	private String reviewConclusion;//验收结论

	@Expose
	private Long installId;

	@Expose
	private String reviewStatus;//验收状态
	
	@Expose
	private String rejectReason;//驳回原因
	
	@Expose
	private Long relateId;
	@Expose
	private String relateModule;

	
   
	


}
