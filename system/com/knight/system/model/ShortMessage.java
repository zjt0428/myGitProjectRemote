package com.knight.system.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;

@Data

@ToString(doNotUseGetters = true)
public class ShortMessage extends BaseModel implements Cloneable {

	private static final long serialVersionUID = 1L;

	public static final Short MSG_TYPE_PERSONAL = (short) (1);

	public static final Short MSG_TYPE_CALENDAR = (short) (2);

	public static final Short MSG_TYPE_PLAN = (short) (3);

	public static final Short MSG_TYPE_TASK = (short) (4);

	public static final Short MSG_TYPE_SYS = (short) (5);

	private Long messageId;

	@Expose
	private String content;

	@Expose
	private Long senderId;

	@Expose
	private String sender;

	@Expose
	@CodeFieldDeclare(codeId = "MESSAGE_TYPE", valueField = "msgTypeName")
	private Short msgType;

	@Expose
	private String msgTypeName;

	@Expose
	private Date sendTime;

	private Set<InMessage> messages = new HashSet<InMessage>();

	// ==========================================================================================//
	public ShortMessage clone() {
		try {
			return (ShortMessage) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

}