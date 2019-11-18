/**
 *====================================================
 * 文件名称: TeamsAccountService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年3月31日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.emms.model.TeamsAccount;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: TeamsAccountService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年3月31日 上午12:21:25
 */
public interface TeamsAccountService extends BusinessLongPKService<TeamsAccount> {

	public TeamsAccount getTranslateAll(Long teamsAccountId);

	public void saveOrMergeEdit(TeamsAccount teamsAccount);

	public void deleteLogistics(Long accountLogisticsId);

	public void deleteOther(Long accountOtherId);

	public void deletePracti(Long accountPractiId);

	public void delete(TeamsAccount teamsAccount);

	public TeamsAccount getTranslateFull(Long teamsAccountId);

}
