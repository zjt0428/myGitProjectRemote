/**
 *====================================================
 * 文件名称: PractiDiaryService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Set;

import com.knight.emms.model.PractiDiary;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: PractiDiaryService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:30:24
 */
public interface PractiDiaryService extends BusinessLongPKService<PractiDiary> {

	public void createPractiDiary(Set<PractiDiary> practiDiarySet, DiaryRelationMethod relation);

	public void fulfil(Long practiDiaryId);

}
