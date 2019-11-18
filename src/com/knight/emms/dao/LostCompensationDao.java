package com.knight.emms.dao;

import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.model.LostCompensation;

public interface LostCompensationDao extends BaseBusinessModelDao<LostCompensation> {

	/**序列号递增*/
	String serialAutoIncrement();

}
