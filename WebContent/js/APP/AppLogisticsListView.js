var AppLogisticsListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
		
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "发货人",
			name : "Q_deliveryMan_S_LK"
		},{
			lable : "出发地",
			name : "Q_sendWarehouseName_S_LK"
		},{
			lable : "目的地",
			name : "Q_receiveWarehouseName_S_LK"
		},{
			lable : "运输单位",
			name : "Q_propertyName_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readLogistics
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AppLogisticsListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "发货日期",
			dataIndex : "deliveryDate"
		}, {
			header : "发货地",
			dataIndex : "sendWarehouseName"
		}, {
			header : "目的地",
			dataIndex : "receiveWarehouseName"
		}, {
			header : "发货人",
			dataIndex : "deliveryMan"
		}, {
			header : "运输单位",
			dataIndex : "propertyName"
		}, {
			header : "运输费",
			dataIndex : "summary"
		}]
	};
	AppLogisticsListView.superclass.constructor.call(this, Ext.apply({
		id : "AppLogisticsListView",
		title : TabTitle.LOGISTICS_LIST,
		iconCls : "menu-info",
		url : __ctxPath + "/app/listLogistics.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AppLogisticsListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AppLogisticsDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLogistics.createDelegate(this)
			});
		}
		/*if (isGranted("_AppLogisticsAuto")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "生成付款单",
				handler : this.autoAppLogistics.createDelegate(this)
			});
		}*/
        tbarItems.push("->");
        if (isGranted("_AppLogisticsPrint")) {
            tbarItems.push({
                iconCls : "btn-head-print",
                text : "打印",
                handler : this.printLogistics.createDelegate(this)
            });
        }
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的工作备忘！";
		var msg2 = "您确认要【" + op + "】所选的工作备忘吗？";
		var msg3 = "成功【" + op + "】所选的工作备忘！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readLogistics : function(a) {
		new AppLogisticsForm(a,{
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delLogistics : function(a) {
		this.speciallyGridAction(this.dataGridPanel, "logiId", __ctxPath + "/app/multiDelLogistics.do", "删除");
	},
	autoAppLogistics : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length > 1) {
			$toast("请最多选择一个进行生成付款单！");
			return;
		}
		if(a.length == 0) {
			$toast("请选择一个进行生成付款单！");
			return;
		}
		for(var c = 0; c < length; c++) {
			$request({
				url : __ctxPath + "/app/loadLogistics.do",
				params : {
					logiId : a[c].data.logiId
				},
				success : function(g, h) {
					var resp = Ext.util.JSON.decode(g.responseText);
					var data = resp.data[0];
					var mount = {
						relateId : data.logiId,
						relateModule : RelationModule.appLogistics.relateModule,
						relateModuleName : RelationModule.appLogistics.relateModuleName,
						relationData : data
					};
					if (mount && mount.relateId && mount.relateModule) {
						mount.relation = {};
						Ext.apply(mount.relation, {
							relateId : mount.relateId,
							relateModule : mount.relateModule,
							relateModuleName : mount.relateModuleName
						});
					}
					new AmountPaymentForm(mount, {
						saveable : true,
						auto:true,
						paymentPlanDisabled : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			});
		}
	},
	printLogistics : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/app/printLogistics.do?formpage=AppLogistics&logiId=" + a[0].data["logiId"];
		});
	}
});