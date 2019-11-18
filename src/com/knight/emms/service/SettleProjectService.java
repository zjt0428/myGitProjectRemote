/**
 *====================================================
 * 文件名称: SettleProjectService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Map;

import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.SettleProject;

/**
 * @ClassName: SettleProjectService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午5:09:07
 */
public interface SettleProjectService extends BaseBusinessModelService<SettleProject> {
	
	public void saveCreate(SettleProject settleProject);

	public void effective(SettleProject settleProject);

	public void loseEffective(SettleProject settleProject);

	public SettleProject getByFilter(Long settleId,String filterName,Map<String,Object> map);

}
