/**
 *====================================================
 * 文件名称: CorpInfoService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.model.CorpAccount;
import com.knight.emms.model.CorpInfo;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: CorpInfoService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:05:47
 */
public interface CorpInfoService extends BusinessLongPKService<CorpInfo>, ExportService {

	public void deletedAccount(Long corpAccountId);

	public List<CorpAccount> queryAccountAll(QueryFilter filter);

	public CorpInfo getTranslateFull(Long corpId);

}
