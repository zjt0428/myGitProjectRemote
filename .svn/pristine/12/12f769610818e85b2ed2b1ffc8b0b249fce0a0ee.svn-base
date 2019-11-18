/**
 *====================================================
 * 文件名称: IndisNoticeService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年8月26日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.IndisNotice;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: IndisNoticeService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年8月26日 上午11:11:51
 */
public interface IndisNoticeService extends BusinessLongPKService<IndisNotice> {

	public List<IndisNotice> queryTranslateAllFull(QueryFilter filter);

	public IndisNotice getTranslateFull(Long noticeId);

	public void saveOrMergeForEdit(IndisNotice indisNotice);

	public void deletePracti(Long noticePractiId);

}
