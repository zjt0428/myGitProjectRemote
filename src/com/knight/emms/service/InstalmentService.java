/**
 *====================================================
 * 文件名称: InstalmentService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Set;

import com.knight.emms.model.Instalment;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: InstalmentService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 上午7:34:07
 */
public interface InstalmentService extends BusinessLongPKService<Instalment> {

	public void saveOrMeger(Set<Instalment> instalmentSet);

}
