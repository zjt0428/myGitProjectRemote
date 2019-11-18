/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: TreeNode.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-28			Chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

/**
 * @ClassName: TreeNode
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Chenxy
 * @date 2012-10-28 上午11:42:01
 */
public class TreeNode extends HashMap<String, Object> {

	private static final long serialVersionUID = 1L;

	private String primaryName;

	private String textName;

	private String leafName = "leaf";

	private List<TreeNode> children;

	public TreeNode(String primaryName, String textName) {
		this.primaryName = primaryName;
		this.textName = textName;
	}

	public void setText(Object text) {
		this.put("text", text);
	}

	public void setId(Object id) {
		if (id == null) {
			throw new java.lang.IllegalArgumentException("ID属性不能为空...");
		}
		this.put("id", id);
	}

	public void putChild(TreeNode node) {
		if (children == null) {
			children = new ArrayList<TreeNode>();
			this.put("children", children);
		}
		this.children.add(node);
	}

	public List<TreeNode> getChildren() {
		return this.children;
	}

	public void putAll(Map<? extends String, ? extends Object> m) {
		super.putAll(m);
	}

	private void createMapChildrenTreeNode(Map<String, List<Map<String, Object>>> recordMap, TreeNode node) {
		String id = node.get(node.primaryName).toString();
		List<Map<String, Object>> childrenList = recordMap.get(id);
		if (childrenList == null || childrenList.isEmpty()) {
			node.put(leafName, true);
			return;
		}
		for (Map<String, Object> record : childrenList) {
			TreeNode childNode = new TreeNode(node.primaryName, node.textName);
			childNode.setText(record.get(node.textName));
			childNode.setId(record.get(node.primaryName));
			childNode.putAll(record);
			node.putChild(childNode);
			childNode.createMapChildrenTreeNode(recordMap, childNode);
		}
	}

	public List<TreeNode> createMapTreeNode(List<Map<String, Object>> list) {
		if (list == null) {
			return null;
		}
		Map<String, List<Map<String, Object>>> recordMap = new HashMap<String, List<Map<String, Object>>>();
		for (Map<String, Object> map : list) {
			Object parentId = map.get("parentId");
			if (parentId == null || StringUtils.isBlank(parentId.toString())) {
				parentId = "0";
			} else {
				parentId = parentId.toString();
			}
			List<Map<String, Object>> recordList = recordMap.get(parentId);
			if (recordList == null) {
				recordList = new ArrayList<Map<String, Object>>();
				recordMap.put(parentId.toString(), recordList);
			}
			recordList.add(map);
		}
		createMapChildrenTreeNode(recordMap, this);
		return this.children;
	}

}
