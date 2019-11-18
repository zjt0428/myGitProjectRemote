package com.knight.system.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

@Data

@ToString(doNotUseGetters = true)
public class InMessage extends BaseModel implements Cloneable {

	private static final long serialVersionUID = 1L;

	/** 已阅读:1 */
	public static final Short FLAG_READ = (short) (1);

	/** 未阅读:0 */
	public static final Short FLAG_UNREAD = (short) (0);

	@Expose
	private Long receiveId;

	@Expose
	private Long userId;

	@Expose
	private String userFullname;

	@Expose
	private Short readFlag;

	private Short delFlag;

	@Expose
	private ShortMessage shortMessage;

	// ===========================================================================//
	private boolean haveNext;

	public InMessage clone() {
		try {
			return (InMessage) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

}