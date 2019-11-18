var LogisticsBacksportListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var advancedItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			xtype : "datacombo",
			width : 75,
			lable : "签收意见",
			name : "Q_signResult_S_EQ",
			store : [ "正常", "异常" ]
		},{
			xtype : "datacombo",
			width : 75,
			lable : "状态",
			name : "Q_status_S_EQ",
			store : [ [ "0", "发货中" ], [ "1", "已签收" ] ]
		}, {
			lable : "物流单号",
			name : "Q_backsportSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "发货人",
			name : "Q_deliveryMan_S_LK"
		}, {
			lable : "接货人",
			name : "Q_receiveMan_S_LK"
		} ];
		advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "物流单号",
			name : "Q_backsportSerial_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "发货人",
			name : "Q_deliveryMan_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "接货人",
			name : "Q_receiveMan_S_LK"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "发货时间",
			leftFieldLabel : "Q_deliveryDate_S_GE",
			rightFieldLabel : "Q_deliveryDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadLogisticsBacksport
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : LogisticsBacksportListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 45,
			header : "物流状态",
			dataIndex : "statusName"
		}, {
			width : 45,
			header : "款项状态",
			dataIndex : "fundStatusName"
		}, {
			header : "物流单号",
			dataIndex : "backsportSerial"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "运输单位",
			dataIndex : "backsportEntName"
		}, {
			header : "运输费用",
			dataIndex : "backsportAmount"
		}, {
			header : "已付金额",
			dataIndex : "finishedAmount"
		}, {
			header : "余额",
			dataIndex : "remainderAmount"
		}, {
			width : 120,
			header : "收货地址",
			dataIndex : "address"
		}, {
			width : 45,
			header : "发货人",
			dataIndex : "deliveryMan"
		}, {
			header : "发货时间",
			dataIndex : "deliveryDate"
		}, {
			header : "签收时间",
			dataIndex : "signDate"
		} ]
	};
	LogisticsBacksportListView.superclass.constructor.call(this, Ext.apply({
		id : "LogisticsBacksportListView",
		title : TabTitle.LOGISTICS_BACKSPORT_LIST,
		iconCls : "menu-business-contract",
		url : __ctxPath + "/dispatch/listLogisticsBacksport.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(LogisticsBacksportListView, Knight.ux.SearchGridPanel, {
	getRowClass : function(record, rowIndex, rowParams, store) {
		var status = record.data.signResult;
		if (status == "异常") {
			var task = new Ext.util.DelayedTask(function() {
				this.dataGridPanel.getView().addRowClass(rowIndex, "x-grid-back-red");
			}.createDelegate(this));
			task.delay(10);
		}
		
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-submit",
			qtip : "签收",
			hidden : true,
			handler : this.receivedLogisticsBacksport
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
			case "0":
				if (isGranted("_LogisticsBacksportReceived")) {
					action[1].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LogisticsBacksportAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLogisticsBacksport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsBacksportEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLogisticsBacksport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsBacksportMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLogisticsBacksport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsBacksportRead")) {
			tbarItems.push({
				iconCls : "btn-grid-read",
				text : "配件物流",
				handler : this.componBacksport.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_LogisticsBacksportPrint") && isCorpAppUser()) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printLogisticsBacksport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsBacksportExport")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportLogisticsBacksport.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的物流信息！";
		var msg2 = "您确认要【" + op + "】所选的物流信息吗？";
		var msg3 = "成功【" + op + "】所选的物流信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	receivedLogisticsBacksport : function(a) {
		new LogisticsBacksportForm(a, {
			signable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadLogisticsBacksport : function(a) {
		var isCompon=false;
		if(a.isCompon=="1"){
			isCompon = true;
		}
		new LogisticsBacksportForm(a, {
			isCompon : isCompon,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addLogisticsBacksport : function() {
		new EquipFlowDismantleSelector({
			single : true,
			params : {
				"Q_flowState_S_EQ" : "6",
				"Q_equipment.status_S_EQ" : "4"
			},
			callback : function(d) {
				var data = d[0].data;

				new LogisticsBacksportForm(data, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editLogisticsBacksport : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.status) {
				Ext.MessageBox.alert("操作信息", "【修改】的物流信息必须是【未签收】的物流信息！");
				return false;
			}
			return true;
		}.createDelegate(this), function(a) {
			if(a.data.isCompon=="1"){
				isCompon=true;
			}
			new LogisticsBacksportForm(a.data, {
				saveable : true,
				isCompon : isCompon,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delLogisticsBacksport : function() {
		this.speciallyGridAction(this.dataGridPanel, "backsportId", __ctxPath + "/dispatch/multiDelLogisticsBacksport.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的物流信息必须是【未签收】的物流信息！");
			return false;
		}.createDelegate(this));
	},
	printLogisticsBacksport : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printLogisticsBacksport.do?formpage=LogisticsBacksport&backsportId=" + a[0].data["backsportId"];
		});
	},
	exportLogisticsBacksport : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportLogisticsBacksport.do", this.dataGridPanel);
	},
	componBacksport:function(){
		new ComponIntoStoreSelector({
			single : true,
			callback : function(d) {				
				var data = d[0].data;				
				new LogisticsBacksportForm(data, {
					saveable : true,
					isCompon : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	}
});