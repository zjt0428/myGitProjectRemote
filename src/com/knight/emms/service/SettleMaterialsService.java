/**
 *====================================================
 * 文件名称: SettleMaterialsService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Map;

import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.SettleMaterials;
import com.knight.emms.model.SettleProject;

/**
 * @ClassName: SettleMaterialsService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午5:09:07
 */
public interface SettleMaterialsService extends BaseBusinessModelService<SettleMaterials> {
	
	public void saveCreate(SettleMaterials settleMaterials);
	
	public SettleMaterials getByFilter(Long settleId,String filterName,Map<String,Object> map);

	public void loseEffective(SettleMaterials settleMaterials);

	public void effective(SettleMaterials settleMaterials);
	

}
