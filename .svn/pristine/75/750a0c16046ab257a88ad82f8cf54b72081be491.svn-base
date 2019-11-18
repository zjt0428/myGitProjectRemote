var CarListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "车号",
			name : "Q_licensePlate_S_LK"
		}, {
			lable : "额定载重量",
			name : "Q_nominalLoad_BD_EQ"
		}, {
			lable : "司机",
			name : "Q_driver_S_LK"
		}, {
			lable : "品牌型号",
			name : "Q_sedan_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readCar
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : CarListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 30,
			renderer : function(n) {
				return n == "0" ? "<font color='red'>在用</font>" : "闲置";
			}
		}, {
			header : "车号",
			dataIndex : "licensePlate"
		}, {
			header : "车型",
			dataIndex : "sedan"
		}, {
			header : "额定载重量",
			dataIndex : "nominalLoad"
		}, {
			width : 80,
			header : "产权归属",
			dataIndex : "propertyBelong",
			renderer : function(n) {
				return n == "1" ? "自有" : "租赁";
			}
		}, {
			header : "司机",
			dataIndex : "driver"
		}, {
			width : 80,
			header : "累计支出金额",
			dataIndex : "disbursement"
		} ]
	};
	CarListView.superclass.constructor.call(this, Ext.apply({
		id : "CarListView",
		title : TabTitle.CAR_LIST,
		iconCls : "menu-business-corp",
		url : __ctxPath + "/archive/listCar.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(CarListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_CarAdd")) {
			tbarItems.push({
				id : ListViewButtonsId.carAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addCar.createDelegate(this)
			});
		}
		if (isGranted("_CarEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editCar.createDelegate(this)
			});
		}
		if (isGranted("_CarMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delCar.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的车辆！";
		var msg2 = "您确认要【" + op + "】所选的车辆吗？";
		var msg3 = "成功【" + op + "】所选的车辆！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readCar : function(a) {
		new CarForm(a).show();
	},
	addCar : function() {
		new CarForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editCar : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new CarForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delCar : function() {
		this.speciallyGridAction(this.dataGridPanel, "carId", __ctxPath + "/archive/multiDelCar.do", "删除");
	}
});