package com.knight.emms.service;

import com.knight.system.service.BusinessLongPKService;

public interface IndexWarnService {

	//闲置：设备档案，业务状态为“待用”的设备数量
	public int leaveEquip();
	
	
	//借用：借用管理-借用登记设备-状态为未还的设备数量
	public int borrowEquip();
	
	//注销：设备档案，状态为“注销”的设备数量
	public int cancelEquip();
	
	//报废：设备档案，状态为“报废”的设备数量
	public int uselessEquip();

	//合同下单：显示“租赁合同”中审批通过的合同数量（被查看后的数量不再显示）
	public int contract();

	//已出库：设备档案，业务状态为“调度”的设备数量
	public int stockOut();
	
	//在途中：物流管理，物流状态为“已出货”的设备数量
	public int logisOut();
	
	//已签收：物流管理，物流状态为“已签收”的设备数量
	public int logisSign();
	
	//安装：“现场安装”未审批的状态
	public int installForCheck();
	
	//待启用：“现场安装”审批通过的状态
	public int installForChecked();
	
	//检测：设备做了“检测管理”的状态。
	public int equipForDetect();
	
	//验收：设备做了“验收管理”的状态。
	public int equipForAccept();
	
	//使用中：“启用管理”生效后的状态、做了“停用管理”的“恢复”的状态
	public int equipForUse();
	
	//待维修：“维修管理”未完成维修的状态，维修完成状态为“使用中”
	public int equipForRepair();
	
	//待巡检：根据巡检计划自动生成“巡检管理”未填报的状态，巡检完成状态为“使用中”。
	public int equipForPoll();
	
	//待保养：根据保养计划自动生成“保养管理”未填报的状态，保养完成状态为“使用中”
	public int equipForKeep();
	
	//待整改：做了“隐患上报”且“未反馈”的状态，整改反馈完成后状态为“使用中”
	public int reform();
	
	//报停：设备做了“停用管理”状态（字体为红色）。
	public int equipForQuip();
	
	//拆卸：审批通过的“现场拆卸”状态。
	public int demount();
	
	//转场维保：已提交且未审批通过的“转场维保”状态。
	public int cutTo();
	
	//入库异常：“转场维保”自动生成“入库异常”时，该设备的状态
	public int putExcep();

	//在用设备分布：“设备档案”中所有在用设备（状态为“在用”）数量
	public int useedEquip();

	//待维修超期
	public int repairOut();

	//待巡检超期
	public int pollOut();

	//总资产及库存
	public int stocks();

	//加节/降节动态
	public int addDrop();

	//远程安全预警
	public int remote();

	//待审业务
	public int businessForChek();
	
	//当前总在用设备
	public int useTotal();
	
	//本月新增在用设备
	public int useMonthAdd();
	
	//当前总闲置设备
	public int freeTotal();

	//本月新增闲置设备
	public int freeMonthAdd();
	
	//带维保
	public int maiteQulListCount();
	
	//周期件提醒 
	public int perReminListCount();
	
	//将到期资质
	public int enterQulListCount();
	
	//将到期岗位证
	public int postQulListCount();
	
	//将到期保单
	public int policyQulListCount();
	

}
