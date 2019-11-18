/**
 *====================================================
 * 文件名称: ContingencyPlan.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: ContingencyPlan
 * @Description: 应急预案
 * @author chenxy
 * @date 2014-4-20 上午7:27:28
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "contingencySerial", strategy = "YJ{yyyyMMdd}", maxseq = 99)
public class ContingencyPlan extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long contingencyId;

	@Expose
	private String contingencySerial;

	@Expose
	private String providedDate;

	private Long emEnt;

	private String emEntModule;

	@Expose
	private String emEntName;

	private Long inEnt;

	private String inEntModule;

	@Expose
	private String inEntName;

	private String inEntCertNum;

	private String inEntTitleLevel;

	private BigDecimal overallHeight;

	private String finalHeight;

	@Expose
	private String contingencyPhone;

	private String remark;

	private String relateModule;

	@Expose
	private Project project;

	private ContractLease contractLease;

	@Expose
	private Equipment equipment;

	private Set<ContingencyWorker> contingencyWorkerSet = new HashSet<ContingencyWorker>(0);

	private String contingencyWorkers = "";

	public void setModelSerial(String serial) {
		this.contingencySerial = serial;
	}

	public void setSubIndisProtocol() {
		Set<ContingencyWorker> contingencyWorkerSet = GsonUtil.fromJson(this.getContingencyWorkers(), new TypeToken<Set<ContingencyWorker>>() {});
		if (contingencyWorkerSet != null) {
			for (ContingencyWorker cw : contingencyWorkerSet) {
				cw.setContingencyId(this.contingencyId);
			}
			this.setContingencyWorkerSet(contingencyWorkerSet);
		}
	}

}
