/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SystemConstant.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-8-11			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.constant;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.dom4j.Element;

import com.knight.core.model.SyncModule;
import com.knight.core.util.FieldUtil;
import com.knight.core.util.FileUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.XmlUtil;

/**
 * @ClassName:SystemConstant
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:57:35
 * @since JDK Version 1.5
 */
public class SystemConstant {

	public static String WEB_ROOT;

	public static final String PREFIX_MODULE = "emms";

	@Description("其他信息")
	public static final String MODULE_OTHERS = "OTHERS";

	@Description("车辆信息")
	public static final String MODULE_CAR = "CAR";

	@Description("企业信息")
	public static final String MODULE_CORP = "CORP";

	@Description("企业照片")
	public static final String MODULE_CORP_PHOTO = "CORP_PHOTO";

	@Description("企业资质")
	public static final String MODULE_CORP_CERT = "CORP_CERT";

	@Description("企业帐户")
	public static final String MODULE_CORP_ACCOUNT = "CORP_ACCOUNT";

	@Description("员工信息")
	public static final String MODULE_PRACTITIONER = "PRACTITIONER";

	@Description("员工照片")
	public static final String MODULE_PRACTI_PHOTO = "PRACTI_PHOTO";
	
	@Description("员工离职")
	public static final String MODULE_PRACTI_LEAVE = "PRACTI_LEAVE";

	@Description("员工资质")
	public static final String MODULE_PRACTI_CERT = "PRACTI_CERT";

	@Description("客户信息")
	public static final String MODULE_CUSTOMER = "CUSTOMER";

	@Description("客户联系信息")
	public static final String MODULE_CUSTOMER_LINKER = "CUSTOMER_LINKER";

	@Description("供应商")
	public static final String MODULE_SUPPLIER = "SUPPLIER";

	@Description("设备档案")
	public static final String MODULE_EQUIPMENT = "EQUIPMENT";

	@Description("零配件档案")
	public static final String MODULE_COMPONENT = "COMPONENT";

	@Description("项目档案")
	public static final String MODULE_PROJECT = "PROJECT";

	@Description("仓库管理")
	public static final String MODULE_STORE_HOUSE = "STORE_HOUSE";

	@Description("合同档案")
	public static final String MODULE_CONTRACT_LEASE = "CONTRACT_LEASE";

	@Description("合同结算")
	public static final String MODULE_SETTLE_CONTRACT = "SETTLE_CONTRACT";

	@Description("待租结算")
	public static final String MODULE_RENT_CONTRACT = "RENT_CONTRACT";

	@Description("调度管理")
	public static final String MODULE_DISPATCH = "DISPATCH";

	@Description("调度汽车吊")
	public static final String MODULE_DISPATCH_AUTOCRANE = "DISPATCH_AUTOCRANE";

	@Description("物流管理")
	public static final String MODULE_LOGISTICS_TRANSPORT = "LOGISTICS_TRANSPORT";

	@Description("回场物流")
	public static final String MODULE_LOGISTICS_BACKSPORT = "LOGISTICS_BACKSPORT";

	@Description("现场安装")
	public static final String MODULE_EQUIP_INSTALL = "EQUIP_INSTALL";

	@Description("降节安装")
	public static final String MODULE_EQUIP_DROP = "EQUIP_DROP";

	@Description("顶升安装")
	public static final String MODULE_EQUIP_JACK = "EQUIP_JACK";

	@Description("使用管理")
	public static final String MODULE_EQUIP_EMPLOY = "EQUIP_EMPLOY";

	@Description("现场拆卸")
	public static final String MODULE_EQUIP_DISMANTLE = "EQUIP_DISMANTLE";

	@Description("入库管理")
	public static final String MODULE_EQUIP_WAREHOUSE = "EQUIP_WAREHOUSE";

	@Description("安全协议")
	public static final String MODULE_INDIS_PROTOCOL = "INDIS_PROTOCOL";

	@Description("安拆协议")
	public static final String MODULE_SECURE_PROTOCOL = "SECURE_PROTOCOL";

	@Description("安拆方案")
	public static final String MODULE_INDIS_SCHEMA = "INDIS_SCHEMA";

	@Description("应急预案")
	public static final String MODULE_CONTINGENCY_PLAN = "CONTINGENCY_PLAN";

	@Description("安拆前检查")
	public static final String MODULE_INDIS_PRECHECK = "INDIS_PRECHECK";

	@Description("基础验收")
	public static final String MODULE_INDIS_BASECHECK = "INDIS_BASECHECK";

