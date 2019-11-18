/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: CodeAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.TreeNode;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.model.CodeInfo;
import com.knight.system.model.InitLoadTable;
import com.knight.system.service.CodeService;

/**
 * @ClassName:CodeAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-7 上午9:26:36
 * @since JDK Version 1.5
 */
public class CodeAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private CodeService codeService;

	@Getter
	@Setter
	private String codeId;
	
	@Getter
	@Setter
	private String name;

	@Getter
	@Setter
	private String code;

	@Getter
	@Setter
	private String[] codes;

	@Getter
	@Setter
	private Boolean sync;

	public String query() {
		String bhField = getRequest().getParameter("bhField");
		String mcField = getRequest().getParameter("mcField");
		Map<String, String> codeMap = codeService.queryCodeDictionary(codeId, bhField, mcField);
		StringBuffer buff = new StringBuffer("[");
		for (Map.Entry<String, String> entry : codeMap.entrySet()) {
			buff.append("['" + entry.getKey() + "','" + entry.getValue() + "'],");
		}
		if (codeMap.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String list() {
		Map<String, String> codeMap = new HashMap<String, String>();
		codeMap = codeService.getCodeValueMap(codeId);
		StringBuffer buff = new StringBuffer("[");
		for (Map.Entry<String, String> entry : codeMap.entrySet()) {
			buff.append("['" + entry.getKey() + "','" + entry.getValue() + "'],");
		}
		if (codeMap.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String listEquipSpecific() {
		Map<String, String> codeMap = new HashMap<String, String>();
		if(codeId!=null && !codeId.equals("")) {
			codeMap = codeService.listEquipSpecific(codeId);
			StringBuffer buff = new StringBuffer("[");
			for (Map.Entry<String, String> entry : codeMap.entrySet()) {
				buff.append("['" + entry.getKey() + "','" + entry.getValue() + "'],");
			}
			if (codeMap.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			setJsonString(buff.toString());
		}
		return SUCCESS;
	}
	
	public String list4MultiValue() {
		List<Map<String, Object>> codeMap = new ArrayList<Map<String,Object>>();
		 codeMap = codeService.getCodeValueList(codeId,name);
			 
		 StringBuffer buff = new StringBuffer();
		buff.append(GsonUtil.toJson(codeMap, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String load() {
		CodeInfo codeInfo = codeService.getCodeInfo(codeId, code);
		setJsonString(GsonUtil.toJson(codeInfo));
		return SUCCESS;
	}

	public String listNames() {
		Map<String, String> codeMap = codeService.getCodeValueMap(codeId);
		StringBuffer buff = new StringBuffer("[");
		for (Map.Entry<String, String> entry : codeMap.entrySet()) {
			buff.append("'" + entry.getValue() + "',");
		}
		if (codeMap.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String getName() {
		Map<String, String> codeMap = codeService.getCodeValueMap(codeId);
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("code", code);
		resultMap.put("value", codeMap.get(code));
		setJsonString(GsonUtil.toJson(resultMap));
		return SUCCESS;
	}

	public String getNameArray() {
		Map<String, String> codeMap = codeService.getCodeValueMap(codeId);
		Map<String, String> resultMap = new HashMap<String, String>();

		List<String> nameList = new ArrayList<String>();
		for (int i = 0; i < codes.length; i++) {
			String name = codeMap.get(codes[i]);
			nameList.add(name == null ? "" : name);
		}
		resultMap.put("code", StringUtils.join(codes, ";"));
		resultMap.put("value", StringUtils.join(nameList.toArray(), ";"));
		setJsonString(GsonUtil.toJson(resultMap));
		return SUCCESS;
	}

	public String tree() {
		Map<String, CodeInfo> treeCodeMap = codeService.getCodeInfoMap(codeId);
		List<Map<String, Object>> codeList = new ArrayList<Map<String, Object>>();
		for (CodeInfo c : treeCodeMap.values()) {
			Map<String, Object> m = new HashMap<String, Object>();
			m.put("id", c.getCode());
			m.put("text", c.getValue());
			m.put("parentId", c.getParentCode());
			codeList.add(m);
		}
		TreeNode topNode = new TreeNode("id", "text");
		topNode.setId("0");
		topNode.setText("总分类");
		topNode.createMapTreeNode(codeList);
		setJsonString(GsonUtil.toJson(topNode.getChildren()));
		return SUCCESS;
	}

	public String check() {
		Map<String, CodeInfo> codeMap = codeService.getCodeInfoMap(codeId);
		String json = GsonUtil.toJson(codeMap.values());
		setJsonString(json);
		return SUCCESS;
	}

	public String listDic() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InitLoadTable> dics = codeService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		String json = GsonUtil.toJson(dics);
		buff.append(json);
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listDicDetail() {
		QueryFilter filter = new QueryFilter(getRequest());
		String bhField = getRequest().getParameter("bhField");
		String mcField = getRequest().getParameter("mcField");
		List<CodeInfo> cis = codeService.queryCodeDictionary(this.codeId, bhField, mcField, filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		String json = GsonUtil.toJson(cis);
		buff.append(json);
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "词典项删除")
	public String delDicDetail() {
		String codes = getRequest().getParameter("codes");
		if (StringUtils.isBlank(codes)) {
			return SUCCESS;
		}
		String[] codeArray = GsonUtil.fromJson(codes, String[].class);
		codeService.delCodeDictionary(this.codeId, codeArray);
		return SUCCESS;
	}

	@ActionLog(description = "更新或保存词典信息")
	public String saveDicDetail() {
		String modifiedRecords = getRequest().getParameter("modifiedRecords");
		if (StringUtils.isBlank(modifiedRecords)) {
			return SUCCESS;
		}
		logger.debug(modifiedRecords);
		TypeToken<List<CodeInfo>> type = new TypeToken<List<CodeInfo>>() {};
		List<CodeInfo> codeInfos = GsonUtil.fromJson(modifiedRecords, type);
		List<CodeInfo> newcode = new ArrayList<CodeInfo>();
		List<CodeInfo> modcode = new ArrayList<CodeInfo>();
		for (CodeInfo c : codeInfos) {
			if (StringUtils.isBlank(c.getCodeId())) {
				newcode.add(c);
			} else {
				modcode.add(c);
			}
		}
		codeService.updateCodeDictionary(this.codeId, modcode);
		codeService.addCodeDictionary(this.codeId, newcode);
		return SUCCESS;
	}

	@ActionLog(description = "刷新词典信息")
	public String refreshDic() {
		codeService.refreshCodeDictionary();
		return SUCCESS;
	}

}
