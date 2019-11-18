var SupplierSelector = function(a) {
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
		single : this.single,
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
			header : "供应商名称",
			dataIndex : "supplierName"
		}, {
			header : "供应商类型",
			dataIndex : "unitType"
		}, {
			width : 80,
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
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选供应商",
			single : this.single,
			collect : true,
			fields : SupplierListViewField,
			columns : [ {
				header : "供应商名称",
				dataIndex : "supplierName"
			}, {
				header : "供应商级别",
				dataIndex : "supplierLevel"
			}, {
				width : 80,
				header : "办公电话",
				dataIndex : "tel"
			} ]
		};
	}
	var searchActionItems = [];
	if (isGranted("_SupplierAdd")) {
		searchActionItems.push({
			xtype : "button",
			iconCls : "menu-business-corp",
			text : "新增供应商",
			handler : this.fireBusinessEvent.createDelegate(this, [ "SupplierListView", ListViewButtonsId.supplierAdd ])
		});
	}
	SupplierSelector.superclass.constructor.call(this, {
		configView : {
			title : "供应商选择"
		},
		source : {
			url : __ctxPath + "/archive/listSupplier.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems,
				searchActionItems : searchActionItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(SupplierSelector, Knight.ux.RelationSelector, {});