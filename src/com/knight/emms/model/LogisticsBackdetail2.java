/**
 *====================================================
 * 文件名称: LogisticsBackdetail.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月5日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: LogisticsBackdetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月5日 下午8:06:47
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class LogisticsBackdetail2 extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long backdetailId;

	@Expose
	private Long backsportId;

	@Expose
	private Long carId;

	@Expose
	private String licensePlate;

	@Expose
	private String driver;

	@Expose
	private String driverPhone;

	@Expose
	private Integer counts;

	@Expose
	private String remark;
	
	@Expose
	private Long componId;
	
	@Expose
	private Component component;
}