	@Description("技术交底")
	public static final String MODULE_TECHNICAL_DISCLOSURE = "TECHNICAL_DISCLOSURE";

	@Description("检测管理")
	public static final String MODULE_EQUIP_DETECT = "EQUIP_DETECT";

	@Description("启用管理")
	public static final String MODULE_EQUIP_ACTIVATE = "EQUIP_ACTIVATE";

	@Description("停用管理")
	public static final String MODULE_EQUIP_BLOCKUP = "EQUIP_BLOCKUP";

	@Description("验收管理")
	public static final String MODULE_EQUIP_VERIFY = "EQUIP_VERIFY";

	@Description("自检管理")
	public static final String MODULE_VERIFY_SELF = "VERIFY_SELF";

	@Description("巡检管理")
	public static final String MODULE_EQUIP_INSPECT = "EQUIP_INSPECT";

	@Description("保养计划")
	public static final String MODULE_EQUIP_MAINT_SCHEMA = "EQUIP_MAINT_SCHEMA";

	@Description("保养管理")
	public static final String MODULE_EQUIP_MAINT = "EQUIP_MAINT";

	@Description("故障管理")
	public static final String MODULE_EQUIP_HITCH = "EQUIP_HITCH";

	@Description("维修管理")
	public static final String MODULE_EQUIP_REPAIR = "EQUIP_REPAIR";

	@Description("保险管理")
	public static final String MODULE_INSURE_EQUIP = "INSURE_EQUIP";

	@Description("领用管理")
	public static final String MODULE_PICKUP = "PICKUP";

	@Description("采购管理")
	public static final String MODULE_PURCHASE = "PURCHASE";

	@Description("施工作业单")
	public static final String MODULE_CONSTRUCT_OPERATION = "CONSTRUCT_OPERATION";

	@Description("借用管理")
	public static final String MODULE_BORROW = "BORROW";

	@Description("开票管理")
	public static final String MODULE_INVOICE_ISSUE = "INVOICE_ISSUE";

	@Description("收款管理")
	public static final String MODULE_AMOUNT_RECEIVE = "AMOUNT_RECEIVE";

	@Description("收票管理")
	public static final String MODULE_INVOICE_COLLECT = "INVOICE_COLLECT";

	@Description("付款管理")
	public static final String MODULE_AMOUNT_PAYMENT = "AMOUNT_PAYMENT";

	@Description("提成管理")
	public static final String MODULE_DEDUCT = "DEDUCT";

	@Description("薪资管理")
	public static final String MODULE_SALARY = "SALARY";

	@Description("报销管理")
	public static final String MODULE_REIMBURSE = "REIMBURSE";

	@Description("借款信息")
	public static final String MODULE_MONEY_LEND = "MONEY_LEND";

	@Description("还款信息")
	public static final String MODULE_MONEY_BACK = "MONEY_BACK";

	@Description("事故登记")
	public static final String MODULE_ACIDENT = "ACCIDENT";

	@Description("事故报告")
	public static final String MODULE_ACCIDENT_REPORT = "ACCIDENT_REPORT";

	@Description("隐患上报")
	public static final String MODULE_RISK = "RISK";

	@Description("整改反馈")
	public static final String MODULE_RISK_REPORT = "RISK_REPORT";
	
	@Description("汽吊管理")
	public static final String MODULE_AUTOCRANE = "AUTOCRANE";

	@Description("拆卸管理")
	public static final String MODULE_DISMANTLE_MANAGE = "DISMANTLE_MANAGE";

	@Description("安装管理")
	public static final String MODULE_INSTALL_MANAGE = "INSTALL_MANAGE";

	@Description("安全巡检")
	public static final String MODULE_INSPECT_MANAGE = "INSPECT_MANAGE";
	
	@Description("巡检整改")
	public static final String MODULE_INSPECT_RECTIFY = "INSPECT_RECTIFY";

	@Description("人员班组")
	public static final String MODULE_TEAMS_ACCOUNT = "TEAMS_ACCOUNT";

	@Description("现场调度")
	public static final String MODULE_APP_DISPATCH = "APP_DISPATCH";

	@Description("故障维修")
	public static final String MODULE_APP_REPAIR = "APP_REPAIR";

	@Description("考勤管理")
	public static final String MODULE_APP_ATTENDAMCE = "APP_ATTENDAMCE";

	@Description("资料库")
	public static final String MODULE_INFO_FILE_ATTACH = "INFO_FILE_ATTACH";

