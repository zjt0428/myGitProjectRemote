var StoreManageView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	

/*	this.equipment = (new EquipmentForm(a, {
		baseWidth : 0.25
	})).formPanel;
	this.equipment.setTitle("基本信息");*/

	this.houseStore = new StoreHouseListView({
		id : "StoreManageView_HouseStore",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : false
		
	});
	this.houseStore.setTitle("基地总库");
	this.projectStore = new StoreProjectListView({
		id : "StoreManageView_AmountPaymentListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true
		
	});
	this.projectStore.setTitle("项目仓库");

	

	StoreManageView.superclass.constructor.call(this, {
		id : "StoreManageView",
		title : "仓库管理",
		activeTab : 0,
		frame : true,
		iconCls : "menu-business-corpview",
		closable : true,
		enableTabScroll : true,
		resizeTabs : false,
		items : [ this.houseStore, this.projectStore]
	});
};
Ext.extend(StoreManageView, Ext.TabPanel, {});