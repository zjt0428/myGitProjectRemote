/**
 *====================================================
 * 文件名称: ReportConstant.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-31			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.constant;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: ReportConstant
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-31 下午1:23:58
 */
public class ReportConstant {

	public static final String REPORT_FINANCIAL = "Financial_Summary.jasper";

	public static final String REPORT_CASH_FLOW = "Cash_Flow_Statement.jasper";

	public static final String REPORT_ACCOUNT_DUE = "Account_Due.jasper";

	public static final String REPORT_EQUIPMENT_BALANCE_PAYMENTS = "Equipment_Balance_Payments.jasper";

	public static final String REPORT_REIMBURSE = "Reimburse.jasper";
	
	public static final String REPORT_PURCHASE_MATE_SUNMMARY_RPT = "Purchase_Mate_Summary_Rpt.jasper";

	public static final String REPORT_LOGISTICS_COST_SUNMMARY_RPT = "Logistics_Cost_Summary_Rpt.jasper";
	
	public static final String REPORT_ACCOUNT_PAYABLE = "Account_Payable.jasper";

	public static final String REPORT_CUSTOMER_MARGIN = "Customer_Margin.jasper";

	public static final String REPORT_EQUIP_MARGIN = "Equip_Margin.jasper";
	
	public static final String REPORT_USE_EQUIP_LIST_RPT = "Use_Equip_List_Rpt.jasper";
	
	public static final String REPORT_SPARE_PARTS_LIST_RPT = "Spare_Parts_List_Rpt.jasper";
	
	public static final String REPORT_Collar_Material = "Collar_Material.jasper";

	public static final String REPORT_EQUIP_VACANCY_RATE = "Equip_Vacancy_Rate.jasper";
	
	public static final String REPORT_RENTAL_FEE_APPLICATION = "Rental_Fee_Application.jasper";
	
	public static final String REPORT_EQUIP_REPAIR = "Equip_Repair.jasper";
	
	public static final String REPORT_EQUIP_SUMMARY_RATE = "Equip_Summary_Rate.jasper";

	public static final String REPORT_PRACTI_VACANCY_RATE = "Practi_Vacancy_Rate.jasper";

	public static final String REPORT_EQUIPMENT_RATE = "Equipment_Rate.jasper";

	public static final String REPORT_PROJECT_CONSTRUCT = "Project_Construct.jasper";

	public static final String REPORT_SETTLE_ACCOUNT_RECEIVABLE = "Settle_Account_Receivable.jasper";
	
	public static final String REPORT_CONSTRAUCTOR_WORK = "Construction_Work.jasper";

	public static final String REPORT_ATTENDAMCE = "ATTENDAMCE_RPT.jasper";
	
	public static final String REPORT_COMPONET_STOCKS_RPT = "COMPONENT_STOCKS_RPT.jasper";
	
	public static final String REPORT_KNOT_DISPATCH_RPT = "Kont_Dispatch_Rpt.jasper";
	
	public static final String REPORT_APPROVAL_STATUS_RPT = "Approval_Status_Rpt.jasper";
	
	public static final String REPORT_INSTALL_DETAILS_RPT = "Install_Details_Rpt.jasper";
	
	public static final String REPORT_PURCHASE_MATE_DETAIL_RPT = "Purchase_Mate_Detail_Rpt.jasper";
	
	public static final String REPORT_USE_MATE_DETAIL_RPT = "Use_Mate_Detail_Rpt.jasper";
	
	public static final String REPORT_USE_PURPOSE_SUMMARY_RPT = "Use_Purpose_Summary_Rpt.jasper";
	
	public static final String REPORT_EQUIP_USE_MATE_STATISTICS_RPT = "Equip_Use_Mate_Statistics_Rpt.jasper";
	
	public static final String REPORT_COMPONET_DISTRIBUTION_RPT = "Componet_Distribution_Rpt.jasper";
	
	public static final String REPORT_PROJECT_BALANCE_PAYMENTS = "Project_Balance_Payments.jasper";
	
	public static final String REPORT_PROJECT_INSTALL_STATICS = "Project_Install_Statics.jasper";
	
	public static final String REPORT_EQUIPMENT_IN_RENT_RATE = "Equipment_InRent_Rate.jasper";

	public static final String REPORT_RECEIVED_PAYMENTS = "RECEIVED_PAYMENTS.jasper";

	public static final String REPORT_ATTENDAMCE_DETAIL = "Attendamce_Detail.jasper";

	public static final String REPORT_RENTAL_FEE = "Rental_Fee_Rpt.jasper";
	
