/**
 *====================================================
 * 文件名称: BaseBusinessModelDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.dao;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.emms.core.BusinessModel;

/**
 * @ClassName: BaseBusinessModelDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-7 上午6:36:41
 */
public interface BaseBusinessModelDao<T extends BusinessModel> extends BaseLongPKDao<T> {

	public int createNextSerialseq(T t, String... params);

	public String createNextSerial(T t);
	
	public String createNextSerial(T t,String... params);

	public T saveSerialModel(T t, String... params);

}
