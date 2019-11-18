/**
 *====================================================
 * 文件名称: MemoServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.service.impl;

import javax.annotation.Resource;

import com.knight.app.dao.TAppRepairDao;
import com.knight.app.model.TAppRepair;
import com.knight.app.model.TAppRepairCompon;
import com.knight.app.service.TAppRepairService;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.ProjectService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class TAppRepairServiceImpl  extends BusinessLongPKServiceImpl<TAppRepair> implements TAppRepairService {

	private TAppRepairDao tappRepairDao;
	private TAppRepairComponServiceImpl tappRepairComponServiceImpl;
	@Resource
	private ProjectService projectService;
	@Resource
	private EquipmentService equipService;
	@Resource
	private EquipFlowDao equipFlowDao;
	
	public TAppRepairServiceImpl(TAppRepairDao dao) {
		super(dao);
		this.tappRepairDao = dao;
	}

	public void saveOrUpdate(TAppRepair tappRepair) {
		if (tappRepair.getRepid() == null) {
			
			tappRepairDao.save(tappRepair);
		}else{
			tappRepairDao.merge(tappRepair);
		}
	}

	@Override
	public void delete(Long repId) {
		TAppRepair t =tappRepairDao.get(repId);
		for(TAppRepairCompon p : t.getRepairComponSet()){
			tappRepairComponServiceImpl.remove(p);;
		}
		tappRepairDao.remove(t);	
	}
	
	public void saveCreate(TAppRepair tAppRepair) {
		tappRepairDao.save(tAppRepair);
	}

	@Override
	public void createRepair(Long flowId) {
		if(flowId != null) {
			TAppRepair repair = new TAppRepair();
			EquipFlow ef = equipFlowDao.get(flowId);
			EquipDiary ed = ef.getEquipDiary();
			CodeServiceImpl.translate(ed);
			repair.setEquipSpec(ed.getEquipSpecificName());
			repair.setRecordId(ed.getRecordId());
			repair.setExwSerial(ed.getExwSerial());
			repair.setBuildingNum(ed.getBuildingNum());
			repair.setEquipId(ef.getEquipId());
			repair.setProjectId(ed.getProjectId());
			repair.setProjName(ed.getProjectName());
			repair.setState(Status.smRepair.deal);
			tappRepairDao.save(repair);
		}
	}
}
