/**
 *====================================================
 * 文件名称: Component.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: Component
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午1:31:32
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "零配件信息汇总", sheetName = "零配件")
@SerialNumberStrategy(name = "componSerial", strategy = "{0}{yyyyMMdd}", maxseq = 999999)
public class Component extends BusinessModel implements ExportModel, Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long componId;

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
	@CodeFieldDeclare(codeId = "componSpecific", valueField = "componSpecificName")
	private String componSpecific;

	@Expose
	private String componSpecificName;
	
	@Expose
	@CodeFieldDeclare(codeId = "equipVender", valueField = "equipVenderName")
	private String equipVender;
	
	@Expose
	private String equipVenderName;

	@Expose
	private String componCode;

	@Expose
	private String dimensions;

	@Expose
	private String pickupDate;

	@Expose
	private Date purchaseDate;

	@Expose
	private Date scrapDate;

	@Expose
	private String calculate;

	@Expose
	private BigDecimal unitprice;

	private String rfidCode;

	private Long supplierId;

	@Expose
	private String supplierName;

	private String supplierAdd;

	private String supplierTel;

	private Long practiId;

	@Expose
	private String practiName;

	private String mobile;

	@Expose
	private BigDecimal assetValue;

	private BigDecimal depreciateRate;

	private BigDecimal totalRate;

	@Expose
	private BigDecimal presentValue;

	private String depreciateDate;
	
	@Expose
	private Long storeId;

	@Expose
	private String storeName;

	@Expose
	private Long equipId;

	@Expose
	private String exwSerial;
	
	@Expose
	private String propertyName;

	private String recordId;

	@Expose
	private String consumeFlag;

	@Expose
	private String parachuteFlag;

	@Expose
	private String knotFlag;

	@Expose
	private String boltFlag;
	
	@Expose
	private Integer deliverFromGodown;
	
	@Expose
	private String yesFlag;
	
	@Expose
	private String noFlag;
	
	@Expose
	private String wallAttacheFlag;

	private String parachuteCheckDate;

	private String leftcageSerial;

	@Expose
	private String leftcageCheckDate;

	private String rightcageSerial;

	private String rightcageCheckDate;

	@Expose
	private Integer consumeCounts;

	@Expose
	private Integer periodReserve;

	@Expose
	private BigDecimal knotMetric;

	private BigDecimal brachium;

	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_COMPON_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	private Date statusDate;

	private String batchNumber;

	private String delFlag;

	private Long userId;

	private String userName;

	private Long depId;
	
	@Expose
	private String compoVender;

	private Department department;
	
	private String isMachine;
	
	private String noMachine;

	// ==============================================================================//
	private String categoryBriefCode;

	private Integer number = 1;

	@Expose
	private Integer totalCounts = 1;

	@Expose
	private Integer inuseCounts = 1;

	@Expose
	private Integer unuseCounts = 0;
	
	//基地库存
	@Expose
	private Integer storeCounts ;

	
	private Set<StoreHouse> storeHouses = new HashSet<StoreHouse>();
	
	@Expose
	private String storeHouseJoinComponents = "";

	// ==============================================================================//

	
	public boolean isConsume() {
		return Constant.ENABLED.equals(consumeFlag);
	}

	public void setModelSerial(String serial) {
		this.componSerial = serial;
	}

	public String getModelSerial() {
		return this.componSerial;
	}

	public Component clone() {
		Component entity = null;
		
		try {
			entity = (Component) super.clone();
//			entity.setStoreHouses(new HashSet<StoreHouse>());
			return entity;
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

	public Component() {
	}

	public Component(Long componId) {
		this.componId = componId;
	}
}
