/**
 *====================================================
 * 文件名称: EquipVerifyDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.EquipVerifyDao;
import com.knight.emms.model.EquipVerify;

/**
 * @ClassName: EquipVerifyDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:26:03
 */
public class EquipVerifyDaoImpl  extends BaseBusinessModelDaoImpl<EquipVerify> implements EquipVerifyDao {

	public List<EquipVerify> getVerifyBySerial(EquipVerify equipVerify) {
		String hql = "from EquipVerify d where d.verifySerial = ? and d.delFlag = '1'";
		return findByHql(hql, new Object[] { equipVerify.getVerifySerial() });
	}

}
