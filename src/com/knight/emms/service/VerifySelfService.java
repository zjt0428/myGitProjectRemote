/**
 *====================================================
 * 文件名称: VerifySelfService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.VerifySelf;

/**
 * @ClassName: VerifySelfService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-26 下午11:48:33
 */
public interface VerifySelfService extends BaseBusinessModelService<VerifySelf> {

	public void saveOrMerge(VerifySelf verifySelf);

	public List<VerifySelf> queryTranslateAllFull(QueryFilter filter);

	public VerifySelf getTranslateFull(Long selfId);

}
