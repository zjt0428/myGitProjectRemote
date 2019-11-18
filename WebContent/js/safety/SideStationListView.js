var SideStationListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "旁站编号",
			name : "Q_stationSerial_S_LK"
		}, {
			lable : "类别",
			name : "Q_category_S_LK"
		}, {
			lable : "旁站内容",
			name : "Q_details_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readSideStation
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
			store : {
				fields : SideStationListViewField
			},
			rowAction : {
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [ {
				header : "旁站编号",
				dataIndex : "stationSerial"
			}, {
				header : "类别",
				dataIndex : "category"
			}, {
				header : "旁站内容",
				dataIndex : "details"
			} ]
		};
	SideStationListView.superclass.constructor.call(this, Ext.apply({
		id : "SideStationListView",
		title : "旁站明细设置",
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listSideStation.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SideStationListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SideStationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSideStation.createDelegate(this)
			});
		}
		if (isGranted("_SideStationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSideStation.createDelegate(this)
			});
		}
		if (isGranted("_SideStationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSideStation.createDelegate(this)
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
	readSideStation : function(a) {
		new SideStationForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addSideStation : function() {
		new SideStationForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		 }).show();
	},
	editSideStation : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new SideStationForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delSideStation : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【删除】的记录！");
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "stationId", __ctxPath + "/safety/multiDelSideStation.do", "删除");
	}
});