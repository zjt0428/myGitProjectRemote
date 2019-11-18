/**
 *====================================================
 * 文件名称: MemoServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.knight.app.dao.AttendamceDao;
import com.knight.app.dao.AttendamceLocationDao;
import com.knight.app.dao.TFlowCopyChkmanDao;
import com.knight.app.model.Attendamce;
import com.knight.app.model.AttendamceLocation;
import com.knight.app.model.TFlowCopyChkman;
import com.knight.app.service.AttendamceService;
import com.knight.app.service.TFlowCopyChkmanService;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.MemoDao;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Memo;
import com.knight.emms.model.MemoDetail;
import com.knight.emms.service.MemoService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class TFlowCopyChkmanServiceImpl  extends BusinessLongPKServiceImpl<TFlowCopyChkman> implements TFlowCopyChkmanService {

	private TFlowCopyChkmanDao tflowCopyChkmanDao;
	
	public TFlowCopyChkmanServiceImpl(TFlowCopyChkmanDao dao) {
		super(dao);
		this.tflowCopyChkmanDao = dao;
	}

	public void saveOrUpdate(TFlowCopyChkman tflowCopyChkman) {
		if (tflowCopyChkman.getCopid() == null) {
			tflowCopyChkmanDao.save(tflowCopyChkman);
		}else{
			tflowCopyChkmanDao.merge(tflowCopyChkman);
		}
	}
	
}
