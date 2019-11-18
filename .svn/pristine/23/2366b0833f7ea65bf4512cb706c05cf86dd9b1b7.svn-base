/**
 *====================================================
 * 文件名称: AccidentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.ElevatorMonitorDao;
import com.knight.emms.model.ElevatorMonitor;
import com.knight.emms.service.ElevatorMonitorService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: AccidentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:49:18
 */
public class ElevatorMonitorServiceImpl extends BusinessLongPKServiceImpl<ElevatorMonitor> implements ElevatorMonitorService {

	private ElevatorMonitorDao elevatorMonitorDao;


	public ElevatorMonitorServiceImpl(ElevatorMonitorDao dao) {
		super(dao);
		this.elevatorMonitorDao = dao;
	}

	public List<ElevatorMonitor> queryTranslateAllFull(QueryFilter filter) {
		List<ElevatorMonitor> list = elevatorMonitorDao.getAll(filter);
		for (ElevatorMonitor r : list) {
			CodeServiceImpl.translate(r, getPersistantStruct());
		}
		return list;
	}


}
