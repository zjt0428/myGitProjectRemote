package com.knight.app.core.service;

import com.knight.app.core.mode.RemindModule;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.BusinessModel;
import com.knight.system.service.BusinessLongPKService;

import java.util.List;
import java.util.Map;

/**
 * Created by YaoFl on 2016/8/19.
 */
public interface RemindModuleService<T> extends BusinessLongPKService<T> {
    public int getCount(RemindModule remindModule);
    public int getCount(RemindModule remindModule,long projectId);
}
