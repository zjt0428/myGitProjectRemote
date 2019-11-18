/**
 *====================================================
 * 文件名称: MaterialsPlanServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.MaterialsPlanDao;
import com.knight.emms.model.MaterialsPlan;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.MaterialsPlanService;

/**
 * @ClassName: MaterialsPlanServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:48:34
 */
public class MaterialsPlanServiceImpl extends BusinessFlowServiceImpl<MaterialsPlan> implements MaterialsPlanService {

	private MaterialsPlanDao materialsPlanDao;
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private CorpInfoService corpInfoService;
	
	@Resource
	private BusinessMessageService businessMessageService;
	

	public MaterialsPlanServiceImpl(MaterialsPlanDao dao) {
		super(dao);
		this.materialsPlanDao = dao;
	}

	public void saveOrMergeForEdit(MaterialsPlan materialsPlan) {
		if (materialsPlan.getMaterialsPlanId() == null) {
			super.saveSerialModel(materialsPlan);
		}
		materialsPlan.setSubMaterialsPlan();
		materialsPlanDao.merge(materialsPlan);
	}

}
