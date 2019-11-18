/**
 *====================================================
 * 文件名称: EquipFlowServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.EquipFlowService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipFlowServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-1 上午9:46:48
 */
public class EquipFlowServiceImpl extends BusinessLongPKServiceImpl<EquipFlow> implements EquipFlowService {

	private EquipFlowDao equipFlowDao;
	
	
	@Resource
	private ContractLeaseService contractLeaseService;

	public EquipFlowServiceImpl(EquipFlowDao dao) {
		super(dao);
		this.equipFlowDao = dao;
	}

	public List<EquipFlow> queryTranslateAllFull(QueryFilter filter) {
		List<EquipFlow> list = equipFlowDao.getAll(filter);
		for (EquipFlow ef : list) {
			CodeServiceImpl.translate(ef, getPersistantStruct());
			CodeServiceImpl.translate(ef.getEquipDiary());
			CodeServiceImpl.translate(ef.getEquipInstall());
			CodeServiceImpl.translate(ef.getEquipment());
			CodeServiceImpl.translate(ef.getContractLease(), contractLeaseService.getPersistantStruct());
		}
		return list;
	}

	public EquipFlow getTranslateFull(Long flowId) {
		EquipFlow ef = equipFlowDao.get(flowId);
		CodeServiceImpl.translate(ef);
		CodeServiceImpl.translate(ef.getEquipDiary());
		return ef;
	}

}
