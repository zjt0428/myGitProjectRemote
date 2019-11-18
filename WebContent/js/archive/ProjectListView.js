var ProjectListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "PROJECT_STATUS", {
			width : 75,
			lable : "状态",
			allowBlank : true
		});
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "客户名称",
			name : "Q_unCustomName_S_LK"
		}, {
			lable : "客户简称",
			name : "Q_customerNickName_S_LK"
		}, statusCombo ];
		var advancedItems = [ {
			fieldType : "CHAR_FIELD",
			name : "Q_projectName_S_LK",
			fieldLabel : "项目名称"
		}, 
		{
			fieldType : "CHAR_FIELD",
			name : "Q_unCustomName_S_LK",
			fieldLabel : "客户名称"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_customerNickName_S_LK",
			fieldLabel : "客户简称"
		}, 
		{
			fieldType : "ADDRESS_FIELD"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readProject
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ProjectListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "状态",
			dataIndex : "statusName"
		}, {
			header : "项目编号",
			dataIndex : "projectSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "客户名称",
			dataIndex : "unCustomName"
		}, {
			header : "客户简称",
			dataIndex : "customerNickName"
		}, {
			header : "项目管理人员",
			dataIndex : "materialPractiName"
		},{
			header : "工程地址",
			dataIndex : "street"
		},{
			header : "所属部门",
			dataIndex : "depName"
		}
//		, {
//			header : "销售人员",
//			dataIndex : "practiName"
//		}, {
//			header : "项目规模",
//			dataIndex : "scaleName"
//		}, {
//			header : "楼高",
//			dataIndex : "overallHeight"
//		}, {
//			header : "开工日期",
//			dataIndex : "startPlanDate"
//		}, {
//			header : "预计成交时间",
//			dataIndex : "expectEndDate"
//		} 
		]
	};
	ProjectListView.superclass.constructor.call(this, Ext.apply({
		id : "ProjectListView",
		title : TabTitle.PROJECT_LIST,
		iconCls : "menu-business-project",
		url : __ctxPath + "/archive/listProject.do",
		base_params : this.params,
		/*current_params : {
			"Q_status_S_GT" : 0,
			"Q_status_S_LT" : 3
		},*/
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ProjectListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ProjectAdd")) {
			tbarItems.push({
				id : ListViewButtonsId.projectAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addProject.createDelegate(this)
			});
		}
		if (isGranted("_ProjectEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editProject.createDelegate(this)
			});
		}
		if (isGranted("_ProjectMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delProject.createDelegate(this)
			});
		}
		if (isGranted("_ProjRectStatus")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-edit",
				text : "更改状态",
				menu : {
					items : [{
						text : "作废",
						handler : this.scrapProject.createDelegate(this)
					}, {
						text : "跟进",
						handler : this.fllowingProject.createDelegate(this)
					}, {
						text : "成交",
						handler : this.concludeProject.createDelegate(this)
					}, {
						text : "完成",
						handler : this.finishedProject.createDelegate(this)
					}, {
						text : "结案",
						handler : this.closeProject.createDelegate(this)
					}]
				}			
			});
		}
		if (isGranted("_ProjectChange")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改项目档案",
				handler : this.projectChange.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ProjectPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "部件统计表",
				handler : this.printProject.createDelegate(this)
			});
		}
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
	addProject : function() {
		new ProjectForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editProject : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new ProjectForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delProject : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		for(var i=0;i<a.length;i++){
		if(a[i].data.statusName != "跟进" ){
			$toast("只有状态为【跟进】的项目档案才能进行删除操作");
			return;
		}}
		this.speciallyGridAction(this.dataGridPanel, "projectId", __ctxPath + "/archive/multiDelProject.do", "删除");
	},
	scrapProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "projectId", __ctxPath + "/archive/multiScrapProject.do", "作废");
	},
	fllowingProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "projectId", __ctxPath + "/archive/multiFllowingProject.do", "跟进");
	},
	concludeProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "projectId", __ctxPath + "/archive/multiConcludeProject.do", "成交");
	},
	finishedProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "projectId", __ctxPath + "/archive/multiFinishedProject.do", "完成");
	},
	closeProject : function() {
		this.speciallyGridAction(this.dataGridPanel, "projectId", __ctxPath + "/archive/multiCloseProject.do", "结案");
	},
	exportProject : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportProject.do", this.dataGridPanel);
	},
	printProject : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/archive/printProject.do?formpage=ProjectGather&projectId=" + a[0].data["projectId"];
		});
	},
	projectChange : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("只能选择一条记录");
			return;
		}
		$request({
			url : __ctxPath + "/archive/loadProject.do?projectId=" + a[0].data.projectId,
			success : function(g, h) {
				var resp1 = Ext.util.JSON.decode(g.responseText);
				new ChangeProjectArchivesForm({
					maximized : false ,
					projectId : a[0].data.projectId,
					projectName : a[0].data.projectName,
					unCustomName : a[0].data.unCustomName,
					address : resp1.data[0].address,
					leaseProjectHead : a[0].data.leaseProjectHead,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		})
	}
});