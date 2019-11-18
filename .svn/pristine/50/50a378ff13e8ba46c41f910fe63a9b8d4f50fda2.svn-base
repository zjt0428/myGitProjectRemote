/**
 *====================================================
 * 文件名称: CorpCert.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;

/**
 * @ClassName: CorpCert
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 上午10:43:49
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true, exclude = { "corpInfo" })
@PersistantDeclare
public class CorpCert extends BaseModel implements Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long certId;

	@Expose
	private Long corpId;

	@Expose
	private String corpName;

	@Expose
	private String certNum;

	private String corpCode;

	@CodeFieldDeclare(codeId = "aptitudekind", valueField = "certTypeName")
	private String certType;

	@Expose
	private String certTypeName;

	@Deprecated
	@CodeFieldDeclare(codeId = "tradetype", valueField = "tradeTypeName")
	private String tradeType;

	@Deprecated
	private String tradeTypeName;

	@Deprecated
	@CodeFieldDeclare(codeId = "tradetypebound", valueField = "tradeBoundName")
	private String tradeBound;

	@Deprecated
	private String tradeBoundName;

	@Deprecated
	@CodeFieldDeclare(codeId = "certLevel", valueField = "titleLevelName")
	private String titleLevel;

	@Deprecated
	@Expose
	private String titleLevelName;

	@Deprecated
	@Expose
	private String copyCertCount;

	@Deprecated
	private String noteNumber;

	@Deprecated
	private String noteDate;

	@Expose
	private String organName;

	@Expose
	private String organDate;

	@Expose
	private String endDate;

	private String printNumber;

	private String mark;

	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "ARCHIVES_STATUS", valueField = "isvalidName")
	private String isvalid;

	@Expose
	private String isvalidName;

	private String defaultCert;

	private String delFlag = Constant.ENABLED;

	// ===================================================================//
	private CorpInfo corpInfo;

	public CorpCert clone() {
		CorpCert entity = null;
		try {
			entity = (CorpCert) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return entity;
	}

}
