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
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.EquipActivateDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.ProductPlanDao;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.ProductPlan;
import com.knight.emms.service.EquipActivateService;
import com.knight.emms.service.ProductPlanService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipActivateServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-23 下午8:09:43
 */
public class ProductPlanServiceImpl extends BaseBusinessModelServiceImpl<ProductPlan> implements ProductPlanService {

	private ProductPlanDao productPlanDao;

	
	public ProductPlanServiceImpl(ProductPlanDao dao) {
		super(dao);
		this.productPlanDao = dao;
	}

	public List<ProductPlan> queryTranslateAllFull(QueryFilter filter) {
		List<ProductPlan> list = productPlanDao.getAll(filter);
		for (ProductPlan e : list) {
			CodeServiceImpl.translate(e, getPersistantStruct());
		}
		return list;
	}

	public ProductPlan getTranslateFull(Long productPlanId) {
		ProductPlan e = productPlanDao.get(productPlanId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		return e;
	}


}
