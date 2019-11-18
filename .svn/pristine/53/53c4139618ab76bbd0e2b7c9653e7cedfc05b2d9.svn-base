/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: StoreHouseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-1-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ChangeRecordDao;
import com.knight.emms.dao.StoreHouseDao;
import com.knight.emms.model.Project;
import com.knight.emms.model.StoreHouse;
import com.knight.emms.service.StoreHouseService;

/**
 * @ClassName: StoreHouseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-1-13 下午8:52:46
 */
public class StoreHouseServiceImpl extends BaseBusinessModelServiceImpl<StoreHouse> implements StoreHouseService {

	@SuppressWarnings("unused")
	private StoreHouseDao storeHouseDao;
	
	@Resource
	private ChangeRecordDao changeRecordDao;
	
	@Resource
	private BaseJDBCDao baseJdbcDao;

	public StoreHouseServiceImpl(StoreHouseDao dao) {
		super(dao);
		this.storeHouseDao = dao;
	}

	@Override
	public void changeStoreName(StoreHouse storeHouse) {
		// TODO Auto-generated method stub
		StoreHouse sh = storeHouseDao.get(storeHouse.getStoreId());
		boolean f = false;
		StringBuffer sa = new StringBuffer();
		StringBuffer sb = new StringBuffer();//起租管理
		StringBuffer sc = new StringBuffer();//现场装车
		StringBuffer sd = new StringBuffer();//发货调度
		StringBuffer se = new StringBuffer();//发配件
		StringBuffer a = new StringBuffer();
		StringBuffer b = new StringBuffer();//起租管理
		StringBuffer c = new StringBuffer();//现场装车
		StringBuffer d = new StringBuffer();//发货调度
		StringBuffer e = new StringBuffer();//发配件
		sa.append("UPDATE T_STORE_HOUSE SET ");
		sb.append("UPDATE T_EQUIPMENT_ACTIVATE SET ");
		sc.append("UPDATE T_LOGISTICS_TRANSPORT SET ");
		sd.append("UPDATE T_DISPATCH SET ");
		se.append("UPDATE DC SET ");
		a.append("UPDATE T_STORE_HOUSE SET ");
		b.append("UPDATE T_EQUIPMENT_ACTIVATE SET ");
		c.append("UPDATE T_LOGISTICS_TRANSPORT SET ");
		d.append("UPDATE T_DISPATCH SET ");
		e.append("UPDATE DC SET ");
		if(StringUtils.isNotBlank(storeHouse.getStoreName()) && !storeHouse.getStoreName().equals(sh.getStoreName())) {
			sa.append("STORE_NAME = '"+ storeHouse.getStoreName());
			sb.append("DELIVERY_ENT_NAME = '"+ storeHouse.getStoreName());
			sc.append("DELIVERY_ENT_NAME = '"+ storeHouse.getStoreName());
			sd.append("DELIVERY_ENT_NAME = '"+ storeHouse.getStoreName());
			se.append("STORE_NAME = '"+ storeHouse.getStoreName());
			a.append("STORE_NAME = '"+ sh.getStoreName());
			b.append("DELIVERY_ENT_NAME = '"+ sh.getStoreName());
			c.append("DELIVERY_ENT_NAME = '"+ sh.getStoreName());
			d.append("DELIVERY_ENT_NAME = '"+ sh.getStoreName());
			e.append("STORE_NAME = '"+ sh.getStoreName());
			f = true;
		}
		if(f){
			sa.append("' WHERE STORE_ID = "+ storeHouse.getStoreId());
			sb.append("' FROM T_EQUIPMENT_FLOW EF,T_EQUIPMENT_ACTIVATE EA,T_DISPATCH D WHERE EA.FLOW_ID = EF.FLOW_ID AND EF.DISPATCH_ID = D.DISPATCH_ID AND D.DELIVERY_ENT_ID = "+ storeHouse.getStoreId());
			sc.append("' WHERE DELIVERY_ENT_ID = "+ storeHouse.getStoreId());
			sd.append("' WHERE DELIVERY_ENT_ID = "+ storeHouse.getStoreId());
			se.append("' FROM T_DISPATCH D,T_DISPATCH_COMPON DC  WHERE D.DISPATCH_ID = DC.DISPATCH_ID AND D.DELIVERY_ENT_ID ="+ storeHouse.getStoreId());
			a.append("' WHERE STORE_ID = "+ sh.getStoreId());
			b.append("' FROM T_EQUIPMENT_FLOW EF,T_EQUIPMENT_ACTIVATE EA,T_DISPATCH D WHERE EA.FLOW_ID = EF.FLOW_ID AND EF.DISPATCH_ID = D.DISPATCH_ID AND D.DELIVERY_ENT_ID = "+ sh.getStoreId());
			c.append("' WHERE DELIVERY_ENT_ID = "+ sh.getStoreId());
			d.append("' WHERE DELIVERY_ENT_ID = "+ sh.getStoreId());
			e.append("' FROM T_DISPATCH D,T_DISPATCH_COMPON DC  WHERE D.DISPATCH_ID = DC.DISPATCH_ID AND D.DELIVERY_ENT_ID ="+ sh.getStoreId());
			changeRecordDao.recordChange(sa.toString(), a.toString());
			changeRecordDao.recordChange(sb.toString(), b.toString());
			changeRecordDao.recordChange(sc.toString(), c.toString());
			changeRecordDao.recordChange(sd.toString(), d.toString());
			changeRecordDao.recordChange(se.toString(), e.toString());
			baseJdbcDao.jdbcTemplate().execute(sa.toString());
			baseJdbcDao.jdbcTemplate().execute(sb.toString());
			baseJdbcDao.jdbcTemplate().execute(sc.toString());
			baseJdbcDao.jdbcTemplate().execute(sd.toString());
			baseJdbcDao.jdbcTemplate().execute(se.toString());
		}
	}

}
