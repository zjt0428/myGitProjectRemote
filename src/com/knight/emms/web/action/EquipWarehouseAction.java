/**
 * ====================================================
 * 文件名称: EquipWarehouseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 * ====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.EquipWarehouse;
import com.knight.emms.model.EquipWarehouseCompon;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.EquipWarehouseService;

/**
 * @ClassName: EquipWarehouseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午10:50:07
 */
public class EquipWarehouseAction extends BaseAction {

    private static final long serialVersionUID = 1L;

    @Getter
    @Setter
    private EquipWarehouse equipWarehouse;

    @Getter
    @Setter
    private Long warehouseId;

    @Resource
    private EquipWarehouseService equipWarehouseService;

    @Resource
    private CorpInfoService corpInfoService;

    @Resource
    private BusinessMessageService businessMessageService;

    public String list() {
        QueryFilter filter = new QueryFilter(getRequest());
        List<EquipWarehouse> list = equipWarehouseService.queryTranslateAllFull(filter);
//        List<EquipWarehouse>  map = new ArrayList<EquipWarehouse>();
//        for(EquipWarehouse ew : list){
//        	if(!ew.getEquipFlow().getFlowState().equals("8")){
//        		map.add(ew);
//        	}
//        }
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipFlowDiaryStrategy));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }

    public String load() {
        EquipWarehouse p = equipWarehouseService.getTranslateFull(warehouseId);
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipFlowDiaryStrategy));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }

    @ActionLog(description = "新增或更新入库信息")
    public String save() {
        if (equipWarehouse.getWarehouseId() == null) {
            equipWarehouse.setApplyforState(Status.Applyfor.waitSubmit);
            equipWarehouse.setDelFlag(Constant.ENABLED);
        } else {
            EquipWarehouse p = equipWarehouseService.editLoad(equipWarehouse);
            p.getEquipFlow().getEquipment().setProjectName("");
            p.getEquipFlow().getEquipment().setProjectAddress("");
            p.getEquipFlow().getEquipment().setProjectId(0l);
            equipWarehouse.setEquipFlow(p.getEquipFlow());
            equipWarehouse.setWarehouseSerial(p.getWarehouseSerial());
            equipWarehouse.setApplyforState(p.getApplyforState());
            equipWarehouse.setDelFlag(p.getDelFlag());
        }
        equipWarehouse.setIsScraped(Status.ISSCRAPED.inited);
        equipWarehouseService.saveOrMergeForEdit(equipWarehouse);
        boolean fullWarehouse = true;
        EquipWarehouse warehouse = equipWarehouseService.get(equipWarehouse.getWarehouseId());
        Set<ComponDiary> componDiarySet = warehouse.getEquipFlow().getComponDiarySet();
        /* for (EquipWarehouseCompon ewc : warehouse.getEquipWarehouseComponSet()) {
			if (ewc.getComponDiary().getCounts() > ewc.getComponDiary().getWarehouseCounts() + ewc.getWarehouseCounts()) {
				fullWarehouse = false;
				break;
			}
			componDiarySet.remove(ewc.getComponDiary());
		}*/
        if (fullWarehouse && componDiarySet.size() != 0) {
            for (ComponDiary diary : componDiarySet) {
                if (diary.getWarehouseCounts() < diary.getCounts()) {
                    fullWarehouse = false;
                    break;
                }
            }
        }
        StringBuffer sb = new StringBuffer("{success:true,applyforId:");
        sb.append(equipWarehouse.getApplyforId());
        if (!fullWarehouse) {
            sb.append(",msg:\"该设备还存在未拆卸的配件，请及时办理拆卸\"");
        }
        sb.append("}");
        setJsonString(sb.toString());
        return SUCCESS;
    }

    @ActionLog(description = "删除入库信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
            equipWarehouseService.delete(new Long(id));
        }
        return SUCCESS;
    }

    @ActionLog(description = "提交入库信息")
    public String multiSubmit() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
            EquipWarehouse p = equipWarehouseService.get(new Long(id));
            p.setApplyforState(Status.Applyfor.waitApprove);
            equipWarehouseService.save(p);
            String projectName = p.getEquipFlow().getEquipDiary().getProjectName();
            String recordId = p.getEquipFlow().getEquipDiary().getRecordId();
            String msg = projectName + "项目的备案号为" + recordId + "设备已提交入库申请，请知悉；";
            equipWarehouseService.sendSms(p,msg);
        }
        return SUCCESS;
    }

}
