/**
 *====================================================
 * 文件名称: NumberDeserializer.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-27			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.util.gson;

import java.lang.reflect.Type;

import org.apache.commons.lang.StringUtils;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

/**
 * @ClassName: NumberDeserializer
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-27 下午11:40:46
 */
public class NumberDeserializer implements JsonDeserializer<java.lang.Number> {

	public Integer deserialize(JsonElement element, Type type, JsonDeserializationContext context) throws JsonParseException {
		if (!StringUtils.isBlank(element.getAsString())) {
			return element.getAsInt();
		}
		return null;
	}

}
