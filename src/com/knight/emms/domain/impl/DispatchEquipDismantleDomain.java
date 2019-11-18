/**
 *====================================================
 * 文件名称: DispatchEquipDismantleDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import java.util.Date;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.VetFlowMethod;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.dao.EquipDismantleDao;
import com.knight.emms.dao.PractiDiaryDao;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.domain.DispatchRelationValidate;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.DispatchPracti;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.PractiDiary;
import com.knight.emms.support.ComponDiarySupport;
import com.knight.emms.support.PractiDiarySupport;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: DispatchEquipDismantleDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午6:57:31
 */
public class DispatchEquipDismantleDomain extends DispatchRelationValidate implements DispatchRelateDomain {

	@Resource
	private EquipDismantleDao equipDismantleDao;

	@Resource
	private PractitionerDao practitionerDao;

	@Resource
	private ComponDiaryDao componDiaryDao;

	@Resource
	private PractiDiaryDao practiDiaryDao;

	public void submitDispatchRelate(Dispatch dispatch) {
		EquipDismantle ed = equipDismantleDao.get(dispatch.getRelateId());
		if (!Status.EquipFlowApplyfor.waitDispatch.equals(ed.getApplyforState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联拆卸【" + ed.getDismantleSerial() + "】状态不合法,无法提交!");
		}
	}

	public void passDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		Date currentTime = new Date();
		EquipDismantle ed = equipDismantleDao.get(dispatch.getRelateId());
		if (!Status.EquipFlowApplyfor.waitDispatch.equals(ed.getApplyforState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联拆卸【" + ed.getDismantleSerial() + "】状态不合法,无法提交!");
		}
		if (currentTime.getTime() > ed.getEnddisDate().getTime()) {
			String enddisDate = DateUtil.changeDateToStr(ed.getEnddisDate(), DateUtil.LINK_DISPLAY_DATE);
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】所关联拆卸【" + ed.getDismantleSerial() + "】已经于【" + enddisDate + "】拆卸结束,无法进行拆卸调度操作!");
		}
		super.validateDispatchResource("拆卸", dispatch, vetFlowMethod);

		for (DispatchCompon c : dispatch.getDispatchComponSet()) {
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
			ComponDiarySupport.setFlowComponDiary(cd, ed, c);
			cd.setStartDate(currentTime);
			cd.setEndDate(ed.getEnddisDate());
			cd.setStatus(Status.EquipComponStore.delivering);
			cd.setActive(Constant.ENABLED);
			componDiaryDao.save(cd);
			componentDeliver(cd);
		}
		// 零配件业务流转设置(零配件前业务日历结束时间更新)
		componDiaryService.overPreInstallEmployDismantle(ed.getDismantleId(), SystemConstant.MODULE_EQUIP_DISMANTLE, currentTime);

		for (DispatchPracti c : dispatch.getDispatchPractiSet()) {
			PractiDiary pd = new PractiDiary();
			PractiDiarySupport.setFlowPractiDiary(pd, ed, c);
			pd.setStartDate(currentTime);
			pd.setEndDate(ed.getEnddisDate());
			pd.setActive(Constant.ENABLED);
			practiDiaryDao.save(pd);

			// 生成人员从业记录
			practiResumeService.save(PractiDiarySupport.createResume(pd, ed.getEquipFlow()));
		}
		ed.setApplyforState(Status.EquipFlowApplyfor.passed);
		ed.setRemark("拆卸调度【" + dispatch.getDispatchSerial() + "】审批通过\r\n" + (ed.getRemark() == null ? "" : ed.getRemark()));
		equipDismantleDao.save(ed);
	}

	public void rejectDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		EquipDismantle ed = equipDismantleDao.get(dispatch.getRelateId());
		ed.setApplyforState(Status.EquipFlowApplyfor.passed);
		ed.setRemark("拆卸调度【" + dispatch.getDispatchSerial() + "】审批未通过\r\n" + (ed.getRemark() == null ? "" : ed.getRemark()));
		equipDismantleDao.save(ed);
	}

}
