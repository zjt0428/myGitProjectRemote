/**
 *====================================================
 * 文件名称: ApplicationDaoEnvironment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.dao.impl;

import java.util.HashMap;
import java.util.Map;

import com.knight.core.model.PersistantStruct;

/**
 * @ClassName: ApplicationDaoEnvironment
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-1 下午1:57:14
 */
public class ApplicationDaoEnvironment {

	private static Map<Class<?>, PersistantStruct> persistantStructs = new HashMap<Class<?>, PersistantStruct>();

	static void registerPersistantStruct(PersistantStruct persistantStruct) {
		persistantStructs.put(persistantStruct.getClazz(), persistantStruct);
	}

	public static PersistantStruct getPersistantStruct(Class<?> clazz) {
		return persistantStructs.get(clazz);
	}

}
