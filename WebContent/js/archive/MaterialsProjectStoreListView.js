var MaterialsProjectStoreListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}];		

	var actionItems = [{
		iconCls : "btn-package_go",
		qtip : "库存",
		handler : this.readStoreProject
	}];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ["projectId","projectName","contractSerial"]
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "项目名称",
			dataIndex : "projectName"
		},{
			header : "合同编号",
			dataIndex : "contractSerial"
		}]
	};
	

	this.storeMaterialsListView = new ProjectMaterialsStoreListView({});
	
	this.storeProjectTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 600,
		maxSize : 800,
		region : "east",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [  this.storeMaterialsListView]
	});
	
	MaterialsProjectStoreListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsProjectStoreListView",
		title : "周材项目仓库",
		iconCls : "menu-business-project",
		url : __ctxPath + "/archive/listOnMaterialsProject.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		items : [ this.storeProjectTabPanel]
	}, a));
};
Ext.extend(MaterialsProjectStoreListView, Knight.ux.SearchGridPanel, {
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
	readStoreProject : function(a) {
		this.storeProjectTabPanel.expand();

		var materialsStore = this.storeMaterialsListView.getDataGridPanel().getStore();
		Ext.apply(materialsStore.baseParams, {
			"Q_project.projectId_L_EQ" : a.projectId
		});
		materialsStore.load();
		this.storeMaterialsListView.projectId = a.projectId;
		this.storeMaterialsListView.setTitle("项目周材");
		this.storeMaterialsListView.searchResetOriginal({
			"Q_project.projectId_L_EQ" : a.projectId
		});
	},

});