/**
 *====================================================
 * 文件名称: IndisSchemaService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.IndisSchema;

/**
 * @ClassName: IndisSchemaService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:29:52
 */
public interface IndisSchemaService extends BusinessFlowService<IndisSchema> {

	public List<IndisSchema> queryTranslateAllFull(QueryFilter filter);

	public IndisSchema getTranslateFull(Long schemaId);

	public void delete(IndisSchema indisSchema);

	public void deletePracti(Long schemaPractiId);

	public void submit(IndisSchema indisSchema);

}
