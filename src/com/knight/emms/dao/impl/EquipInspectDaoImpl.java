/**
 *====================================================
 * 文件名称: EquipInspectDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import org.apache.commons.lang.xwork.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.EquipInspectDao;
import com.knight.emms.model.EquipInspect;

/**
 * @ClassName: EquipInspectDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:24:54
 */
public class EquipInspectDaoImpl extends BaseBusinessModelDaoImpl<EquipInspect> implements EquipInspectDao {

	@Override
	public List<EquipInspect> queryWaitInspect(QueryFilter filter, String keyword) {
		String hql = "from EquipInspect t where t.status = ? and (t.equipInspectSchema.equipDiary.projectName like ? or t.equipInspectSchema.equipDiary.recordId like ? or t.equipInspectSchema.equipDiary.exwSerial like ?)";
		keyword = "%" + (StringUtils.isNotBlank(keyword) ? keyword : "") + "%";
		Object[] params = new Object[4];
		params[0] = Status.HandleResult.untreated;
		params[1] = keyword;
		params[2] = keyword;
		params[3] = keyword;
		filter.getPagingBean().setTotalItems(super.getTotalItems(hql,params).intValue());
		return super.find(hql, params, filter.getPagingBean().getFirstResult(), filter.getPagingBean().getPageSize());
	}

}
