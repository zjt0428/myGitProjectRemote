/**
 *====================================================
 * 文件名称: EquipDetectDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.EquipDetectDao;
import com.knight.emms.model.EquipDetect;

/**
 * @ClassName: EquipDetectDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:17:36
 */
public class EquipDetectDaoImpl extends BaseLongPKDaoImpl<EquipDetect> implements EquipDetectDao {

	public List<EquipDetect> getDetectBySerial(EquipDetect equipDetect) {
		String hql = "from EquipDetect d where d.detectSerial = ? and d.delFlag = '1'";
		return findByHql(hql, new Object[] { equipDetect.getDetectSerial() });
	}

}
