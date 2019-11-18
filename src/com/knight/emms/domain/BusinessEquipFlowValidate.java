package com.knight.emms.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.exception.BusinessWarningException;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.DispatchComponDao;
import com.knight.emms.dao.DispatchDao;
import com.knight.emms.dao.DispatchEquipDao;
import com.knight.emms.dao.EquipEmployDao;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.FormApproveDao;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.service.EquipDiaryService;
import com.knight.emms.service.PractiDiaryService;
import com.knight.emms.service.PractiResumeService;

public abstract class BusinessEquipFlowValidate<T extends ApplyforState> extends BusinessFlowServiceImpl<T> {

	@Resource
	protected EquipEmployDao equipEmployDao;

	@Resource
	protected EquipmentDao equipmentDao;

	@Resource
	protected ComponentDao componentDao;

	@Resource
	protected ContractLeaseDao contractLeaseDao;

	@Resource
	protected DispatchDao dispatchDao;

	@Resource
	protected DispatchEquipDao dispatchEquipDao;

	@Resource
	protected DispatchComponDao dispatchComponDao;

	@Resource
	protected EquipFlowDao equipFlowDao;

	@Resource
	protected EquipDiaryService equipDiaryService;

	@Resource
	protected ComponDiaryService componDiaryService;

	@Resource
	protected PractiDiaryService practiDiaryService;

	@Resource
	protected PractiResumeService practiResumeService;

	@Resource
	protected FormApproveDao formApproveDao;

	public BusinessEquipFlowValidate(BaseBusinessModelDao<T> dao) {
		super(dao);
	}

	/** 领用/借用 占用零配件情况 */
	protected void validateInPickupBorrow(Long relateId, String relateModule, Date startDate, Date endDate) {
		String sqlid = "dispatch.equipFlow_diary_component_inused_pickupborrow";
		List<Map<String, Object>> pbComponeList = componDiaryService.queryByScript(sqlid, startDate, endDate, relateId, relateModule);
		if (!pbComponeList.isEmpty()) {
			StringBuffer sb = new StringBuffer("注意,以下零配件在申请期间已经被借用/领用:</br>");
			for (Map<String, Object> m : pbComponeList) {
				sb.append(m.get("COMPON_SERIAL")).append(":").append(m.get("RELATE_SERIAL")).append("|");
			}
			sb.deleteCharAt(sb.length() - 1);
			throw new BusinessException(sb.toString());
		}
	}

	/** 安装/使用/拆卸 占用零配件情况 */
	protected void warningInInstallEmployDismantle(Long relateId, String relateModule, Date startDate, Date endDate) {
		String sqlid = "dispatch.equipFlow_diary_component_inused";
		List<Map<String, Object>> usedComponeList = componDiaryService.queryByScript(sqlid, startDate, endDate, relateId, relateModule);
		if (!usedComponeList.isEmpty()) {
			StringBuffer sb = new StringBuffer("注意,以下零配件在申请期间已经被使用!注意进行调配:</br>");
			for (Map<String, Object> m : usedComponeList) {
				sb.append(m.get("COMPON_SERIAL")).append(":").append(m.get("RELATE_SERIAL")).append("|");
			}
			sb.deleteCharAt(sb.length() - 1);
			throw new BusinessWarningException(sb.toString());
		}
	}

}
