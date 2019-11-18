/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: CodeService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.service;

import java.util.List;
import java.util.Map;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.BaseStrPKService;
import com.knight.system.model.CodeInfo;
import com.knight.system.model.InitLoadTable;

/**
 * @ClassName:CodeService
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-1 上午11:48:54
 * @since JDK Version 1.5
 */
public interface CodeService extends BaseStrPKService<InitLoadTable> {

	/**
	 * 获取表码表数据
	 * @param codeId
	 * @return Map &lt;String, CodeInfo&gt;
	 * @author:chenxy
	 */
	public Map<String, CodeInfo> getCodeInfoMap(String codeId);

	/**
	 * 获取表码表数据
	 * @param codeId
	 * @return Map &lt;String, String&gt;
	 * @author:chenxy
	 */
	public Map<String, String> getCodeValueMap(String codeId);
	/**
	 *根据类型来过滤表码
	 * @param codeId
	 * @return Map &lt;String, String&gt;
	 * @author:chenxy
	 */
	public Map<String, String> getCodeValueMap(String codeId,String name);
	
	/**
	 *根据类型来过滤表码
	 * @param codeId
	 * @return Map &lt;String, String&gt;
	 * @author:chenxy
	 */
	public List<Map<String, Object>> getCodeValueList(String codeId,String name);

	/**
	 * 通过表码名获得表码值.
	 * @param codeId 编码表编号.
	 * @param name 编码名.
	 * @return 表码值.
	 */
	public String getCode(String codeId, String name);

	/**
	 * 通过表码值获得表码名.
	 * @param codeId 编码表编号.
	 * @param code 表码值.
	 * @return 编码名.
	 */
	public String getValue(String codeId, String code);

	/**
	 * 获取表码表数据
	 * @param codeId
	 * @return Map &lt;String, CodeInfo&gt;
	 * @author:chenxy
	 */
	public CodeInfo getCodeInfo(String codeId, String code);

	/**
	 * 获取序列值
	 * @param sequence
	 * @return
	 * @author:chenxy
	 */
	public Integer getSequence(String sequence);

	/**
	 * 刷新代码词典
	 */
	public void refreshCodeDictionary();

	public Map<String, String> queryCodeDictionary(String codeId, String bhField, String mcField);

	/**
	 * 查询词典明细
	 * @param codeId
	 * @param bhField
	 * @param mcField
	 * @param filter
	 * @return
	 */
	public List<CodeInfo> queryCodeDictionary(String codeId, String bhField, String mcField, QueryFilter filter);

	/**
	 * 新增代码
	 * @param codeId
	 * @param dic
	 */
	public void addCodeDictionary(String codeId, List<CodeInfo> dic);

	/**
	 * 更新代码
	 * @param codeId
	 * @param dic
	 */
	public void updateCodeDictionary(String codeId, List<CodeInfo> dic);

	/**
	 * 删除代码
	 * @param codeId
	 * @param dic
	 */
	public void delCodeDictionary(String codeId, String[] diccodes);

	/**
	 *  加载对应的设备型号
	 * @param codeId
	 * @param dic
	 */
	public Map<String, String> listEquipSpecific(String type);
}
