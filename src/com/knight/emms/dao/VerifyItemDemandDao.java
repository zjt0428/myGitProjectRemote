/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyItemDemandDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao;

import java.util.List;
import java.util.Map;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.VerifyItemDemand;

/**
 * @ClassName: VerifyItemDemandDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-5 下午10:57:49
 */
public interface VerifyItemDemandDao extends BaseLongPKDao<VerifyItemDemand> {

	public List<Map<String, Object>> queryDemand(QueryFilter filter);

}
