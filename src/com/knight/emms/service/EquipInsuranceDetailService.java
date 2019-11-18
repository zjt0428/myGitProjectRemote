/**
 *====================================================
 * 文件名称: EquipInsuranceDetailService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.EquipInsurance;
import com.knight.emms.model.EquipInsuranceDetail;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: EquipInsuranceDetailService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:43:52
 */
public interface EquipInsuranceDetailService extends BusinessLongPKService<EquipInsuranceDetail> {

	public List<EquipInsuranceDetail> getTranslateFull(QueryFilter queryFilter) ;
}
