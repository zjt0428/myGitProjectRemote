/**
 *====================================================
 * 文件名称: TechnicalDisclosure.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: TechnicalDisclosure
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午7:43:43
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "disclosureSerial", strategy = "JD{yyyyMMdd}", maxseq = 99)
public class TechnicalDisclosure extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long disclosureId;

	@Expose
	private String disclosureSerial;

	@Expose
	private String providedDate;

	@Expose
	private String height;

	@Expose
	private BigDecimal brachium;

	@Expose
	private String disclosureItem;

	@Expose
	private String constructeEntname;

	private String erectingEquipart;

	private String deliveryEquipart;

	private String acceptanceMan;//交底接受人员
	private String acceptanceManId;//交底接受人员


	private String relevanceMan;

	@Expose
	private String disclosureMan;//交底人员

	@Expose
	private Long disclosureManId;//交底人员

	@Expose
	private String disclosureDate;//交底时间

	private String contents;

	private String replenishContents;

	private String remark;
	@Expose
	private Long relateId;
	@Expose
	private String relateModule;

	@Expose
	private Project project;

	@Expose
	private Equipment equipment;
	
	@Expose
	private String disclosurePhoto;
	
	@Expose
	private String disclosureLocation;
	@Expose
	private ContractLease contractLease;
	
	@Expose
	private Long dispatchEquipId;
	@Expose
	private Integer operationWay;
	@Expose
	private Long installId;
	@Expose
	private String buildingNum;
	
	

	public void setModelSerial(String serial) {
		this.disclosureSerial = serial;
	}

}
