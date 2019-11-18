/**
 *====================================================
 * 文件名称: EquipInspectDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.model.EquipInspect;

/**
 * @ClassName: EquipInspectDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:21:25
 */
public interface EquipInspectDao extends BaseBusinessModelDao<EquipInspect> {

	/** 查询待巡检单 */
	public List<EquipInspect> queryWaitInspect(QueryFilter filter, String keyword);

}
