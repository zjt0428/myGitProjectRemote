package com.knight.app.service.impl;

import com.knight.app.dao.TAppEquipDispatchDetailDao;
import com.knight.app.model.TAppEquipDispatchDetail;
import com.knight.app.service.TAppEquipDispatchDetailService;
import com.knight.core.dao.GenericDao;
import com.knight.core.service.BaseLongPKService;
import com.knight.core.service.impl.BaseLongPKServiceImpl;

/**
 * Created by YaoFly on 2016/7/20.
 */
public class TAppEquipDispatchDetailServiceImpl extends BaseLongPKServiceImpl<TAppEquipDispatchDetail> implements TAppEquipDispatchDetailService{
    public TAppEquipDispatchDetailServiceImpl(TAppEquipDispatchDetailDao dao) {
        super(dao);
    }


}
