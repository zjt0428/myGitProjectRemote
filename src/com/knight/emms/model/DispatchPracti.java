/**
 *====================================================
 * 文件名称: DispatchPracti.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: DispatchPracti
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:02:14
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class DispatchPracti extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long dispatchPractiId;

	@Expose
	private Long dispatchId;

	@Expose
	private Long practiId;

	@Expose
	private Date startDate;

	@Expose
	private Practitioner practitioner;

}
