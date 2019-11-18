/**
 *====================================================
 * 文件名称: TeamsAccount.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年3月30日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

/**
 * @ClassName: TeamsAccount
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年3月30日 下午11:30:21
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class TeamsAccount extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long teamsAccountId;

	@Expose
	private String teamsAccountSerial;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@Expose
	private String address;

	@Expose
	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	private String teams;

	@Expose
	private Date accountStartDate;

	@Expose
	private Date accountEndDate;

	@Expose
	private BigDecimal knotPrice;

	@Expose
	private BigDecimal wallAttachePrice;

	@Expose
	private BigDecimal deductAmount;

	@Expose
	private BigDecimal paymentAmount;

	@Expose
	private BigDecimal finishedAmount;

	@Expose
	private BigDecimal knotAmount;

	@Expose
	private BigDecimal wallAmount;

	@Expose
	private BigDecimal autocraneAmount;

	@Expose
	private BigDecimal lgisticsAmount;

	@Expose
	private BigDecimal otherAmount;

	@Expose
	private BigDecimal practiAmount;

	@Expose
	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	@Expose
	private String effective;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private String providedDate;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TeamsAccountKnot> teamsAccountKnotSet = new HashSet<TeamsAccountKnot>(0);

	private String teamsAccountKnots = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TeamsAccountWall> teamsAccountWallSet = new HashSet<TeamsAccountWall>(0);

	private String teamsAccountWalls = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TeamsAccountAutocrane> teamsAccountAutocraneSet = new HashSet<TeamsAccountAutocrane>(0);

	private String teamsAccountAutocranes = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TeamsAccountLogistics> teamsAccountLogisticsSet = new HashSet<TeamsAccountLogistics>(0);

	private String teamsAccountLogisticses = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TeamsAccountOther> teamsAccountOtherSet = new HashSet<TeamsAccountOther>(0);

	private String teamsAccountOthers = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TeamsAccountPracti> teamsAccountPractiSet = new HashSet<TeamsAccountPracti>(0);

	private String teamsAccountPractis = "";

	// ===============================================================================//
	@Expose
	private List<Map<String, Object>> teamsAccountKnotList;

	@Expose
	private List<Map<String, Object>> teamsAccountWallList;

	@Expose
	private List<Map<String, Object>> teamsAccountAutocraneList;

	public void setSubTeamsAccount() {
		Set<TeamsAccountKnot> teamsAccountKnotSet = GsonUtil.fromJson(this.getTeamsAccountKnots(), new TypeToken<Set<TeamsAccountKnot>>() {});
		if (teamsAccountKnotSet != null) {
			for (TeamsAccountKnot p : teamsAccountKnotSet) {
				p.setTeamsAccountId(this.teamsAccountId);
			}
		}
		this.setTeamsAccountKnotSet(teamsAccountKnotSet);

		Set<TeamsAccountWall> teamsAccountWallSet = GsonUtil.fromJson(this.getTeamsAccountWalls(), new TypeToken<Set<TeamsAccountWall>>() {});
		if (teamsAccountWallSet != null) {
			for (TeamsAccountWall p : teamsAccountWallSet) {
				p.setTeamsAccountId(this.teamsAccountId);
			}
		}
		this.setTeamsAccountWallSet(teamsAccountWallSet);

		Set<TeamsAccountAutocrane> teamsAccountAutocraneSet = GsonUtil.fromJson(this.getTeamsAccountAutocranes(),
				new TypeToken<Set<TeamsAccountAutocrane>>() {});
		if (teamsAccountAutocraneSet != null) {
			for (TeamsAccountAutocrane p : teamsAccountAutocraneSet) {
				p.setTeamsAccountId(this.teamsAccountId);
			}
		}
		this.setTeamsAccountAutocraneSet(teamsAccountAutocraneSet);

		Set<TeamsAccountLogistics> teamsAccountLogisticsSet = GsonUtil.fromJson(this.getTeamsAccountLogisticses(),
				new TypeToken<Set<TeamsAccountLogistics>>() {});
		if (teamsAccountLogisticsSet != null) {
			for (TeamsAccountLogistics p : teamsAccountLogisticsSet) {
				p.setTeamsAccountId(this.teamsAccountId);
			}
		}
		this.setTeamsAccountLogisticsSet(teamsAccountLogisticsSet);

		Set<TeamsAccountOther> teamsAccountOtherSet = GsonUtil.fromJson(this.getTeamsAccountOthers(), new TypeToken<Set<TeamsAccountOther>>() {});
		if (teamsAccountOtherSet != null) {
			for (TeamsAccountOther p : teamsAccountOtherSet) {
				p.setTeamsAccountId(this.teamsAccountId);
			}
		}
		this.setTeamsAccountOtherSet(teamsAccountOtherSet);

		Set<TeamsAccountPracti> teamsAccountPractiSet = GsonUtil.fromJson(this.getTeamsAccountPractis(), new TypeToken<Set<TeamsAccountPracti>>() {});
		if (teamsAccountPractiSet != null) {
			for (TeamsAccountPracti p : teamsAccountPractiSet) {
				p.setTeamsAccountId(this.teamsAccountId);
			}
		}
		this.setTeamsAccountPractiSet(teamsAccountPractiSet);
	}

}
