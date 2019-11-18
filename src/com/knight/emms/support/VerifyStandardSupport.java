/**
 * 版权所有：小鱼
 * Copyright 2012 QQ 258787785
 * All right reserved. 
 *====================================================
 * 文件名称: VerifyStandardSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-6-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.emms.support;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import com.knight.emms.model.VerifyStandard;

/**
 * @ClassName: VerifyStandardSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-6-3 下午6:17:24
 */
public class VerifyStandardSupport {

	public static void setColspan(Set<VerifyStandard> standardSet) {
		VerifyStandard[] standardArray = standardSet.toArray(new VerifyStandard[standardSet.size()]);
		if (standardArray[0].getLevel() == 2) {
			for (int i = 0; i < standardArray.length; i++) {
				VerifyStandard vi = standardArray[i];
				vi.setParentColspan(1);
				for (int j = i + 1; j < standardArray.length; j++) {
					VerifyStandard vj = standardArray[j];
					i = j;
					if (!vj.getParentName().equals(vi.getParentName())) {
						i--;
						break;
					}
					vi.setParentColspan(vi.getParentColspan() + 1);
				}
			}
		}
		for (int i = 0; i < standardArray.length; i++) {
			VerifyStandard vi = standardArray[i];
			vi.setColspan(1);
			for (int j = i + 1; j < standardArray.length; j++) {
				VerifyStandard vj = standardArray[j];
				i = j;
				if (!vj.equalstandard(vi)) {
					i--;
					break;
				}
				vi.setColspan(vi.getColspan() + 1);
			}
		}
	}

	public static Map<String, Map<String, List<VerifyStandard>>> groupingLevel2(Set<VerifyStandard> standardSet) {
		Map<String, Map<String, List<VerifyStandard>>> result = new HashMap<String, Map<String, List<VerifyStandard>>>();
		for (VerifyStandard vs : standardSet) {
			Map<String, List<VerifyStandard>> parents = null;
			if (result.containsKey(vs.getParentName())) {
				parents = result.get(vs.getParentName());
			} else {
				parents = new HashMap<String, List<VerifyStandard>>();
				result.put(vs.getParentName(), parents);
			}

			List<VerifyStandard> standards = null;
			if (parents.containsKey(vs.getItemName())) {
				standards = parents.get(vs.getItemName());
			} else {
				standards = new ArrayList<VerifyStandard>();
				parents.put(vs.getItemName(), standards);
			}
			standards.add(vs);
		}
		return result;
	}

	public static Map<String, List<VerifyStandard>> groupingLevel1(Set<VerifyStandard> standardSet) {
		Map<String, List<VerifyStandard>> result = new TreeMap<String, List<VerifyStandard>>();
		for (VerifyStandard vs : standardSet) {
			List<VerifyStandard> standards = null;
			if (result.containsKey(vs.getItemName())) {
				standards = result.get(vs.getItemName());
			} else {
				standards = new ArrayList<VerifyStandard>();
				result.put(vs.getItemName(), standards);
			}
			standards.add(vs);
		}
		return result;
	}

}
