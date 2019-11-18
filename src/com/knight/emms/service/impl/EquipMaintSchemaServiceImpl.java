/**
 *====================================================
 * 文件名称: EquipMaintSchemaServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;

import javax.annotation.Resource;

import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipMaintDao;
import com.knight.emms.dao.EquipMaintSchemaDao;
import com.knight.emms.dao.VerifyStandardDao;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipMaint;
import com.knight.emms.model.EquipMaintSchema;
import com.knight.emms.model.VerifyStandard;
import com.knight.emms.service.EquipMaintSchemaService;
import com.knight.emms.support.SchemaSupport;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: EquipMaintSchemaServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:02:24
 */
public class EquipMaintSchemaServiceImpl extends BusinessLongPKServiceImpl<EquipMaintSchema> implements EquipMaintSchemaService {

	private EquipMaintSchemaDao equipMaintSchemaDao;

	@Resource
	private EquipMaintDao equipMaintDao;

	@Resource
	private EquipFlowDao equipFlowDao;

	@Resource
	private VerifyStandardDao verifyStandardDao;

	public EquipMaintSchemaServiceImpl(EquipMaintSchemaDao dao) {
		super(dao);
		this.equipMaintSchemaDao = dao;
	}

	public void saveOrUpdate(EquipMaintSchema equipMaintSchema) {
		if (equipMaintSchema.getMaintSchemaId() == null) {
			equipMaintSchemaDao.save(equipMaintSchema);
		} else {
			equipMaintSchemaDao.merge(equipMaintSchema);
		}	
		/*	EquipFlow equipFlow = equipFlowDao.get(equipMaintSchema.getFlowId());
		equipFlow.setEmployMaintSchemaId(equipMaintSchema.getMaintSchemaId());
		equipFlowDao.save(equipFlow);*/


		equipMaintSchema.setSubEquipMaint();
		for (VerifyStandard s : equipMaintSchema.getMaintSchemaStandardSet()) {
			if (s.getStandardId() == null) {
				verifyStandardDao.save(s);
			} else {
				verifyStandardDao.merge(s);
			}
		}
	}

	public void createWaitEquipMaint(EquipMaintSchema schema) {
		SchemaSupport.caculateCurrentExeSchemaTimes(schema);
		EquipMaint maint = new EquipMaint();
		maint.setRepairStatus(Constant.DISENABLED);
		maint.setEquipMaintSchema(schema);
		maint.setCycleTimes(schema.getCycleTimes());
		maint.setThisEndCycleDate(schema.getThisEndCycleDate());
		maint.setStatus(Status.HandleResult.untreated);
		equipMaintDao.saveSerialModel(maint);
		SchemaSupport.caculateSchemaNextDate(schema);
		if (schema.getNextFormTime().getTime() <= DateUtil.setEndDay(new Date()).getTime()) {
			this.createWaitEquipMaint(schema);
		}

	}

}
