/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: CodeServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.service.impl;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Element;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.jdbc.core.JdbcTemplate;

import com.knight.core.Constants;
import com.knight.core.dao.impl.ApplicationDaoEnvironment;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.CodeField;
import com.knight.core.model.PersistantStruct;
import com.knight.core.service.impl.BaseStrPKServiceImpl;
import com.knight.core.util.ObjectUtil;
import com.knight.core.util.XmlUtil;
import com.knight.system.dao.InitLoadTableDao;
import com.knight.system.model.CodeInfo;
import com.knight.system.model.InitLoadTable;
import com.knight.system.service.CodeService;

/**
 * @ClassName:CodeServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-1 上午11:50:15
 * @since JDK Version 1.5
 */
public class CodeServiceImpl extends BaseStrPKServiceImpl<InitLoadTable> implements CodeService {

	private InitLoadTableDao initLoadTableDao;

	public CodeServiceImpl(InitLoadTableDao dao) {
		super(dao);
		this.initLoadTableDao = dao;
	}

	@Resource
	private JdbcTemplate jdbcTemplate;

	private static Hashtable<String, Map<String, CodeInfo>> codeTables;

	private static Hashtable<String, Map<String, String>> codeValueMapTables;

	/**
	 * 加载标码表
	 * @param initLoadTable
	 * @return
	 * @author:chenxy
	 */
	private Map<String, CodeInfo> loadBMData(InitLoadTable initLoadTable) {
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT ").append(initLoadTable.getBhFieldName());
		sql.append(", ").append(initLoadTable.getMcFieldName());
		if (StringUtils.isNotBlank(initLoadTable.getParentFieldName())) {
			sql.append(", ").append(initLoadTable.getParentFieldName());
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName())) {
			sql.append(", ").append(initLoadTable.getAliasFieldName());
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName1())) {
			sql.append(", ").append(initLoadTable.getAliasFieldName1());
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName2())) {
			sql.append(", ").append(initLoadTable.getAliasFieldName2());
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName3())) {
			sql.append(", ").append(initLoadTable.getAliasFieldName3());
		}
		sql.append(" FROM  " + initLoadTable.getTableName());
		Map<String, CodeInfo> bmTableData = initLoadTableDao.loadCodeToMap(sql.toString(), initLoadTable);
		return bmTableData;
	}

	/**
	 * 把延迟表码表加载至内存
	 * @param table
	 * @author:chenxy
	 */
	private void addLazyBMTableMap(InitLoadTable initLoadTable) {
		Map<String, CodeInfo> bmDatas = loadBMData(initLoadTable);
		if (bmDatas.size() == 0) {
			logger.warn("表码表" + initLoadTable.getTableName() + "数据为空。");
		}
		codeTables.put(initLoadTable.getTableAlias(), bmDatas);
		Map<String, String> valueMap = new TreeMap<String, String>();
		for (Iterator<String> it = bmDatas.keySet().iterator(); it.hasNext();) {
			String key = it.next();
			CodeInfo code = bmDatas.get(key);
			valueMap.put(key, code.getValue());
		}
		codeValueMapTables.put(initLoadTable.getTableAlias(), valueMap);
		logger.debug("表码[" + initLoadTable.getTableAlias() + "]-表[" + initLoadTable.getTableName() + "]加载成功，其记录数为：" + bmDatas.size());
	}

	private void addFixedCode(Element codeNode) {
		String alias = XmlUtil.getMustAttributeValue(codeNode, "name");
		@SuppressWarnings("unchecked")
		List<Element> codeElementList = codeNode.selectNodes("Code");

		Map<String, String> valueMap = null;
		Map<String, CodeInfo> codeInfoMap = null;
		if (codeValueMapTables.containsKey(alias)) {
			valueMap = codeValueMapTables.get(alias);
			codeInfoMap = codeTables.get(alias);
		} else {
			valueMap = new TreeMap<String, String>();
			codeInfoMap = new HashMap<String, CodeInfo>(codeElementList.size());
		}
		for (Element e : codeElementList) {
			String key = XmlUtil.getMustAttributeValue(e, "id");
			String value = XmlUtil.getMustAttributeValue(e, "value");
			valueMap.put(key, value);

			String aliasValue = XmlUtil.getAttributeValue(e, "aliasValue", "");
			String parentCode = XmlUtil.getAttributeValue(e, "parentCode", "");
			CodeInfo code = new CodeInfo();
			code.setCode(key);
			code.setValue(value);
			code.setParentCode(parentCode);
			code.setAliasValue(aliasValue);
			codeInfoMap.put(key, code);
		}
		codeValueMapTables.put(alias, valueMap);
		codeTables.put(alias, codeInfoMap);
	}

	/**
	 * 初始化
	 * @author:chenxy
	 */
	public void init() throws URISyntaxException {
		codeTables = new Hashtable<String, Map<String, CodeInfo>>();
		codeValueMapTables = new Hashtable<String, Map<String, String>>();
		logger.info("开始加载表码...");
		List<InitLoadTable> initLoadTableList = initLoadTableDao.findByTableType(InitLoadTable.BM_TABLE, true);
		if (initLoadTableList.size() == 0) {
			logger.warn("在初始化加载表T_INIT_LOAD_TABLE中未配置表码表，如果有表码表，请先配置，其类型为1。");
		} else {
			for (InitLoadTable initLoadTable : initLoadTableList) {
				addLazyBMTableMap(initLoadTable);
			}
			logger.info("共加载" + initLoadTableList.size() + "个表码表.");
			Element root = XmlUtil.load(this.getClass().getClassLoader().getResourceAsStream("resource/lexicon.xml")).getRootElement();
			@SuppressWarnings("unchecked")
			List<Element> codeNodeList = root.selectNodes("Alias");
			for (Element codeNode : codeNodeList) {
				addFixedCode(codeNode);
			}
			logger.info("共加载" + codeNodeList.size() + "个内置表码表.");
		}
	}

	public Map<String, CodeInfo> getCodeInfoMap(String codeId) {
		if (StringUtils.isBlank(codeId)) {
			throw new IllegalArgumentException("表码表别名不能为null");
		}
		if (codeTables.containsKey(codeId.trim())) {
			return codeTables.get(codeId);
		} else {
			// 检查是否需要延迟加载
			InitLoadTable initLoadTable = initLoadTableDao.findByTablAlias(codeId);
			if (initLoadTable != null && initLoadTable.isLazy()) {
				addLazyBMTableMap(initLoadTable);
				return codeTables.get(codeId);
			} else {
				throw new IllegalArgumentException("缓存池中没有别名为：" + codeId + "的表码表，请检查T_INIT_LOAD_TABLE的设置");
			}
		}
	}

	public Map<String, String> getCodeValueMap(String codeId) {
		if (codeId == null) {
			throw new IllegalArgumentException("表码表别名不能为null");
		}
		if (codeValueMapTables.containsKey(codeId.trim())) {
			return codeValueMapTables.get(codeId);
		} else {
			// 检查是否需要延迟加载
			InitLoadTable table = initLoadTableDao.findByTablAlias(codeId);
			if (table != null && table.isLazy()) {
				addLazyBMTableMap(table);
				return codeValueMapTables.get(codeId);
			} else {
				throw new IllegalArgumentException("缓存池中没有别名为：" + codeId + "的表码表，请检查T_INIT_LOAD_TABLE的设置");
			}

		}
	}
	
	public Map<String, String> getCodeValueMap(String codeId,String name) {
		if (codeId == null) {
			throw new IllegalArgumentException("表码表别名不能为null");
		}
		Map<String, String> map  = new HashMap<String, String>();
			// 检查是否需要延迟加载
			InitLoadTable table = initLoadTableDao.findByTablAlias(codeId);
			if (table != null ) {
				List<Map<String, Object>> list = initLoadTableDao.queryByScript("bmcode.bm_equip_load",name);
				for(Map<String, Object> m : list){
					map.put((String)m.get("code"), (String)m.get("value"));
				}
				return  map;
			} else {
				throw new IllegalArgumentException("缓存池中没有别名为：" + codeId + "的表码表，请检查T_INIT_LOAD_TABLE的设置");
			}
			
	}
	
	public List<Map<String, Object>> getCodeValueList(String codeId,String name){
		if (codeId == null) {
			throw new IllegalArgumentException("表码表别名不能为null");
		}
		List<Map<String, Object>> list  =new ArrayList<Map<String,Object>>();
		// 检查是否需要延迟加载
		InitLoadTable table = initLoadTableDao.findByTablAlias(codeId);
		if (table != null ) {
			 list = initLoadTableDao.queryByScript("bmcode.bm_equip_load");
			return  list;
		} else {
			throw new IllegalArgumentException("缓存池中没有别名为：" + codeId + "的表码表，请检查T_INIT_LOAD_TABLE的设置");
		}
		
	}

	public String getCode(String codeId, String name) {
		Map<String, CodeInfo> codeInfoMap = getCodeInfoMap(codeId);
		Iterator<String> iter = codeInfoMap.keySet().iterator();
		while (iter.hasNext()) {
			String item = iter.next();
			CodeInfo codeInfo = codeInfoMap.get(item);
			if (codeInfo.getValue().equals(name)) {
				return codeInfo.getCode();
			}
		}
		return name;
	}

	public static void translate(Object org, PersistantStruct table) {
		if (org == null || table == null || table.getCodeFields() == null || table.getCodeFields().size() <= 0) {
			return;
		}
		try {
			for (CodeField c : table.getCodeFields()) {
				Object code = c.getCodeReadMethod().invoke(org, ObjectUtil.EMPTY_PRAMAS);
				if (code == null) {
					continue;
				}
				String codeId = c.getCodeId();
				Map<String, String> vs = codeValueMapTables.get(codeId);
				if (vs == null) {
					c.getValueWriteMethod().invoke(org, code.toString());
					continue;
				}
				if (c.isArray()) {
					String[] codeArray = code.toString().split(",");
					String[] valueArray = new String[codeArray.length];
					for (int i = 0; i < codeArray.length; i++) {
						String value = vs.get(codeArray[i].trim());
						if (value == null) {
							valueArray[i] = codeArray[i];
							logger.debug(codeId + ":[" + codeArray[i] + "]未定义代码值!");
						} else {
							valueArray[i] = value;
						}
					}
					c.getValueWriteMethod().invoke(org, StringUtils.join(valueArray, ","));
				} else {
					if (vs.get(code.toString()) == null) {
						c.getValueWriteMethod().invoke(org, code.toString());
					} else {
						c.getValueWriteMethod().invoke(org, vs.get(code.toString()));
					}
				}
			}
		} catch (Exception e) {
			logger.error("", e);
		}
	}

	public static void translate(Collection<?> org, PersistantStruct table) {
		for (Object o : org) {
			translate(o, table);
		}
	}

	public static void translate(Object org) {
		if (org == null) {
			return;
		}
		PersistantStruct table = null;
		if (org instanceof HibernateProxy) {
			table = ApplicationDaoEnvironment.getPersistantStruct(Hibernate.getClass(org));
		} else {
			table = ApplicationDaoEnvironment.getPersistantStruct(org.getClass());
		}
		translate(org, table);
	}

	public static void translate(Collection<?> org) {
		for (Object o : org) {
			translate(o);
		}
	}

	public static String fastValue(String codeId, String code) {
		Map<String, String> vs = codeValueMapTables.get(codeId);
		if (vs == null || code == null) {
			return code;
		}
		String value = vs.get(code);
		if (value == null) {
			return code;
		}
		return value;
	}

	public CodeInfo getCodeInfo(String codeId, String code) {
		Map<String, CodeInfo> map = codeTables.get(codeId);
		return map.get(code);
	}

	public static Map<String, String> fastCodeMap(String codeId) {
		return codeValueMapTables.get(codeId);
	}

	public String getValue(String codeId, String code) {
		Map<String, CodeInfo> codeInfoMap = getCodeInfoMap(codeId);
		if (codeInfoMap == null) {
			logger.warn("找不到表码表:" + codeId);
			return code;
		}
		CodeInfo codeInfo = codeInfoMap.get(code);
		if (codeInfo == null) {
			logger.warn("表码表" + codeId + "找不到表码:" + code);
			return code;
		}
		return codeInfo.getValue();
	}

	public Integer getSequence(String sequence) {
		String sql = "SELECT " + sequence + ".NEXTVAL FROM DUAL";
		return jdbcTemplate.queryForInt(sql);
	}

	public void refreshCodeDictionary() {
		List<InitLoadTable> initLoadTableList = initLoadTableDao.findByTableType(InitLoadTable.BM_TABLE, false);
		if (initLoadTableList.size() == 0) {
			logger.warn("刷新T_INIT_LOAD_TABLE中延迟表码表，如果有表码表，请先配置，其类型为1,并且延迟类型设为0");
		} else {
			for (InitLoadTable initLoadTable : initLoadTableList) {
				addLazyBMTableMap(initLoadTable);
				initLoadTable.setRefresh(Constants.FLAG_REFRESH);
				initLoadTableDao.update(initLoadTable);
			}
			logger.info("共刷新" + initLoadTableList.size() + "个表码表.");
		}
	}

	public List<CodeInfo> queryCodeDictionary(String codeId, String bhField, String mcField, QueryFilter filter) {
		InitLoadTable initLoadTable = initLoadTableDao.get(codeId);
		return initLoadTableDao.queryCodeInfo(initLoadTable, bhField, mcField, filter);
	}

	public Map<String, String> queryCodeDictionary(String codeId, String bhField, String mcField) {
		InitLoadTable initLoadTable = initLoadTableDao.get(codeId);
		List<Map<String, Object>> list = initLoadTableDao.queryCodeInfo(initLoadTable, bhField, mcField);
		Map<String, String> result = new HashMap<String, String>(list.size());
		for (Map<String, Object> m : list) {
			result.put(m.get(initLoadTable.getBhFieldName()).toString(), m.get(initLoadTable.getMcFieldName()).toString());
		}
		return result;
	}

	public void addCodeDictionary(String codeId, List<CodeInfo> dic) {
		if (dic == null || dic.isEmpty()) {
			return;
		}
		initLoadTableDao.setUNRefreshDicTB(codeId);
		InitLoadTable initLoadTable = initLoadTableDao.get(codeId);
		int paramsId = 2;
		String sql = "INSERT INTO " + initLoadTable.getTableName() + " VALUES (?, ?";
		if (StringUtils.isNotBlank(initLoadTable.getParentFieldName())) {
			paramsId++;
			sql = sql + ", ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName())) {
			paramsId++;
			sql = sql + ", ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName1())) {
			paramsId++;
			sql = sql + ", ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName2())) {
			paramsId++;
			sql = sql + ", ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName3())) {
			paramsId++;
			sql = sql + ", ?";
		}
		sql = sql + ")";
		for (CodeInfo d : dic) {
			Object[] params = new Object[paramsId];
			int id = 0;
			params[id] = d.getCode();
			id++;
			params[id] = d.getValue();
			if (StringUtils.isNotBlank(initLoadTable.getParentFieldName())) {
				id++;
				params[id] = d.getParentCode();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName())) {
				id++;
				params[id] = d.getAliasValue();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName1())) {
				id++;
				params[id] = d.getAliasValue1();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName2())) {
				id++;
				params[id] = d.getAliasValue2();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName3())) {
				id++;
				params[id] = d.getEquipCategory();
			}
			jdbcTemplate.update(sql, params);
		}
	}

	public void updateCodeDictionary(String codeId, List<CodeInfo> dic) {
		if (dic == null || dic.isEmpty()) {
			return;
		}
		initLoadTableDao.setUNRefreshDicTB(codeId);
		InitLoadTable initLoadTable = initLoadTableDao.get(codeId);
		int paramsId = 1;
		String sql = "UPDATE " + initLoadTable.getTableName() + " SET " + initLoadTable.getMcFieldName() + " = ?";
		if (StringUtils.isNotBlank(initLoadTable.getParentFieldName())) {
			paramsId++;
			sql = sql + ", " + initLoadTable.getParentFieldName() + " = ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName())) {
			paramsId++;
			sql = sql + ", " + initLoadTable.getAliasFieldName() + " = ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName1())) {
			paramsId++;
			sql = sql + ", " + initLoadTable.getAliasFieldName1() + " = ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName2())) {
			paramsId++;
			sql = sql + ", " + initLoadTable.getAliasFieldName2() + " = ?";
		}
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName3())) {
			paramsId++;
			sql = sql + ", " + initLoadTable.getAliasFieldName3() + " = ?";
		}
		paramsId++;
		sql = sql + " WHERE " + initLoadTable.getBhFieldName() + " = ?";
		for (CodeInfo d : dic) {
			Object[] params = new Object[paramsId];
			int id = 0;
			params[id] = d.getValue();
			if (StringUtils.isNotBlank(initLoadTable.getParentFieldName())) {
				id++;
				params[id] = d.getParentCode();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName())) {
				id++;
				params[id] = d.getAliasValue();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName1())) {
				id++;
				params[id] = d.getAliasValue1();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName2())) {
				id++;
				params[id] = d.getAliasValue2();
			}
			if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName3())) {
				id++;
				params[id] = d.getEquipCategory();
			}
			id++;
			params[id] = d.getCode();
			jdbcTemplate.update(sql, params);
		}
	}

	public void delCodeDictionary(String codeId, String[] diccodes) {
		if (diccodes == null || diccodes.length == 0) {
			return;
		}
		initLoadTableDao.setUNRefreshDicTB(codeId);
		InitLoadTable initLoadTable = initLoadTableDao.get(codeId);
		String sql = "DELETE FROM " + initLoadTable.getTableName() + "  WHERE " + initLoadTable.getBhFieldName() + " = ?";
		for (String code : diccodes) {
			jdbcTemplate.update(sql, code);
		}
	}
	
	public Map<String, String> listEquipSpecific(String type) {
		Map<String, String> map  = new HashMap<String, String>();
		List<Map<String, Object>> list = initLoadTableDao.queryByScript("bmcode.bm_equip_load_bytype",type);
		for(Map<String, Object> m : list){
			map.put((String)m.get("code"), (String)m.get("value"));
		}
		return  map;
	}

}
