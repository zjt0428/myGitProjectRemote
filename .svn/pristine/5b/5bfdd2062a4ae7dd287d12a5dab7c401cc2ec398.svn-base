var BranchCustomerListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "客户名称",
			name : "Q_customerName_S_LK"
		} ];
		var advancedItems = [ ];
	}
	var actionItems = [ ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
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
			width : 80,
			header : CustomerListViewHeader.customerNiceName,
			dataIndex : "customerNiceName"
		} ]
	};
	BranchCustomerListView.superclass.constructor.call(this, Ext.apply({
		id : "BranchCustomerListView",
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
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(BranchCustomerListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {

	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BranchCustomerAdd")) {
			tbarItems.push({
//				id : ListViewButtonsId.customerAdd,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addCustomer.createDelegate(this)
			});
		}
		if (isGranted("_BranchCustomerMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delCustomer.createDelegate(this)
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
	addCustomer : function(a) {
		new CustomerSelector({
			single :false,
			params : {
				Q_customerId_L_NEQ : this.customerId,
				Q_parentId_L_NULL : "1"
			},
			callback : function(d) {
				var ids =Array();
				for(var i =0;i<d.length;i++){
					ids.push(d[i].data.customerId);
				}
				$request({
					url : __ctxPath + "/archive/addBranchCustomer.do",
					params:{
						ids : ids,
						customerId : this.customerId
					},
					success : function(b, c){
						if (b.responseText.indexOf("success:false") != -1 || b.responseText.indexOf("\"success\":false") != -1) {
							msg = "系统异常,请求数据失败!";
	                        var icon = Ext.MessageBox.ERROR;
							var resp = Ext.util.JSON.decode(b.responseText);
							if (resp.msg) {
								msg = resp.msg;
							}
							if(resp.warning){
								msg = resp.warning;
	                            icon = Ext.MessageBox.WARNING;
							}
							Ext.MessageBox.show({
								title : "操作信息",
								msg : msg,
								buttons : Ext.MessageBox.OK,
								icon : icon
							});
						} else {
							if (typeof (callback) == "function") {
								callback.call(this);
							} else {
								this.dataGridPanel.store.reload();
							}
						}
					}.createDelegate(this)
				})
			}.createDelegate(this)
		}).show();
	},
	delCustomer : function() {
		this.speciallyGridAction(this.dataGridPanel, "customerId", __ctxPath + "/archive/delBranchCustomer.do", "删除");
	},
});