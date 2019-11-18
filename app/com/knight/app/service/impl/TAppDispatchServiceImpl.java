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

import com.knight.app.core.service.impl.RemindModuleServiceImpl;
import com.knight.app.dao.TAppDispatchDao;
import com.knight.app.model.TAppComponDispatchDetail;
import com.knight.app.model.TAppDispatch;
import com.knight.app.model.TAppEquipDispatchDetail;
import com.knight.app.service.TAppComponDispatchDetailService;
import com.knight.app.service.TAppDispatchService;
import com.knight.app.service.TAppEquipDispatchDetailService;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.*;
import com.knight.emms.model.*;
import com.knight.emms.service.*;
import com.knight.system.constant.SystemConstant;
import com.knight.system.dao.AppUserDao;
import com.knight.system.model.AppUser;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class TAppDispatchServiceImpl  extends RemindModuleServiceImpl<TAppDispatch> implements TAppDispatchService {
    @Resource
    private ContractLeaseDao contractLeaseDao;

	private TAppDispatchDao tappDispatchDao;

    @Resource
    private DispatchDao dispatchDao;

    @Resource
    private DispatchEquipDao dispatchEquipDao;
    
    @Resource
    private StoreEquipStockDao storeEquipStockDao;

    @Resource
    private ProjectDao projectDao;

    @Resource
    private EquipmentDao equipmentDao;
    
    @Resource
    private AppUserDao appUserDao;

    @Resource
    private BusinessMessageDao businessMessageDao;

    @Resource
    private TAppComponDispatchDetailService tappComponDisDetailService;

    @Resource
    private TAppEquipDispatchDetailService tAppEquipDispatchDetailService;

    @Resource
    private EquipmentService equipmentService;

    @Resource
    private ProjectService projectService;

    @Resource
    private ContractLeaseService contractLeaseService;

	public TAppDispatchServiceImpl(TAppDispatchDao dao) {
		super(dao);
		this.tappDispatchDao = dao;
	}

	public void saveOrUpdate(TAppDispatch tappDispatch) {
		if (tappDispatch.getDisid() == null) {
            //生成调度单号
            String appDispatchSerial = tappDispatchDao.createNextSerial(tappDispatch);
            tappDispatch.setDispatchSerial(appDispatchSerial);

            if(tappDispatch.getContractId()!=null) {
                ContractLease cl = contractLeaseDao.get(tappDispatch.getContractId());
                Project project = projectDao.get(cl.getProjectId());
                if (Status.Project.conclude.equals(project.getStatus())) {
                    project.setStatus(Status.Project.finished);
                    projectDao.save(project);
                }
                for (ContractEquip ce : cl.getContractEquipSet()) {
                    Equipment e = equipmentDao.get(ce.getEquipId());
                    if(!e.getBusinessStatus().equals("2") && !e.getBusinessStatus().equals("3") && !e.getBusinessStatus().equals("6")){
		                e.setBusinessStatus(Status.EquipBusiness.dipatch);
		                equipmentDao.save(e);
                    }
                }
                cl.setApplyforState(Status.ContractApplyfor.waitExecute); // 合同为待执行
                contractLeaseDao.save(cl);
                createDispatch(tappDispatch);
            }
            tappDispatchDao.save(tappDispatch);
		}else{
			tappDispatchDao.merge(tappDispatch);
		}
        stockChange(tappDispatch);
	}

    public void stockChange(TAppDispatch disp){
        for(TAppComponDispatchDetail detail:disp.getDispComponDetailSet()){
            detail.setDisid(disp.getDisid());
            detail.setLogisticNum(detail.getDisNum());
            tappComponDisDetailService.saveOrUpdate(detail,disp);
        }

        for(TAppEquipDispatchDetail detail : disp.getDispEquipDetailSet()){
            detail.setDisid(disp.getDisid());
            detail.setLogisticNum(detail.getDisNum());

            ContractLease cl = contractLeaseService.get(disp.getContractId());

            Project project = projectService.get(cl.getProjectId());
            if (Status.Project.conclude.equals(project.getStatus())) {
                project.setStatus(Status.Project.finished);
                projectService.save(project);
            }
            for (ContractEquip ce : cl.getContractEquipSet()) {
                Equipment e = equipmentService.get(ce.getEquipId());
                if(!e.getBusinessStatus().equals("2") && !e.getBusinessStatus().equals("3") && !e.getBusinessStatus().equals("6")){
	                e.setBusinessStatus(Status.EquipBusiness.dipatch);
	                e.setProjectId(disp.getReceiveId());
                }
                equipmentService.save(e);
            }

            cl.setApplyforState(Status.ContractApplyfor.waitExecute); // 合同为待执行
            contractLeaseService.save(cl);
            tAppEquipDispatchDetailService.save(detail);
            
        	StoreEquipStock ss = new StoreEquipStock();
//			ss.setStoreId(detail.getStoreId());
			ss.setEquipId(detail.getEquipId());
			ss.setProjectId(disp.getProjId());
			ss.setBoundDate(DateUtil.getCurrentLinkDateStr());
			ss.setStockType(Status.EquipComponStore.warehousing);
			storeEquipStockDao.save(ss);
            
        }
        sendMessagePush(disp,"亲，由"+disp.getSendWarehouseName()+"向"+disp.getReceiveWarehouseName()+"的调度指令（计划）" +
                "已下达，请立即进入APP查看，并按照调度单组织装车发货。");
    }

    @Override
    public void sendMessagePush(TAppDispatch tappDispatch,String msg) {
        List<Map<String,Object>> list = queryByScript("terminal.get_currentAppPracti", tappDispatch.getCreateBy());
        BusinessMessage[] bms = new BusinessMessage[list.size()*4];
        List<String> tels = new ArrayList<String>();
        for(int i=0;i<list.size();i++){
            tels.add((String) list.get(i).get("DUTYMAN_TEL1"));
            tels.add((String) list.get(i).get("DUTYMAN_TEL2"));
            tels.add((String) list.get(i).get("DUTYMAN_TEL3"));
            tels.add((String) list.get(i).get("CAPITAL_TEL"));
        }
        for(int i=0;i<bms.length;i++){
            if(tels.get(i)!=null) {
                BusinessMessage bm = new BusinessMessage();
                bm.setReceiveTel(tels.get(i));
                bm.setMessage(msg);
                bm.setSenderName("我要调度消息");
                businessMessageDao.save(bm);
            }
        }
    }

    //生成A8调度管理数据，并入主流程
    public void createDispatch(TAppDispatch tappDispatch){
        for(TAppEquipDispatchDetail detail :tappDispatch.getDispEquipDetailSet()){
            Dispatch dispatch = new Dispatch();
            dispatch.setDispatchTheme("App调度");
            dispatch.setRelateSerial("");
            dispatch.setRelateTheme("");
            dispatch.setStartPlanDate(DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE));
            dispatch.setAutocraneAmount(new BigDecimal(0.00));
            dispatch.setFundStatus(Status.Fund.payment);

            dispatch.setRemark(tappDispatch.getRemark());
            dispatch.setProvidedDate(tappDispatch.getCreateDt());
            dispatch.setUserId(tappDispatch.getCreateBy());
            dispatch.setUserName(tappDispatch.getDispatcher());
            dispatch.setProjectId(tappDispatch.getProjId());
            dispatch.setProjectName(tappDispatch.getProjName());
            dispatch.setRelateId(tappDispatch.getContractId());
            AppUser user = appUserDao.get(tappDispatch.getCreateBy());
            dispatch.setDepartment(user.getDepartment());

            dispatch.setRelateModule(SystemConstant.MODULE_CONTRACT_LEASE);
            dispatch.setRecordId(detail.getRecordId());
            dispatch.setExwSerial(detail.getExwSerial());
            dispatch.setApplyforState(Status.DispatchApplyfor.passed);
            dispatch.setDelFlag("1");
            dispatchDao.saveSerialModel(dispatch);

            DispatchEquip dispatchEquip = new DispatchEquip();
            dispatchEquip.setDispatchId(dispatch.getDispatchId());
            dispatchEquip.setEquipId(detail.getEquipId());
            dispatchEquip.setStartDate(new Date());
            dispatchEquip.setEndDate(new Date());
            dispatchEquipDao.save(dispatchEquip);
        }
    }
	
}
