var EquipmentCheckListView = function(a,b){
	Ext.apply(this,a||{});
	Ext.apply(this,b||{});
	
	this.towerCheck = new InspectSelfInitListView({
		id : "towerInspectInitListView",
		iconCls : "menu-info",
		typeId : "1",
		actionDisenable : true,
		tbarDisenable : false
	});
	this.towerCheck.setTitle("塔机【签到】");
	this.towerCheckBack = new InspectSelfInitListView({
		id:"towerInspectInitListBackView",
		iconCls : "menu-info",
		typeId : "3",
		actionDisenable:true,
		tbarDisenable:false
	});
	this.towerCheckBack.setTitle("塔机【签退】");
	
	this.liftCheck = new InspectSelfInitListView({
        id:"liftInspectInitListView",
        iconCls : "menu-info",
		typeId : "2",
		actionDisenable:true,
		tbarDisenable:false
	});
	this.liftCheck.setTitle("升降机【签到】");
	this.liftCheckBack = new InspectSelfInitListView({
		id:"liftInspectInitListBackView",
		iconCls : "menu-info",
		typeId : "4",
		actionDisenable:true,
		tbarDisenable:false
	});
	this.liftCheckBack.setTitle("升降机【签退】");
	
	this.signalCheck = new InspectSelfInitListView({
        id:"signalInspectInitListView",
        iconCls : "menu-info",
		typeId : "5",
		actionDisenable:true,
		tbarDisenable:false
	});
	this.signalCheck.setTitle("信号工【签到】");
	this.signalCheckBack = new InspectSelfInitListView({
		id:"signalInspectInitListBackView",
		iconCls : "menu-info",
		typeId : "6",
		actionDisenable:true,
		tbarDisenable:false
	});
	this.signalCheckBack.setTitle("信号工【签退】");
	
	EquipmentCheckListView.superclass.constructor.call(this,{
		id : "EquipmentCheckListView",
		title : "自检项目",
		activeTab : 0,
		iconCls : "menu-business-verifyitem",
		items : [this.towerCheck,this.towerCheckBack,this.liftCheck,this.liftCheckBack,this.signalCheck,this.signalCheckBack]
	});
};
Ext.extend(EquipmentCheckListView,Ext.TabPanel,{});