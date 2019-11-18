var AppNavigationView = function() {
	var store = new Ext.data.ArrayStore({
		proxy : new Ext.data.MemoryProxy(),
		fields : [ "id", "img", "name", "menus" ],
		sortInfo : {
			field : "id",
			direction : "ASC"
		}
	});
	/*store.loadData([ [ 1, "equipment01", "商务合同", ["BusinessContract"] ], 
     [ 2, "icon_02", "行政综合", ["Administrative"] ], 
     [ 3, "icon_03", "资产与调度", ["Dispatch"] ], 
     [ 4, "icon_04", "EMA设备管理", ["EquipmentInstall", "EquipmentEmploy", "EquipentDismantle", "EquipentWarehouse"] ], 
     [ 5, "icon_05", "技术安全管理", ["Safety"] ], 
     [ 6, "icon_06", "财务管理", ["FinanceAccountingManager"] ], 
     [ 7, "icon_07", "OA日常办公", ["MyDesktop"] ], 
     [ 8, "icon_08", "客服监督预警", ["Capitals"] ],
     [ 9, "icon_09", "经营风险预警", ["BusinessRisk"] ], 
     [ 10, "icon_10", "领导决策分析", ["Statistics"] ], 
     [ 11, "icon_11", "系统管理", ["SystemSetting"] ] ]);*/
	
store.loadData([ [ 1, "equipment01", "业务申请", ["ContractArrangeListView"] ], 
        [ 2, "b5", "", [""] ],
        [ 3, "equipment02", "租赁合同", ["ContractLeaseListView"] ], 
        [ 4, "b5", "", [""] ],
        [ 5, "dispatch", "发货调度", ["DispatchListView"] ], 
        [ 6, "b5", "", [""] ],
        [ 7, "car", "现场装车", ["LogisticsTransportListView"] ], 
        [ 8, "b5", "", [""] ],
        [ 9, "install", "现场安装", ["EquipInstallListView"] ], 
        [ 10, "b5", "", [""] ],
        [ 11, "plan", "巡检计划", ["EquipInspectSchemaEmployListView"] ], 
        [ 12, "b5", "", [""] ],
        [ 13, "inspection", "巡检管理", ["EquipInspectEmployListView"] ], 
        [ 14, "b5", "", [""] ],
        [ 15, "repair", "故障管理", ["AppRepairListView"] ] ]);
	var dataview = new Ext.DataView({
		style : "padding:120px 50px 0px 50px;",
		store : store,
		tpl : new Ext.XTemplate(
			'<ul>', 
				'<tpl for=".">', 
				'<tpl if="this.isGrantNavigation(menus)">',
					'<li class="navigation" list-style:none; padding:0;margin:0 margin-right:10px; onclick="isGranted({menus}.name)?App.clickTopTab({menus}.name):null">',
					'<img width="64" height="64"  src="img/navigation/{img}.png" title="{name}" />', //values 即store的record
					'<strong>{name}</strong>',
					'</li>',
				'</tpl>',
				'</tpl>',
			'</ul>', {
			isGrantNavigation : this.isGrantNavigation.createDelegate(this)
		}),
		plugins : [ new Ext.ux.DataViewTransition({
			duration : 550,
			idProperty : "id"
		}) ],
		id: "navigations",
		itemSelector : "li.navigation",
		overClass : "navigation-hover",
		singleSelect : true,
		multiSelect : true,
		autoScroll : true
	});
	AppNavigationView.superclass.constructor.call(this, {
		id : "AppNavigationView",
		// cls : "background_navigation",
		baseCls : "ex-panel",
		title : "流程导航",
		iconCls : "menu-idx-navigation",
		layout : "fit",
		items : dataview
	});
};
Ext.extend(AppNavigationView, Ext.Panel, {
	isGrantNavigation : function(menus) {
		for (var i = 0; i < menus.length; i++) {
			if (navigateAccordion.indexOf(menus[i]) >= 0) {
				return true;
			}
		}
		return true;
	}
});