/**
 *====================================================
 * 文件名称: ComponDiarySupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: ComponDiarySupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-20 上午8:31:58
 */
public class ComponDiarySupport {

	public static void setDiaryBase(ComponDiary diary, Component compon) {
		diary.setComponId(compon.getComponId());
		diary.setComponSerial(compon.getComponSerial());
		diary.setComponCategory(compon.getComponCategory());
		diary.setComponGeneric(compon.getComponGeneric());
		diary.setComponSpecific(compon.getComponSpecific());
		diary.setEquipVender(compon.getEquipVender());
		diary.setDimensions(compon.getDimensions());
		diary.setCalculate(compon.getCalculate());
		diary.setRfidCode(compon.getRfidCode());
		diary.setConsumeFlag(compon.getConsumeFlag());
		diary.setParachuteFlag(compon.getParachuteFlag());
		diary.setKnotFlag(compon.getKnotFlag());
		diary.setWallAttacheFlag(compon.getWallAttacheFlag());
		diary.setKnotMetric(compon.getKnotMetric());
		diary.setBrachium(compon.getBrachium());
		diary.setStoreId(compon.getStoreId());
	}

	public static void setFlowComponDiary(ComponDiary diary, DiaryRelationMethod relation, DispatchCompon dispatchCompon) {
		setDiaryBase(diary, dispatchCompon.getComponent());
		EquipDiary ed = relation.getEquipFlow().getEquipDiary();
		diary.setProjectId(ed.getProjectId());
		diary.setProjectSerial(ed.getProjectSerial());
		diary.setProjectName(ed.getProjectName());
		diary.setAddress(ed.getAddress());
		diary.setContractId(ed.getContractId());
		diary.setFlowId(relation.getEquipFlow().getFlowId());

		Dispatch dispatch = relation.getEquipFlow().getDispatch();
		diary.setBusinessId(dispatch.getDispatchId());
		diary.setBusinessSerial(dispatch.getDispatchSerial());
		diary.setBusinessTheme(dispatch.getDispatchTheme());
		diary.setBusinessModule(SystemConstant.MODULE_DISPATCH);
		diary.setBusinessComponId(dispatchCompon.getDispatchComponId());
		diary.setRecordId(ed.getRecordId());
		diary.setDispatchUserName(relation.getUserName());
		if (diary.getCounts() == null) {
			diary.setCounts(dispatchCompon.getCounts());
		}
		diary.setWarehouseCounts(0);
		diary.setBacksportCounts(0);
		diary.setBacksportStatus(Status.Backsport.wait);
		diary.setStatus(Status.EquipComponStore.deliver);

		diary.setRelateId(relation.getDiaryRelateId());
		diary.setRelateSerial(relation.getDiaryRelateSerial());
		diary.setRelateTheme(relation.getDiaryRelateTheme());
		diary.setRelateModule(relation.getDiaryRelateModule());

		diary.setEndDate(SQLServerDialect.MAX_DATE);
		diary.setActive(Constant.DISENABLED);
		diary.setJackingStauts(Status.JackingStauts.wait);
		diary.setJjStauts(Status.JackingStauts.install);
		if(relation instanceof EquipInstall){
			diary.setJjUserName(((EquipInstall)relation).getPartake());
		}		
		diary.setDismantleStauts(Status.DismantleStauts.wait);
		diary.setJackingCounts(0);
		diary.setDismantleCounts(0);
	}

}
