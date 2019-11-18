/**
 *====================================================
 * 文件名称: SideStation.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-7-2			KI·C(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: SideStation
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author KI·C
 * @date 2017-7-2 上午10:43:40
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@SerialNumberStrategy(name = "stationSerial", strategy = "PZ{yyyyMMdd}", maxseq = 999)
@PersistantDeclare
public class SideStation extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long stationId;
	
	/** 旁站编号 */
	@Expose
	private String stationSerial;
	
	/** 类别 */
	@Expose
	private String category;
	
	/** 旁站内容 */
	@Expose
	private String details;
	
	@Override
	public void setModelSerial(String serial) {
		this.stationSerial = serial;
	}

}
