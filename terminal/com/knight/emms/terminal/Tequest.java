/**
 *====================================================
 * 文件名称: Request.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月23日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.knight.app.model.*;
import com.knight.emms.model.*;

import lombok.Data;

/**
 * @ClassName: Request
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年10月23日 下午3:18:28
 */
@Data
public class Tequest {

	private Query query;

	private Long dispatchEquipId;

	private Date startinDate;

	private Date endinDate;

	private BigDecimal installHeight;
	
	private String depName;

	private BigDecimal brachium;

	private Integer wallAttacheQty;

	private String fileAttaches;

	private String content;
	
	private String title;

	private Long reviewId;

	private Long score;
	
	private String longitude;

	private String latitude;

	private String recordId;

	private Long projId;
	
	private Long projectId;

	private String projectName;

	private String address;

	private Set<ComponDiary> componDiarySet = new HashSet<ComponDiary>();

	private Set<PractiDiary> practiDiarySet = new HashSet<PractiDiary>();
	
	private String practiId;

	// =========================================================================================//
	private String username;
	
	private String password;

	private String oldpassword;

	private String newpassword;

	private String fullname;

	private String mobile;

	// =========================================================================================//安全巡检
	private Long inspectId;

	private String inspectResult;
	
	private String inspectSchedule;

	private Date inspectDate;

	private String inspectPepoles;
	
	private String rectification;

	private String remark;
	
	private String rectifyIntroduce;
	
	private String rectifyResult;
	
	private Date rectifyDate;
	
	private String rectifyUsername;
	
	private Long inspectRectifyId;
	
	private String isComplete;
	
	private String equipVerifyIds;
	
	
	// =========================================================================================//物流签收
//	private Long transportId;
/*	private String signDate;
	
	private String signMan;
	
	private String signResult;*/

	// =========================================================================================//
	private Long dismantleId;

	private Long flowId;

	private Date startdisDate;

	private Date enddisDate;

	private String dismantleHeight;
	
	//*******************APPadd*********
	private Long userId;
	
	private String depId;
	
	private String uId;
	
	private String type;
	
	private String sgDate;
	
	private String sgTime;
	
	private String location;
	
	private Long aid;
	
	private String upTime;
	
	private String disMode;
	
	private String projName;
	
	private String disType;
	
	private String disDate;
	
	private String dispatcher;
	
//	private String Remark;
	
	private Set<TAppComponDispatchDetail> dispComponDetailSet = new HashSet<TAppComponDispatchDetail>();

	private Set<TAppEquipDispatchDetail> dispEquipDetailSet = new HashSet<TAppEquipDispatchDetail>();

    private Set<LogisticsTranDestribution> logisticsTranDistributionSet = new HashSet<LogisticsTranDestribution>();
	
	private Long repId;
	
	private Long equipId;
	
	private String recordSerial;
	
	private String equipSpec;
	
	private String exwSerial;
	
	
	private String equipSpecific;
	
	private String equipSerial;
	
	private String equipSpecificName;
	
	private String reportDt;
	
	private String faultLevel;
	
	private String faultDesc;
	
	private String procMan;
	
	private String disMan;
	
	private String arriveTime;

	private String startOffTime;
	
	private String repairType;
	
	private String repairDt;
	
	private String repScheme;
	
	private String procResult;
	
	private String repMan;
	
	private String repManId;
	
	private String repTimes;	
	
	private String repFee;
	
	private String repReason;

	private String repImage;

	
	private String state;	
	
	private String createDt;
	
	private Long createBy;
	
	private Long createByPhone;
	
	private String fileattaches;
	
	private String hasview;	
	
	private String createByname;
	
	private Set<TAppRepairCompon> repairComponSet = new HashSet<TAppRepairCompon>();
	
	private String applyDt;
	
	private String flowType;
	
	private Long chkUserId;
	
	private String copyUserIds;
	
	private String chkDate;
	
	private String chkResult;
	
	private String chkOpinion;
	
	private Long insId;
	
	private Long nextChkUserId;	
	
