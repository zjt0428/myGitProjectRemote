/**
 *====================================================
 * 文件名称: HibernateProxyTypeAdapter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.util.gson;

import java.io.IOException;

import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.gson.TypeAdapterFactory;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * @ClassName: HibernateProxyTypeAdapter
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-3 下午5:29:02
 */
public class HibernateProxyTypeAdapter extends TypeAdapter<HibernateProxy> {
	
	private final Gson context;

	public static final TypeAdapterFactory FACTORY = new TypeAdapterFactory() {
		@Override
		@SuppressWarnings("unchecked")
		public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
			return (HibernateProxy.class.isAssignableFrom(type.getRawType()) ? (TypeAdapter<T>) new HibernateProxyTypeAdapter(gson) : null);
		}
	};

	private HibernateProxyTypeAdapter(Gson context) {
		this.context = context;
	}

	@Override
	public HibernateProxy read(JsonReader in) throws IOException {
		throw new UnsupportedOperationException("Not supported");
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void write(JsonWriter out, HibernateProxy value) throws IOException {
		if (value == null) {
			out.nullValue();
			return;
		}
		// Retrieve the original (not proxy) class
		Class<?> baseType = Hibernate.getClass(value);
		// Get the TypeAdapter of the original class, to delegate the serialization
		TypeAdapter delegate = context.getAdapter(TypeToken.get(baseType));
		// Get a filled instance of the original class
		Object unproxiedValue = ((HibernateProxy) value).getHibernateLazyInitializer().getImplementation();
		// Serialize the value
		delegate.write(out, unproxiedValue);
	}

}
