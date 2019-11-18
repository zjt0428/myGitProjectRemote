package com.knight.core.util;

import com.knight.core.exception.BusinessException;
import freemarker.template.Configuration;
import freemarker.template.Template;

import javax.servlet.ServletContext;
import java.io.IOException;

/**
 * Created by YaoFly on 2016/12/27.
 */
public class FreemarkerUtil {

    public static Configuration getConfiguration(ServletContext context, String configUrl){
        Configuration configuration = new Configuration();
        configuration.setDefaultEncoding("UTF-8");
        configuration.setServletContextForTemplateLoading(context,configUrl);
        return configuration;
    }

    public static Template getTemplate(ServletContext context,String configUrl,String fileName){
        Template template = null;
        try {
            template = getConfiguration(context,configUrl).getTemplate(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessException("FTL模板文件不存在！");
        }
        return template;
    }
}
