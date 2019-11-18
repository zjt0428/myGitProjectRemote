/**
 *====================================================
 * 文件名称: EquipMaintDetail.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月6日			Administrator(创建:创建文件)
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

/**
 * @ClassName: EquipMaintDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月6日 下午3:08:31
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipMaintDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long maintDetailId;

	@Expose
	private Long maintId;

	@Expose
	private String substance;

	@Expose
	@CodeFieldDeclare(codeId = "INSPECT_RESULT", valueField = "detailResultName")
	private String detailResult;

	@Expose
	private String detailResultName;

	@Expose
	private String description;

	@Expose
	private String maintFlag;

	@Expose
	private Component component;

}
