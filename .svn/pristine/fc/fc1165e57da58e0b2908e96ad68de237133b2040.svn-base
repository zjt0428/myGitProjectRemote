var BaseDepotInitSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "助记码",
		name : "Q_mnemonics_S_LK"
	},{
		lable : "品名",
		name : "Q_commodity_S_LK"
	},{
		lable : "规格",
		name : "Q_specifications_S_LK"
	},{
		lable : "仓库名称",
		name : "Q_depotName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : BaseDepotInitListViewField
		},
		columns : [ {
			header : "品名",
			dataIndex : "commodity"
		}, {
			header : "助记码",
			dataIndex : "mnemonics"
		}, {
			header : "规格",
			dataIndex : "specifications"
		}, {
			header : "单位",
			dataIndex : "unit"
		}, {
			header : "仓库名称",
			dataIndex : "depotName"
		}, {
			header : "数量",
			dataIndex : "total" 
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选",
			single : this.single,
			collect : true,
			fields : BaseDepotInitDetailListViewField,
			columns : [ {
				header : "品名",
				dataIndex : "commodity"
			}, {
				header : "规格",
				dataIndex : "specifications"
			}, {
				header : "数量",
				dataIndex : "quantity"
			} ]
		};
	}
	BaseDepotInitSelector.superclass.constructor.call(this, {
		configView : {
			title : "仓库周材选择"
		},
		source : {
			url : __ctxPath + "/materials/listBaseDepotInit.do",
			base_params : this.params,
			search_config : {
				preLableHidden : true,
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
Ext.extend(BaseDepotInitSelector, Knight.ux.RelationSelector, {});