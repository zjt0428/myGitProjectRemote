/**
 *====================================================
 * 文件名称: ApplyMakeServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    				xuenz(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.util.StringUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ApplyMakeDao;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.ProductMakeDao;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.model.ApplyMake;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.FormApprove;
import com.knight.emms.service.ApplyMakeService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

import lombok.Setter;

/**
 * @ClassName: ApplyMakeServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author xuenz
 * @date 
 */
public class ApplyMakeServiceImpl extends BusinessFlowServiceImpl<ApplyMake> implements ApplyMakeService {

	private ApplyMakeDao applyMakeDao;
	
	@Setter
	private Map<String, DispatchRelateDomain> relateDomains = new HashMap<String, DispatchRelateDomain>();
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private CorpInfoService corpInfoService;
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private ProductMakeDao productMakeDao;

	public ApplyMakeServiceImpl(ApplyMakeDao dao) {
		super(dao);
		this.applyMakeDao = dao;
	}

	public void saveOrMergeForEdit(ApplyMake applyMake) {
		if (applyMake.getApplyMakeId() == null) {
			applyMakeDao.saveSerialModel(applyMake);
		}
		applyMake.setSubApplyMake();
		applyMakeDao.merge(applyMake);
	}

	public void deleteProductMake(Long productMakeId) {
		productMakeDao.remove(productMakeId);
	}
}
