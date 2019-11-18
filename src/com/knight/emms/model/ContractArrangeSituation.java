/**
 *====================================================
 * 文件名称: ContractArrangeSituation.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年5月12日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: ContractArrangeSituation
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年5月12日 上午6:25:48
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "业务安排信息汇总", sheetName = "业务安排信息")
public class ContractArrangeSituation extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long arrangeSituationId;

	@Expose
	private Long arrangeId;

	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;

	@Expose
	private String equipCategoryName;

	@Expose
	private String receiveEntName;

	@Expose
	private String projectName;

	@Expose
	private String demand;

	@Expose
	private BigDecimal installHeight;

	@Expose
	private BigDecimal duration;

	@Expose
	private String equipSpecificName;

	@Expose
	private String baseDescribe;

	@Expose
	private String propertyName;

	@Expose
	private String equipSource;

	@Expose
	private String equipVender;

	@Expose
	private String icSerial;

	@Expose
	private String remark;

}
