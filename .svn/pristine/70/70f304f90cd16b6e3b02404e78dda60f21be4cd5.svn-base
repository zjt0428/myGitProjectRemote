var LeasePaymentListView = function (a) {
	Ext.apply(this, a || {});
	Ext.apply(this.params, (a && a.params) || {});
	this.params = {};
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}]
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readLeasePayment
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
				fields : LeasePaymentListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "付款编号",
				dataIndex : "paymentSerial"
			}, {
				header : "填报人",
				dataIndex : "userName"
			}, {
				header : "付款日期",
				dataIndex : "paymentDate"
			}, {
				header : "付款主题",
				dataIndex : "paymentTheme"
			}, {
				header : "付款金额",
				dataIndex : "paymentAmount"
			}, {
				header : "承租单位",
				dataIndex : "tenantry"
			}, {
				header : "出租单位",
				dataIndex : "lessor"
			}]
	}
	
	LeasePaymentListView.superclass.constructor.call(this, Ext.apply({
		id : "LeasePaymentListView",
		title : "付款管理",
		url : __ctxPath + "/materials/listLeasePayment.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}
Ext.extend(LeasePaymentListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的信息！";
		var msg2 = "您确认要【" + op + "】所选的信息吗？";
		var msg3 = "成功【" + op + "】所选的信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initRowActionItems : function(actionItems) {
		
	},
	rendererRowActionItems : function(action, record) {
		
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LeasePaymentAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLeasePayment.createDelegate(this)
			});
		}
		if (isGranted("_LeasePaymentEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLeasePayment.createDelegate(this)
			});
		}
		if (isGranted("_LeasePaymentMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLeasePayment.createDelegate(this)
			});
		}
		return tbarItems;
	},
	readLeasePayment : function (a) {
		new LeasePaymentForm(a).show();
	},
	addLeasePayment : function () {
		new LeaseSettlementSelector({
			single : true,
			params : {
				"Q_status_S_EQ" : "3"
			},
			callback : function(a) {
				var data = $ajaxSyncCall(__ctxPath + "/materials/loadLeaseSettlement.do", {
					settlementId : a[0].data.settlementId
				})
				new LeasePaymentForm(null, {
					saveable : true,
					data : data.data[0],
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editLeasePayment : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status == "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new LeasePaymentForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delLeasePayment : function () {
		this.speciallyGridAction(this.dataGridPanel, "settlementId", __ctxPath + "/materials/multiDelLeasePayment.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
})