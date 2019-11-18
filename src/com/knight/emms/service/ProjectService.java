/**
 *====================================================
 * 文件名称: ProjectService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.Project;

/**
 * @ClassName: ProjectService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午10:54:32
 */
public interface ProjectService extends BaseBusinessModelService<Project>, ExportService {

	/** 删除商务记录信息 */
	public void deletedExpense(Long projectExpenseId);
	/** 修改项目档案 */
	public void changeProject (Project project);
	
	/** 判断项目名是否重复 */
	public void projectIsRepeat(Project project);
}
