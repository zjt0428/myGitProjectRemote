/**
 *====================================================
 * 文件名称: BaseBusinessModelService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.service;

import com.knight.emms.core.BusinessModel;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: BaseBusinessModelService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-7 下午10:16:27
 */
public interface BaseBusinessModelService<T extends BusinessModel> extends BusinessLongPKService<T> {

	public T saveSerialModel(T t, String... params);

}
