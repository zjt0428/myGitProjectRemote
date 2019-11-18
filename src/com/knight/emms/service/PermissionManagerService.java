package com.knight.emms.service;


import com.knight.emms.model.PermissionManager;
import com.knight.system.service.BusinessLongPKService;

public interface PermissionManagerService extends BusinessLongPKService<PermissionManager> {

    PermissionManager createModel(Long depId, Long relateId, String relateModule);
}
