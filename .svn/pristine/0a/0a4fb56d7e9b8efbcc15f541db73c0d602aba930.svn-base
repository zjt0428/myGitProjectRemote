/**
 *====================================================
 * 文件名称: ContingencyPlanService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.ContingencyPlan;

/**
 * @ClassName: ContingencyPlanService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:27:48
 */
public interface ContingencyPlanService extends BaseBusinessModelService<ContingencyPlan> {

	public List<ContingencyPlan> queryTranslateAllFull(QueryFilter filter);

	public ContingencyPlan getTranslateFull(Long contingencyId);

	public void saveOrUpdate(ContingencyPlan contingencyPlan);

	public void deleteWorker(Long workerId);

	public void delete(Long contingencyId);

}
