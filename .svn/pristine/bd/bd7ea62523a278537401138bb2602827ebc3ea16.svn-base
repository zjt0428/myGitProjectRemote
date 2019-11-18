var SideSystemListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "旁站人员",
			name : "Q_reportingPersonnel_S_LK"
		}, {
			lable : "作业时间",
			editable : false,
			width : 115,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_operationDate_S_EQ"
		}, {
			lable : "作业人员",
			name : "Q_operationPersonnel_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readSideSystem
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
			store : {
				fields : SideSystemListViewField
			},
			rowAction : {
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [ {
				header : "项目名称",
				dataIndex : "projectName"
			}, {
				header : "作业时间",
				dataIndex : "operationDate"
			}, {
				header : "作业内容",
				dataIndex : "operationDetail"
			}, {
				header : "设备名称",
				dataIndex : "equipGenericName"
			}, {
				header : "设备型号",
				dataIndex : "equipCategoryName"
			}, {
				header : "作业人员",
				dataIndex : "operationPersonnel"
			}, {
				header : "旁站人员",
				dataIndex : "reportingPersonnel"
			} ]
		};
	SideSystemListView.superclass.constructor.call(this, Ext.apply({
		id : "SideSystemListView",
		title : "旁站记录",
		iconCls : "menu-business-customer",
		url : __ctxPath + "/app/listSideSystem.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SideSystemListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SideSystemMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSideSystem.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_SideSystemPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printSideSystem.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的旁站记录！";
		var msg2 = "您确认要【" + op + "】所选的旁站记录吗？";
		var msg3 = "成功【" + op + "】所选的旁站记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readSideSystem : function(a) {
		new SideSystemForm(a).show();
	},
	delSideSystem : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【删除】的记录！");
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "sideId", __ctxPath + "/app/multiDelSideSystem.do", "删除");
	},
	printSideSystem : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/app/printSideSystem.do?formpage=SideSystem&sideId=" + a[0].data["sideId"];
		});
	}
});