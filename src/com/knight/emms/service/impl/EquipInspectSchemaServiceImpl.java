/**
 *====================================================
 * 文件名称: EquipInspectSchemaServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.core.exception.BusinessException;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipInspectDao;
import com.knight.emms.dao.EquipInspectSchemaDao;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.EquipInspectSchema;
import com.knight.emms.service.EquipInspectSchemaService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;

/**
 * @ClassName: EquipInspectSchemaServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:01:54
 */
public class EquipInspectSchemaServiceImpl extends BusinessLongPKServiceImpl<EquipInspectSchema> implements EquipInspectSchemaService {

	private EquipInspectSchemaDao equipInspectSchemaDao;

	@Resource
	private EquipInspectDao equipInspectDao;

	@Resource
	private EquipFlowDao equipFlowDao;

	public EquipInspectSchemaServiceImpl(EquipInspectSchemaDao dao) {
		super(dao);
		this.equipInspectSchemaDao = dao;
	}

	public void saveOrUpdate(EquipInspectSchema equipInspectSchema) {
		if (equipInspectSchema.getInspectSchemaId() == null) {
			equipInspectSchemaDao.save(equipInspectSchema);
		} else {
			equipInspectSchemaDao.merge(equipInspectSchema);
		}
		EquipFlow equipFlow = equipFlowDao.get(equipInspectSchema.getFlowId());
		equipFlow.setEmployInspectSchemaId(equipInspectSchema.getInspectSchemaId());
		equipFlowDao.save(equipFlow);
	}

	@Override
	public void caculateSchemaDate(EquipInspectSchema schema, String generatedOpportunity, Date dateTime ) {
		Integer count = Integer.valueOf(schema.getGeneratedCycle());		//生成频率：单月，双月，季度
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dateTime);
		if(Constant.GENERATE_NOW.equals(generatedOpportunity)) {			//立即生成
			if(schema.getCycleActivateDate()==null) {
				schema.setCycleActivateDate(DateUtil.setBeginDayOfMonth(calendar));		//计划开始时间 (如果是立即生成则为本月 1 号，否则为次月 1 号)
			}
			schema.setThisStartCycleDate(DateUtil.setStartDay(DateUtil.getCurrentDate()));		
			calendar.add(Calendar.MONTH, count-1);
			schema.setThisEndCycleDate(DateUtil.setStartDay(DateUtil.setLastDayOfMonth(calendar)));
			calendar.add(Calendar.MONTH, 1);
			schema.setNextFormTime(DateUtil.setBeginDayOfMonth(calendar));
		}else if(Constant.GENERATE_NEXT_MONTH.equals(generatedOpportunity)) {		//次月生成
			calendar.add(Calendar.MONTH, 1);
			if(schema.getCycleActivateDate()==null) {
				schema.setCycleActivateDate(DateUtil.setBeginDayOfMonth(calendar));		//计划开始时间
			}
			schema.setThisStartCycleDate(DateUtil.setBeginDayOfMonth(calendar));
			schema.setNextFormTime(DateUtil.setBeginDayOfMonth(calendar));
			calendar.add(Calendar.MONTH, count-1);
			schema.setThisEndCycleDate(DateUtil.setStartDay(DateUtil.setLastDayOfMonth(calendar)));
		}else {
			logger.warn("EquipInspectSchema   ID:" +schema.getInspectSchemaId());
			throw new BusinessException("巡检计划生成异常");
		}
		schema.setNextStartCycleDate(schema.getNextFormTime());
	}
	
	public void createWaitEquipInspect(EquipInspectSchema schema) {
		/*SchemaSupport.caculateCurrentExeSchemaTimes(schema);
		EquipInspect inspect = new EquipInspect();
		inspect.setRepairStatus(Constant.DISENABLED);
		inspect.setEquipInspectSchema(schema);
		inspect.setCycleTimes(schema.getCycleTimes());
		inspect.setThisEndCycleDate(schema.getThisEndCycleDate());
		inspect.setStatus(Status.HandleResult.untreated);
		equipInspectDao.saveSerialModel(inspect);
		SchemaSupport.caculateSchemaNextDate(schema);
		if (schema.getNextFormTime().getTime() <= DateUtil.setEndDay(new Date()).getTime()) {
			this.createWaitEquipInspect(schema);
		}*/
		if(schema.getTimesInCycle()!=null && schema.getTimesInCycle()>0) {
			for(int i=0; i<schema.getTimesInCycle(); i++) {
				EquipInspect inspect = new EquipInspect();
				inspect.setRepairStatus(Constant.DISENABLED);
				inspect.setStatus(Status.HandleResult.untreated);
				inspect.setSealStatus(Constant.DISENABLED);
				inspect.setEquipInspectSchema(schema);
				inspect.setCycleTimes(i+1);
				inspect.setThisEndCycleDate(schema.getThisEndCycleDate());
				equipInspectDao.saveSerialModel(inspect);
			}
			caculateSchemaDate(schema, Constant.GENERATE_NEXT_MONTH, schema.getThisEndCycleDate());
		}
	}

}
