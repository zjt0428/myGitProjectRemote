var LeaseMaterialsRecordSelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params = {
		"ORDER_[materialsSpecifications.specificationsId]_BY" : "desc"
	}
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_[materialsSpecifications.materialsCommodity.commodity]_S_LK"
		}, {
			lable : "规格",
			name : "Q_[materialsSpecifications.specifications]_S_LK"
		}]
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				sortField : "recordId",
				sortDir : "asc",
				id : "recordId",
				fields : LeaseMaterialsRecordListViewField
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
				header : "单位",
				dataIndex : "materialsSpecifications",
				renderer : function(n){
					return n.firstUnitConversion;
				}
			}]
	}
	
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
				title : "已选合同周材",
				single : this.single,
				collect : true,
				fields : LeaseMaterialsRecordListViewField,
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
	
	LeaseMaterialsRecordSelector.superclass.constructor.call(this, {
		configView : {
			title : "租借周材选择"
		},
		source : {
			url : __ctxPath + "/materials/listLeaseMaterialsRecord.do",
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
Ext.extend(LeaseMaterialsRecordSelector, Knight.ux.RelationSelector, {});