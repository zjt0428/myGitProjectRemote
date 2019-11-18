/**
 *====================================================
 * 文件名称: MaterialsScrapServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月12日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.MaterialsScrapDao;
import com.knight.emms.model.MaterialsScrap;
import com.knight.emms.service.MaterialsScrapService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: MaterialsScrapServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月12日
 */
public class MaterialsScrapServiceImpl extends BusinessLongPKServiceImpl<MaterialsScrap> implements MaterialsScrapService {

	@Resource
	private MaterialsScrapDao materialsScrapDao;
	
	public MaterialsScrapServiceImpl(MaterialsScrapDao dao) {
		super(dao);
		this.materialsScrapDao = dao;
	}

}