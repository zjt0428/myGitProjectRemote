/**
 *====================================================
 * 文件名称: SecureProtocol.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: SecureProtocol
 * @Description: 安全协议
 * @author chenxy
 * @date 2014-4-20 上午7:02:46
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "protocolSerial", strategy = "AQ{yyyyMMdd}", maxseq = 99)
public class SecureProtocol extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long protocolId;

	@Expose
	private String protocolSerial;

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

	private String finalHeight;

	private Integer wallAttacheQty;

	private String remark;

	private String relateModule;

	@Expose
	private Project project;

	private ContractLease contractLease;

	@Expose
	private Equipment equipment;

	public void setModelSerial(String serial) {
		this.protocolSerial = serial;
	}

}