	@Description("业务申请")
	public static final String MODULE_CONTRACT_ARRANGE = "CONTRACT_ARRANGE";
	
	@Description("事务审批")
	public static final String MODULE_APP_APPLY = "APP_APPLY";

	@Description("装车物流")
	public static final String MODULE_APP_LOGISTICS = "APP_LOGISTICS";

	@Description("物流签收")
	public static final String MODULE_APP_LOGI_RECEIVE = "APP_LOGI_RECEIVE";
	
	@Description("退场计划")
	public static final String MODULE_EXEUNT_PLAN = "EXEUNT_PLAN";
	
	@Description("租借申请")
	public static final String MODULE_LEASE_APPLICATION = "LEASE_APPLICATION";
	
	@Description("技术交底")
	public static final String MODULE_DISCLOSURE = "DISCLOSURE";
	
	@Description("顶升加节")
	public static final String MODULE_EQUIP_INSTALL_DS = "EQUIP_INSTALL_DS";
	
	@Description("拆卸降节")
	public static final String MODULE_EQUIP_DISMANTLE_JJ = "EQUIP_DISMANTLE_JJ";
	@Description("安拆验收")
	public static final String MODULE_EQUIP_REVIEW = "EQUIP_REVIEW";
	@Description("安拆整改")
	public static final String MODULE_EQUIP_RECTIF = "EQUIP_RECTIF";
	@Description("安全教育")
	public static final String MODULE_SAFETY_EDUCATION = "SAFETY_EDUCATION";
	@Description("安全交底")
	public static final String MODULE_SAFE_CLARIFICATION = "SAFE_CLARIFICATION";
	@Description("自检项目记录")
	public static final String MODULE_INSPECT_PROJECT = "INSPECT_PROJECT";
	
	@Description("设备保险")
	public static final String MODULE_EQUIP_INSURANCE = "EQUIP_INSURANCE";
	@Description("人员保险")
	public static final String MODULE_PRACTI_INSURANCE = "PRACTI_INSURANCE";
	
	/*
	 * 周材模块
	 */
	@Description("报废申请")
	public static final String MODULE_SCRAP_APPLY = "SCRAP_APPLY";
	@Description("报废合同")
	public static final String MODULE_SCRAP_CONTRACT = "SCRAP_CONTRACT";
	@Description("盘点管理")
	public static final String MODULE_TAKE_STOCK = "TAKE_STOCK";
	@Description("其他出入库")
	public static final String MODULE_OTHER_MATERIAL_STOCK = "OTHER_MATERIAL_STOCK";
	@Description("发货调度")
	public static final String MODULE_MATERIALS_DISPATCH = "MATERIALS_DISPATCH";
	@Description("发货现场装车")
	public static final String MODULE_MATERIALS_PACKAGE = "MATERIALS_PACKAGE";
	@Description("回收信息")
	public static final String MODULE_RECYCLE_MANAGE = "RECYCLE_MANAGE";
	@Description("项目调拨")
	public static final String MODULE_ALLOCATION_PROJECT = "ALLOCATION_PROJECT";
	@Description("仓库调拨")
	public static final String MODULE_ALLOCATION_DEPOT = "ALLOCATION_DEPOT";
	@Description("损失赔偿")
	public static final String MODULE_LOST_COMPENSATION = "LOST_COMPENSATION";
	@Description("租借合同")
	public static final String MODULE_LEASE_CONTRACT = "LEASE_CONTRACT";
	@Description("收货管理")
	public static final String MODULE_GOODS_RECIPIENT = "GOODS_RECIPIENT";
	@Description("退货管理")
	public static final String MODULE_RETURN_GOODS = "RETURN_GOODS";
	@Description("租借维修")
	public static final String MODULE_LEASE_REPAIR = "LEASE_REPAIR";
	@Description("租借丢失赔偿")
	public static final String MODULE_LEASED_LOST_COMPENSATION = "LEASED_LOST_COMPENSATION";
	@Description("租借结算")
	public static final String MODULE_LEASE_SETTLEMENT = "LEASE_SETTLEMENT";
	@Description("租借付款")
	public static final String MODULE_LEASE_PAYMENT = "LEASE_PAYMENT";
	@Description("周材维修")
	public static final String MODULE_MATERIALS_REPAIR = "MATERIALS_REPAIR";
	@Description("制作申请")
	public static final String MODULE_APPLY_MAKE = "APPLY_MAKE";
	@Description("制作处理")
	public static final String MODULE_HANDLE_MAKE = "HANDLE_MAKE";
	@Description("周材改型")
	public static final String MODULE_MATERIALS_REMODEL = "MATERIALS_REMODEL";
	@Description("项目维修")
	public static final String MODULE_PROJECT_REPAIR = "PROJECT_REPAIR";
	@Description("暂存退货")
	public static final String MODULE_TEMPORARY_RETURN = "TEMPORARY_RETURN";
	@Description("仓库调拨")
	public static final String MODULE_DEPOT_TRANSFERS = "DEPOT_TRANSFERS";
	
	
	public static final Map<String, String> ATTACH_MODULE = new HashMap<String, String>();

