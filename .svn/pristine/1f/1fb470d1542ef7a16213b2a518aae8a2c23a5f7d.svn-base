/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyItemDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.constant.Constant;
import com.knight.emms.dao.VerifyItemDao;
import com.knight.emms.model.VerifyItem;

/**
 * @ClassName: VerifyItemDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-6 下午2:25:19
 */
public class VerifyItemDaoImpl extends BaseLongPKDaoImpl<VerifyItem> implements VerifyItemDao {

	public void deleteItemById(Long itemId) {
		VerifyItem item = this.get(itemId);
		if (Constant.DISENABLED.equals(item.getDelFlag())) {
			return;
		}
		String sql = "UPDATE T_VERIFY_ITEM SET DEL_FLAG = '0' WHERE PATH LIKE '" + item.getPath() + "%'";
		this.jdbcTemplate.execute(sql);
	}

}
