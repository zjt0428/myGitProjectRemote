package com.knight.app.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.knight.core.model.BaseModel;
import com.knight.emms.model.LogisticsTranDestribution;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by YaoFly on 2016/7/26.
 */
@Data
public class TAppLogistics extends BaseModel {
    @Expose
    private Long logiId;
    @Expose
    private Long disid;
    @Expose
    private String dispatchSerial;
    @Expose
    private String deliveryDate;
    @Expose
    private String deliveryMan;
    @Expose
    private String propertyName;
    @Expose
    private Long sendId;
    @Expose
    private Long receiveId;
    @Expose
    private String sendWarehouseName;
    @Expose
    private String receiveWarehouseName;
    @Expose
    private String sendWarehouseType;
    @Expose
    private String receWarehouseType;
    @Expose
    private String receWarehouseAddress;
    @Expose
    private BigDecimal summary;
    @Expose
    private Long carId;
    @Expose
    private String licensePlate;
    @Expose
    private String status;
    @Expose
    private String fileAttaches;
    @Expose
    private List<Map> fileAttachesPath = new ArrayList<Map>();
    @Expose
    private String fileAttachesReceived;
    @Expose
    private List<Map> fileAttachesReceivedPath = new ArrayList<Map>();
    @Expose
    private String signMan;
    @Expose
    private String signResult;
    @Expose
    private String signDate;
    @Expose
    private String signAddress;
    /*签名图片*/
    @Expose
    private String signPic;   
    @Expose
    private String filePath;
    @Expose
    private String remark;
    /*车型*/
    @Expose
    private String sedan;
    @Expose
    private String remarkRece;
    @Expose
    private String isComplete;
    
    @Expose
    private String mobile;
    
    @Expose
    private String Phone;
    
    @Expose
    private String driverPhone;
    
    @Expose
    private String department;
    
    @Expose
    private String dispathcher;
    
	@Expose
	private String transportUnit;

    @Expose(deserialize = false, serialize = false)
    @Since(value = 2.0)
    private Set<TAppLogisticsComp> tAppLogisticsCompSet = new HashSet<TAppLogisticsComp>();

    @Expose(deserialize = false, serialize = false)
    @Since(value = 2.0)
    private Set<TAppLogisticsEquip> tAppLogisticsEquipSet = new HashSet<TAppLogisticsEquip>();

    @Expose(deserialize = false, serialize = false)
    @Since(2.0)
    private Set<LogisticsTranDestribution> logisticsTranDistributionSet = new HashSet<LogisticsTranDestribution>(0);
}
