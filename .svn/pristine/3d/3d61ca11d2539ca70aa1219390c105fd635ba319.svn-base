var CustomerListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "客户名称",
			name : "Q_customerName_S_LK"
		}, {
			lable : "主营业务",
			name : "Q_mainBusiness_S_LK"
		} ];
		var advancedItems = [ {
			fieldType : "CHAR_FIELD",
			name : "Q_customerName_S_LK",
			fieldLabel : "客户名称"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_mainBusiness_S_LK",
			fieldLabel : "主营业务"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_unitType_S_LK",
			fieldLabel : "客户类型"
		}, {
			fieldType : "CHAR_FIELD",
			name : "Q_address_S_LK",
			fieldLabel : "办公地址"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "成立时间",
			leftFieldLabel : "Q_birthDate_S_GE",
			rightFieldLabel : "Q_birthDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readCustomer
	},{
		iconCls : "btn-head-add",
		qtip : "关联子公司",
		handler : this.readCustomers
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	this.customersListView = new BranchCustomerListView({

	});
	this.customersTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 600,
		maxSize : 600,
		region : "east",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.customersListView]
	});
	var datagrid_config = {
		store : {
			sortField : "customerId",
			sortDir : "desc",
			id : "customerId",
			fields : CustomerListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "",
			dataIndex : "status",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="注销" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			width : 200,
			header : CustomerListViewHeader.customerName,
			dataIndex : "customerName"
		}, {
			width : 100,
			header : CustomerListViewHeader.customerLevel,
			dataIndex : "customerLevelName"
		},{
			width : 80,
			header : CustomerListViewHeader.customerNiceName,
			dataIndex : "customerNiceName"
		}, /*{
			width : 100,
			header : CustomerListViewHeader.unitType,
			dataIndex : "unitType"
		},*/ {
			width : 80,
			header : CustomerListViewHeader.tel,
			dataIndex : "tel"
		}, {
			width : 100,
			header : CustomerListViewHeader.mainBusiness,
			dataIndex : "mainBusiness"
		},  {
			width : 100,
			header : CustomerListViewHeader.businessArea,
			dataIndex : "businessArea"
		} ]
	};
	CustomerListView.superclass.constructor.call(this, Ext.apply({
		id : "CustomerListView",
		title : TabTitle.CUSTOMER_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/archive/listCustomer.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_view : {
			autoExpandColumn : "businessArea",
		},
		datagrid_config : datagrid_config,
		items : [ this.customersTabPanel]
	}, a));
};
Ext.extend(CustomerListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {

	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_CustomerAdd")) {
			tbarItems.push({
				id : ListViewButtonsId.customerAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addCustomer.createDelegate(this)
			});
		}
		if (isGranted("_CustomerEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editCustomer.createDelegate(this)
			});
		}
		if (isGranted("_CustomerMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delCustomer.createDelegate(this)
			});
		}
		if (isGranted("_CustomerMultiCancel")) {
			tbarItems.push({
				iconCls : "btn-head-cancel",
				text : "注销",
				handler : this.cancelCustomer.createDelegate(this)
			});
		}
		if (isGranted("_CustomerRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverCustomer.createDelegate(this)
			});
		}
		if (isGranted("_CustomerNameChange")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改客户名称",
				handler : this.customerNameChange.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_CustomerExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportCustomer.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的客户！";
		var msg2 = "您确认要【" + op + "】所选的客户吗？";
		var msg3 = "成功【" + op + "】所选的客户！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readCustomer : function(a) {
		new CustomerForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addCustomer : function() {
		new CustomerForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editCustomer : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new CustomerForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delCustomer : function() {
		this.speciallyGridAction(this.dataGridPanel, "customerId", __ctxPath + "/archive/multiDelCustomer.do", "删除");
	},
	cancelCustomer : function() {
		this.speciallyGridAction(this.dataGridPanel, "customerId", __ctxPath + "/archive/multiCancelCustomer.do", "注销");
	},
	recoverCustomer : function() {
		this.speciallyGridAction(this.dataGridPanel, "customerId", __ctxPath + "/archive/recoverCustomer.do", "恢复");
	},
	exportCustomer : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/archive/exportCustomer.do", this.dataGridPanel);
	},
	customerNameChange : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("只能选择一条记录");
			return;
		}
		new ChangeCustomerArchivesForm({
			maximized : false ,
			customerId : a[0].data.customerId,
			customerName : a[0].data.customerName,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	readCustomers : function(a) {
		this.customersTabPanel.expand();

		var customerstore = this.customersListView.getDataGridPanel().getStore();
		Ext.apply(customerstore.baseParams, {
			"Q_parentId_L_EQ" : a.customerId,
			customerId : a.customerId
		});
		customerstore.load();
		this.customersListView.customerId = a.customerId;
		this.customersListView.setTitle(a.customerName);
		this.customersListView.searchResetOriginal({
			"Q_parentId_L_EQ" : a.customerId
		});
	},
});