/**
 *====================================================
 * 文件名称: EquipDiarySupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: EquipDiarySupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-3 下午1:50:00
 */
public class EquipDiarySupport {

	public static void setDiaryBase(EquipDiary diary, Equipment equipment) {
		diary.setEquipId(equipment.getEquipId());
		diary.setEquipCategory(equipment.getEquipCategory());
		diary.setEquipGeneric(equipment.getEquipGeneric());
		diary.setEquipSpecific(equipment.getEquipSpecific());
		diary.setRecordId(equipment.getRecordId());
		diary.setExwDate(equipment.getExwDate());
		diary.setExwSerial(equipment.getExwSerial());
		diary.setEquipSerial(equipment.getEquipSerial());
		diary.setEquipVender(equipment.getEquipVender());
		diary.setRecordSerial(equipment.getRecordSerial());
		diary.setPropertyEnt(equipment.getPropertyEnt());
		diary.setPropertyName(equipment.getPropertyName());
		diary.setStoreId(equipment.getStoreId());
	}

}
