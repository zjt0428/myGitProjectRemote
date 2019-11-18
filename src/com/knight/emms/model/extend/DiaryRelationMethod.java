/**
 *====================================================
 * 文件名称: DiaryRelationMethod.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model.extend;

import com.knight.emms.model.EquipFlow;

/**
 * @ClassName: DiaryRelationMethod
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-2 下午8:42:42
 */
public interface DiaryRelationMethod {

	public Long getDiaryRelateId();

	public String getDiaryRelateSerial();

	public String getDiaryRelateTheme();

	public String getDiaryRelateModule();

	public EquipFlow getEquipFlow();
	
	public String getUserName();

}
