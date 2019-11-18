/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyItemService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;
import java.util.Map;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.VerifyItem;
import com.knight.emms.model.VerifyItemDemand;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: VerifyItemService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-6 下午2:34:17
 */
public interface VerifyItemService extends BusinessLongPKService<VerifyItem> {

	public void saveItem(Long parentItemId, Long itemId, String itemName, String vitemType);

	public void deleteItem(Long itemId);

	/** 获取检测项目下的要求信息 */
	public List<VerifyItemDemand> queryDemandByItem(QueryFilter filter);

	public void saveDemand(Long itemId, Long demandId, String demandDes);

	public void deleteDemand(Long demandId);

	/** 查询检测要求 */
	public List<Map<String, Object>> queryDemand(QueryFilter filter);

}
