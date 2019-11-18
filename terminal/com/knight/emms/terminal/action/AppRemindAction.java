package com.knight.emms.terminal.action;

import com.knight.app.core.mode.RemindModule;
import com.knight.app.core.service.RemindModuleService;
import com.knight.app.service.AppRemindService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.BaseModel;
import com.knight.core.util.GsonUtil;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.TerminalBaseAction;

import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFl on 2016/8/18.
 */
public class AppRemindAction extends TerminalBaseAction{
    @Resource
    private AppRemindService appRemindService;

    public String getAllCount(){
        Query query = getTerminalMessage().getQuery();
        Long projectId = query.getProjectId();
        List<RemindModule> list = new ArrayList<RemindModule>();
        List<RemindModule> remindModules =  query.getRemindModules();
        if(projectId==null){
        	list = appRemindService.getCount(remindModules);
        }else{
        	list = appRemindService.getCount(remindModules,projectId);
        }
        successResponse(GsonUtil.toJson(list,false));
        return SUCCESS;
    }
}
