package com.knight.app.model;

// Generated 2015-5-28 17:11:39 by Hibernate Tools 3.4.0.CR1

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.model.CorpAccount;

/**
 * yangjianbo
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class TAppRepairType extends BaseModel  implements ExportModel, Cloneable {

	private static final long serialVersionUID = 1L;
	@Expose
	private String id;
	@Expose
	private String name;
	@Expose
	private String enable;
	@Expose
	private String parentid;

}
