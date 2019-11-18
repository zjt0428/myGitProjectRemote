/**
 *====================================================
 * 文件名称: EquipWarehouseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.app.service.TAppRepairService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.model.ComponIntoStore;
import com.knight.emms.model.ComponIntoStoreDetail;
import com.knight.emms.service.ComponIntoStoreDetailService;
import com.knight.emms.service.ComponIntoStoreService;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.IndexWarnService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipWarehouseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午10:50:07
 */
public class IndexWarnAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private IndexWarnService indexWarnService;
	@Resource
	private TAppRepairService repairService;

	public String get(){
		HashMap<String, Integer> maps=new HashMap<String, Integer>();

		
		//闲置：设备档案，业务状态为“待用”的设备数量
		maps.put("leaveEquip", indexWarnService.leaveEquip());		
		
		//借用：借用管理-借用登记设备-状态为未还的设备数量
		maps.put("borrowEquip", indexWarnService.borrowEquip());		
		
		//注销：设备档案，状态为“注销”的设备数量
		maps.put("cancelEquip", indexWarnService.cancelEquip());		
		
		//报废：设备档案，状态为“报废”的设备数量
		maps.put("uselessEquip", indexWarnService.uselessEquip());		

		//合同下单：显示“租赁合同”中审批通过的合同数量（被查看后的数量不再显示）
		maps.put("contract", indexWarnService.contract());		

		//已出库：设备档案，业务状态为“调度”的设备数量
		maps.put("stockOut", indexWarnService.stockOut());		
		
		//在途中：物流管理，物流状态为“已出货”的设备数量
		maps.put("logisOut", indexWarnService.logisOut());		
		
		//已签收：物流管理，物流状态为“已签收”的设备数量
		maps.put("logisSign", indexWarnService.logisSign());		
		
		//安装：“现场安装”未审批的状态
		maps.put("installForCheck", indexWarnService.installForCheck());		
		
		//待启用：“现场安装”审批通过的状态
		maps.put("installForChecked", indexWarnService.installForChecked());		
		
		//检测：设备做了“检测管理”的状态。
		maps.put("equipForDetect", indexWarnService.equipForDetect());		
		
		//验收：设备做了“验收管理”的状态。
		maps.put("equipForAccept", indexWarnService.equipForAccept());		
		
		//使用中：“启用管理”生效后的状态、做了“停用管理”的“恢复”的状态
		maps.put("equipForUse", indexWarnService.equipForUse());		
		
		//待维修：“维修管理”未完成维修的状态，维修完成状态为“使用中”
		maps.put("equipForRepair", indexWarnService.equipForRepair());		
		
		//待巡检：根据巡检计划自动生成“巡检管理”未填报的状态，巡检完成状态为“使用中”。
		maps.put("equipForPoll", indexWarnService.equipForPoll());		
		
		//待保养：根据保养计划自动生成“保养管理”未填报的状态，保养完成状态为“使用中”
		maps.put("equipForKeep", indexWarnService.equipForKeep());		

		
		//待整改：做了“隐患上报”且“未反馈”的状态，整改反馈完成后状态为“使用中”
		maps.put("reform", indexWarnService.reform());		
		
		//报停：设备做了“停用管理”状态（字体为红色）。
		maps.put("equipForQuip", indexWarnService.equipForQuip());		
		
		//拆卸：审批通过的“现场拆卸”状态。
		maps.put("demount", indexWarnService.demount());		
		
		//转场维保：已提交且未审批通过的“转场维保”状态。
		maps.put("cutTo", indexWarnService.cutTo());		
		
		//入库异常：“转场维保”自动生成“入库异常”时，该设备的状态
		maps.put("putExcep", indexWarnService.putExcep());		

		//在用设备分布：“设备档案”中所有在用设备（状态为“在用”）数量
		maps.put("useedEquip", indexWarnService.useedEquip());		

		//待维修超期
		maps.put("repairOut", indexWarnService.repairOut());		

		//待巡检超期
		maps.put("pollOut", indexWarnService.pollOut());		

		//总资产及库存
		maps.put("stocks", indexWarnService.stocks());		

		//加节/降节动态
		maps.put("addDrop", indexWarnService.addDrop());		

		//远程安全预警
		maps.put("remote", indexWarnService.remote());		

		//待审业务
		maps.put("businessForChek", indexWarnService.businessForChek());		
		
		//当前总在用设备
		maps.put("useTotal", indexWarnService.useTotal());		

		//本月新增在用设备
		maps.put("useMonthAdd", indexWarnService.useMonthAdd());		

		//当前总闲置设备
		maps.put("freeTotal", indexWarnService.freeTotal());		

		//本月新增闲置设备
		maps.put("freeMonthAdd", indexWarnService.freeMonthAdd());		
		//带维保
		maps.put("maiteQulListCount", indexWarnService.maiteQulListCount());		

		//周期件提醒 
		maps.put("perReminListCount", indexWarnService.perReminListCount());		

		//将到期资质
		maps.put("enterQulListCount", indexWarnService.enterQulListCount());		

		//将到期岗位证
		maps.put("postQulListCount", indexWarnService.postQulListCount());		

		//将到期保单
		maps.put("policyQulListCount", indexWarnService.policyQulListCount());		

		successResponse(GsonUtil.toJson(maps));
		return SUCCESS;
	}

	public String getShow(){
		List<Map> list=new ArrayList();
		List<Map<String, Object>> list1=repairService.queryByScript("indexShow.show1");
		list.add(getMap(list1,"租赁合同"));
		List<Map<String, Object>> list2=repairService.queryByScript("indexShow.show2");
		list.add(getMap(list2,"调度管理 "));
		List<Map<String, Object>> list3=repairService.queryByScript("indexShow.show3");
		list.add(getMap(list3,"物流管理"));
		List<Map<String, Object>> list4=repairService.queryByScript("indexShow.show4");
		list.add(getMap(list4,"现场安装"));
//		List<Map<String, Object>> list6=repairService.queryByScript("indexShow.show6");
//		list.add(getMap(list6,"使用管理"));
		List<Map<String, Object>> list7=repairService.queryByScript("indexShow.show7");
		list.add(getMap(list7,"维修管理"));
		List<Map<String, Object>> list8=repairService.queryByScript("indexShow.show8");
		list.add(getMap(list8,"现场拆卸 "));
		List<Map<String, Object>> list9=repairService.queryByScript("indexShow.show9");
		list.add(getMap(list9,"转场维保"));
		List<Map<String, Object>> list10=repairService.queryByScript("indexShow.show10");
		list.add(getMap(list10,"配件领用 "));
		List<Map<String, Object>> list11=repairService.queryByScript("indexShow.show11");
		list.add(getMap(list11,"采购管理"));
		List<Map<String, Object>> list12=repairService.queryByScript("indexShow.show12");
		list.add(getMap(list12,"借用管理"));
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	public String perReminList(){
		List<Map<String, Object>> list=repairService.queryByScript("indexShow.perReminList");
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	public String enterQulList(){
		List<Map<String, Object>> list=repairService.queryByScript("indexShow.enterQulList");
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	public String postQulList(){
		List<Map<String, Object>> list=repairService.queryByScript("indexShow.postQulList");
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	public String policyQulList(){
		List<Map<String, Object>> list=repairService.queryByScript("indexShow.policyQulList");
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	public String maiteQulList(){
		List<Map<String, Object>> list=repairService.queryByScript("indexShow.maiteQulList");
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	protected void successResponse(String result) {
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + result + "}}");
	}

	private Map getMap(List<Map<String, Object>> list,String mudel){
		Map map=new HashMap<String, Object>();
		map.put("mudel", mudel);map.put("t0",0);map.put("t1",0);map.put("t2",0);map.put("t3",0);
		for(int i=0;i<list.size();i++){
			if(list.get(i).get("keu")==null){
				continue;
			}
			else if(Integer.valueOf(list.get(i).get("keu").toString())==0){
				map.put("t0",(Integer)list.get(i).get("num1"));
			}else if(Integer.valueOf(list.get(i).get("keu").toString())==1){
				map.put("t1",(Integer)list.get(i).get("num1"));
			}else if(Integer.valueOf(list.get(i).get("keu").toString())==2){
				map.put("t2",(Integer)list.get(i).get("num1"));
			}else if(Integer.valueOf(list.get(i).get("keu").toString())==3){
				map.put("t3",(Integer)list.get(i).get("num1"));
			}
		}
		return map;
	}
}
