var MaterialsStoreSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	this.fields = ["materialsSpecifications","materialsSpecifications.materialsCommodity","baseDepot","quantity","storeId","baseLocation" ]
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
		name : "Q_baseDepot.depotName_S_LK"
	},{
		lable : "库位名称",
		name : "Q_baseLocation.locationName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "storeId",
			sortDir : "asc",
			id : "storeId",
			fields : this.fields
		},
		columns : [ {
			header : "品名",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.materialsCommodity.commodity;
			}
		}, {
			header : "助记码",
			dataIndex : "materialsSpecifications",
			renderer : function(n){
				return n.mnemonics;
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
			dataIndex : "baseDepot",
			renderer : function(n){
				return n.depotName;
			}
		}, {
			header : "库位名称",
			dataIndex : "baseLocation",
			renderer : function(n){
				return n.locationName;
			}
		}, {
			header : "数量",
			dataIndex : "quantity" 
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	var searchActionItems = [];
	if (this.collectEnable) {
		target = {
			title : "已选",
			single : this.single,
			collect : true,
			fields : this.fields,
			columns : [ {
				header : "品名",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.materialsCommodity.commodity;
				}
			}, {
				header : "助记码",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.mnemonics;
				}
			}, {
				header : "规格",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.specifications;
				}
			} ]
		};
		searchActionItems.push({
			xtype : "button",
			iconCls : "btn-ok",
			text : "一键全选",
			handler : this.selectAll.createDelegate(this)
		});
	}
	MaterialsStoreSelector.superclass.constructor.call(this, {
		configView : {
			title : "仓库周材选择"
		},
		source : {
			url : __ctxPath + "/materials/listMaterialsStore.do",
			base_params : this.params,
			search_config : {
				preLableHidden : true,
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
Ext.extend(MaterialsStoreSelector, Knight.ux.RelationSelector, {
	selectAll : function() {
		//获取查询条件 params
		var params = this.sourcePanel.ownerCt.searchPanel.getForm().getValues(false);
		Ext.apply(params,{
			"QUERY_ALL_WITHOUT_LIMIT" : "Y"
		});
		var datas = $ajaxSyncCall(__ctxPath + "/materials/listMaterialsStore.do",params);
		var data= datas.result;
		for (var i = 0; i < data.length; i++) {
			this.addCollectStore(data[i]);
		}
	}
});