var MaterialsPackSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "品名",
		name : "Q_commodity_S_LK"
	}, {
		lable : "规格",
		name : "Q_specifications_S_LK"
	}, {
		lable : "助记码",
		name : "Q_mnemonics_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "specificationsId",
			sortDir : "asc",
			id : "specificationsId",
			fields : [ "specificationsId", "specifications","mnemonics","materialsCommodity","firstUnitConversion","secondUnitConversion","firstConvertedQuantity","secondConvertedQuantity" ]
		},
		columns : [ {
			header : "品名",
			dataIndex : "materialsCommodity",
			width : 80,
			renderer : function(n){
				return n.commodity;
			}
		}, {
			header : "规格",
			dataIndex : "specifications"
		}, {
			header : "助记码",
			dataIndex : "mnemonics"
		}, {
			header : "租金核算单位",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.rentUnit;
			}
		}, {
			header : "日租金",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.dailyRent;
			}
		} , {
			header : "丢失赔偿单价",
			dataIndex : "materialsCommodity",
			renderer : function(n){
				return n.compensationCosts;
			}
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : [ "specificationsId", "specifications","mnemonics","materialsCommodity","firstUnitConversion","secondUnitConversion","firstConvertedQuantity","secondConvertedQuantity" ],
			columns : [ {
				width : 80,
				header : "品名",
				dataIndex : "materialsCommodity",
				renderer : function(n){
					return n.commodity;
				}
			}, {
				width : 80,
				header : "规格",
				dataIndex : "specifications"
			}, {
				width : 80,
				header : "助记码",
				dataIndex : "mnemonics"
			} ]
		};
	}

	MaterialsPackSelector.superclass.constructor.call(this, Ext.apply({
		configView : {
			title : "周材信息"
		},
		source : {
			id : "MaterialsInfoListView",
			title : "周材信息",
			iconCls : "menu-set-department",
			url : __ctxPath + "/materials/findMaterialsInfo.do",
			base_params : this.params,
			items : [ this.commodityTree ],
			search_config : {
				preLableHidden : true,
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				title : "周材基本信息",
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	},a));
};
Ext.extend(MaterialsPackSelector, Knight.ux.RelationSelector, {

});