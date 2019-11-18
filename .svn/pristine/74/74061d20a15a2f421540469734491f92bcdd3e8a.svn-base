/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: PersistantDeclare.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-27			Chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.table;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @ClassName: PersistantDeclare
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Chenxy
 * @date 2012-10-27 下午3:33:21
 */
@Target({ java.lang.annotation.ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface PersistantDeclare {

	public boolean isExportable() default false;

	public String sheetName() default "数据列表";

	public String exportName() default "导出文件";

}
