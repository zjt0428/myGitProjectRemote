var OtherMaterialStockListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "仓库名称",
			name : "Q_storeName_S_LK"
		}, {
			lable : "库位",
			name : "Q_storageLocation_S_LK"
		},{
			lable : "处理日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_handleDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_handleDate_S_LE"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadOtherMaterialStock
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
			fields : OtherMaterialStockListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [{
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : "单据编号",
			dataIndex : "omsSerial"
		}, {
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "处理日期",
			dataIndex : "handleDate"
		}, {
			header : "处理类型",
			dataIndex : "handleTypeName"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "库位",
			dataIndex : "storageLocation"
		}]
	};
	OtherMaterialStockListView.superclass.constructor.call(this, Ext.apply({
		id : "OtherMaterialStockListView",
		title : "其他出入库处理",
		iconCls : "menu-business-equip",
		url : __ctxPath + "/materials/listOtherMaterialStock.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(OtherMaterialStockListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveOtherMaterialStock
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "2":
				if (isGranted("_OtherMaterialStockApprove")) {
					action[1].hidden = false;
				}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_OtherMaterialStockAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addOtherMaterialStock.createDelegate(this)
			});
		}
		if (isGranted("_OtherMaterialStockEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editOtherMaterialStock.createDelegate(this)
			});
		}
		if (isGranted("_OtherMaterialStockMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitOtherMaterialStock.createDelegate(this)
			});
		}
		if (isGranted("_OtherMaterialStockMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delOtherMaterialStock.createDelegate(this)
			});
		}
		
		tbarItems.push("->");
		if (isGranted("_OtherMaterialStockPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printOtherMaterialStock.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的申请！";
		var msg2 = "您确认要【" + op + "】所选的申请吗？";
		var msg3 = "成功【" + op + "】所选的申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveOtherMaterialStock : function(a){
		if("2" != a.applyforState) {
			$toast("【审批】的其他出入库信息必须是【待审批】的状态！")
			return;
		}
		new OtherMaterialStockForm(a,{
			approveable : true,
			callback : function(){
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadOtherMaterialStock : function(a){
		new OtherMaterialStockForm(a,{
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addOtherMaterialStock : function(){
		new OtherMaterialStockForm(null,{
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editOtherMaterialStock : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的信息必须是【待提交】的信息！");
			return;
		}
		new OtherMaterialStockForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitOtherMaterialStock : function(){
		this.speciallyGridAction(this.dataGridPanel, "otherMaterialStockId", __ctxPath + "/materials/multiSubmitOtherMaterialStock.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的其他出入库信息必须是【待提交】的其他出入库信息！");
			return false;
		}.createDelegate(this));
	},
	delOtherMaterialStock : function() {
		this.speciallyGridAction(this.dataGridPanel, "otherMaterialStockId", __ctxPath + "/materials/multiDelOtherMaterialStock.do", "删除", function(a) {
			console.info(a)
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的其他出入库信息必须是【待提交】的其他出入库信息！");
			return false;
		}.createDelegate(this));
	},
	printOtherMaterialStock : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/print.do?otherMaterialStockId=" + a[0].data["otherMaterialStockId"];
		});
	}
});