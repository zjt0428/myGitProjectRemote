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

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: ScrapHandle
 * @Description: TODO(报废处理)
 * @author jlh
 * @date 2017年7月14日 下午4:34:46
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "报废处理信息汇总", sheetName = "报废处理信息")
@SerialNumberStrategy(name = "scrapSerial", strategy = "BFCL{yyyyMMdd}", maxseq = 999)
public class ScrapHandle extends ApplyforState implements ExportModel{

	private static final long serialVersionUID = 1L;

	@Expose
	private Long handleId;

	/*报废单号*/
	@Expose
	private String scrapSerial;

	/*制单日期*/
	@Expose
	private String applyDate;
	
	/*制单人ID*/
	@Expose
	private Long userId;
	
	/*制单人*/
	@Expose
	private String userName;

	@Expose
	private Long storeId;
	
	/*仓库名称*/
	@Expose
	private String storeName;

	@Expose
	private Long locationId;
	
	/*库位*/
	@Expose
	private String storageLocation;

	/*状态*/
	@Expose
	private String status;
	
	
	/*审批人ID*/
	@Expose
	private Long  approvId;
	
	/*审批人*/
	@Expose
	private String  approvName;
	
	/*审批日期*/
	@Expose
	private String  approvDate;
	
	/*备注*/
	@Expose
	private String  remark;
	
	@Expose
	@CodeFieldDeclare(codeId = "SCRAP_HANDLE_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	private String delFlag = Constant.ENABLED;


	public void setModelSerial(String serial) {
		this.scrapSerial = serial;
	}

	public Long getApplyforId() {
		return this.handleId;
	}
	
	private String scrapDetails = "";
	
	@Expose(deserialize = false, serialize = true)
	@Since(value = 2.0)
	private Set<ScrapDetail> scrapDetailSet = new HashSet<ScrapDetail>();

	// ==============================================================================//
		public void setSubScrapHandle() {
			Set<ScrapDetail> scrapDetailSet = GsonUtil.fromJson(this.getScrapDetails(), new TypeToken<Set<ScrapDetail>>() {});
			if (scrapDetailSet != null) {
				for (ScrapDetail p : scrapDetailSet) {
					p.setRelateId(handleId);
					p.setRelateModule(Constant.SCRAP_HANDLE);
				}
			}
			this.setScrapDetailSet(scrapDetailSet);
		}
}
