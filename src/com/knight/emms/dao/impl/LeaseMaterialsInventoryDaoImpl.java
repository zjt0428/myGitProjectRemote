/**
 *====================================================
 * 文件名称: LeaseMaterialsInventoryDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月15日		chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.LeaseMaterialsInventoryDao;
import com.knight.emms.model.LeaseMaterialsInventory;

/**
 * @ClassName: LeaseMaterialsInventoryDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017年8月15日 下午5:12:52
 */
@Repository("leaseMaterialsInventoryDao")
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class LeaseMaterialsInventoryDaoImpl extends BaseLongPKDaoImpl<LeaseMaterialsInventory> implements LeaseMaterialsInventoryDao {

}
