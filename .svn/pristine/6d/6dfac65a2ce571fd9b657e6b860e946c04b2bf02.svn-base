package com.knight.emms.terminal.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.app.dao.TAppLogisticsCompDao;
import com.knight.app.dao.TAppLogisticsEquipDao;
import com.knight.app.model.*;
import com.knight.app.service.TAppComponDispatchDetailService;
import com.knight.app.service.TAppDispatchService;
import com.knight.app.service.TAppLogisticsService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Car;
import com.knight.emms.model.DispatchAllocate;
import com.knight.emms.model.DispatchAllocateInit;
import com.knight.emms.model.LogisticsTransport;
import com.knight.emms.service.CarService;
import com.knight.emms.service.DispatchAllocateInitService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.FileAttach;
import com.knight.system.service.CodeService;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.ApplicationContext;

public class AppLogisticsAction extends TerminalBaseAction{

    @Resource
    private TAppLogisticsService tAppLogisticsService;

    @Resource
    private FileAttachService fileAttachService;

	@Resource
	private CarService carService;

    @Resource
    private TAppDispatchService tappDispatchService;

    @Resource
    private DispatchAllocateInitService dispatchAllocateInitService;

    @Resource
    private CodeService codeService;

    public String list(){
		Query q = getTerminalMessage().getQuery();
        List<Map<String,Object>> logisticsList = tAppLogisticsService.list(q);
        successResponse(GsonUtil.toJson(logisticsList));
		return SUCCESS;
	}

	public String load(){
        TAppLogistics tAppLogistics = tAppLogisticsService.get(getTerminalMessage().getQuery().getLogiId());
        List<FileAttach> fileIds = fileAttachService.getByDepend(getTerminalMessage().getQuery().getLogiId(), SystemConstant.MODULE_APP_LOGISTICS);
        List<FileAttach> fileIds_rece = fileAttachService.getByDepend(getTerminalMessage().getQuery().getLogiId(), SystemConstant.MODULE_APP_LOGI_RECEIVE);
//        tAppLogistics.setFileAttaches(StringUtils.join(fileIds, ","));
//        tAppLogistics.setFileAttachesReceived(StringUtils.join(fileIds_rece, ","));
        List<Map> images1 = new ArrayList<Map>();
        List<Map> images2 = new ArrayList<Map>();
        Map<String,Object> map1 = null;
        FileAttach attch1=null;
		for(int i=0;i<fileIds.size();i++){
			attch1=fileIds.get(i);
			if(tAppLogistics.getFileAttaches().contains(attch1.getFileId()+"")) {
				map1=new HashMap<String, Object>();
				map1.put("fileid", attch1.getFileId());
				map1.put("filesource", attch1.getSource());
				map1.put("imagePath", Constant.IMG_PRE_PATH+attch1.getFilePath());
				images1.add(map1);
			}
		}
		Map<String,Object> map2 = null;
        FileAttach attch2=null;
		for(int i=0;i<fileIds_rece.size();i++){
			attch2=fileIds_rece.get(i);
			if(tAppLogistics.getFileAttachesReceived().contains(attch2.getFileId()+"")) {
				map2=new HashMap<String, Object>();
				map2.put("fileid", attch2.getFileId());
				map2.put("filesource", attch2.getSource());
				map2.put("imagePath", Constant.IMG_PRE_PATH+attch2.getFilePath());
				images2.add(map2);
			}
		}
		tAppLogistics.setFileAttachesPath(images1);
		tAppLogistics.setFileAttachesReceivedPath(images2);
        successResponse(GsonUtil.toJson(tAppLogistics,GsonUtil.SINCE_VERSION_20, false));
		return SUCCESS;
	}
	
	public String add(){
		Tequest tequest = getTerminalMessage();
		TAppLogistics tAppLogistics = new TAppLogistics();
        tAppLogistics.setDisid(tequest.getDisid());
		tAppLogistics.setDeliveryMan(tequest.getDeliveryMan());
        tAppLogistics.setDeliveryDate(tequest.getDeliveryDate());
        tAppLogistics.setSendId(tequest.getSendId());
        tAppLogistics.setSendWarehouseName(tequest.getSendWarehouseName());
        tAppLogistics.setSendWarehouseType(tequest.getSendWarehouseType());
        tAppLogistics.setReceiveId(tequest.getReceiveId());
        tAppLogistics.setReceiveWarehouseName(tequest.getReceiveWarehouseName());
        tAppLogistics.setReceWarehouseType(tequest.getReceWarehouseType());
        tAppLogistics.setReceWarehouseAddress(tequest.getReceWarehouseAddress());
        tAppLogistics.setPropertyName(tequest.getPropertyName());
        tAppLogistics.setSummary(BigDecimalUtil.parserBigDecimal(tequest.getSummary()));
        tAppLogistics.setStatus(Status.AppLogistics.waitingRece);
        tAppLogistics.setRemark(tequest.getRemark());
        tAppLogistics.setCarId(tequest.getCarId());
        tAppLogistics.setLicensePlate(tequest.getLicensePlate());
        tAppLogistics.setFileAttaches(tequest.getFileAttaches());
        tAppLogistics.setIsComplete(tequest.getIsComplete());
        tAppLogistics.setTAppLogisticsCompSet(tequest.getTAppLogisticsCompSet());
        tAppLogistics.setTAppLogisticsEquipSet(tequest.getTAppLogisticsEquipSet());
        tAppLogistics.setLogisticsTranDistributionSet(tequest.getLogisticsTranDistributionSet());
        tAppLogisticsService.saveOrUpdate(tAppLogistics);
        tAppLogisticsService.sendMessagePush(tAppLogistics,"亲，由"+tAppLogistics.getSendWarehouseName()+"向"+tAppLogistics.getReceiveWarehouseName()+"的调度指令" +
                "（计划）已于"+tAppLogistics.getDeliveryDate()+"装车发货，请做好现场接货签收工作。");
		setTerminalFileAttach(tAppLogistics.getLogiId(), tequest.getFileAttaches());
        switchDispatchStatus(tAppLogistics.getDisid(),tAppLogistics);
		return SUCCESS;
	}

