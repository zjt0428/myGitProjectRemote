/**
 *====================================================
 * 文件名称: ComponDiary.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;

/**
 * @ClassName: ComponDiary
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-20 上午7:54:44
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "配件调配汇总", sheetName = "配件调配信息")
public class ComponDiary extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long componDiaryId;

	@Expose
	private Long componId;

	@Expose
	private Long projectComponId;
	@Expose
	private String componSerial;

	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "componCategoryName")
	private String componCategory;

	@Expose
	private String componCategoryName;

	@Expose
	@CodeFieldDeclare(codeId = "componGeneric", valueField = "componGenericName")
	private String componGeneric;

	@Expose
	private String componGenericName;
	
	@Expose
	@CodeFieldDeclare(codeId = "equipVender", valueField = "equipVenderName")
	private String equipVender;
	
	@Expose
	private String equipVenderName;

	@Expose
	@CodeFieldDeclare(codeId = "componSpecific", valueField = "componSpecificName")
	private String componSpecific;

	@Expose
	private String componSpecificName;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private String dimensions;

	@Expose
	private String calculate;

	@Expose
	private String rfidCode;

	@Expose
	private String consumeFlag;

	@Expose
	private String parachuteFlag;

	@Expose
	private String knotFlag;

	@Expose
	private String wallAttacheFlag;

	@Expose
	private BigDecimal knotMetric;

	@Expose
	private BigDecimal brachium;

	@Expose
	private Long storeId;

	@Expose
	private String storeName;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@Expose
	private String address;

	@Expose
	private Long contractId;

	@Expose
	private Long flowId;

	@Expose
	private String recordId;

	@Expose
	private String dispatchUserName;

	@Expose
	private Long businessId;

	@Expose
	private String businessSerial;

	@Expose
	private String businessTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "businessModuleName")
	private String businessModule;

	@Expose
	private String businessModuleName;

	@Expose
	private Long businessComponId;

	@Expose
	private Long relateId;

	@Expose
	private String relateSerial;

	@Expose
	private String relateTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	@Expose
	private Integer counts;

	@Expose
	private Date startDate;

	@Expose
	private Date endDate = SQLServerDialect.MAX_DATE;

	@Expose
	private Integer warehouseCounts;

	@Expose
	private Integer backsportCounts;

	@Expose
	private String backsportStatus;

	@Expose
	private String status;

	@Expose
	@CodeFieldDeclare(codeId = "ACTIVE", valueField = "activeName")
	private String active = Constant.DISENABLED;

	@Expose
	private String activeName;

	@Expose
	private Long jackingPractiId;

	@Expose
	private String jackingPractiName;

	@Expose
	private String jackingTeams;

	@Expose
	private Date jackingDate;

	@Expose
	private Integer jackingCounts;

	@Expose
	private String jackingStauts;

	@Expose
	private Long jackingAccountId;

	@Expose
	private Long dismantlePractiId;

	@Expose
	private String dismantlePractiName;

	@Expose
	private String dismantleTeams;

	@Expose
	private Date dismantleDate;

	@Expose
	private Integer dismantleCounts;

	@Expose
	private String dismantleStauts;

	@Expose
	private Long dismantleAccountId;
	
	@Expose
	@CodeFieldDeclare(codeId = "COMPON_JACKING_STATUS", valueField = "jjStautsName")
	private String jjStauts;
	
	private String jjStautsName;
	
	@Expose
	private String jjUserName;

}
