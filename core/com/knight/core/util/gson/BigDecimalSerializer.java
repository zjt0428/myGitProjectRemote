/**
 *====================================================
 * 文件名称: BigDecimalSerializer.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年10月7日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.util.gson;

import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * @ClassName: BigDecimalSerializer
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年10月7日 下午4:38:45
 */
public class BigDecimalSerializer implements JsonSerializer<BigDecimal> {

	@Override
	public JsonElement serialize(BigDecimal bigDecimal, Type type, JsonSerializationContext context) {
		return new JsonPrimitive(bigDecimal == null ? "" : bigDecimal.toString());
	}

}
