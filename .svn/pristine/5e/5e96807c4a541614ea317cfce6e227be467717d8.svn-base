var BaseDepotListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "仓库名称",
			name : "Q_depotName_S_LK"
		}];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readBaseDepot
	}, {
		iconCls : "btn-package_go",
		qtip : "库存",
		handler : this.readStoreHouse
	}, {
		iconCls : "btn-package_go",
		qtip : "人员授权",
		handler : this.readStoreParsent
	} ];
	//周材仓库
	this.storeMaterialsListView = new StoreMaterialsListView({

	});
	this.personnelAuthorizationForm = new PersonnelAuthorization4BasedepotForm({
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
		items : [ this.storeMaterialsListView]
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
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : BaseDepotListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "仓库名称",
				dataIndex : "depotName"
			}, {
				header : "联系人",
				dataIndex : "linkman"
			}, {
				header : "地址",
				dataIndex : "address"
			}, {
				header : "描述",
				dataIndex : "description"
			}]
	}
	
	BaseDepotListView.superclass.constructor.call(this, Ext.apply({
		id : "BaseDepotListView",
		title : "仓库设置",
		iconCls : "menu-business-corp",
		url : __ctxPath + "/materials/listBaseDepot.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		items : [ this.storeHouseTabPanel,this.personnelAuthorizationTabPanel]
		
	}, a));
}

Ext.extend(BaseDepotListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的仓库信息！";
		var msg2 = "您确认要【" + op + "】所选的仓库信息吗？";
		var msg3 = "成功【" + op + "】所选的仓库信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	readStoreHouse : function(a) {
		this.storeHouseTabPanel.expand();

		var equipstore = this.storeMaterialsListView.getDataGridPanel().getStore();
		Ext.apply(equipstore.baseParams, {
			"Q_baseDepot.depotId_L_EQ" : a.depotId
		});
		equipstore.load();
		this.storeMaterialsListView.depotId = a.depotId;
		this.storeMaterialsListView.setTitle("管辖资产");
		this.storeMaterialsListView.searchResetOriginal({
//			"Q_baseDepot.depotId_L_EQ" : a.depotId
		});
	},
	readStoreParsent : function(a) {
		this.personnelAuthorizationTabPanel.expand();

		var personnel = this.personnelAuthorizationForm.getDataGridPanel().getStore();
		Ext.apply(personnel.baseParams, {
			"depotId" : a.depotId
			});
	
		
		personnel.load();	
		this.personnelAuthorizationForm.storeId = a.depotId;
		this.personnelAuthorizationForm.setTitle("数据权限");
		this.personnelAuthorizationForm.searchResetOriginal({
			"Q_depotId_L_EQ" : a.depotId
			});

	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BaseDepotAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addBaseDepot.createDelegate(this)
			});
		}
		if (isGranted("_BaseDepotEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editBaseDepot.createDelegate(this)
			});
		}
		if (isGranted("_BaseDepotMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delBaseDepot.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readBaseDepot : function(a) {
		new BaseDepotForm(a).show();
	},
	
	addBaseDepot : function(){
		new BaseDepotForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editBaseDepot : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new BaseDepotForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delBaseDepot : function(){
		this.speciallyGridAction(this.dataGridPanel, "depotId", __ctxPath + "/materials/multiDelBaseDepot.do", "删除");
	}
});