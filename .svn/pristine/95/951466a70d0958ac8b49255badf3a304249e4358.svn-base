/**
 *====================================================
 * 文件名称: DispatchRelationValidate.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.exception.BusinessWarningException;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Type;
import com.knight.emms.core.VetFlowMethod;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.DispatchDao;
import com.knight.emms.dao.StoreComponStockDao;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.StoreComponStock;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.service.PractiResumeService;

/**
 * @ClassName: DispatchRelationValidate
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-5 下午9:01:07
 */
public abstract class DispatchRelationValidate {

	@Resource
	protected StoreComponStockDao storeComponStockDao;

	@Resource
	protected DispatchDao dispatchDao;

	@Resource
	protected ComponentDao componentDao;

	@Resource
	protected PractiResumeService practiResumeService;

	@Resource
	protected ComponDiaryService componDiaryService;

	private void repeatResource(String businessName, Dispatch dispatch) {
		List<Map<String, Object>> repeatList = dispatchDao.queryByScript("dispatch.dispatch_diary_componpracti_repeat", dispatch.getRelateId(), dispatch.getRelateModule(), dispatch.getDispatchId());
		if (!repeatList.isEmpty()) {
			StringBuffer sb = new StringBuffer("注意,以下人员/配件在").append(businessName).append("中重复调配:</br>");
			for (Map<String, Object> uce : repeatList) {
				sb.append(uce.get("RESOURCE_NAME")).append("|");
			}
			sb.deleteCharAt(sb.length() - 1);
			throw new BusinessException(sb.toString());
		}
	}

	private void inusedComponEquip(Dispatch dispatch, final VetFlowMethod vetFlowMethod) {
		if (!vetFlowMethod.isVetWarning()) {
			return;
		}
		List<Map<String, Object>> usedComponEquipList = dispatchDao.queryByScript("dispatch.dispatch_diary_componequip_inused", dispatch.getDispatchId());
		if (usedComponEquipList.isEmpty()) {
			return;
		}
		StringBuffer sb = new StringBuffer("注意,以下编号设备（零部件）在计划时间中正被使用:</br>");
		for (Map<String, Object> uce : usedComponEquipList) {
			sb.append(uce.get("PRODUCT_SERIAL")).append("-").append(uce.get("RELATE_SERIAL")).append("|");
		}
		sb.deleteCharAt(sb.length() - 1);
		throw new BusinessWarningException(sb.toString());
	}

	/** 检查重复调配资源 */
	protected void validateDispatchResource(String businessName, Dispatch dispatch, final VetFlowMethod vetFlowMethod) {
		repeatResource(businessName, dispatch);
		inusedComponEquip(dispatch, vetFlowMethod);
	}

	/** 配件出库 */
	protected void componentDeliver(ComponDiary diary) {
		StoreComponStock stock = new StoreComponStock();
		stock.setStoreId(diary.getStoreId());
		stock.setComponId(diary.getComponId());
		stock.setProjectId(diary.getProjectId());
		stock.setCounts(diary.getCounts());
		stock.setBoundDate(DateUtil.getCurrentLinkDateStr());
		stock.setStockType(Type.OutInStock.out);
		storeComponStockDao.save(stock);
	}

}
