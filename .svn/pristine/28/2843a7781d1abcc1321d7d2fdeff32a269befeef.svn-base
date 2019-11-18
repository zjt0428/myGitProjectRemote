/**
 *====================================================
 * 文件名称: AppDispatchAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.text.SimpleDateFormat;
import java.util.*;

import javax.annotation.Resource;

import com.knight.app.model.TAppComponDispatchDetail;
import com.knight.app.model.TAppEquipDispatchDetail;
import com.knight.app.service.TAppEquipDispatchDetailService;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Status;
import com.knight.emms.model.*;
import com.knight.emms.service.*;
import com.knight.emms.terminal.dto.ContractLeaseInfoResponse;
import com.knight.emms.terminal.dto.StoreInfoResponse;

import com.knight.app.model.TAppDispatch;
import com.knight.app.service.TAppComponDispatchDetailService;
import com.knight.app.service.TAppDispatchService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.StringUtils;

/**
 * @ClassName: AppDispatchAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author zhangyz
 * @date 
 */
public class AppDispatchAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;
	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	@Getter
	@Setter
	private TAppDispatch tappDispatch;

	@Getter
	@Setter
	private Long disid;

	@Resource
	private TAppDispatchService tappDispatchService;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private StoreHouseService storeHouseService;

    @Resource
    private ContractLeaseService contractLeaseService;
    
    @Resource
    private EquipmentService equipmentService;

	public String queryList() {
		Query query = getTerminalMessage().getQuery();
		QueryFilter filter = new QueryFilter();
		Integer startRow = 0;
		Integer pageSize = 10;
		if(query!=null){
			if(query.getStart()!=null && query.getStart()>0){
				startRow = query.getStart();
			}
			if(query.getPageSize()!=null && query.getPageSize()>0){
				pageSize = query.getPageSize();
			}
            if(StringUtils.isNotBlank(query.getKeyword())) {
                filter.addFieldsDisjunctFilter("Q_[dispatcher|sendWarehouseName|receiveWarehouseName|remark]_S_LK", query.getKeyword());
            }
			filter.addConjunctFilter("Q_status_S_LK",query.getStatus());
		}
		filter.getPagingBean().setStart(startRow);
		filter.getPagingBean().setPageSize(pageSize);
		filter.addSorted("disid", "desc");
		List<TAppDispatch> list = tappDispatchService.queryTranslateAll(filter);

		successResponse(GsonUtil.toJson(list,true,DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新工作备忘")
	public String add(){
		boolean bl = true;
		Tequest tequest = getTerminalMessage();
		TAppDispatch disp = new TAppDispatch();
		disp.setDisDate(tequest.getDisDate());
		disp.setDispatcher(tequest.getDispatcher());
		disp.setDisType(tequest.getDisType());
        disp.setProjId(tequest.getProjId());
		disp.setProjName(tequest.getProjName());
        disp.setContractId(tequest.getContractId());
		disp.setRemark(tequest.getRemark());
		disp.setCreateBy(tequest.getUserId());
		disp.setCreateDt(df.format(new Date()));
        disp.setSendId(tequest.getSendId());
        disp.setSendWarehouseName(tequest.getSendWarehouseName());
        disp.setSendWarehouseAddress(tequest.getSendWarehouseAddress());
        disp.setSendWarehouseType(tequest.getSendWarehouseType());
        disp.setReceiveId(tequest.getReceiveId());
        disp.setReceiveWarehouseName(tequest.getReceiveWarehouseName());
        disp.setReceiveWarehouseAddress(tequest.getReceWarehouseAddress());
        disp.setReceWarehouseType(tequest.getReceWarehouseType());
		disp.setStatus(Status.AppDispatch.waitingDisp);
		disp.setTransportUnit(tequest.getTransportUnit());
		disp.setDispComponDetailSet(tequest.getDispComponDetailSet());
//		disp.setSubTAppDispatch();
		for(TAppEquipDispatchDetail tad :tequest.getDispEquipDetailSet()){
			Equipment e = equipmentService.get(tad.getEquipId());
			if(!e.getBusinessStatus().equals("2") && !e.getBusinessStatus().equals("3") && !e.getBusinessStatus().equals("6")){
				e.setProjectId(tequest.getProjectId());
				e.setProjectName(tequest.getReceiveWarehouseName());
//				e.setStatus(Status.EquipCompon.inused);
				e.setStatus(Status.EquipCompon.unused);
				e.setBusinessStatus("2");
				equipmentService.update(e);
			}
		}
		disp.setDispEquipDetailSet(tequest.getDispEquipDetailSet());
		tappDispatchService.saveOrUpdate(disp);
		
		setTerminalFileAttach(disp.getDisid(), disp.getFileAttaches());
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\",\"disid\":"+disp.getDisid()+"}");
		return SUCCESS;
	}
	
	public String queryView(){
		Query query = getTerminalMessage().getQuery();
		Long disid = query.getDisid();
		if(disid==null){
			setJsonString("{\"success\":false,\"msg\":\"参数有误。\"}");
			return SUCCESS;
		}
		tappDispatch = tappDispatchService.getTranslate(disid);
		
		List<TAppDispatch> list = new ArrayList<TAppDispatch>();
		list.add(tappDispatch);
		
		successResponse(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}
	
	public String queryStore(){
		Query query = getTerminalMessage().getQuery();
		QueryFilter filter = new QueryFilter();
        filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
		filter.setPagingBean(new PagingBean(0,10000));
		StoreInfoResponse response = new StoreInfoResponse();
		if("houseStore".equals(query.getRelateModule())){
			filter.addConjunctFilter("Q_storeName_S_LK", query.getStoreName());
			List<StoreHouse> list = storeHouseService.getAll(filter);
			for(StoreHouse sh :list){
				response.addStore(null, sh);
			}
		}
		if("projectStore".equals(query.getRelateModule())){
			Long projectId = query.getProjectId();
            filter.addConjunctFilter("Q_status_S_NEQ", "0");
			filter.addConjunctFilter("Q_projectName_S_LK", query.getStoreName());
			if(projectId !=null){
				filter.addConjunctFilter("Q_projectId_L_EQ", String.valueOf(projectId));
			}
			List<Project> list = projectService.getAll(filter);
			for(Project p :list){
				response.addStore(p, null);
			}
		}
		setJsonString(GsonUtil.toJson(response,false));
		return SUCCESS;
	}

    public String queryContractlease() {
        Query query = getTerminalMessage().getQuery();
		QueryFilter filter = new QueryFilter();
		if(StringUtils.isNotBlank(query.getKeyword())) {
			filter.addFieldsDisjunctFilter("Q_[projectName|paEntName]_S_LK", query.getKeyword());
		}
        filter.addValuesDisjunctFilter("Q_applyforState_S_EQ","3,4,5");
        filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
        filter.setPagingBean(new PagingBean(query.getStart(),query.getPageSize()));
        List<ContractLease> contractLeases = contractLeaseService.queryTranslateAll(filter);
        ContractLeaseInfoResponse response = new ContractLeaseInfoResponse();
        for(ContractLease contractLease : contractLeases){
            response.addContractLease(contractLease);
        }
        setJsonString(GsonUtil.toJson(response,false));
        return SUCCESS;
    }

	public String closed(){
		if(getTerminalMessage().getDisid()!= null) {
			TAppDispatch tAppDispatch = tappDispatchService.get(getTerminalMessage().getDisid());
			tAppDispatch.setStatus(Status.AppDispatch.dispClosed);
			tappDispatchService.merge(tAppDispatch);
            tappDispatchService.sendMessagePush(tAppDispatch,"亲，由"+tAppDispatch.getSendWarehouseName()+"向"+tAppDispatch.getReceiveWarehouseName() +
                    "的资产调度已顺利到达目的地了，现已结案，中塔小蜜特此报告");
		}
		return SUCCESS;
	}

}
