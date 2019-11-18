var CustomerAccountSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_status_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "客户名称",
		name : "Q_customerName_S_LK"
	}, {
		lable : "主营业务",
		name : "Q_mainBusiness_S_LK"
	} ];
	var datagrid_config = {
		store : {
			sortField : "customerId",
			sortDir : "desc",
			id : "customerId",
			fields : CustomerListViewField
		},
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
			width : 100,
			header : "客户名称",
			dataIndex : "customerName"
		}, {
			width : 100,
			header : "客户级别",
			dataIndex : "customerLevel"
		}, {
			width : 100,
			header : "客户类型",
			dataIndex : "unitType"
		}, {
			width : 80,
			header : "办公电话",
			dataIndex : "tel"
		}, {
			width : 100,
			header : "主营业务",
			dataIndex : "mainBusiness"
		}, {
			width : 100,
			header : "成立时间",
			dataIndex : "birthDate"
		} ]
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = {
		title : "已选企业",
		single : this.single,
		url : __ctxPath + "/archive/listAccountCustomer.do",
		parent : "customer",
		fields : [ "customerAccountId", "customerId", "bankDeposit", "account", "address" ],
		columns : [ {
			width : 100,
			header : "开户行",
			dataIndex : "bankDeposit"
		}, {
			width : 100,
			header : "账号",
			dataIndex : "account"
		}, {
			width : 100,
			header : "开户行地址",
			dataIndex : "address"
		} ]
	};
	CustomerAccountSelector.superclass.constructor.call(this, {
		configView : {
			title : "客户帐户信息选择"
		},
		source : {
			url : __ctxPath + "/archive/listCustomer.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : false,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(CustomerAccountSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		this.targetPanel.getStore().reload({
			params : {
				"Q_customerId_L_EQ" : data.customerId
			}
		});
	}
});