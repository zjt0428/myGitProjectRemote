/**
 *====================================================
 * 文件名称: EquipWarehouseAbnormalServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月30日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.EquipWarehouseAbnormalDao;
import com.knight.emms.model.EquipWarehouseAbnormal;
import com.knight.emms.service.EquipWarehouseAbnormalService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/** 
 * @ClassName: EquipWarehouseAbnormalServiceImpl 
 * @Description: TODO(这里用一句话描述这个类的作用) 
 * @author chenxy 
 * @date 2015年6月30日 上午8:46:29  
 */
public class EquipWarehouseAbnormalServiceImpl extends BusinessLongPKServiceImpl<EquipWarehouseAbnormal> implements EquipWarehouseAbnormalService {

	public EquipWarehouseAbnormalServiceImpl(EquipWarehouseAbnormalDao dao) {
		super(dao);
	}

}
