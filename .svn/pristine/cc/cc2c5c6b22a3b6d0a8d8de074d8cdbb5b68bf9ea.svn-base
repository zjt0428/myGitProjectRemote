var AccidentListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "事故编号",
			name : "Q_accidentSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		}, {
			lable : "责任单位",
			name : "Q_responsibleUnit_S_LK"
		}, {
			lable : "登记日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_EQ"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAccident
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AccidentListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 40,
			renderer : function(n) {
				return n == "0" ? "<font color='red'>未结案</font>" : "已结案";
			}
		}, {
			header : "事故编号",
			dataIndex : "accidentSerial"
		}, {
			header : "登记日期",
			dataIndex : "providedDate"
		}, {
			header : "事故设备",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "事故责任单位",
			dataIndex : "responsibleUnit"
		}, {
			header : "事故级别",
			dataIndex : "accidentLevelName"
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "事故地址",
			dataIndex : "address"
		} ]
	};
	AccidentListView.superclass.constructor.call(this, Ext.apply({
		id : "AccidentListView",
		title : TabTitle.ACCDENT_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listAccident.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AccidentListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AccidentAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addAccident.createDelegate(this)
			});
		}
		if (isGranted("_AccidentEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAccident.createDelegate(this)
			});
		}
		if (isGranted("_AccidentMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAccident.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_AccidentPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printAccident.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的事故记录！";
		var msg2 = "您确认要【" + op + "】所选的事故记录吗？";
		var msg3 = "成功【" + op + "】所选的事故记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readAccident : function(a) {
		new AccidentForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addAccident : function() {
		new EquipSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new AccidentForm({
					equipment : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editAccident : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.status) {
				$toast("【修改】的事故信息必须是【未反馈】状态！");
				return false;
			}
			return true;
		}, function(a) {
			new AccidentForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delAccident : function() {
		this.speciallyGridAction(this.dataGridPanel, "accidentId", __ctxPath + "/safety/multiDelAccident.do", "删除");
	},
	printAccident : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printAccident.do?formpage=Accident&accidentId=" + a[0].data["accidentId"];
		});
	}
});