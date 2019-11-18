var PumpTruckListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var pumpNumberCombo = $initComboBoxField("泵车型号", "Q_pumpNumber_S_EQ", "pumpNumber", {
			width : 75,
			lable : "泵车型号",
			allowBlank : true
		});
		var generalItems = [ {
			lable : "车牌号",
			name : "Q_licensePlate_S_LK"
		}, pumpNumberCombo,{
			lable : "出厂日期:",
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_releaseDate_S_EQ"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readPumpTruck
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : PumpTruckListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "车牌号",
			dataIndex : "licensePlate"
		}, {
			header : "泵车类型",
			dataIndex : "pumpTypeName"
		}, {
			header : "泵车型号",
			dataIndex : "pumpNumberName"
		}, {
			header : "出厂日期",
			dataIndex : "releaseDate"
		}]
	};
	PumpTruckListView.superclass.constructor.call(this, Ext.apply({
		id : "PumpTruckListView",
		title : "泵车系统",
		iconCls : "menu-business-corp",
		url : __ctxPath + "/pump/listPumpTruck.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PumpTruckListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PumpTruckAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPumpTruck.createDelegate(this)
			});
		}
		if (isGranted("_PumpTruckEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPumpTruck.createDelegate(this)
			});
		}
		if (isGranted("_PumpTruckMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPumpTruck.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的泵车！";
		var msg2 = "您确认要【" + op + "】所选的泵车吗？";
		var msg3 = "成功【" + op + "】所选的泵车！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readPumpTruck : function(a) {
		new PumpTruckForm(a).show();
	},
	addPumpTruck : function() {
		new PumpTruckForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editPumpTruck : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new PumpTruckForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPumpTruck : function() {
		this.speciallyGridAction(this.dataGridPanel, "pumpId", __ctxPath + "/archive/multiDelPumpTruck.do", "删除");
	}
});