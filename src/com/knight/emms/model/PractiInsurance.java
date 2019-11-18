package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: PractiInsurance
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "人员保险信息汇总", sheetName = "保险信息")
@SerialNumberStrategy(name = "insureSerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class PractiInsurance extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long insureId;

	/**保险单号*/
	@Expose
	private String insureSerial;

	/**起保日期*/
	@Expose
	private String startInsureDate;

	/**停保日期*/
	@Expose
	private String endInsureDate;

	/**保费总额*/
	@Expose
	private BigDecimal totalPremium;

	/**保险公司*/
	@Expose
	private String insuranceCompany;

	/**理赔电话*/
	@Expose
	private String claimPhone;

	/**联系人*/
	@Expose
	private String linkman;
	
	/**保障人数虚数*/
	@Expose
	private Integer practiNum;
	
	/**保障人数实数*/
	@Expose
	private Integer practiAmount;

	/**保障最大人数*/
	@Expose
	private Integer practiMaxNum = 0;
	
	/**保险状态（0未生效1已生效3已过期12一个月到期） */
	@Expose
	@CodeFieldDeclare(codeId = "INSURE_EFFECTIVE", valueField = "effectiveName")
	private String effective;
	@Expose
	private String effectiveName;
	
	/**保险项目（0雇主责任险9其他） */
	@Expose
	@CodeFieldDeclare(codeId = "PRACTI_INSURE_TYPE", valueField = "insuranceTypeName")
	private String insuranceType;

	@Expose
	private String insuranceTypeName;
	
	private String remark;

	private String delFlag;

	private Long userId;

	private String userName;

	private String providedDate;

	@Expose
	private String linkmanPhone;
	
	private Department department;
	
	@Expose
	private String claims;//是否理赔
	/**所属公司*/
	@Expose
	private Long corpId;

	@Expose
	private String corpName;
	
	@Expose
	private String practiFull;
	
	@Expose
	private Integer count;
	
	/**累计理赔金额*/
	@Expose
	private String claimAmount;
	
	/**理赔电话*/
	@Expose
	private String claimiPhone;

	private Set<PractiInsuranceDetail> practiInsuranceDetailSet = new HashSet<PractiInsuranceDetail>(0);

	private String practiInsuranceDetails = "";

	// ================================================================================//
	public void setSubInsureClaim() {
		Set<PractiInsuranceDetail> practiInsuranceDetailSet = GsonUtil.fromJson(this.practiInsuranceDetails, new TypeToken<Set<PractiInsuranceDetail>>() {});
		if (practiInsuranceDetailSet != null) {
			for (PractiInsuranceDetail p : practiInsuranceDetailSet) {
				p.setInsureId(this.insureId);
			}
		}
		this.setPractiInsuranceDetailSet(practiInsuranceDetailSet);
	}

}
