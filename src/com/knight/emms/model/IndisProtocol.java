/**
 *====================================================
 * 文件名称: IndisProtocol.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: IndisProtocol
 * @Description: 安全协议
 * @author chenxy
 * @date 2014-4-20 上午7:09:56
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "protocolSerial", strategy = "AC{yyyyMMdd}", maxseq = 99)
public class IndisProtocol extends BusinessModel {

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

	@Expose
	private String inEntCertNum;

	private String inEntTitleLevel;

	private String initialHeight;

	private String finalHeight;

	private Integer wallAttacheQty;

	private String remark;

	private String relateModule;

	@Expose
	private Project project;

	private ContractLease contractLease;

	private Set<IndisProtocolEquip> indisProtocolEquipSet = new HashSet<IndisProtocolEquip>(0);

	private String indisProtocolEquips = "";

	public void setModelSerial(String serial) {
		this.protocolSerial = serial;
	}

	public void setSubIndisProtocol() {
		Set<IndisProtocolEquip> indisProtocolEquipSet = GsonUtil.fromJson(this.getIndisProtocolEquips(), new TypeToken<Set<IndisProtocolEquip>>() {},
				DateUtil.LINK_DISPLAY_DATE);
		if (indisProtocolEquipSet != null) {
			for (IndisProtocolEquip ipe : indisProtocolEquipSet) {
				ipe.setProtocolId(this.protocolId);
			}
			this.setIndisProtocolEquipSet(indisProtocolEquipSet);
		}
	}

}
