/**
 *====================================================
 * 文件名称: EquipDismantleDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.MaterialsRepairDao;
import com.knight.emms.model.MaterialsRepair;

/**
 * @ClassName: EquipDismantleDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:24:17
 */
public class MaterialsRepairDaoImpl extends BaseBusinessModelDaoImpl<MaterialsRepair> implements MaterialsRepairDao {

//	public EquipDismantle getLateastDismantle(Long equipId) {
//		String hql = "from EquipDismantle ed where ed.applyforState = ? and ed.delFlag = ? and ed.equipId = ? order by ed.providedDate desc";
//		List<EquipDismantle> list = findOtherByHql(hql, new Object[] { Status.EquipFlowApplyfor.passed, Constant.ENABLED, equipId }, 0, 1);
//		if (!list.isEmpty()) {
//			return list.get(0);
//		}
//		return null;
//	}
}
