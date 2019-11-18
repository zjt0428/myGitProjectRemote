var CustomerLinkerSelector = function(a) {
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
			header : "客户名称",
			dataIndex : "customerName"
		}, {
			header : "客户级别",
			dataIndex : "customerLevel"
		}, {
			header : "客户类型",
			dataIndex : "unitType"
		}, {
			header : "办公电话",
			dataIndex : "tel"
		}, {
			header : "主营业务",
			dataIndex : "mainBusiness"
		}, {
			header : "成立时间",
			dataIndex : "birthDate"
		} ]
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = {
		title : "联系信息",
		single : this.single,
		url : __ctxPath + "/archive/listLinkerCustomer.do",
		parent : "customer",
		fields : [ "customerLinkerId", "customerId", "linkerType", "linkerTypeName", "linker", "duties", "tel", "officePhone", "birthDate", "interests", "remark" ],
		columns : [ {
			width : 70,
			header : "姓名",
			dataIndex : "linker"
		}, {
			width : 80,
			header : "职务",
			dataIndex : "linkerTypeName"
		}, {
			width : 100,
			header : "项目名称",
			dataIndex : "duties",
		}, {
			width : 100,
			header : "手机",
			dataIndex : "tel"
		} ]
	};
	CustomerLinkerSelector.superclass.constructor.call(this, {
		configView : {
			title : "客户联系信息选择"
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
Ext.extend(CustomerLinkerSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		this.targetPanel.getStore().reload({
			params : {
				"Q_customerId_L_EQ" : data.customerId
			}
		});
	}
});