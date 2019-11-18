package com.knight.app.service.impl;

import com.knight.app.core.mode.RemindModule;
import com.knight.app.core.service.RemindModuleService;
import com.knight.app.service.AppRemindService;
import com.knight.core.dao.GenericDao;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.BaseModel;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFl on 2016/8/19.
 */
public class AppRemindServiceImpl implements AppRemindService {

    @Resource
    private Map<String,RemindModuleService<BaseModel>> remindModuleServices = new HashMap<String, RemindModuleService<BaseModel>>();

    public List<RemindModule> getCount(List<RemindModule> remindModules){
        List<RemindModule> list = new ArrayList<RemindModule>();

        for(RemindModule remindModule : remindModules){
            RemindModuleService<BaseModel> remindModuleService = remindModuleServices.get(remindModule.getModuleName());
            String count =  remindModuleService.getCount(remindModule)+"";
            remindModule.setCount(count);
            list.add(remindModule);
        }
        return list;
    }
    public List<RemindModule> getCount(List<RemindModule> remindModules,long projectId){
    	List<RemindModule> list = new ArrayList<RemindModule>();
    	
    	for(RemindModule remindModule : remindModules){
    		RemindModuleService<BaseModel> remindModuleService = remindModuleServices.get(remindModule.getModuleName());
    		String count =  remindModuleService.getCount(remindModule,projectId)+"";
    		remindModule.setCount(count);
    		list.add(remindModule);
    	}
    	return list;
    }
}
