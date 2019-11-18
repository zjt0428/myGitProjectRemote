var StoreHouseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "仓库名称",
			name : "Q_storeName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-package_green",
		qtip : "明细",
		handler : this.readStock
	}, {
		iconCls : "btn-package_go",
		qtip : "库存",
		handler : this.readStoreHouse
	},{
		iconCls : "btn-package_go",
		qtip : "人员授权",
		handler : this.readStoreParsent
	}];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : StoreHouseListViewField
		},
		rowAction : {
			width : 70,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "仓库编号",
			dataIndex : "storeSerial"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}]
	};
	this.storeEquipListView = new StoreEquipListView({

	});
	this.storeComponListView = new StoreComponListView({

	});
	this.personnelAuthorizationForm = new PersonnelAuthorizationForm({
	});
	this.storeHouseTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 600,
		maxSize : 600,
		region : "east",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.storeEquipListView, this.storeComponListView]
	});
	
	this.personnelAuthorizationTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 600,
		maxSize : 600,
		region : "west",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [this.personnelAuthorizationForm]
	});

	this.storeEquipStockListView = new StoreEquipStockListView();
	this.storeComponStockListView = new StoreComponStockListView();
	this.stockHouseTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		height : 150,
		maxSize : 300,
		region : "south",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.storeEquipStockListView, this.storeComponStockListView]
	});
	
	StoreHouseListView.superclass.constructor.call(this, Ext.apply({
		id : "StoreHouseListView",
		title : TabTitle.STORE_HOUSE_LIST,
		iconCls : "menu-business-storehouse",
		url : __ctxPath + "/archive/listStoreHouse.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		items : [ this.storeHouseTabPanel, this.stockHouseTabPanel,this.personnelAuthorizationTabPanel]
	}, a));

};
Ext.extend(StoreHouseListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_StoreHouseAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addStoreHouse.createDelegate(this)
			});
		}
		if (isGranted("_StoreHouseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editStoreHouse.createDelegate(this)
			});
		}
		if (isGranted("_StoreHouseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delStoreHouse.createDelegate(this)
			});
		}
		if (isGranted("_StoreNameChange")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改仓库名称",
				handler : this.changeStoreName.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的仓库！";
		var msg2 = "您确认要【" + op + "】所选仓库吗？";
		var msg3 = "成功【" + op + "】所选仓库！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readStoreHouse : function(a) {
		this.storeHouseTabPanel.expand();

		var equipstore = this.storeEquipListView.getDataGridPanel().getStore();
		Ext.apply(equipstore.baseParams, {
			"Q_storeId_L_EQ" : a.storeId,
			"Q_status_S_GT" : 0,
		});
		equipstore.load();
		this.storeEquipListView.storeId = a.storeId;
		this.storeEquipListView.setTitle(a.storeName + "-库存设备");
		this.storeEquipListView.searchResetOriginal({
			"Q_storeId_L_EQ" : a.storeId
		});

		var componstore = this.storeComponListView.getDataGridPanel().getStore();
		Ext.apply(componstore.baseParams, {
			"storeId" : a.storeId
		});
		componstore.load();
		this.storeComponListView.storeId = a.storeId;
		this.storeComponListView.setTitle(a.storeName + "-库存零配件");
		this.storeComponListView.searchResetOriginal({
			"storeId" : a.storeId
		});
	},
	readStock : function(a) {
		this.stockHouseTabPanel.expand();
		var equipStockListView = this.storeEquipStockListView.getDataGridPanel().getStore();
		Ext.apply(equipStockListView.baseParams, {
			"Q_storeId_L_EQ" : a.storeId
		});
		equipStockListView.load();
		this.storeEquipStockListView.storeId = a.storeId;
		this.storeEquipStockListView.setTitle(a.storeName + "-设备出入情况");
		this.storeEquipStockListView.searchResetOriginal({
			"Q_storeId_L_EQ" : a.storeId
		});

		var componStockListView = this.storeComponStockListView.getDataGridPanel().getStore();
		Ext.apply(componStockListView.baseParams, {
			"Q_storeId_L_EQ" : a.storeId
		});
		componStockListView.load();
		this.storeComponStockListView.storeId = a.storeId;
		this.storeComponStockListView.setTitle(a.storeName + "-配件出入情况");
		this.storeComponStockListView.searchResetOriginal({
			"Q_storeId_L_EQ" : a.storeId
		});
	},
	readStoreParsent : function(a) {
		this.personnelAuthorizationTabPanel.expand();

		var personnel = this.personnelAuthorizationForm.getDataGridPanel().getStore();
		Ext.apply(personnel.baseParams, {
			"storeId" : a.storeId
			});
	
		
		personnel.load();	
		this.personnelAuthorizationForm.storeId = a.storeId;
		this.personnelAuthorizationForm.setTitle(a.storeName + "-人员授权");
		this.personnelAuthorizationForm.searchResetOriginal({
			"Q_storeId_L_EQ" : a.storeId
			});

	},
	addStoreHouse : function() {
		new StoreHouseForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editStoreHouse : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new StoreHouseForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delStoreHouse : function() {
		this.speciallyGridAction(this.dataGridPanel, "storeId", __ctxPath + "/archive/multiDelStoreHouse.do", "删除");
	},
	changeStoreName : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("只能选择一条记录");
			return;
		}
		new ChangeStoreArchivesForm({
			maximized : false ,
			storeId : a[0].data.storeId,
			storeName : a[0].data.storeName,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});