/**
 *====================================================
 * 文件名称: EquipDiary.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

/**
 * @ClassName: EquipDiary
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "设备调配汇总", sheetName = "设备调配信息")
public class EquipDiary extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long equipDiaryId;

	@Expose
	private Long equipId;
	
	@Expose
	private String recordSerial;

	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;

	@Expose
	private String equipCategoryName;

	@Expose
	@CodeFieldDeclare(codeId = "equipGeneric", valueField = "equipGenericName")
	private String equipGeneric;

	@Expose
	private String equipGenericName;

	@Expose
	@CodeFieldDeclare(codeId = "equipSpecific", valueField = "equipSpecificName")
	private String equipSpecific;

	@Expose
	private String equipSpecificName;
	
	@Expose
	@CodeFieldDeclare(codeId = "equipSource", valueField = "equipSourceName")
	private String equipSource;
	
	@Expose
	private String equipSourceName;

	@Expose
	private String recordId;

	@Expose
	private String rfidCode;

	@Expose
	private String exwDate;

	@Expose
	private String exwSerial;
	
	@Expose
	private String equipSerial;

	@Expose
	private String equipVender;

	private Long propertyEnt;

	@Expose
	private String propertyName;

	private Long storeId;

	private String storeName;

	@Expose
	private Date startDate;

	@Expose
	private Date endDate = SQLServerDialect.MAX_DATE;

	@Expose
	private String activateDate;

	private String lastSettleDate;

	@Expose
	private String lastBlockupDate;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@CodeFieldDeclare(codeId = "province", valueField = "provinceName")
	private String province;

	private String provinceName;

	@CodeFieldDeclare(codeId = "city", valueField = "cityName")
	private String city;

	private String cityName;

	@CodeFieldDeclare(codeId = "county", valueField = "countyName")
	private String county;

	private String countyName;

	private String street;

	@Expose
	private String address;

	@Expose
	private String buildingNum;

	@Expose
	private Long contractId;

	@Expose
	private String paEntName;

	private Long flowId;

	private Long businessId;

	@Expose
	private String businessSerial;

	private String businessTheme;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "businessModuleName")
	private String businessModule;

	@Expose
	private String businessModuleName;

	private Long businessEquipId;

	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateTheme;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	private String status;

	@Expose
	private String verifyType;

	@CodeFieldDeclare(codeId = "ACTIVE", valueField = "activeName")
	private String active = Constant.DISENABLED;

	private String activeName;
	@Expose
	private String rentStandard;
	
	@Expose
	private String  warehouseDate;
	
}
