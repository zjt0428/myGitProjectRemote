/**
 *====================================================
 * 文件名称: SecureProtocolServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.SecureProtocolDao;
import com.knight.emms.model.SecureProtocol;
import com.knight.emms.service.SecureProtocolService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: SecureProtocolServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:54
 */
public class SecureProtocolServiceImpl extends BaseBusinessModelServiceImpl<SecureProtocol> implements SecureProtocolService {

	private SecureProtocolDao secureProtocolDao;

	public SecureProtocolServiceImpl(SecureProtocolDao dao) {
		super(dao);
		this.secureProtocolDao = dao;
	}

	public List<SecureProtocol> queryTranslateAllFull(QueryFilter filter) {
		List<SecureProtocol> list = secureProtocolDao.getAll(filter);
		for (SecureProtocol sp : list) {
			CodeServiceImpl.translate(sp.getEquipment());
		}
		return list;
	}

	public SecureProtocol getTranslateFull(Long protocolId) {
		SecureProtocol sp = secureProtocolDao.get(protocolId);
		CodeServiceImpl.translate(sp.getEquipment());
		return sp;
	}

	public void delete(Long protocolId) {
		secureProtocolDao.remove(protocolId);
	}

}
