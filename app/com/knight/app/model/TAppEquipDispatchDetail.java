package com.knight.app.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.emms.model.Equipment;

import lombok.Data;
import lombok.ToString;

/**
 * Created by YaoFly on 2016/7/20.
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class TAppEquipDispatchDetail extends BaseModel{
    private static final long serialVersionUID = 1L;
    @Expose
    private Long equipDeid;
    @Expose
    private Long disid;
    @Expose
    private Long equipId;
    @Expose
    private String equipName;
    @Expose
    private String equipSpec;
    @Expose
    private String exwSerial;
    @Expose
    private String recordId;
    @Expose
    private String equipVender;
    @Expose
    private Long disNum;
    @Expose
    private Long logisticNum;
    @Expose
	private Equipment equipment;
}
