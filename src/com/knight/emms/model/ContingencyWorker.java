/**
 *====================================================
 * 文件名称: ContingencyWorker.java
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
import com.knight.core.model.BaseModel;

/**
 * @ClassName: ContingencyWorker
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午7:32:15
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class ContingencyWorker extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long workerId;

	@Expose
	private Long contingencyId;

	@Expose
	private String name;

	@Expose
	private String duties;

	@Expose
	private String contingencyDuties;

	@Expose
	private String phone;

}
