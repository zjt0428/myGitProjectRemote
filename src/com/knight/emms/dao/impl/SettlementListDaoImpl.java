/**
 *====================================================
 * 文件名称: SettlementListDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月30日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.SettlementListDao;
import com.knight.emms.model.SettlementList;

/**
 * @ClassName: SettlementListDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月30日
 */
@Repository("settlementListDao")
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class SettlementListDaoImpl extends BaseLongPKDaoImpl<SettlementList> implements SettlementListDao {

}
