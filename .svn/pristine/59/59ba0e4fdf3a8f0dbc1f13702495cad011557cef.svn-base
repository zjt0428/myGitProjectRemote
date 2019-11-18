/**
 *====================================================
 * 文件名称: EquipHitchServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.EquipHitchDao;
import com.knight.emms.model.EquipHitch;
import com.knight.emms.model.FormApprove;
import com.knight.emms.service.EquipHitchService;

/**
 * @ClassName: EquipHitchServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:01:20
 */
public class EquipHitchServiceImpl extends BusinessFlowServiceImpl<EquipHitch> implements EquipHitchService {

	private EquipHitchDao equipHitchDao;

	public EquipHitchServiceImpl(EquipHitchDao dao) {
		super(dao);
		this.equipHitchDao = dao;
	}

	public void createRelateHitch(Long relateId, String relateSerial, String relateModule, Long projectId, Long equipId, String spendDate, String hitchResult, String description, String location, String content) {
		EquipHitch hitch = new EquipHitch();
		hitch.setRelateId(relateId);
		hitch.setRelateSerial(relateSerial);
		hitch.setRelateModule(relateModule);
		hitch.setProjectId(projectId);
		hitch.setEquipId(equipId);
		hitch.setSpendDate(spendDate);
		hitch.setHitchResult(hitchResult);
		hitch.setDescription(description);
		hitch.setLocation(location);
		hitch.setContent(content);
		hitch.setStatus(Status.HandleResult.untreated);
		hitch.setApplyforState(Status.Applyfor.waitSubmit);
		equipHitchDao.saveSerialModel(hitch);
	}

	public void saveOrMergeForEdit(EquipHitch equipHitch) {
		if (equipHitch.getHitchId() == null) {
			equipHitchDao.save(equipHitch);
		} else {
			equipHitchDao.merge(equipHitch);
		}
	}

	protected EquipHitch passFlowApproveApplication(FormApprove formApprove) {
		EquipHitch t = super.passFlowApproveApplication(formApprove);
		t.setStatus(Status.HandleResult.processed);
		return t;
	}

}
