package com.knight.app.service.impl;

import com.knight.app.model.TAppDispatch;
import com.knight.app.model.TAppEquipDispatchDetail;
import com.knight.app.service.TAppDispatchService;
import com.knight.core.util.DateUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by YaoFly on 2016/9/6.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"/resource/applicationContext*.xml"})
@Transactional
public class TAppDispatchServiceImplTest {
    @Autowired
    private TAppDispatchService tAppDispatchService;

    @Test
    public void testCreateDispatch() throws Exception {
        TAppDispatch tAppDispatch = new TAppDispatch();
        tAppDispatch.setRemark("");
        tAppDispatch.setCreateDt(DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE));
        tAppDispatch.setCreateBy(new Long(11));
        tAppDispatch.setDispatcher("--");
        tAppDispatch.setProjId(new Long(11));
        tAppDispatch.setContractId(new Long(11));
        tAppDispatch.setProjName("--");

        TAppEquipDispatchDetail detail = new TAppEquipDispatchDetail();
        detail.setRecordId("");
        detail.setEquipId(new Long(200));
        detail.setExwSerial("");
        Set<TAppEquipDispatchDetail> set = new HashSet<TAppEquipDispatchDetail>();
        set.add(detail);
        tAppDispatch.setDispEquipDetailSet(set);
        TAppDispatchService service = tAppDispatchService;
        service.createDispatch(tAppDispatch);
    }
}