	private String flowName;
	
	private Long seq;
	
	private Long nextSeq;
	
	private String days;
	
	private int fileId;

	private String signPics;
	
	private String installtype;
	
	private String dismantleType;

	private Long contractId;

    private String sedan;
    
	//------------调度物流-------------//
    private String sendWarehouseAddress;
	private Long logiId;
	private Long disid;
	private String deliveryDate;
	private String deliveryMan;
	private String propertyName;
	private Long sendId;
	private Long receiveId;
	private String sendWarehouseName;
	private String receiveWarehouseName;
	private String sendWarehouseType;
	private String receWarehouseType;
	private String receWarehouseAddress;
	private String summary;
	private Long carId;
	private String licensePlate;
	private String driverPhone;
	private String status;
	private String fileAttachesReceived;
	private String signMan;
	private String signResult;
	private String signDate;
	private String signAddress;
	private String remarkRece;
	private String receNum;
	private String transportUnit;
	private Set<TAppLogisticsComp> tAppLogisticsCompSet = new HashSet<TAppLogisticsComp>();
	private Set<TAppLogisticsEquip> tAppLogisticsEquipSet = new HashSet<TAppLogisticsEquip>();
	//-----------施工作业--------------//
    private String constructTheme;
	private Equipment equipment;
    private String constructOperationRealTasks = "";
    private String constructOperationPlanTasks = "";
	private String constructPlanPractis = "";
	private String constructRealPractis = "";
    private String teams;
	private String constructDate;
	private Project project;
    private String practiNames;
    private Long constructId;
    private String receiveDate;
    private BigDecimal mileage;
	private String confimDate;
	private String actualDate;
	private String closedDate;
	private String constructStartDate;
	private String enterPlanDate;
	private String actualPractiNames;
	private String constructSerial;
    private String practiNamesId;
	//----------受理审批-----------------//
	private Long relateId;
	private String relateModule;
	private String acceptUsername;
	private String acceptDep;
	private Date acceptTime;
	private String acceptOpinion;
	private String acceptRemark;

    //----------现场安装------------------//
	private Long installId;
    private String jjCompons = "";
    private Integer knotCounts;
    private String jackFileAttaches;
    private String dropFileAttaches;
	private Set<InstallJjCompon> jjComponSet = new HashSet<InstallJjCompon>();
	
	//----------设备------------------//
	private int businessStatus;
	
	
	//----------采购计划------------------//
	private Long purchasePlanId;
	private Set<PurchasePlanInquiry> purchasePlanInquirySet = new HashSet<PurchasePlanInquiry>() ; //采购计划Grid字符串
	
	/*派工上传的故障信息*/
	 private String stateName;
     private String weightOfFailure;
     private String inputVoltage;//0是安装整洁，1是顶升加节,2是拆卸整机,3是拆卸降节
     private String breakdownVoltage;
 	 private String switchFault1; 		//开关故障1
 	 private String switchFault2; 		//开关故障2
 	 private String switchFault3; 		//开关故障3
 	 
 	private Integer start;
	private Integer pageSize;
	 private String replaceCompon;  //更换配件
	 private String repairBeforeImage; //维修前照片
	 private String repairAfterImage; //维修前照片
	 private String componBeforeImage;//配件更换前
	 private String componAfterImage;//配件更换后
	 private String disRemark;     //备注
	 private String procManId;//处理人ID
 	 
	//----------设备详情------------------//
	
 	public Integer getStart() {
		return this.start == null ? 0 : this.start;
	}

	public Integer getPageSize() {
		return this.pageSize == null ? 10 : this.pageSize;
	}
	private Long disclosureId;
	private String disclosureMan;//交底人员
	private Long disclosureManId;//交底人员

	private String disclosureDate;//交底时间
	private String acceptanceMan;//交底接受人员
	private String acceptanceManId;//交底接受人员

    private String disclosurePhoto;//交底照片
	private String disclosureLocation;//交底位置
	
