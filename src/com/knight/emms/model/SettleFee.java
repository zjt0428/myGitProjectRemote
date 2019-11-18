/**
 *====================================================
 * 文件名称: Accident.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.ExportModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: SettleFee
 * @Description: TODO(项目结算)
 * @author jlh
 * @date 2017年7月11日 下午4:34:46
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "项目结算页签", sheetName = "项目结算页签")
public class SettleFee  implements ExportModel{
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long settleFeeId;
	
	@Expose
	private String item;
	
	@Expose
	private Double amount;
	
	
	@Expose
	private Long relateId;
	
	@Expose
	private String relateModule;
	
	
	
}
