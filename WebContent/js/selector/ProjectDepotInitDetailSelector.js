var ProjectDepotInitDetailSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "品名",
		name : "Q_commodity_S_LK"
	}, {
		lable : "助记码",
		name : "Q_mnemonics_S_EQ"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ProjectDepotInitDetailListViewField
		},
		columns : [ {
			width : 50,
			header : "品名",
			dataIndex : "commodity"
		}, {
			header : "规格",
			dataIndex : "specifications"
		},{
			header : "助记码",
			dataIndex : "mnemonics"
		}, {
			header : "单位",
			dataIndex : "unit"
		}, {
			header : "期初数量",
			dataIndex : "quantity"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	ProjectDepotInitDetailSelector.superclass.constructor.call(this, {
		configView : {
			title : "项目仓库周材选择"
		},
		source : {
			url : __ctxPath + "/materials/listDetailProjectDepotInit.do",
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
Ext.extend(ProjectDepotInitDetailSelector, Knight.ux.RelationSelector, {});