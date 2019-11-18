/**
 *====================================================
 * 文件名称: FreemarkerContextHelper.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年1月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletContext;

import lombok.extern.slf4j.Slf4j;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;

/**
 * @ClassName: FreemarkerContextHelper
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年1月25日 下午4:24:59
 */
@Slf4j
public class FreemarkerContextHelper {

	private static Configuration configuration = null;

	static void init(ServletContext servletContext) {
		configuration = new Configuration();
		// 这里有三种方式读取
		// （一个文件目录）
		// configuration.setDirectoryForTemplateLoading(new File("templates"));
		// classpath下的一个目录（读取jar文件）
		// configuration.setClassForTemplateLoading(this.getClass(),"/templates");
		// 相对web的根路径来说 根目录
		configuration.setServletContextForTemplateLoading(servletContext, "templates");
		// setEncoding这个方法一定要设置国家及其编码，不然在flt中的中文在生成html后会变成乱码
		configuration.setEncoding(Locale.getDefault(), "UTF-8");

		// 设置对象的包装器
		configuration.setObjectWrapper(new DefaultObjectWrapper());
		// 设置异常处理器//这样的话就可以${a.b.c.d}即使没有属性也不会出错
		configuration.setTemplateExceptionHandler(TemplateExceptionHandler.IGNORE_HANDLER);
	}

	/**
	 * @param ftl 模板文件名,相对上面的模版根目录templates路径,例如/module/view.ftl templates/module/view.ftl
	 * @param data 填充数据
	 * @param targetFile 要生成的静态文件的路径,相对设置中的根路径,例如 "jsp/user/1.html"
	 * @return
	 */
	public static boolean process(String ftl, Map<String, Object> data, String targetFile) {
		try {
			// 创建Template对象
			Template template = configuration.getTemplate(ftl);
			template.setEncoding("UTF-8");
			// 生成静态页面
			Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(targetFile), "UTF-8"));
			template.process(data, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			log.error("", e);
			return false;
		}
		return true;
	}

	/**
	 * @param ftl 模板文件名,相对上面的模版根目录templates路径,例如/module/view.ftl templates/module/view.ftl
	 * @param data 填充数据
	 * @return
	 */
	public static String process(String ftl, Map<String, Object> data) {
		try {
			// 创建Template对象
			Template template = configuration.getTemplate(ftl);
			template.setEncoding("UTF-8");
			// 生成静态页面
			StringWriter out = new StringWriter();
			template.process(data, out);
			out.flush();
			out.close();
			return out.toString();
		} catch (Exception e) {
			log.error("", e);
		}
		return null;
	}

}
