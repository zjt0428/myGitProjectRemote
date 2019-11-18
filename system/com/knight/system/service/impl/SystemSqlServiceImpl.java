/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SystemSqlServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Cleanup;

import com.knight.core.ApplicationEnvironment;
import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.model.SyncModule;
import com.knight.core.plugin.dialect.Dialect;
import com.knight.core.util.FileUtil;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.constant.SystemConstant;
import com.knight.system.constant.SystemUtil;
import com.knight.system.service.SystemSqlService;

/**
 * @ClassName: SystemSqlServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-26 上午11:47:05
 */
public class SystemSqlServiceImpl implements SystemSqlService {

	@Resource
	private BaseJDBCDao baseJdbcDao;

	private Dialect dialect = ApplicationEnvironment.dialect;

	public List<Map<String, Object>> query(String sql, PagingBean pb) {
		String countsql = dialect.getCountString(sql);
		int count = baseJdbcDao.queryForInt(countsql);
		pb.setTotalItems(count);
		if (count > pb.getPageSize()) {
			sql = dialect.getLimitString(sql, 0, 5000);
		}
		return baseJdbcDao.queryForList(sql);
	}

	public int excute(String sql) {
		return baseJdbcDao.jdbcTemplate().update(sql);
	}

	public void createSystemDataFile() throws Exception {
		File dataFile = new File(SystemUtil.getSystemExportDataFilePath());
		if (dataFile.exists()) {
			FileUtil.cleanFileContent(dataFile);
		} else {
			if (!dataFile.getParentFile().exists()) {
				dataFile.getParentFile().mkdirs();
			}
		}
		@Cleanup
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(dataFile), "UTF-8"));
		writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?><SYNCHRO>");
		for (SyncModule sync : SystemConstant.SYNC_SYSTEM_DATA) {
			writer.write("<" + sync.getModuleName() + ">");
			String sql = sync.getDataSource();
			List<Map<String, Object>> datas = baseJdbcDao.queryForList(sql);
			for (Map<String, Object> data : datas) {
				writer.write("<DATA>");
				for (Map.Entry<String, Object> entry : data.entrySet()) {
					writer.write("<" + entry.getKey() + ">");
					String value = "";
					if (entry.getValue() != null) {
						if (entry.getValue() instanceof Date) {
							value = entry.getValue().toString().substring(0, 19);
						} else {
							value = entry.getValue().toString().trim();
						}
					}
					writer.write(value);
					writer.write("</" + entry.getKey() + ">");
				}
				writer.write("</DATA>");
			}
			writer.write("</" + sync.getModuleName() + ">");
		}
		writer.write("</SYNCHRO>");
	}
}
