/**
 *====================================================
 * 文件名称: IndisNotice.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年8月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Transient;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: IndisNotice
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年8月25日 下午4:51:37
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class IndisNotice extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long noticeId;

	@Expose
	private String contractNumber;

	@Expose
	private String plannedDate;

	@Expose
	private String workDate;

	@Expose
	private String remark;

	@Expose
	private String relateModule;

	@Expose
	private String acceptNumber;

	@Expose
	private IndisSchema indisSchema;

	@Transient
	private Long schemaId;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<IndisNoticePracti> indisNoticePractiSet = new HashSet<IndisNoticePracti>();

	private String indisNoticePractis = "";

	// ==========================================================================================//
	public void setSubIndisNotice() {
		Set<IndisNoticePracti> indisNoticePractiSet = GsonUtil.fromJson(this.getIndisNoticePractis(), new TypeToken<Set<IndisNoticePracti>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (indisNoticePractiSet != null) {
			for (IndisNoticePracti e : indisNoticePractiSet) {
				e.setNoticeId(this.noticeId);
			}
			this.setIndisNoticePractiSet(indisNoticePractiSet);
		} else {
			this.setIndisNoticePractiSet(new HashSet<IndisNoticePracti>());
		}
	}

}
