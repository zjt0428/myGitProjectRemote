/**
 *====================================================
 * 文件名称: AutocraneService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年1月20日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.Autocrane;

/**
 * @ClassName: AutocraneService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年1月20日 下午7:10:17
 */
public interface AutocraneService extends BaseBusinessModelService<Autocrane>, ExportService {

	public void saveOrMergeForEdit(Autocrane autocrane);

	public List<Autocrane> queryTranslateAllFull(QueryFilter filter);

	public Autocrane getTranslateFull(Long autocraneId);

}
