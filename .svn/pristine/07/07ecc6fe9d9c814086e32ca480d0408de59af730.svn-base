/**
 *====================================================
 * 文件名称: Query.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月23日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal;

import com.google.gson.annotations.Expose;
import com.knight.app.core.mode.RemindModule;
import lombok.Data;

import org.apache.commons.lang.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName: Query
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年10月23日 下午3:46:51
 */
@Data
public class Query {

	private String receiveTel;

	private String createTime;

	private String publishTime;

	private String recordId;

	private String projectName;

	private Long installId;
	
	private Long creatBy;

	private Long inspectId;

	private Long dismantleId;

	private Long dispatchId;

	private Long relateId;

	private String relateModule;

	private String mobile;

	private String practiName;
	
	private String corpName;

	private String kindWorkName;

	private String componSerial;

	private String dimensions;

	private String componGenericName;

	private String componSpecificName;

	private Integer start;

	private Integer pageSize;

	private String qrcode;

	private Long componId;

	private Long equipId;

	private String keyword;
	
	private String componIds;

	// *******************************
	private String sgDate;

	private Long userId;

	private String projName;
	
	private Integer operationWay;

	private String disTypeName;

	private Long disid;

	private String flowState;

	private String recordSerial;

	private String createByname;

	private Long repId;
	
	private String principalId ;
	
	private String principalName ;
	
	private String reportDate;

	private String flowName;

	private Long flowId;

	private Long seq;

	private String userName;

	private Long type;

	private Long insId;

	private String codeId;

	private Long copyId;

	private Long arcUserId;

	private String arcDate;

	private String arcRemark;

	private String exwSerial;
	
	private String buildingNum;

	private String projState;
	
	private String parentid;
	
	private String rectification; 
	
	private Long transportId;
	
	private String deliveryMan;
	
	private String receiveMan;
	
	private String transportEntName;
	
	private String licensePlate;
	
	private String status;
	
	private String storeName;
	
	private String providedDate;
	
	private String disDate;

	private Long projectId;

	private Long storeId;

	private String equipGeneric;
	
    private String equipGenericName;

    private String equipSpecificName;
    
    private String equipSerial;

	private String remark;

	private String dispatcher;

	private String sendWarehouseName;

	private String sendWarehouseType;

	private String receiveWarehouseName;

	private String receWarehouseType;

    private String paEntName;

    private String equipVender;

	private String sedan;

	private String propertyName;

	private String summary;

	private long logiId;

	private String params;

    private String value;
    
    private Long depId;
    
	private String depName;

	private String firstKeyword;

	private String secondKeyword;
	
	private Long itemId;
	
	private Long demandId;
	
	private String qualified;
	
	private Long fileId;
	
	private String incumbent;
	
	private String certStatus;
	
	private String insureStatus;
	
	private String clarificaStatus;
	
	private String blacklist;
	
	private String sex;
	
	private String kindWork;
	
	private String isAffiliate;
	
	private String idCard;
	
	private String birthDate;
	
	private String nation;
	
	private String birthplace;
	
	private String address;
	
	private String bankDeposit;
	
	private String account;
	
	private Long practiId;
	
	private String photo;
	//----------消息------------------//
	private String readFlag;
	
	private long messageId;

    private List<RemindModule> remindModules = new ArrayList<RemindModule>();

	private Long constructId;
	
	private int businessStatus;
	
	private String msgType;
	
	private String fileAttaches;
	
	private String formId;
	
	/*公告发布*/
	private Long announceUserId;
	
	//----------统计------------------//
	
	private String equipStatus;
	
	private String state;
	// *************************************

	/*塔机监控*/
	private String monitorSerial;
	
	private Long aid;

	private String quarter;//季度
	
	private String year;
	
	//---巡检--//
	private String inspectSchedule;
	
	//巡检整改
	private Long inspectRectifyId;
	public Long getRelateId() {
		return this.relateId == null ? -1 : this.relateId;
	}

	public Integer getStart() {
		return this.start == null ? 0 : this.start;
	}

	public Integer getPageSize() {
		return this.pageSize == null ? 10 : this.pageSize;
	}

	private String getProperty(String property) {
		return StringUtils.isBlank(property) ? null : property;
	}

	public String getIncumbent() {
		return this.incumbent == null ? "1" : this.incumbent;
	}
	
	public String getCertStatus() {
		return this.certStatus == null ? "1" : this.certStatus;
	}
	
	public String getInsureStatus() {
		return this.insureStatus == null ? "1" : this.insureStatus;
	}
	
	public String getCclarificaStatus() {
		return this.clarificaStatus == null ? "1" : this.clarificaStatus;
	}
	
	public String getBlacklist() {
		return this.blacklist == null ? "0" : this.blacklist;
	}
	
	public String getMobile() {
		return getProperty(this.mobile);
	}

	public String getPractiName() {
		return getProperty(this.practiName);
	}

	public String getKindWorkName() {
		return getProperty(this.kindWorkName);
	}

	public String getComponSerial() {
		return getProperty(this.componSerial);
	}

	public String getDimensions() {
		return getProperty(this.dimensions);
	}

	public String getComponGenericName() {
		return getProperty(this.componGenericName);
	}

	public String getComponSpecificName() {
		return getProperty(this.componSpecificName);
	}

	public String getProjectName() {
		return getProperty(this.projectName);
	}

	public String getRecordId() {
		return getProperty(this.recordId);
	}
	public String getBuildingNum(){
		return getProperty(this.buildingNum);
	}
	public String getExwSerial(){
		return getProperty(this.exwSerial);
	}
	public String getProjState(){
		return getProperty(this.projState);
	}
	public String getParentid(){
		return getProperty(this.parentid);
	}
	
	
}
