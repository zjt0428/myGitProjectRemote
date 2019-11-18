var ReturnTempStoreSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	
	var generalItems = [ {
		lable : "助记码",
		name : "Q_materialsSpecifications.mnemonics_S_LK"
	},{
		lable : "品名",
		name : "Q_materialsSpecifications.materialsCommodity.commodity_S_LK"
	},{
		lable : "规格",
		name : "Q_materialsSpecifications.specifications_S_LK"
	},{
		lable : "仓库名称",
		name : "Q_depotName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "tempId",
			sortDir : "asc",
			id : "tempId",
			fields : ReturnTempStoreFieldMapping
		},
		columns : [ {
			header : "品名",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.materialsCommodity.commodity;
			}
		}, {
			width : 150,
			header : "规格",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.specifications;
			}
		}, {
			header : "单位",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.firstUnitConversion;
			}
		}, {
			header : "仓库名称",
			dataIndex : "depotName"
		},{
			header : "数量",
			dataIndex : "quantity" 
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选",
			single : this.single,
			collect : true,
			fields : ReturnTempStoreFieldMapping,
			columns : [ {
				header : "品名",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.materialsCommodity.commodity;
				}
			}, {
				header : "规格",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.specifications;
				}
			} ]
		};
	}
	ReturnTempStoreSelector.superclass.constructor.call(this, {
		configView : {
			title : "暂存周材选择"
		},
		source : {
			url : __ctxPath + "/materials/listReturnTempStore.do",
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
Ext.extend(ReturnTempStoreSelector, Knight.ux.RelationSelector, {});