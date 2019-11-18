/**
 *====================================================
 * 文件名称: MemoServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.knight.app.dao.TAppRepairTypeDao;
import com.knight.app.model.TAppRepairType;
import com.knight.app.service.TAppRepairTypeService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.ExportModel;
import com.knight.core.service.impl.BaseStrPKServiceImpl;
/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class TAppRepairTypeServiceImpl  extends BaseStrPKServiceImpl<TAppRepairType> implements TAppRepairTypeService {

	private TAppRepairTypeDao tappRepairComponDao;

	public TAppRepairTypeServiceImpl(TAppRepairTypeDao dao) {
		super(dao);
		this.tappRepairComponDao = dao;
	}

	public void saveOrUpdate(TAppRepairType tappRepairCompon) {
		if (tappRepairCompon.getId() == null) {
			tappRepairComponDao.save(tappRepairCompon);
		}else{
			tappRepairComponDao.merge(tappRepairCompon);
		}
	}

	@Override
	public List<? extends ExportModel> queryExportData(QueryFilter filter) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
