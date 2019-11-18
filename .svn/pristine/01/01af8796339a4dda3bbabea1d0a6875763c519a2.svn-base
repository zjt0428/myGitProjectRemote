var ScrapContractSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_applyforState_S_EQ = "3";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "合同单号",
		name : "Q_contractSerial_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ScrapContractListViewField
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			width : 300,
			header : "合同编号",
			dataIndex : "contractSerial"
		},{
			width : 300,
			header : "合同主题",
			dataIndex : "contractTheme"
		}, {
			width : 300,
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			width : 300,
			header : "库位",
			dataIndex : "storageLocation"
		}],
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	ScrapContractSelector.superclass.constructor.call(this, {
		configView : {
			title : "报废合同"
		},
		source : {
			url : __ctxPath + "/stock/listScrapContract.do",
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
Ext.extend(ScrapContractSelector, Knight.ux.RelationSelector, {
});