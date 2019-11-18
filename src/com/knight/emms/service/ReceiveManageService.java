package com.knight.emms.service;

import java.util.Map;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.ReceiveManage;
import com.knight.emms.model.ReceiveManageDetail;

public interface ReceiveManageService extends BusinessFlowService<ReceiveManage>, ExportService {

	public ReceiveManage getTranslateFull(Long receiveId);

	public void deletedDetail(Long detailId);

	public void returnMaterials(Long receiveId, Map<Long, ReceiveManageDetail> receiveManageDetails);

}
