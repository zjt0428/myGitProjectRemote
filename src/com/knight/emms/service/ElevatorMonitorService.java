/**
 *====================================================
 * 文件名称: AccidentService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.ElevatorMonitor;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: AccidentService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:48:16
 */
public interface ElevatorMonitorService extends BusinessLongPKService<ElevatorMonitor> {

	public List<ElevatorMonitor> queryTranslateAllFull(QueryFilter filter);


}
