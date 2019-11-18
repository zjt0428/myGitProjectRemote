/**
 *====================================================
 * 文件名称: SafeCheckService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-1-23			chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.SafeCheck;
import com.knight.system.service.BusinessLongPKService;
/**
 * @ClassName: SafeCheckService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017-1-23 上午9:41:35
 */
public interface SafeCheckService extends BusinessLongPKService<SafeCheck> {
	
	public void saveOrUpdate(SafeCheck safeCheck);
	
	public List<SafeCheck> queryTranslateAllFull(QueryFilter filter);
	
	public SafeCheck getTranslateFull(Long safeCheckId);
	
	public void deleteAll(Long safeCheckId);
	
	public void deleteContent(Long safeCheckContentId);
	
}
