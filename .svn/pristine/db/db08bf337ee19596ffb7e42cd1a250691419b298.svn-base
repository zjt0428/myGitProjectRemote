/**
 *====================================================
 * 文件名称: ComponDiaryService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.knight.emms.model.Borrow;
import com.knight.emms.model.BorrowComponent;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Pickup;
import com.knight.emms.model.PickupComponent;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: ComponDiaryService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-20 上午8:09:06
 */
public interface ComponDiaryService extends BusinessLongPKService<ComponDiary> {

	public void createComponDiary(Set<ComponDiary> componDiarySet, DiaryRelationMethod relation);

	/** 零配件领用日历图 */
	public void startPickupComponDiary(Pickup pickup, Set<PickupComponent> pickupComponentSet);

	/** 零配件领用归还日历图 */
	public void overPickupComponDiary(Pickup pickup, PickupComponent pickupComponent);

	/** 零配件借用日历图 */
	public void startBorrowComponDiary(Borrow borrow, Set<BorrowComponent> borrowComponentSet);

	/** 零配件借用归还日历图 */
	public void overBorrowComponDiary(Borrow borrow, BorrowComponent borrowComponent, BorrowComponent bor);

	/** 零配件借用遗失日历图 */
	public void loseBorrowComponDiary(Borrow borrow, BorrowComponent borrowComponent);

	/** 安装/使用/拆卸 终结前业务零配件-业务流转至新业务 */
	public void overPreInstallEmployDismantle(Long relateId, String relateModule, Date startDate);

	public void fulfil(Long componDiaryId);

	public List<ComponDiary> findBysql(String string);

}
