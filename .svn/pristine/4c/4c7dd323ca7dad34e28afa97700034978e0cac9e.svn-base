/**
 *====================================================
 * 文件名称: BusinessMessage.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: BusinessMessage
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午1:51:09
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class BusinessMessage extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long messageId;

	@Expose
	private String message;

	private String receiveTel;

	private String receiveName;

	private Long senderId;

	@Expose
	private String senderName;

	@Expose
	private String sendFlag;

	@Expose
	private Date sendTime;

	@CodeFieldDeclare(codeId = "SMS_REPLY_CODE", valueField = "replyCodeName")
	private String replyCode;

	private String replyCodeName;

	@Expose
	private Date createTime;
	

	@Expose
	private String readFlag;
	
	@Expose
	private String module; //来源模块
	
	@Expose
	private String detail;//待办事项详情
	
	@Expose
	private String msgType;//待办事项还是消息 0 待办事项  1 消息
	
	public BusinessMessage(){
		readFlag = "0";//未读
	}
}
