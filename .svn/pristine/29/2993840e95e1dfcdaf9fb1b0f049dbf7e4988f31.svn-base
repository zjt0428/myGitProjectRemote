/**
 * ====================================================
 * 文件名称: Equipment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 * ====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.strategy.GsonFieldIgnoreProperty;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author chenxy
 * @ClassName: Equipment
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @date 2013-7-6 下午10:58:03
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "设备信息汇总", sheetName = "设备信息")
@SerialNumberStrategy(name = "recordSerial", strategy = "{0}{yyyyMMdd}", maxseq = 999)
public class Equipment extends BusinessModel implements ExportModel, InstalmentMethod {

    private static final long serialVersionUID = 1L;

    @Expose
    private Long equipId;

    @Expose
    private String recordSerial;

    @Expose
    private String equipSerial;

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

    @CodeFieldDeclare(codeId = "equipSource", valueField = "equipSourceName")
    private String equipSource;

    @Expose
    private String equipSourceName;

    @CodeFieldDeclare(codeId = "paymentType", valueField = "paymentTypeName")
    private String paymentType;

    private String paymentTypeName;
    @Expose
    private BigDecimal brachium;
    @Expose
    private BigDecimal loadingWeight;

    @Expose
    private BigDecimal workingRange;

    @Expose
    private BigDecimal independentHeight;
    @Expose
    private BigDecimal attachmentHeight;

    private String licenseNumber;

    @Expose
    private String exwSerial;
    @Expose
    private String exwDate;

    @Expose
    private Date purchaseDate;

    @Expose
    private Date scrapDate;

    @Expose
    private String equipVender;

    @Expose
    private Long propertyEnt;

    @Expose
    private String propertyName;

    private String dutyman;

    private String dutymanTel;

    @Expose
    private String mortgage;

    @Expose
    private String recordId;

    private String rfidCode;

    private Long supplierId;

    private String supplierName;

    private String supplierAdd;

    private String supplierTel;

    private Long practiId;

    private String practiName;

    private String mobile;

    private Long customerId;

    private Long customerLinkerId;

    private String customerName;

    private String linkman;

    private String linkmanTel;

    @Expose
    private BigDecimal assetValue;

    private BigDecimal depreciateRate;

    private BigDecimal totalRate;

    @Expose
    private BigDecimal presentValue;

    private String depreciateDate;

    private BigDecimal rentalUnit;

    private String priceUnit;

    @Expose
    private BigDecimal mortgageAmount;

    @Expose
    private BigDecimal finishedAmount;

    @Expose
    private BigDecimal remainderAmount;

    private Short mortgagePeriods;

    private String owingStartDate;

    private String owingEndDate;

    private BigDecimal monthlyPayment;

    private Long payeeId;

    @Expose
    private String payeeName;

    private String payeeAdd;

    private String payeeTel;

    private String remark;

    @Expose
    private String monitorSerial;

    @CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
    private String fundStatus;
    private String fundStatusName;
    
    @Expose
    private Long storeId;

    @Expose
    private String storeName;

    @Expose
    @CodeFieldDeclare(codeId = "EQUIP_COMPON_STORE_STATUS", valueField = "storeStatusName")
    private String storeStatus;

    @Expose
    private String storeStatusName;

    private Long flowId;

    @Expose
    private Long projectId;

    @Expose
    private String projectName;

    @Expose
    private String projectAddress;

    private Long userId;

    private String userName;

    @Expose
    private Long depId;

    @Expose
    @CodeFieldDeclare(codeId = "EQUIP_COMPON_STATUS", valueField = "statusName")
    private String status;

    @Expose
    private String statusName;

    private Date statusDate;

    @CodeFieldDeclare(codeId = "EQUIP_BUSINESS_STATUS", valueField = "businessStatusName")
    private String businessStatus;

    @Expose
    private String businessStatusName;

    @Expose
    private Date latestRepairDate;

    @Expose
    private Date latestInspectDate;

    @Expose
    @CodeFieldDeclare(codeId = "belongToArea", valueField = "belongToAreaName")
    private String belongToArea;

    @Expose
    private String belongToAreaName;

    @Expose
    private BigDecimal armTipWeight;

    @Expose
    private BigDecimal mostMoment;

    @Expose
    private BigDecimal railFrameHeight;

    @Expose
    private BigDecimal freedomHeight;

    @Expose
    private BigDecimal railUpHeight;

    @Expose
    private BigDecimal maxLiftHeight;

    @Expose
    private String amplitudeForm;

    @Expose
    private String amplitudeSpeed;

    @Expose
    private String motorPower;

    @Expose
    private String driveForm;

    @Expose
    private String ssDriveForm;

    @Expose
    private String ratedLiftSpeed;

    @Expose
    private Integer ratedCrewNum;

    private String delFlag;
	@Expose
	private Project project;

    @Expose
    private String examineDate;

    @Expose
    private Department department;
        
    //入库时间
    @Expose
    private String warehouseDate;
    
    //参保状态
    @Expose
    @CodeFieldDeclare(codeId = "INSURE_STATUS", valueField = "insureStatusName")
    private String insureStatus = "0";
    @Expose
    private String insureStatusName;
    //参保时间
    @Expose
    private String insureTime;
    
    /**设备当天自检人数*/
    @Expose
    private String seatState = "0";

    @Since(value = 3.0)
    @GsonFieldIgnoreProperty
    private EquipDiary equipDiary;

    @Expose(deserialize = false, serialize = false)
    @Since(value = 2.0)
    private Set<Instalment> instalmentSet = new HashSet<Instalment>(0);

    private String instalments = "";

    @Expose(deserialize = false, serialize = false)
    @Since(value = 2.0)
    private Set<Component> componentSet = new HashSet<Component>(0);

    private String components = "";

    @Expose(deserialize = false, serialize = false)
    @Since(value = 2.0)
    private Set<EquipmentAffiliated> equipmentAffiliatedSet = new HashSet<EquipmentAffiliated>(0);

    private String equipmentAffiliateds = "";

    // =========================================================================//
    @Expose
    private String buildingNum;

    public void setModelSerial(String serial) {
        this.recordSerial = serial;
    }

    public String getModelSerial() {
        return this.recordSerial;
    }

    public Long getInstalmentRelationId() {
        return this.equipId;
    }

    public String getInstalmentRelationSerial() {
        return this.recordSerial;
    }

    public String getInstalmentRelationModule() {
        return SystemConstant.MODULE_EQUIPMENT;
    }

    public void setSubEquipment() {
        Set<Component> componentSet = GsonUtil.fromJson(this.components, new TypeToken<Set<Component>>() {
        }, DateUtil.LINK_DISPLAY_DATE);
        for (Component c : componentSet) {
            c.setEquipId(equipId);
        }
        this.setComponentSet(componentSet);
        Set<EquipmentAffiliated> equipmentAffiliatedSet = GsonUtil.fromJson(this.equipmentAffiliateds, new TypeToken<Set<EquipmentAffiliated>>() {
        }, DateUtil.LINK_DISPLAY_DATE);
        for (EquipmentAffiliated c : equipmentAffiliatedSet) {
            c.setEquipId(equipId);
        }
        this.setEquipmentAffiliatedSet(equipmentAffiliatedSet);
    }

}
