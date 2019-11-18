/**
 *====================================================
 * 文件名称: EquipInstallService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.EquipInstallReview;
import com.knight.emms.model.RectificationRecord;
import com.knight.emms.terminal.Query;

/**
 * @ClassName: EquipInstallService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:28:41
 */
public interface EquipInstallService extends BusinessFlowService<EquipInstall>, ExportService {

	public List<EquipInstall> queryTranslateAllFull(QueryFilter filter);

	public EquipInstall getTranslateFull(Long installId);

	public void submitInstall(Long installId);

	/** 删除设备安装信息 */
	public void delete(Long installId);

	/** 现场设备安装信息 */
	public void sceneInstall(EquipInstall install,String buildingNum);
	
	public void setJjCompon(EquipInstall equipInstall,String jackOrdrop);

	public List loadCompondiarySet(EquipInstall equipInstall,Query query);
	public List loadCompondiarySet(EquipInstall equipInstall);

	public void saveEquipInstallWork(EquipInstallReview eir);
	
	public void saveEquipInstallRectification(RectificationRecord rec);

}
