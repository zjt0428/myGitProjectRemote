package com.knight.emms.service.impl;

import com.knight.core.dao.GenericDao;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.dao.PrintDataDao;
import com.knight.emms.model.PrintData;
import com.knight.emms.service.PrintDataService;

/**
 * Created by YaoFly on 2016/11/23.
 */
public class PrintDataServiceImpl extends BaseLongPKServiceImpl<PrintData> implements PrintDataService {
    public PrintDataServiceImpl(PrintDataDao dao) {
        super(dao);
    }
}
