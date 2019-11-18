/**
 *====================================================
 * 文件名称: IndisProtocolServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.IndisProtocolDao;
import com.knight.emms.dao.IndisProtocolEquipDao;
import com.knight.emms.model.IndisProtocol;
import com.knight.emms.model.IndisProtocolEquip;
import com.knight.emms.service.IndisProtocolService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: IndisProtocolServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:32:44
 */
public class IndisProtocolServiceImpl extends BaseBusinessModelServiceImpl<IndisProtocol> implements IndisProtocolService {

	private IndisProtocolDao indisProtocolDao;

	@Resource
	private IndisProtocolEquipDao indisProtocolEquipDao;

	public IndisProtocolServiceImpl(IndisProtocolDao dao) {
		super(dao);
		this.indisProtocolDao = dao;
	}

	public List<IndisProtocol> queryTranslateAllFull(QueryFilter filter) {
		List<IndisProtocol> list = indisProtocolDao.getAll(filter);
		for (IndisProtocol p : list) {
			for (IndisProtocolEquip e : p.getIndisProtocolEquipSet()) {
				CodeServiceImpl.translate(e.getEquipment());
			}
		}
		return list;
	}

	public IndisProtocol getTranslateFull(Long protocolId) {
		IndisProtocol p = indisProtocolDao.get(protocolId);
		for (IndisProtocolEquip e : p.getIndisProtocolEquipSet()) {
			CodeServiceImpl.translate(e.getEquipment());
		}
		return p;
	}

	public void saveOrUpdate(IndisProtocol indisProtocol) {
		if (indisProtocol.getProtocolId() == null) {
			indisProtocolDao.saveSerialModel(indisProtocol);
		}
		indisProtocol.setSubIndisProtocol();
		indisProtocolDao.merge(indisProtocol);
	}

	public void deleteEquip(Long protocolEquipId) {
		indisProtocolEquipDao.remove(protocolEquipId);
	}

	public void delete(Long protocolId) {
		indisProtocolDao.remove(protocolId);
	}

}
