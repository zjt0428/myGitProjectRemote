/**
 *====================================================
 * 文件名称: ConstructOperation.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月6日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.knight.emms.core.ApplyforState;
import groovy.util.logging.Slf4j;
import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: ConstructOperation
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月6日 上午10:50:56
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "施工作业单信息汇总", sheetName = "施工作业单信息")
@SerialNumberStrategy(name = "constructSerial", strategy = "SG{yyyyMMdd}", maxseq = 99)
public class ConstructOperation extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long constructId;

	@Expose
	private String constructSerial;

	@Expose
	private String constructTheme;

	@Expose
	private String constructStartDate;

	@Expose
	private String enterPlanDate;

	@Expose
	private String constructDate;

	@Expose
	private String receiveDate;

    @Expose
    private Number mileage;

	@Expose
	@CodeFieldDeclare(codeId = "APP_CONSTRUCT_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	@Expose
	private String userName;
	
	@Expose
	private String createBy;

	@Expose
	private String providedDate;

	@Expose
	private String confimDate;

    @Expose
    private String actualDate;

    @Expose
    private String closedDate;

    @Expose
    private Long closedUserId;

    @Expose
    private String closedUserName;

    @Expose
    private String actualPractiNames;

	@Expose
	private String buildingNum;

	@Expose
	private String paEntName;
	
	@Expose
	private String certNum;
	
	@Expose
	private String certLevel;

	@Expose
	private String pbEntName;

	@Expose
	private String practiNames;

	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	@Expose
	private BigDecimal summary;

	@Expose
	private String remark;

	@Expose
	private String projectPrincipal;

	@Expose
	private String teams;

	@Expose
	private BigDecimal finishedAmount;

	@Expose
	private BigDecimal remainderAmount;

	@Expose
	private String planHeight;

	@Expose
	private String realHeight;

	@Expose
	private String licensePlate;

	@Expose
	private String fileAttaches;

	@Expose
	private Project project;

	@Expose
	private Equipment equipment;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ConstructOperationTask> constructOperationPlanTaskSet = new HashSet<ConstructOperationTask>(0);

	private String constructOperationPlanTasks = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ConstructOperationTask> constructOperationRealTaskSet = new HashSet<ConstructOperationTask>(0);

	private String constructOperationRealTasks = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ConstructPracti> constructPlanPractiSet = new HashSet<ConstructPracti>(0);

    private String constructPlanPractis = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ConstructPracti> constructRealPractiSet = new HashSet<ConstructPracti>(0);

	private String constructRealPractis = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ConstructPracti> constructManagerSet = new HashSet<ConstructPracti>(0);

	private String constructManagers = "";

	public String getModelSerial() {
		return this.constructSerial;
	}

	public void setModelSerial(String serial) {
		this.constructSerial = serial;
	}

	// ================================================================================//
	public void setSubConstructOperation() {
		Set<ConstructOperationTask> constructOperationPlanTaskSet = GsonUtil.fromJson(this.getConstructOperationPlanTasks(), new TypeToken<Set<ConstructOperationTask>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (constructOperationPlanTaskSet != null ) {
			for (ConstructOperationTask p : constructOperationPlanTaskSet) {
				p.setConstructId(this.constructId);
				p.setTaskType("0");
			}
			this.setConstructOperationPlanTaskSet(constructOperationPlanTaskSet);
		}
		Set<ConstructOperationTask> constructOperationRealTaskSet = GsonUtil.fromJson(this.getConstructOperationRealTasks(), new TypeToken<Set<ConstructOperationTask>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (constructOperationRealTaskSet != null ) {
			for (ConstructOperationTask p : constructOperationRealTaskSet) {
				p.setConstructId(this.constructId);
				p.setTaskType("1");
			}
			this.setConstructOperationRealTaskSet(constructOperationRealTaskSet);
		}
        Set<ConstructPracti> constructPlanPractiSet = GsonUtil.fromJson(this.getConstructPlanPractis(), new TypeToken<Set<ConstructPracti>>() {}, DateUtil.LINK_DISPLAY_DATE);
        if (constructPlanPractiSet != null ) {
            for (ConstructPracti p : constructPlanPractiSet) {
                p.setConstructId(this.constructId);
				p.setType("0");
                    this.setPractiNames((this.practiNames == null ? "" : this.getPractiNames() + ",") + p.getPractiName());
            }
            this.setConstructPlanPractiSet(constructPlanPractiSet);
        }
        Set<ConstructPracti> constructRealPractiSet = GsonUtil.fromJson(this.getConstructRealPractis(), new TypeToken<Set<ConstructPracti>>() {}, DateUtil.LINK_DISPLAY_DATE);
        if (constructRealPractiSet != null ) {
            for (ConstructPracti p : constructRealPractiSet) {
                p.setConstructId(this.constructId);
                p.setType("1");
                if (p.getAppUser() != null) {
                    this.setActualPractiNames((this.actualPractiNames == null ? "" : this.getActualPractiNames() + ",") + p.getAppUser().getFullname());
                }
            }
            this.setConstructRealPractiSet(constructRealPractiSet);
        }
        Set<ConstructPracti> constructManagerSet = GsonUtil.fromJson(this.getConstructManagers(), new TypeToken<Set<ConstructPracti>>() {}, DateUtil.LINK_DISPLAY_DATE);
        if (constructManagerSet != null ) {
            for (ConstructPracti p : constructManagerSet) {
                p.setConstructId(this.constructId);
                p.setType("2");
            }
            this.setConstructManagerSet(constructManagerSet);
        }
	}

    @Override
    public Long getUserId() {
        return null;
    }

    @Override
    public Long getApplyforId() {
        return this.constructId;
    }

    @Override
    public void setApplyforState(String applyforState) {
        this.status = applyforState;
    }

    @Override
    public String getApplyforState() {
        return this.status;
    }
}
