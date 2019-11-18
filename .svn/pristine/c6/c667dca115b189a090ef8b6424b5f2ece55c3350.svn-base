var ProjectMaterialsStoreSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [{
		lable : "助记码",
		name : "Q_materialsSpecifications.mnemonics_S_LK"
	}, {
		lable : "品名",
		name : "Q_materialsSpecifications.materialsCommodity.commodity_S_LK"
	}, {
		lable : "规格",
		name : "Q_materialsSpecifications.specifications_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "materialsSpecifications.specificationsId",
			sortDir : "asc",
			id : "materialsSpecifications.specificationsId",
			fields : [ "materialsSpecifications","quantity"]
		},
		columns : [ {
			header : "品名",
			dataIndex : "materialsSpecifications",
			width : 80,
			renderer : function(n){
				return n.materialsCommodity.commodity;
			}
		}, {
			header : "规格",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.specifications;
			}
		}, {
			header : "助记码",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.mnemonics;
			}
		}, {
			header : "租金核算单位",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.materialsCommodity.rentUnit;
			}
		}, {
			header : "日租金",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.materialsCommodity.dailyRent;
			}
		}, {
			header : "丢失赔偿单价",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.materialsCommodity.compensationCosts;
			}
		}, {
			header : "库存数量",
			dataIndex : "quantity"
		}],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选周材",
			single : this.single,
			collect : true,
			fields : [ "materialsSpecifications","quantity"],
			columns : [ {
				width : 80,
				header : "品名",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.materialsCommodity.commodity;
				}
			}, {
				width : 80,
				header : "规格",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.specifications;
				}
			}, {
				width : 80,
				header : "助记码",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.mnemonics;
				}
			} ]
		};
	}

	ProjectMaterialsStoreSelector.superclass.constructor.call(this, Ext.apply({
		configView : {
			title : "项目周材库存选择"
		},
		source : {
			id : "MaterialsInfoListView",
			iconCls : "menu-set-department",
			url : __ctxPath + "/materials/listProjectMaterialsStore.do",
			base_params : this.params,
			search_config : {
				preLableHidden : true,
				generalItems : generalItems
			},
			datagrid_view : {
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
Ext.extend(ProjectMaterialsStoreSelector, Knight.ux.RelationSelector, {

});