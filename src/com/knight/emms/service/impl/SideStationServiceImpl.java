/**
 *====================================================
 * 文件名称: SideStationService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-7-2			KI·C(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.SideStationDao;
import com.knight.emms.model.SideStation;
import com.knight.emms.service.SideStationService;

/**
 * @ClassName: SideStationService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author KI·C
 * @date 2017-7-2 上午10:43:40
 */
public class SideStationServiceImpl extends BaseBusinessModelServiceImpl<SideStation> implements SideStationService {

	private SideStationDao sideStationDao;
	
	public SideStationServiceImpl(SideStationDao dao) {
		super(dao);
		this.sideStationDao = dao;
	}

}
