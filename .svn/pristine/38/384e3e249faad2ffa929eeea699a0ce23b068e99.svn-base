/**
 *====================================================
 * 文件名称: ChangeRecordDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.core.util.DateUtil;
import com.knight.emms.dao.ChangeRecordDao;
import com.knight.emms.dao.CustomerDao;
import com.knight.emms.model.ChangeRecord;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Customer;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: ChangeRecordDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午4:33:02
 */
public class ChangeRecordDaoImpl extends BaseLongPKDaoImpl<ChangeRecord> implements ChangeRecordDao {

	@Override
	public void recordChange(String executeSql, String originalValue) {
		// TODO Auto-generated method stub
		ChangeRecord cr = new ChangeRecord();
		cr.setCreateTime(DateUtil.getCurrentLinkTimeStr());
		cr.setUserId(ApplicationContainer.getCurrentUserId());
		cr.setUserName(ApplicationContainer.getCurrentUser().getUsername());
		cr.setExecuteSql(executeSql);
		cr.setOriginalValue(originalValue);
		super.save(cr);
	}

}