	private Integer firstKnotCount;//标准节数
	private Integer equipAmount;//整机
	private Integer firstAttach;//附墙数
	private String installLocation;//安装位置
	private String partake;//安装人员
	private String currentInstallHeight;//当前高度
	private String checkAttach;//自检照片
	
	private Long InstallreviewId;//验收id
	private String reviewCheckAttach;//验收图片
	private String reviewConclusion;//验收结论
	private String reviewStatus;//验收情况
	private String rejectReason;//驳回理由
	private String appInstallState;//验收情况
	
	private String dismantleLocation;//拆卸位置
	private String appDismantleState;//验收情况
	

	private Long dispatchId;
	
	

	
	private String rectificaImage;//整改图片

	
	private String rectificaDetail;//整改内容

	
	private String rectificaDate;//整改日期
	
	private Integer knotDisQt;//累计拆卸的标准节数
	private Integer wallAttacheDisQt;//累计拆卸的付墙数
	private Integer knotDisQty;//此次拆卸的标准节数
	private Integer wallAttacheDisQty;//此次拆卸的付墙数

	private Integer knotNum;//此次拆卸的标准节数
	private Integer wallAttacheNum;//此次拆卸的付墙数
	private Integer wallAttachePoleNum;//此次增加的附墙杆节数
	private Integer wallAttacheFrameNum;//此次增加的付墙框数
	private Integer wallAttachePoleCount;//附墙杆总数
	private Integer wallAttacheFrameCount;//付墙框总数
	
	private Integer wallAttachePoleQty;//此次减少的附墙杆节数
	private Integer wallAttacheFrameQty;//此次减少的付墙框数
	
	private Integer wallAttachPoleSpare;//剩余的附墙杆总数
	private Integer wallAttachFrameSpare;//剩余的付墙框总数
	private Integer operationWay;//1.新增安装2.顶升加节3.整机拆卸4.拆卸降节
	
	//----------员工安全教育 ------------------//
	/**安全教育主题*/
	private String safetySerial;
	/**安全教育内容*/
	private String safetyDetail;
	/**安全教育授课人ID*/
	private Long teachManId;
	/**安全教育授课人*/
	private String teachMan;
	/**安全教育受教育人ID*/
	private String educaManId;
	/**安全教育受教育人*/
	private String educaMan;
	/**安全教育教育图片*/
	private String edcationImage;
	/**安全教育教育时间*/
	private String edcationTime;
	/**人员保险Id*/
	private Long insureId;
	
	//----------员工安全交底 ------------------//
	private Long clarificaId;
	/**安全交底单号*/
	private String clarificaSerial;
	private Long copeId;
	private String copeName;
	/**安全交底人ID*/
	private String clarificaManId;
	/**安全交底人*/
	private String clarificaMan;
	/**安全交底照片*/
	private String clarificaImage;
	/**安全交底时间*/
	private String clarificaTime;
	/**安全交底负责人ID*/
	private Long clarificaHeadId;
	/**安全交底负责人*/
	private String clarificaHead;
	//----------员工评价 ------------------//
	private Long evaluaId;
	/**评价单号*/
	private String evaluaSerial;
	/**评价日期*/
	private String evaluaDate;
	/**评价人*/
	private String evaluaMan;
	/**评价人ID*/
	private Long evaluaManId;
	/**接受评价人*/
	private String acceptMan;
	/**接受评价人ID*/
	private Long acceptManId;
	/**评价星级*/
	private String evaluaStar;
	/**评价内容*/
	private String evaluaContent;
	/**交底新增详情和待安装拆卸的交底详情区别(等于1是待安装拆卸的交底详情 等于2是新增的交底详情接口)*/
	private Long free;
	
	//设备进场序号
	private String approachNumber;
	
	private String buildingNum;
	
    private Integer wallAttecheGross;
    private Integer wallAttachePoleGross;
    private Integer wallAttacheFrameGross;
    private Integer  knotGross;
    
    private Long addReduceId;
   
	//----------员工签到自检项目------------------//
	private Set<InspectProjectRecord> inspectProjectRecordSet = new HashSet<InspectProjectRecord>();
}
