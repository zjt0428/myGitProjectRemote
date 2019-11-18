/**
 *====================================================
 * 文件名称: DispatchCompon.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-13			chenxy(创建:创建文件)
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
import com.knight.emms.constant.Status;

/**
 * @ClassName: DispatchCompon
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-13 下午2:36:06
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InstallJjCompon extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long jjComponId;

	@Expose
	private Long installId;

	@Expose
	private Long componId;
	
	@Expose
	private String jjUserName;
	
	@Expose
	private Date jjTime;
	
	@Expose
	private Integer counts;

	@Expose
	private Component component;

}
