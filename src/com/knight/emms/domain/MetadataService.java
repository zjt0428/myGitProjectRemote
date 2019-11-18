/**
 *====================================================
 * 文件名称: MetadataService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-16			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain;

import java.util.List;

import com.knight.emms.model.Borrow;
import com.knight.emms.model.Component;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: MetadataService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-16 下午8:04:04
 */
public interface MetadataService {

	List<Component> queryComponentByBorrow(Borrow borrow);

	List<Equipment> queryEquipByBorrow(Borrow borrow);

}
