var AmortizationInitializationListView = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_materialsCommodity.commodity_S_LK"
		}];
	}		
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAmortizationInitialization
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : AmortizationInitializationListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "品名",
				dataIndex : "materialsAmortization.materialsCommodity.commodity"
			}, {
				header : "形成时间",
				dataIndex : "formationTime"
			}, {
				header : "单位",
				dataIndex : "unit"
			}, {
				header : "数量",
				dataIndex : "quantity"
			}, {
				header : "原值",
				dataIndex : "originalValue"
			}, {
				header : "总计摊销月数",
				dataIndex : "materialsAmortization.totalAmortizationMonths"
			}, {
				header : "已摊销月数",
				dataIndex : "amortizedMonths"
			}, {
				header : "已摊销金额",
				dataIndex : "amortizedAmount"
			}, {
				header : "未摊销月数",
				dataIndex : "notyetAmortizedMonths"
			}, {
				header : "未摊销金额",
				dataIndex : "notyetAmortizedAmount"
			}]
	}
	
	AmortizationInitializationListView.superclass.constructor.call(this, Ext.apply({
		id : "AmortizationInitializationListView",
		title : "周转材料摊销初始化",
		url : __ctxPath + "/materials/listAmortizationInitialization.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(AmortizationInitializationListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AmortizationInitializationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addAmortizationInitialization.createDelegate(this)
			});
		}
		if (isGranted("_AmortizationInitializationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAmortizationInitialization.createDelegate(this)
			});
		}
		if (isGranted("_AmortizationInitializationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAmortizationInitialization.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readAmortizationInitialization : function (a) {
		new AmortizationInitializationForm(a).show();
	},
	
	addAmortizationInitialization : function () {
		new AmortizationInitializationForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editAmortizationInitialization : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new AmortizationInitializationForm(a[0].data, {
			saveable : true,
			editable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delAmortizationInitialization : function () {
		this.speciallyGridAction(this.dataGridPanel, "initializationId", __ctxPath + "/materials/multiDelAmortizationInitialization.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
})