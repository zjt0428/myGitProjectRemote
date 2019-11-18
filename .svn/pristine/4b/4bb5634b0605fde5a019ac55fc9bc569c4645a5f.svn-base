package com.knight.system.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.Constants;
import com.knight.core.model.BaseModel;

@Data

@ToString(callSuper = false, doNotUseGetters = true)
public class SysConfig extends BaseModel {

	private static final long serialVersionUID = 1L;

	/** 开启验证码 */
	public static String CODE_OPEN = "1";

	/** 屏蔽验证码 */
	public static String CODE_COLSE = "0";

	@Expose
	private Long configId;

	@Expose
	private String configKey;

	@Expose
	private String fieldset;

	@Expose
	private String configName;

	@Expose
	private String configDesc;

	@Expose
	private String typeName;

	@Expose
	private String datastore;

	@Expose
	private Short dataType;

	@Expose
	private String dataValue;
	
	protected Short delFlag = Constants.ENABLED;

	public SysConfig() {
	}

	public SysConfig(Long in_configId) {
		setConfigId(in_configId);
	}

}