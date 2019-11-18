package com.knight.app.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import lombok.Data;

import javax.persistence.*;

/**
 * Created by YaoFly on 2016/7/26.
 */
@Data
@Table(name = "T_APP_LOGISTICS_EQUIP", schema = "dbo", catalog = "emms")
public class TAppLogisticsEquip extends BaseModel {
    @Expose
    private Long logiEquipId;
    @Expose
    private Long logiId;
    @Expose
    private Long equipDeid;
    @Expose
    private Long logiNum;
    @Expose
    private Long receNum;
    @Expose
    private TAppEquipDispatchDetail tAppEquipDispatchDetail;

}
