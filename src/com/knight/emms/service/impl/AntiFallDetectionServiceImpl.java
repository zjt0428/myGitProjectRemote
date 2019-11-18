/**
 *====================================================
 * 文件名称: EquipDetectServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.AntiFallDetectionDao;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.Accident;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.AntiFallDetection;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.AntiFallDetectionService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipDetectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:18:42
 */
public class AntiFallDetectionServiceImpl extends BaseBusinessModelServiceImpl<AntiFallDetection> implements AntiFallDetectionService {


	private AntiFallDetectionDao antiFallDetectionDao;


	public AntiFallDetectionServiceImpl(AntiFallDetectionDao dao) {
		super(dao);
		this.antiFallDetectionDao = dao;
	}

	public List<AntiFallDetection> queryTranslateAllFull(QueryFilter filter) {
		List<AntiFallDetection> list = antiFallDetectionDao.getAll(filter);
		for (AntiFallDetection r : list) {
			CodeServiceImpl.translate(r, getPersistantStruct());
		}
		return list;
	}

	public AntiFallDetection getTranslateFull(Long AntiFallDetectionId) {
		AntiFallDetection r = antiFallDetectionDao.get(AntiFallDetectionId);
		CodeServiceImpl.translate(r, getPersistantStruct());
		return r;
	}

	public void delete(Long AntiFallDetectionId) {
		AntiFallDetection r = antiFallDetectionDao.get(AntiFallDetectionId);
		antiFallDetectionDao.remove(r);
	}

	@Override
	public void saveOrUpdate(AntiFallDetection antiFallDetection) {
		antiFallDetectionDao.save(antiFallDetection);
		
	}

	@Override
	public void saveSerialModel(AntiFallDetection antiFallDetection) {
		antiFallDetectionDao.save(antiFallDetection);
		
	}

}
