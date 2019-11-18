/**
 *====================================================
 * 文件名称: EquipActivateServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.EquipActivateDao;
import com.knight.emms.dao.EquipContractLeaseDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.EquipContractLease;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.EquipActivateService;
import com.knight.emms.service.EquipContractLeaseService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipActivateServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-23 下午8:09:43
 */
public class EquipContractLeaseServiceImpl extends BaseBusinessModelServiceImpl<EquipContractLease> implements EquipContractLeaseService {

public EquipContractLeaseServiceImpl(BaseBusinessModelDao<EquipContractLease> dao) {
		super(dao);
	}

	@Resource
	private EquipContractLeaseDao equipContractLeaseDao;

	@Override
	public List<EquipContractLease> queryTranslateAllFull(QueryFilter filter) {
		List<EquipContractLease> list = equipContractLeaseDao.getAll(filter);
		return list;
	}
}
