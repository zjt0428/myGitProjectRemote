/**
 *====================================================
 * 文件名称: LeaseMaterialsRecordServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：周材租借记录
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.dao.LeaseMaterialsRecordDao;
import com.knight.emms.model.LeaseMaterialsRecord;
import com.knight.emms.service.LeaseMaterialsRecordService;

/**
 * @ClassName: LeaseMaterialsRecordServiceImpl
 * @Description: 周材租借记录
 * @author 陈光毅
 * @date 2017年11月20日
 */
@Service("leaseMaterialsRecordService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class LeaseMaterialsRecordServiceImpl extends BaseLongPKServiceImpl<LeaseMaterialsRecord> implements LeaseMaterialsRecordService {

	@Resource
	public LeaseMaterialsRecordDao leaseMaterialsRecordDao;
	
	@Autowired(required = true)
	public LeaseMaterialsRecordServiceImpl(@Qualifier("leaseMaterialsRecordDao") LeaseMaterialsRecordDao dao) {
		super(dao);
		this.leaseMaterialsRecordDao = dao;
	}

}
