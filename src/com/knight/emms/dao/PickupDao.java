/**
 *====================================================
 * 文件名称: PickupDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao;

import java.util.List;
import java.util.Map;

import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.model.Pickup;

/**
 * @ClassName: PickupDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 上午8:33:51
 */
public interface PickupDao extends BaseBusinessModelDao<Pickup> {

	public List<Map<String, Object>> queryExistPickup(Pickup pickup);

}
