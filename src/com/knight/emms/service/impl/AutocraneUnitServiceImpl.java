/**
 *====================================================
 * 文件名称: InstalmentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Set;

import com.knight.emms.constant.EmmsConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.AutocraneUnitDao;
import com.knight.emms.dao.InstalmentDao;
import com.knight.emms.model.AutocraneUnit;
import com.knight.emms.model.Instalment;
import com.knight.emms.service.AutocraneUnitService;
import com.knight.emms.service.InstalmentService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: InstalmentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 上午7:34:20
 */
public class AutocraneUnitServiceImpl extends BusinessLongPKServiceImpl<AutocraneUnit> implements AutocraneUnitService {

	private AutocraneUnitDao autocraneUnitDao;

	public AutocraneUnitServiceImpl(AutocraneUnitDao dao) {
		super(dao);
		this.autocraneUnitDao = dao;
	}

	@Override
	public void saveOrMeger(Set<AutocraneUnit> autocraneUnit) {		
		
	}
}
