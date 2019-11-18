/**
 *====================================================
 * 文件名称: RecipientListDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import org.springframework.stereotype.Repository;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.RecipientListDao;
import com.knight.emms.model.RecipientList;

/**
 * @ClassName: RecipientListDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月20日
 */
@Repository("recipientListDao")
public class RecipientListDaoImpl extends BaseLongPKDaoImpl<RecipientList> implements RecipientListDao {

}
