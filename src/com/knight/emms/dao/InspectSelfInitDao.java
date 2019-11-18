package com.knight.emms.dao;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.emms.model.InspectSelfInit;

public interface InspectSelfInitDao extends BaseLongPKDao<InspectSelfInit> {

	public void deleteItemById(Long initId);

}
