package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

/**
 * Created by YaoFly on 2016/11/8.
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipMaintCompon extends BaseModel{
    @Expose
    private Long maintComponId;

    @Expose
    private Long maintId;

    @Expose
    private Long componId;

    @Expose
    private Integer counts;

    @Expose
    private BigDecimal unitPrice;

    @Expose
    private BigDecimal summary;

    @Expose
    private String remark;

    @Expose
    private Component component;

}
