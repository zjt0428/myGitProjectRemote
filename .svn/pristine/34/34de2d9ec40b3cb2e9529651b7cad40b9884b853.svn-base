/**
 *====================================================
 * 文件名称: DismantleManage.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

/**
 * @ClassName: DismantleManage
 * @Description: 拆卸管理
 * @author chenxy
 * @date 2014-10-26 下午4:17:21
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class DismantleManage extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long dismantleId;

	@Expose
	private String recordId;

	@Expose
	private String projectName;

	@Expose
	private Date startdisDate;

	@Expose
	private Date enddisDate;

	@Expose
	private String dismantleHeight;

	@Expose
	private String longitude;

	@Expose
	private String latitude;

	@Expose
	private String address;

	private Long userId;

	@Expose
	private String userName;

	private String providedDate;

	@Expose
	private String fileAttaches;

	// ========================================================================== //
	@Expose
	private EquipFlow equipFlow;
	
	@Expose
	private String dismantleType;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private String buildingNum;
	
	@Expose
	private List<Map> images;

}
