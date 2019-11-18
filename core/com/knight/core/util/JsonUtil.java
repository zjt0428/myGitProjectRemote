/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: JsonUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * @ClassName:JsonUtil
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-29 下午4:17:22
 * @since JDK Version 1.5
 */
public class JsonUtil {

	public static JSONSerializer getJSONSerializer(String[] dateFields) {
		JSONSerializer serializer = new JSONSerializer();
		serializer.exclude(new String[] { "class" });
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), dateFields);
		return serializer;
	}

}
