/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2011 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: UtilDateDeserializer.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-1-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util.gson;

import java.lang.reflect.Type;
import java.util.Date;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

/**
 * gson时间反序列化
 * @ClassName:UtilDateDeserializer
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:55:57
 * @since JDK Version 1.5
 */
public class UtilDateDeserializer implements JsonDeserializer<java.util.Date> {

	public Date deserialize(JsonElement json, Type type, JsonDeserializationContext context) throws JsonParseException {
		return new java.util.Date(json.getAsJsonPrimitive().getAsLong());
	}

}
