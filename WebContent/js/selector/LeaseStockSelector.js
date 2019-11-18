var LeaseStockSelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_[materialsSpecifications.materialsCommodity.commodity]_S_LK"
		}, {
			lable : "规格",
			name : "Q_[materialsSpecifications.specifications]_S_LK"
		}, {
			lable : "助记码",
			name : "Q_[materialsSpecifications.mnemonics]_S_LK"
		}]
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				sortField : "stockId",
				sortDir : "asc",
				id : "stockId",
				fields : LeaseStockListViewField
			},
			columns : [{
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
			}, {
				header : "代码编号",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.mnemonics;
				}
			}, {
				header : "单位",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.firstUnitConversion;
				}
			}, {
				header : "数量",
				dataIndex : "quantity" 
			}]
	}
	
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
				title : "已选周材",
				single : this.single,
				collect : true,
				fields : LeaseStockListViewField,
				columns : [{
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
				}]
		}
	}
	
	LeaseStockSelector.superclass.constructor.call(this, {
		configView : {
			title : "租借库存"
		},
		source : {
			url : __ctxPath + "/materials/listLeaseStock.do",
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
}
Ext.extend(LeaseStockSelector, Knight.ux.RelationSelector, {});