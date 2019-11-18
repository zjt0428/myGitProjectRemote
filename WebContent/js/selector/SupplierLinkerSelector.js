var SupplierLinkerSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_status_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "供应商名称",
		name : "Q_supplierName_S_LK"
	}, {
		lable : "主营业务",
		name : "Q_mainBusiness_S_LK"
	} ];
	var datagrid_config = {
		store : {
			sortField : "supplierId",
			sortDir : "desc",
			id : "supplierId",
			fields : SupplierListViewField
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
			header : "供应商名称",
			dataIndex : "supplierName"
		}, {
			width : 100,
			header : "供应商类型",
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
		title : "联系信息",
		single : this.single,
		url : __ctxPath + "/archive/listLinkerSupplier.do",
		parent : "supplier",
		fields : [ "supplierLinkerId", "supplierId", "linkerType", "linkerTypeName", "linker", "duties", "tel", "officePhone", "birthDate", "interests", "remark" ],
		columns : [ {
			width : 70,
			header : "姓名",
			dataIndex : "linker"
		}, {
			width : 80,
			header : "联系人类别",
			dataIndex : "linkerTypeName"
		}, {
			width : 100,
			header : "手机",
			dataIndex : "tel"
		} ]
	};
	SupplierLinkerSelector.superclass.constructor.call(this, {
		configView : {
			title : "供应商联系信息选择(请双击供应商/点击箭头 选取联系信息)"
		},
		emptySelectedText : "请先双击该采购商并勾选相应的联系人",
		source : {
			url : __ctxPath + "/archive/listSupplier.do",
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
Ext.extend(SupplierLinkerSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		this.targetPanel.getStore().reload({
			params : {
				"Q_supplierId_L_EQ" : data.supplierId
			}
		});
	}
});