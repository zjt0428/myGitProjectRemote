package com.knight.emms.model;

import com.knight.core.model.BaseModel;
import lombok.Data;

@Data
public class ComponentPrintModel extends BaseModel {

    private static final long serialVersionUID = 1L;

    /**设备型号*/
    private String componSpecificName;

    /**生产厂家*/
    private String equipVenderName;

    /**配件名称*/
    private String componGenericName;

    /**配件规格*/
    private String dimensions;

    /**单位*/
    private String calculate;

    /**数量*/
    private String counts;

    /**备注*/
    private String remark;


}
