package com.knight.emms.dao;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.emms.model.InspectSelfInitDetail;

public interface InspectSelfInitDetailDao extends BaseLongPKDao<InspectSelfInitDetail> {

	public void deleteItemById(Long initId);

}
