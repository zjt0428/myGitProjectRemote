package com.knight.app.service.impl;

import com.knight.app.core.service.impl.RemindModuleServiceImpl;
import com.knight.app.dao.TAppComponDispatchDetailDao;
import com.knight.app.dao.TAppEquipDispatchDetailDao;
import com.knight.app.dao.TAppLogisticsCompDao;
import com.knight.app.dao.TAppLogisticsEquipDao;
import com.knight.app.model.*;
import com.knight.app.service.TAppLogisticsService;
import com.knight.core.dao.GenericDao;
import com.knight.core.filter.QueryFilter;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.LogisticsTranDestributionDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.LogisticsTranDestribution;
import com.knight.emms.terminal.Query;
import com.knight.system.dao.AppUserDao;
import com.knight.system.model.AppUser;
import org.apache.commons.lang.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFly on 2016/7/27.
 */
public class TAppLogisticsServiceImpl extends RemindModuleServiceImpl<TAppLogistics> implements TAppLogisticsService {

    @Resource
    private TAppLogisticsCompDao tAppLogisticsCompDao;

    @Resource
    private TAppLogisticsEquipDao tAppLogisicsEquipDao;

    @Resource
    private TAppEquipDispatchDetailDao tAppEquipDispatchDetailDao;

    @Resource
    private TAppComponDispatchDetailDao tAppComponDispatchDetailDao;

    @Resource
    private BusinessMessageDao businessMessageDao;

    @Resource
    private LogisticsTranDestributionDao butionDao;

    @Resource
    private AppUserDao appUserDao;

    public TAppLogisticsServiceImpl(GenericDao<TAppLogistics, Long> dao) {
        super(dao);
    }


    public void saveOrUpdate(TAppLogistics tAppLogistics) {
        save(tAppLogistics);
        for (TAppLogisticsComp comp : tAppLogistics.getTAppLogisticsCompSet()) {
            comp.setLogiId(tAppLogistics.getLogiId());
            TAppComponDispatchDetail componDispatchDetail = comp.getTAppComponDispatchDetail();
            tAppLogisticsCompDao.merge(comp);
            if (componDispatchDetail!=null&&componDispatchDetail.getLogisticNum() != 0) {
                //调度配件的物流运输数量 = 调度配件的物流运输数量（初始等于调度配件的调度数量）- 本次物流运输数量
                componDispatchDetail.setLogisticNum(componDispatchDetail.getLogisticNum()==null?0:componDispatchDetail.getLogisticNum() - (comp.getLogiNum()==null?0:comp.getLogiNum()));
                tAppComponDispatchDetailDao.merge(componDispatchDetail);
            }
        }
        for (TAppLogisticsEquip equip : tAppLogistics.getTAppLogisticsEquipSet()) {
            equip.setLogiId(tAppLogistics.getLogiId());
            tAppLogisicsEquipDao.merge(equip);
            TAppEquipDispatchDetail equipDispatchDetail = equip.getTAppEquipDispatchDetail();
            if (equipDispatchDetail!=null&&equipDispatchDetail.getLogisticNum() != 0) {
                equipDispatchDetail.setLogisticNum(equipDispatchDetail.getLogisticNum() - equip.getLogiNum());
                tAppEquipDispatchDetailDao.merge(equipDispatchDetail);
            }
        }
        for (LogisticsTranDestribution bution : tAppLogistics.getLogisticsTranDistributionSet()) {
            bution.setLogiId(tAppLogistics.getLogiId());
            butionDao.merge(bution);
        }
    }

    public List<Map<String,Object>> list(Query q) {
        List<Map<String,Object>> list =tAppLogisicsEquipDao.queryByScript("terminal.list_logistics",q.getKeyword(),q.getStatus(),q.getStart(),q.getPageSize());
        return list;
    }

    @Override
    public void sendMessagePush(TAppLogistics tAppLogistics,String msg) {
        AppUser user = appUserDao.findByFullName(tAppLogistics.getDeliveryMan());
        List<Map<String,Object>> list = queryByScript("terminal.get_currentAppPracti", user.getUserId());
        BusinessMessage[] bms = new BusinessMessage[list.size()*4];
        List<String> tels = new ArrayList<String>();
        for(int i=0;i<list.size();i++){
            tels.add((String) list.get(i).get("DUTYMAN_TEL1"));
            tels.add((String) list.get(i).get("DUTYMAN_TEL2"));
            tels.add((String) list.get(i).get("DUTYMAN_TEL3"));
            tels.add((String) list.get(i).get("CAPITAL_TEL"));
        }
//       List<Map<String,Object>> listAppUser = queryByScript("terminal.get_currentAppUser", tAppLogistics.getReceiveId());
//       for(int i=0;i<listAppUser.size();i++){
//           tels.add((String) listAppUser.get(i).get("PROJECT_MOBILE"));
//           tels.add((String) listAppUser.get(i).get("MATERIAL_MOBILE"));
//       }
        for(int i=0;i<bms.length;i++){
            if(tels.get(i)!=null) {
                BusinessMessage bm = new BusinessMessage();
                bm.setReceiveTel(tels.get(i));
                bm.setMessage(msg);
                bm.setSenderName("装车物流消息");
                businessMessageDao.save(bm);
            }
        }
    }

    public void receive(TAppLogistics tAppLogistics){
        for(TAppLogisticsComp comp : tAppLogistics.getTAppLogisticsCompSet()){
            tAppLogisticsCompDao.merge(comp);
        }

        for(TAppLogisticsEquip equip : tAppLogistics.getTAppLogisticsEquipSet()){
            tAppLogisicsEquipDao.merge(equip);
        }
        merge(tAppLogistics);
    }

}
