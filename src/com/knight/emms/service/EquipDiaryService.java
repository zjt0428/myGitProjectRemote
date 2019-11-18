/**
 *====================================================
 * 文件名称: EquipDiaryService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Set;

import com.knight.emms.model.Borrow;
import com.knight.emms.model.BorrowEquip;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.Equipment;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: EquipDiaryService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:29:10
 */
public interface EquipDiaryService extends BusinessLongPKService<EquipDiary> {

	public EquipDiary getEquipmentDiary(EquipDiary diary, boolean cleanFlag);

	/** 设备借用日历图 */
	public void startBorrowEquipDiary(Borrow borrow, Set<BorrowEquip> borrowEquipSet);

	/** 设备借用归还日历图 */
	public void overBorrowEquipDiary(Borrow borrow, BorrowEquip borrowEquip);

	/** 设备借用遗失日历图 */
	public void loseBorrowEquipDiary(Borrow borrow, BorrowEquip borrowEquip);

	/** 设备安拆安装日历图 */
	public EquipDiary startFlowEquipDiary(Equipment equipment, Dispatch dispatch, DispatchEquip dispatchEquip);

	/** 设备安拆拆卸日历图 */
	public EquipDiary overFlowEquipDiary(EquipDismantle equipDismantle);

}