	public static final String REPORT_AUTO_CRANE_COST_RPT = "Auto_Crane_Cost.jasper";
	
	public static final String REPORT_TEAM_SETTLE = "Team_Settle.jasper";
	
	public static final String REPORT_MATERIALS_OUT_STOCK = "Materials_Out_Stock.jasper";
	
	public static final String REPORT_MATERIALS_IN_STOCK = "Materials_In_Stock.jasper";
	
	public static final String REPORT_PROJECT_MATERIALS_STORE_QUERY = "Project_Materials_Store_Query.jasper";
	
	public static final String REPORT_MATERIALS_STORE_QUERY = "Materials_Store_Report.jasper";

	public static final String REPORT_MATERIALS_GENERAL_LEDGER = "Materials_General_Ledger.jasper";
	
	public static final String REPORT_LEASED_DEPOT_QUERY = "Leased_Depot_Query.jasper";
	
	public static final String REPORT_TEMPORARY_STORE_QUERY = "Temporary_Store_Query.jasper";
	
	public static final String REPORT_SETTLE_MATERIALS_QUERY = "Settle_Materials_Query.jasper";
	
	public static final String REPORT_SETTLE_MATERIALS_QUERY_DETAIL = "Settle_Materials_Query_Detail.jasper";
	
	public static final String REPORT_MATERIALS_IN_RENT_DISTRIBUTION = "Materials_In_Rent_Distribution.jasper";
	
	public static final String REPORT_MATERIALS_WORK_SITE_OCCUPANCY = "Materials_Work_Site_Occupancy.jasper";
	
	public static final String REPORT_MATERIALS_HANDING_CHARGE_REPORT = "Materials_Handing_Charge_Report.jasper";
	
	public static final String REPORT_MATERIALS_LOST_COMPENSATION = "Materials_Lost_Compensation_Report.jasper";
	
	public static final String REPORT__LOST_COMPENSATION_BY_SPECIFICATIONS = "Lost_Compensation_By_Specifications.jasper";
	
	public static final String REPORT_LOST_COMPENSATION_BY_COMMODITY = "Lost_Compensation_By_Commodity.jasper";
	
	public static final String REPORT_LOST_COMPENSATION_BY_PROJECT = "Lost_Compensation_By_Project.jasper";
	
	public static final String REPORT_COMPENSATION_DAMAGE = "Compensation_Damage_Report.jasper";
	
	public static final String REPORT_LEASE_COST_ACCOUNTING = "Lease_Cost_Accounting_Report.jasper";
	
	public static final String REPORT_SETTLE_PROJECT_QUERY = "Settle_Project_Query.jasper";
	
	public static final String REPORT_SETTLE_PROJECT_QUERY_DETAIL = "Settle_Project_Query_Detail.jasper";
	
	public static final String REPORT_ACCOUNT_RECEIVABLE_DETAIL = "Account_Receivable_Detail.jasper";
	
	public static final String REPORT_ACCOUNTS_RECEIVABLE_REPORT = "Accounts_Receivable_Report.jasper";
	
	public static final String REPORT_ACCOUNTS_RECEIVABLE_SUMMARY = "Accounts_Receivable_Summary.jasper";
	
	public static final String REPORT_EQUIP_OUTPUT_VALUE_DETAIL = "Equip_Output_Value_Detail.jasper";
	
	public static final String REPORT_EQUIP_OUTPUT_VALUE_SUMMARY = "Equip_Output_Value_Summary.jasper";
	
	public static final String REPORT_PRACTI_INSURANCE_DETAIL_SUMMARY = "Practi_Insurance_Detail.jasper";
	
	public static final String REPORT_ACCOUNTS_RECEIVABLE_QUERY = "Accounts_Receivable_Query.jasper";
	
	public static final String REPORT_AMOUNT_RECEIVE_DETAIL = "Report_Amount_Receive_Detail.jasper";
	
	public static final Map<String, String> JASPER_FILES = new HashMap<String, String>();

	static {
		Field[] fields = ReportConstant.class.getDeclaredFields();
		for (Field f : fields) {
			String fileName = f.getName();
			int modify = f.getModifiers();
			if (Modifier.isFinal(modify) && Modifier.isStatic(modify) && Modifier.isPublic(modify) && f.getType().equals(java.lang.String.class) && fileName.startsWith("REPORT_")) {
				try {
					Object v = f.get(fileName);
					JASPER_FILES.put(fileName, v.toString());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static String getJasper(String jasper) {
		return JASPER_FILES.get(jasper);
	}
}
