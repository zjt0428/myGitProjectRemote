/**
 *====================================================
 * 文件名称: PractiDiarySupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import com.knight.emms.constant.Constant;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchPracti;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.PractiDiary;
import com.knight.emms.model.PractiResume;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: PractiDiarySupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午5:12:58
 */
public class PractiDiarySupport {

	public static void setDiaryBase(PractiDiary diary, Practitioner practi) {
		diary.setPractiId(practi.getPractiId());
		diary.setPractiName(practi.getPractiName());
		diary.setKindWork(practi.getKindWork());
		diary.setMobile(practi.getMobile());
		diary.setStation(practi.getStation());
		diary.setCorpId(practi.getCorpId());
		diary.setCorpName(practi.getCorpInfo().getCorpName());
		diary.setDepId(practi.getDepartment().getDepId());
		diary.setDepName(practi.getDepartment().getDepName());
	}

	public static void setFlowPractiDiary(PractiDiary diary, DiaryRelationMethod relation, DispatchPracti dispatchPracti) {
		setDiaryBase(diary, dispatchPracti.getPractitioner());
		EquipDiary ed = relation.getEquipFlow().getEquipDiary();
		diary.setProjectId(ed.getProjectId());
		diary.setProjectSerial(ed.getProjectSerial());
		diary.setProjectName(ed.getProjectName());
		diary.setContractId(ed.getContractId());
		diary.setFlowId(relation.getEquipFlow().getFlowId());

		Dispatch dispatch = relation.getEquipFlow().getDispatch();
		diary.setBusinessId(dispatch.getDispatchId());
		diary.setBusinessSerial(dispatch.getDispatchSerial());
		diary.setBusinessTheme(dispatch.getDispatchTheme());
		diary.setBusinessModule(SystemConstant.MODULE_DISPATCH);
		diary.setBusinessPractiId(dispatchPracti.getDispatchPractiId());

		diary.setRelateId(relation.getDiaryRelateId());
		diary.setRelateSerial(relation.getDiaryRelateSerial());
		diary.setRelateTheme(relation.getDiaryRelateTheme());
		diary.setRelateModule(relation.getDiaryRelateModule());

		diary.setActive(Constant.DISENABLED);
	}

	public static PractiResume createResume(PractiDiary diary, EquipFlow equipFlow) {
		PractiResume resume = new PractiResume();
		resume.setPractiDiaryId(diary.getPractiDiaryId());
		resume.setPractiId(diary.getPractiId());
		resume.setPractiKindwork(diary.getKindWork());
		resume.setPractiName(diary.getPractiName());
		resume.setStartDate(diary.getStartDate());
		resume.setEndDate(diary.getEndDate());

		resume.setEquipId(equipFlow.getEquipment().getEquipId());
		resume.setRecordId(equipFlow.getEquipment().getRecordId());
		resume.setProjectId(equipFlow.getEquipDiary().getProjectId());
		resume.setProjectName(equipFlow.getEquipDiary().getProjectName());
		resume.setDelFlag(Constant.ENABLED);
		return resume;
	}

}
