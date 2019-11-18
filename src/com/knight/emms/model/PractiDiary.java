/**
 *====================================================
 * 文件名称: PractiDiary.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;

/**
 * @ClassName: PractiDiary
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PractiDiary extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long practiDiaryId;

	@Expose
	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	@CodeFieldDeclare(codeId = "kindWork", valueField = "kindWorkName")
	private String kindWork;

	@Expose
	private String kindWorkName;

	@Expose
	private String mobile;

	@Expose
	private String station;

	@Expose
	private Long corpId;

	@Expose
	private String corpName;

	@Expose
	private Long depId;

	@Expose
	private String depName;

	@Expose
	private Date startDate;

	@Expose
	private Date endDate = SQLServerDialect.MAX_DATE;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@Expose
	private Long contractId;

	private Long flowId;

	@Expose
	private Long businessId;

	@Expose
	private String businessSerial;

	@Expose
	private String businessTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "businessModuleName")
	private String businessModule;

	@Expose
	private String businessModuleName;

	@Expose
	private Long businessPractiId;

	@Expose
	private Long relateId;

	@Expose
	private String relateSerial;

	@Expose
	private String relateTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	@Expose
	@CodeFieldDeclare(codeId = "ACTIVE", valueField = "activeName")
	private String active = Constant.DISENABLED;

	@Expose
	private String activeName;

}
