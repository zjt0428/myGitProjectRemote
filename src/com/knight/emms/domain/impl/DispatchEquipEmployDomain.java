/**
 *====================================================
 * 文件名称: DispatchEquipEmployDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import java.util.Date;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.VetFlowMethod;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.dao.EquipEmployDao;
import com.knight.emms.dao.PractiDiaryDao;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.domain.DispatchRelationValidate;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.DispatchPracti;
import com.knight.emms.model.EquipEmploy;
import com.knight.emms.model.PractiDiary;
import com.knight.emms.support.ComponDiarySupport;
import com.knight.emms.support.PractiDiarySupport;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: DispatchEquipEmployDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午6:57:31
 */
public class DispatchEquipEmployDomain extends DispatchRelationValidate implements DispatchRelateDomain {

	@Resource
	private EquipEmployDao equipEmployDao;

	@Resource
	private PractitionerDao practitionerDao;

	@Resource
	private ComponDiaryDao componDiaryDao;

	@Resource
	private PractiDiaryDao practiDiaryDao;

	public void submitDispatchRelate(Dispatch dispatch) {
		EquipEmploy ee = equipEmployDao.get(dispatch.getRelateId());
		if (!Status.EquipFlowApplyfor.waitDispatch.equals(ee.getApplyforState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联使用【" + ee.getEmploySerial() + "】状态不合法,无法提交!");
		}
	}

	public void passDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		EquipEmploy ee = equipEmployDao.get(dispatch.getRelateId());
		if (!Status.EquipFlowApplyfor.waitDispatch.equals(ee.getApplyforState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联使用【" + ee.getEmploySerial() + "】状态不合法,无法提交!");
		}
		if (Status.EquipFlow.dismantling.equals(ee.getEquipFlow().getFlowState()) || Status.EquipFlow.dismantled.equals(ee.getEquipFlow().getFlowState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联使用【" + ee.getEmploySerial() + "】已经进行【拆卸】,无法再执行使用调度操作!");
		}
		super.validateDispatchResource("使用", dispatch, vetFlowMethod);

		Date currentTime = new Date();
		Set<DispatchCompon> dispatchComponSet = dispatch.getDispatchComponSet();
		Set<DispatchPracti> dispatchPractiSet = dispatch.getDispatchPractiSet();
		for (DispatchCompon c : dispatchComponSet) {
			Component compon = componentDao.get(c.getComponId());
			if (Constant.ENABLED.equals(compon.getConsumeFlag())) {
				if (compon.getConsumeCounts() <= c.getCounts()) {
					compon.setStatus(Status.EquipCompon.unused);
				}
				compon.setConsumeCounts(compon.getConsumeCounts() - c.getCounts());
			} else {
				compon.setStatus(Status.EquipCompon.inused);
				compon.setStatusDate(currentTime);
			}
			componentDao.save(compon);

			ComponDiary cd = new ComponDiary();
			ComponDiarySupport.setFlowComponDiary(cd, ee, c);
			cd.setStartDate(currentTime);
			cd.setEndDate(SQLServerDialect.MAX_DATE);
			cd.setStatus(Status.EquipComponStore.delivering);
			cd.setActive(Constant.ENABLED);
			componDiaryDao.save(cd);
			componentDeliver(cd);
		}
		// 零配件业务流转设置(零配件前业务日历结束时间更新)
		componDiaryService.overPreInstallEmployDismantle(ee.getEmployId(), SystemConstant.MODULE_EQUIP_EMPLOY, currentTime);

		for (DispatchPracti c : dispatchPractiSet) {
			PractiDiary pd = new PractiDiary();
			PractiDiarySupport.setFlowPractiDiary(pd, ee, c);
			pd.setStartDate(currentTime);
			pd.setEndDate(ee.getEndPlanDate());
			pd.setActive(Constant.ENABLED);
			practiDiaryDao.save(pd);

			// 生成人员从业记录
			practiResumeService.save(PractiDiarySupport.createResume(pd, ee.getEquipFlow()));
		}
		ee.setApplyforState(Status.EquipFlowApplyfor.passed);
		ee.setRemark("使用调度【" + dispatch.getDispatchSerial() + "】审批通过\r\n" + (ee.getRemark() == null ? "" : ee.getRemark()));
		equipEmployDao.save(ee);
	}

	public void rejectDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		EquipEmploy ei = equipEmployDao.get(dispatch.getRelateId());
		ei.setApplyforState(Status.EquipFlowApplyfor.passed);
		ei.setRemark("使用调度【" + dispatch.getDispatchSerial() + "】审批未通过\r\n" + (ei.getRemark() == null ? "" : ei.getRemark()));
		equipEmployDao.save(ei);
	}

}
