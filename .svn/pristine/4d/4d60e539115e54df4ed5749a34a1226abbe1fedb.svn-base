/**
 *====================================================
 * 文件名称: BaseBusinessModelServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.service;

import org.springframework.transaction.annotation.Transactional;

import com.knight.app.core.service.impl.RemindModuleServiceImpl;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.dao.BaseBusinessModelDao;

import lombok.SneakyThrows;

/**
 * @ClassName: BaseBusinessModelServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-7 下午10:18:38
 */
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class BaseBusinessModelServiceImpl<T extends BusinessModel> extends RemindModuleServiceImpl<T> implements BaseBusinessModelService<T> {

	private BaseBusinessModelDao<T> baseBusinessModelDao;

	public BaseBusinessModelServiceImpl(BaseBusinessModelDao<T> dao) {
		super(dao);
		this.baseBusinessModelDao = dao;
	}

	@Override
	@SneakyThrows(Exception.class)
	public T saveSerialModel(T t, String... params) throws RuntimeException {
		return baseBusinessModelDao.saveSerialModel(t, params);
	}

}
