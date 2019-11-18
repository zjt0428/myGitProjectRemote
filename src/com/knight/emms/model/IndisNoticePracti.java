/**
 *====================================================
 * 文件名称: IndisNoticePracti.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年8月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: IndisNoticePracti
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年8月25日 下午5:19:37
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class IndisNoticePracti extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long noticePractiId;

	@Expose
	private Long noticeId;

	@Expose
	private Long certId;

	@Expose
	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	private String certNum;

	@Expose
	private String practiKindwork;

}
