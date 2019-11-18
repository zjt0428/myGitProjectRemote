/**
 *====================================================
 * 文件名称: BorrowService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-12			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.Borrow;
import com.knight.emms.model.BorrowAcceptance;
import com.knight.emms.model.BorrowComponent;
import com.knight.emms.model.BorrowEquip;

/**
 * @ClassName: BorrowService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-12 上午11:07:17
 */
public interface BorrowService extends BusinessFlowService<Borrow>, ExportService {

	public Borrow getTranslateFull(Long borrowId);

	public List<BorrowComponent> queryComponentAll(QueryFilter filter);

	public List<BorrowEquip> queryEquipAll(QueryFilter filter);

	public void deletedComponent(Long borrowComponId);

	public void deletedEquip(Long borrowEquipId);

	public void acceptance(BorrowAcceptance borrowAcceptance, String accMethod);

}
