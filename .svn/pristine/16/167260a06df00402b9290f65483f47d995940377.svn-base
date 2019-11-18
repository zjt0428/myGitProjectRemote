/**
 *====================================================
 * 文件名称: DispatchEquipInstallDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.VetFlowMethod;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.dao.EquipInstallDao;
import com.knight.emms.dao.PractiDiaryDao;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.domain.DispatchRelationValidate;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.DispatchPracti;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.PractiDiary;
import com.knight.emms.support.ComponDiarySupport;
import com.knight.emms.support.PractiDiarySupport;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: DispatchEquipInstallDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午6:57:31
 */
public class DispatchEquipInstallDomain extends DispatchRelationValidate implements DispatchRelateDomain {

	@Resource
	private EquipInstallDao equipInstallDao;

	@Resource
	private PractitionerDao practitionerDao;

	@Resource
	private ComponDiaryDao componDiaryDao;

	@Resource
	private PractiDiaryDao practiDiaryDao;

	public void submitDispatchRelate(Dispatch dispatch) {
		EquipInstall ei = equipInstallDao.get(dispatch.getRelateId());
		if (!Status.EquipFlowApplyfor.waitDispatch.equals(ei.getApplyforState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联安装【" + ei.getInstallSerial() + "】状态不合法,无法提交!");
		}
	}

	public void passDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		EquipInstall ei = equipInstallDao.get(dispatch.getRelateId());
		if (!Status.EquipFlowApplyfor.waitDispatch.equals(ei.getApplyforState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联安装【" + ei.getInstallSerial() + "】状态不合法,无法提交!");
		}
		if (Status.EquipFlow.employing.equals(ei.getEquipFlow().getFlowState()) || Status.EquipFlow.employed.equals(ei.getEquipFlow().getFlowState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联安装【" + ei.getInstallSerial() + "】已经进行【使用】,无法再执行安装调度操作!");
		}
		if (Status.EquipFlow.dismantling.equals(ei.getEquipFlow().getFlowState()) || Status.EquipFlow.dismantled.equals(ei.getEquipFlow().getFlowState())) {
			throw new BusinessException("调度方案【" + dispatch.getDispatchSerial() + "】关联安装【" + ei.getInstallSerial() + "】已经进行【拆卸】,无法再执行安装调度操作!");
		}
		super.validateDispatchResource("安装", dispatch, vetFlowMethod);

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
			if (compon.getKnotMetric() != null) {
				ei.setInstallHeight(ei.getInstallHeight().add(compon.getKnotMetric().multiply(new BigDecimal(c.getCounts()))));
				ei.setKnotCounts(ei.getKnotCounts() + c.getCounts());
			}
			if (compon.getBrachium() != null) {
				ei.setBrachium(ei.getBrachium().add(compon.getBrachium().multiply(new BigDecimal(c.getCounts()))));
			}

			ComponDiary cd = new ComponDiary();
			ComponDiarySupport.setFlowComponDiary(cd, ei, c);
			cd.setStartDate(currentTime);
			cd.setEndDate(SQLServerDialect.MAX_DATE);
			cd.setStatus(Status.EquipComponStore.delivering);
			cd.setActive(Constant.ENABLED);
			componDiaryDao.save(cd);
			componentDeliver(cd);
		}
		// 零配件业务流转设置(零配件前业务日历结束时间更新)
		componDiaryService.overPreInstallEmployDismantle(ei.getInstallId(), SystemConstant.MODULE_EQUIP_INSTALL, currentTime);

		for (DispatchPracti c : dispatchPractiSet) {
			PractiDiary pd = new PractiDiary();
			PractiDiarySupport.setFlowPractiDiary(pd, ei, c);
			pd.setStartDate(currentTime);
			pd.setEndDate(ei.getEndinDate());
			pd.setActive(Constant.ENABLED);
			practiDiaryDao.save(pd);

			// 生成人员从业记录
			practiResumeService.save(PractiDiarySupport.createResume(pd, ei.getEquipFlow()));
		}
		ei.setApplyforState(Status.EquipFlowApplyfor.passed);
		ei.setRemark("安装调度【" + dispatch.getDispatchSerial() + "】审批通过\r\n" + (ei.getRemark() == null ? "" : ei.getRemark()));
		equipInstallDao.save(ei);
	}

	public void rejectDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		EquipInstall ei = equipInstallDao.get(dispatch.getRelateId());
		ei.setApplyforState(Status.EquipFlowApplyfor.passed);
		ei.setRemark("安装调度【" + dispatch.getDispatchSerial() + "】审批未通过\r\n" + (ei.getRemark() == null ? "" : ei.getRemark()));
		equipInstallDao.save(ei);
	}

}