	public static final List<SyncModule> SYNC_SYSTEM_DATA = new ArrayList<SyncModule>();

	public static String SPRING_SECURITY_LAST_USERNAME = "SPRING_SECURITY_LAST_USERNAME";

	public static final Set<String> APP_FUNCTIONS = new HashSet<String>();
	
	@Description("入库管理")
	public static final String MODULE_COMPON_INTOSTORE = "COMPON_INTO_STORE";
	
	@Description("派工管理")
	public static final String MODULE_PRACTI_DISPATCH = "PRACTI_DISPATCH";

	static {
		APP_FUNCTIONS.add("EQUIP_TODAY");
		APP_FUNCTIONS.add("INSTALL_MANAGE");
		APP_FUNCTIONS.add("EMPLOY_MANAGE");
		APP_FUNCTIONS.add("INSPECT_MANAGE");
		APP_FUNCTIONS.add("DISMANTLE_MANAGE");
		APP_FUNCTIONS.add("DISPATCH_INTELLIGENT");
		APP_FUNCTIONS.add("APP_REPAIR");
		APP_FUNCTIONS.add("APP_DISPATCH");
		APP_FUNCTIONS.add("APP_ATTENDAMCE");
		APP_FUNCTIONS.add("APP_APPLY");
		APP_FUNCTIONS.add("APP_LOGISTICS");
		APP_FUNCTIONS.add("APP_LOGI_RECEIVE");
		APP_FUNCTIONS.add("APP_DISPATCH_CLOSED");
		APP_FUNCTIONS.add("_ConstructOperationAccept");
		APP_FUNCTIONS.add("_ConstructOperationFill");
		APP_FUNCTIONS.add("_ConstructOperationClosed");
		APP_FUNCTIONS.add("APP_CONSTRUCT_PLAN");
		APP_FUNCTIONS.add("_FlowQueryAll");
		APP_FUNCTIONS.add("AccountReceivable");
		APP_FUNCTIONS.add("_AttendamceQueryAll");

		Field[] fields = SystemConstant.class.getDeclaredFields();
		Map<String, RelationModule> relationModules = new LinkedHashMap<String, RelationModule>();
		for (Field f : fields) {
			String fileName = f.getName();
			int modify = f.getModifiers();
			if (Modifier.isFinal(modify) && Modifier.isStatic(modify) && Modifier.isPublic(modify) && f.getType().equals(java.lang.String.class) && fileName.startsWith("MODULE_")) {
				try {
					Object v = f.get(fileName);
					ATTACH_MODULE.put(v.toString(), PREFIX_MODULE + "/" + FieldUtil.getObjectPropertiesField(v.toString()));
					String description = f.getAnnotation(Description.class).value();
					relationModules.put(FieldUtil.getObjectPropertiesField(v.toString()), new RelationModule(v.toString(), description));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		try {
			relationModules.clear();
			if (!relationModules.isEmpty()) {
				String relateFilePath = new File(SystemConstant.class.getClassLoader().getResource("").toURI().getPath()).getParentFile().getParentFile().getPath() + "/js/core/ux/RelationModule.js";
				File relateFile = new File(relateFilePath);
				FileUtil.cleanFileContent(relateFile);
				FileUtil.writeFile(relateFilePath, "var RelationModule = " + GsonUtil.toJson(relationModules));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			String syncFilePath = SystemConstant.class.getClassLoader().getResource("").toURI().getPath() + "resource/sync_module.xml";
			File syncFile = new File(syncFilePath);
			Element root = XmlUtil.load(syncFile).getRootElement();
			@SuppressWarnings("unchecked")
			List<Element> selectNodeList = root.selectNodes("SyncModule");
			for (Element selectNode : selectNodeList) {
				String moduleName = selectNode.selectSingleNode("ModuleName").getText();
				String dataSource = selectNode.selectSingleNode("DataSource").getText();
				SYNC_SYSTEM_DATA.add(new SyncModule(moduleName, dataSource));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
