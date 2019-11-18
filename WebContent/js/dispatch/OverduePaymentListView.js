var OverduePaymentListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "承租单位",
			name : "Q_customerName_S_LK"
		}, {
			lable : "出租单位",
			name : "Q_corpName_S_LK"
		} ];
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : OverduePaymentListViewField
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "催款编号",
			dataIndex : "overduePaymentSerial"
		}, {
			header : "承租单位",
			dataIndex : "customerName"
		}, {
			header : "出租单位",
			dataIndex : "corpName"
		} ]
	};
	OverduePaymentListView.superclass.constructor.call(this, Ext.apply({
		id : "OverduePaymentListView",
		title : TabTitle.OVERDUE_PAYMENT_LIST,
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listOverduePayment.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(OverduePaymentListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_OverduePaymentAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addOverduePayment.createDelegate(this)
			});
		}
		if (isGranted("_OverduePaymentMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delOverduePayment.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_OverduePaymentPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printOverduePayment.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的催款！";
		var msg2 = "您确认要【" + op + "】所选的催款吗？";
		var msg3 = "成功【" + op + "】所选的催款！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	addOverduePayment : function() {
		new OverduePaymentForm({
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delOverduePayment : function() {
		this.speciallyGridAction(this.dataGridPanel, "overduePaymentId", __ctxPath + "/dispatch/multiDelOverduePayment.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的借用信息必须是【待提交】的借用！");
			return false;
		}.createDelegate(this));
	},
	printOverduePayment : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printOverduePayment.do?formpage=OverduePayment&overduePaymentId=" + a[0].data["overduePaymentId"];
		});
	}
});