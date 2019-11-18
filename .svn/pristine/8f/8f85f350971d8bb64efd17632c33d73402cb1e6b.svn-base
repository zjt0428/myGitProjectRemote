/**
 *====================================================
 * 文件名称: EquipFlow.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.Transient;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: EquipFlow
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午4:16:27
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipFlow extends BaseModel {

	private static final long serialVersionUID = 1L;

	public static final Map<String, String> VERIFY_TYPE = new HashMap<String, String>();

	// ============================================================================//
	static {
		VERIFY_TYPE.put("T", "T");
		VERIFY_TYPE.put("S", "S");
	}

	@Expose
	private Long flowId;

	@Expose
	private String flowSerial;

	@Expose
	private Long equipDiaryId;

	@Expose
	private Long dispatchEquipId;

	@Expose
	private Long equipId;

	@Expose
	private Long contractId;

	@Expose
	private Long dispatchId;

	@Expose
	private Long installId;

	@Expose
	private Long activateId;

	@Expose
	private Long employId;

	@Expose
	private Long dismantleId;
	

	@Expose
	private Long employInspectSchemaId;
	
	@Expose
	private Long employMaintSchemaId;

	@Expose
	@CodeFieldDeclare(codeId = "FLOW_STATE", valueField = "flowStateName")
	private String flowState;

	@Expose
	private String flowStateName;

	@Expose
	private Equipment equipment;

	@Expose
	private ContractLease contractLease;

	@Expose
	private Dispatch dispatch;

	@Expose
	private EquipDiary equipDiary;

	@Expose
	private EquipInstall equipInstall;

	@Expose
	private EquipActivate equipActivate;

	@Expose
	private EquipEmploy equipEmploy;

	@Expose
	private EquipVerify equipVerify;
	
	@Expose
	private String verifyDate;
	
	@Expose
	private EquipDismantle equipDismantle;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ComponDiary> componDiarySet = new HashSet<ComponDiary>();

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PractiDiary> practiDiarySet = new HashSet<PractiDiary>();

	// ========================================================================//
	private Project project;


}
