/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2011 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: UtilDateSerializer.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-1-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util.gson;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * gson时间序列化
 * @ClassName:UtilDateSerializer
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:56:17
 * @since JDK Version 1.5
 */
public class UtilDateSerializer implements JsonSerializer<java.util.Date> {

	public JsonElement serialize(java.util.Date src, Type typeOfSrc, JsonSerializationContext context) {
		return new JsonPrimitive(src.getTime());
	}

}
