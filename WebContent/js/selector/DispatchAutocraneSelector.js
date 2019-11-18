var DispatchAutocraneSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "规格型号",
		name : "Q_specificName_S_LK"
	}, {
		lable : "主营业务",
		name : "Q_mainBusiness_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : DispatchAutocraneListViewField
		},
		columns : [ {
			header : "规格型号",
			dataIndex : "specificName"
		}, {
			header : "单价",
			dataIndex : "rentStandard"
		}, {
			header : "数量",
			dataIndex : "quantity"
		}, {
			header : "台班",
			dataIndex : "machineTeam"
		}, {
			header : "合计",
			dataIndex : "summary"
		} ]
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选汽车吊",
			single : this.single,
			collect : true,
			fields : DispatchAutocraneListViewField,
			columns : [ {
				header : "规格型号",
				dataIndex : "specificName"
			}, {
				header : "单价",
				dataIndex : "rentStandard"
			}, {
				header : "数量",
				dataIndex : "quantity"
			} ]
		};
	}
	DispatchAutocraneSelector.superclass.constructor.call(this, {
		configView : {
			title : "调度汽车吊选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listAutocraneDispatch.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
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
Ext.extend(DispatchAutocraneSelector, Knight.ux.RelationSelector, {});