    public boolean isLogiFinished(Long disid){
        QueryFilter queryFilter = new QueryFilter();
        queryFilter.addConjunctFilter("Q_disid_L_EQ",disid+"");
        List<TAppDispatch> list_dispatch = tappDispatchService.getAll(queryFilter);
        for(TAppDispatch disp:list_dispatch){
            for(TAppComponDispatchDetail comDetail :disp.getDispComponDetailSet()){
                if(comDetail.getLogisticNum()!=0){
                    return false;
                }
            };
            for (TAppEquipDispatchDetail equipDetail:disp.getDispEquipDetailSet()) {
                if(equipDetail.getLogisticNum()!=0){
                    return false;
                }
            }
        }
        return true;
    }

    public void switchDispatchStatus(Long disid,TAppLogistics tAppLogistics){
        if(isLogiFinished(disid)){
            TAppDispatch tappDispatch = tappDispatchService.get(disid);
            if(tAppLogistics.getIsComplete().equals("0")){
            	tappDispatchService.merge(tappDispatch);
            }else{
            	tappDispatch.setStatus(Status.AppDispatch.waitingClosed);
                tappDispatchService.merge(tappDispatch);
            }
        }
    }

    public String receive(){
        Tequest tequest = getTerminalMessage();
        TAppLogistics tAppLogistics =  tAppLogisticsService.get(tequest.getLogiId());
        tAppLogistics.setSignResult(tequest.getSignResult());
        tAppLogistics.setSignMan(tequest.getSignMan());
        tAppLogistics.setSignPic(tequest.getSignPics());
        tAppLogistics.setSignDate(tequest.getSignDate());
        tAppLogistics.setSignAddress(tequest.getSignAddress());
        tAppLogistics.setFileAttachesReceived(tequest.getFileAttaches());
        tAppLogistics.setRemarkRece(tequest.getRemark());
        tAppLogistics.setTAppLogisticsCompSet(tequest.getTAppLogisticsCompSet());
        tAppLogistics.setTAppLogisticsEquipSet(tequest.getTAppLogisticsEquipSet());
        tAppLogistics.setStatus(Status.AppLogistics.Received);
        tAppLogisticsService.receive(tAppLogistics);
        setTerminalFileAttach(tAppLogistics.getLogiId(), tequest.getFileAttaches());
        tAppLogisticsService.sendMessagePush(tAppLogistics,"亲，由"+tAppLogistics.getSendWarehouseName()+"向"+tAppLogistics.getReceiveWarehouseName() +
                "的资产调度已由"+tAppLogistics.getSignMan()+"签收，签收结果为"+tAppLogistics.getSignResult()+"，请知悉。");
        return SUCCESS;
    }

	public String queryCar(){
		Query query = getTerminalMessage().getQuery();
		String licensePlate = query.getLicensePlate();
		String sedan = query.getSedan();
		String propertyName = query.getPropertyName();
        Integer start = query.getStart();
        Integer pageSize = query.getPageSize();
		List<Map<String,Object>> cars = carService.queryByScript("terminal.list_car",licensePlate,sedan,propertyName,start,pageSize);
		successResponse(GsonUtil.toJson(cars));
		return SUCCESS;
	}

    public String addCar(){
        Tequest tequest = getTerminalMessage();
        String licensePlate = tequest.getLicensePlate();
        String sedan = tequest.getSedan();
        String propertyName = tequest.getPropertyName();
        String driverPhone = tequest.getDriverPhone();
        Car car = new Car();
        car.setLicensePlate(licensePlate);
        car.setSedan(sedan);
        car.setPropertyName(propertyName);
        car.setPurchaseDate(new Date());
        car.setDriverPhone(driverPhone);
        car.setStatus(Constant.ENABLED);
        car.setDelFlag(Constant.ENABLED);
        carService.save(car);
        return SUCCESS;
    }

    public String listAllocates(){
        Query query = getTerminalMessage().getQuery();
        QueryFilter filter = new QueryFilter();
        filter.addFieldsDisjunctFilter("Q_[componGenericName|componSpecificName]_S_LK", query.getFirstKeyword() == null ? "" :  query.getFirstKeyword());
        filter.addFieldsDisjunctFilter("Q_[componGenericName|componSpecificName]_S_LK", query.getSecondKeyword() == null?"":  query.getSecondKeyword());
        filter.setPagingBean(new PagingBean(0,10000));
        List<DispatchAllocateInit> list = dispatchAllocateInitService.queryTranslateAll(filter);
        successResponse(GsonUtil.toJson(list));
        return SUCCESS;
    }
}
