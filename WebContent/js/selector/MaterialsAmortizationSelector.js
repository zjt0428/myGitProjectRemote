var MaterialsAmortizationSelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_materialsCommodity.commodity_S_LK"
		}];
	}
	
	var datagrid_config = {
			single : this.single,
			store : {
				fields : MaterialsAmortizationListViewField
			},
			columns : [{
				header : "品名",
				dataIndex : "materialsCommodity.commodity"
			}, {
				header : "总计摊销月数",
				dataIndex : "totalAmortizationMonths"
			}, {
				header : "年摊销率",
				dataIndex : "yearAmortizationRate"
			}]
	}
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
				title : "已选周材摊销",
				single : this.single,
				collect : true,
				fields : MaterialsAmortizationListViewField,
				columns : [{
					header : "品名",
					dataIndex : "materialsCommodity.commodity"
				}, {
					header : "总计摊销月数",
					dataIndex : "totalAmortizationMonths"
				}, {
					header : "年摊销率",
					dataIndex : "yearAmortizationRate"
				}]
		}
	}
	var searchActionItems = [];
	
	MaterialsAmortizationSelector.superclass.constructor.call(this, {
		configView : {
			title : "周材摊销选择"
		},
		source : {
			url : __ctxPath + "/materials/listMaterialsAmortization.do",
			base_params : this.params,
			search_config : {
				searchActionItems : searchActionItems,
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

Ext.extend(MaterialsAmortizationSelector, Knight.ux.RelationSelector, {});