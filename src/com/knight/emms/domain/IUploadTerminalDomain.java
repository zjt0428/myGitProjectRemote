/**
 *====================================================
 * 文件名称: IUploadTerminalDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain;

import com.knight.emms.model.Component;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: IUploadTerminalDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-25 上午11:09:03
 */
public interface IUploadTerminalDomain {

	public void uploadsave(Equipment equipment);

	public void uploadsave(Component component);

	public void uploadsave(EquipInspect equipInspect);

	public void uploadsave(Dispatch dispatch);

}
