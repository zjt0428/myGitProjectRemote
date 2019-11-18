package com.knight.emms.domain.impl;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.dao.GenericDao;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ConstructOperationDao;
import com.knight.emms.domain.SchedularConstructDomain;
import com.knight.emms.model.Car;
import com.knight.emms.model.ConstructOperation;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ConstructOperationService;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFly on 2016/9/18.
 */
public class SchedularConstructDomainImpl implements SchedularConstructDomain {

    @Resource
    private ConstructOperationDao constructOperationDao;

    @Resource
    private ConstructOperationService constructOperationService;

    @Override
    public void expiringSMSMessage() {
        Date cdate = DateUtil.transpositionDate(new Date(), Calendar.DATE, 1);
        String planDate = DateUtil.changeDateToStr(cdate,DateUtil.LINK_DISPLAY_DATE);
        String sql = "SELECT CO FROM ConstructOperation CO WHERE CO.constructDate = '"+planDate+"' AND CO.status = '1'";
        List<ConstructOperation> list= constructOperationDao.findByHql(sql);
        for(ConstructOperation co :list){
            String msg = "项目为"+co.getProject().getProjectName()+"，主题是"+co.getConstructTheme()+"的计划现距计划完成时间仅有1天了，" +
                    "请"+co.getConstructPlanPractis()+"抓紧安排，并及时填报完成情况。";
            constructOperationService.sendMessagePush(co,msg);
        }
    }

    @Override
    public void overTimeSMSMessage() {
        String planDate = DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE);
        String sql = "SELECT CO FROM ConstructOperation CO WHERE CO.constructDate < '"+planDate+"' AND CO.status = '1'";
        List<ConstructOperation> list= constructOperationDao.findByHql(sql);
        for(ConstructOperation co :list){
            String msg = "项目为"+co.getProject().getProjectName()+"，主题是"+co.getConstructTheme()+"的计划，原计划完成时间为"
                    +co.getConstructDate()+ "，现已超期未完成，请监督落实！";
            co.setStatus(Status.AppConstruct.overTime);
            constructOperationDao.update(co);
            constructOperationService.sendMessagePush(co,msg);
        }
    }
}
