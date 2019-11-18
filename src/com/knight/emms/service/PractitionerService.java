/**
 *====================================================
 * 文件名称: PractitionerService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.core.service.ExportService;
import com.knight.emms.model.Practitioner;
import com.knight.system.domain.AppUserExtendDomain;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: PractitionerService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:04:50
 */
public interface PractitionerService extends BusinessLongPKService<Practitioner>, ExportService, AppUserExtendDomain {

}
