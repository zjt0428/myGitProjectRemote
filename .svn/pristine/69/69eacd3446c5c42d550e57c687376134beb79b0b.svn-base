package com.knight.app.service;

import com.knight.app.core.service.RemindModuleService;
import com.knight.app.model.TAppLogistics;
import com.knight.core.service.BaseLongPKService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;

import java.util.List;
import java.util.Map;

/**
 * Created by YaoFly on 2016/7/27.
 */
public interface TAppLogisticsService extends RemindModuleService<TAppLogistics>{

    public void saveOrUpdate(TAppLogistics tAppLogistics);

    public List<Map<String,Object>> list(Query query);

    public void receive(TAppLogistics tAppLogistics);

    public void sendMessagePush(TAppLogistics tAppLogistics,String msg);
}
