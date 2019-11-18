var StoreProjectListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.equipPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = [ {
		lable : "仓库名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "仓库地址",
		name : "Q_address_S_LK"
	}/*, {
		lable : "归属设备",
		name : "Q_projectSerial_S_LK"
	}*/];		

	var actionItems = [{
		iconCls : "btn-package_go",
		qtip : "库存",
		handler : this.readStoreProject
	},{
		iconCls : "btn-package_go",
		qtip : "附件明细",
		handler : this.readAnnexDetails
	}];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ["projectId","projectName","address","constractNo"]
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "仓库名称",
			dataIndex : "projectName"
		},{
			header : "合同编号",
			dataIndex : "constractNo"
		}]
	};
	
	this.storeEquipListView = new StoreEquipListView({
		saveable:true
	});
	this.storeComponListView = new ProjectComponListView({});
	
	this.annexDetailsListView = new AnnexDetailsListView({});
	
	this.storeProjectTabPanel = new Ext.TabPanel({
		tools: [{
	        handler: function(event, toolEl, panel) {
	        	panel.collapse();
	        }
	    }],
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 800,
		maxSize : 800,
		region : "east",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.storeEquipListView, this.storeComponListView,this.annexDetailsListView]
	});
	this.annexDetailsTabPanel = new Ext.TabPanel({
		tools: [{
	        handler: function(event, toolEl, panel) {
	        	panel.collapse();
	        }
	    }],
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 800,
		maxSize : 800,
		region : "west",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [this.annexDetailsListView]
	});
	
	
	StoreProjectListView.superclass.constructor.call(this, Ext.apply({
		id : "StoreProjectListView",
		title : TabTitle.STORE_PROJECT_LIST,
		iconCls : "menu-business-project",
		url : __ctxPath + "/archive/listOnContractProject.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		items : [ this.storeProjectTabPanel,this.annexDetailsTabPanel]
	}, a));
};
Ext.extend(StoreProjectListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];		
		tbarItems.push("->");
		if (isGranted("_ProjectExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportProject.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的项目工程！";
		var msg2 = "您确认要【" + op + "】所选项目工程吗？";
		var msg3 = "成功【" + op + "】所选项目工程！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readProject : function(a) {
		new ProjectForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	exportProject : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportProject.do", this.dataGridPanel);
	},
	readAnnexDetails : function(a){
		this.annexDetailsTabPanel.expand();

		var personnel = this.annexDetailsListView.getDataGridPanel().getStore();
		Ext.apply(personnel.baseParams, {
			"projectId" : a.projectId
			});
	
		
		personnel.load();	
		this.annexDetailsListView.projectId = a.projectId;
		this.annexDetailsListView.setTitle("附件清单");
		this.annexDetailsListView.searchResetOriginal({
			"Q_projectId_L_EQ" : a.projectId
			});
	},
	readStoreProject : function(a) {
		this.storeProjectTabPanel.expand();

		var equipstore = this.storeEquipListView.getDataGridPanel().getStore();
		Ext.apply(equipstore.baseParams, {
			"Q_projectId_L_EQ" : a.projectId,
//			"Q_status_S_EQ" : 0,			
		});
		equipstore.load();
		this.storeEquipListView.projectId = a.projectId;
		this.storeEquipListView.setTitle("项目设备");
		this.storeEquipListView.searchResetOriginal({
			"Q_projectId_L_EQ" : a.projectId
		});

		var componstore = this.storeComponListView.getDataGridPanel().getStore();
		Ext.apply(componstore.baseParams, {
			"Q_projectId_L_EQ" : a.projectId
		});
		componstore.load();
		this.storeComponListView.projectId = a.projectId;
		this.storeComponListView.setTitle("项目配件");
		this.storeComponListView.searchResetOriginal({
			"Q_projectId_L_EQ" : a.projectId
		});
	},

});