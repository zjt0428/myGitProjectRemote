var LeaseContractMaterialsSelector = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	
	var generalItems = null;
/*	if (!this.searchDisenable) {
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
*/	
	var datagrid_config = {
			single : this.single,
			store : {
				sortField : "specificationsId",
				sortDir : "asc",
				id : "specificationsId",
				fields : LeaseContractMaterialsViewField
			},
			columns : [{
				header : "品名",
				dataIndex : "commodity"
			}, {
				header : "规格",
				dataIndex : "specifications"
			}, {
				header : "代码编号",
				dataIndex : "mnemonics"
			}, {
				header : "单位",
				dataIndex : "firstUnitConversion"
			}]
	}
	
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
				title : "已选周材",
				single : this.single,
				collect : true,
				fields : LeaseContractMaterialsViewField,
				columns : [{
					header : "品名",
					dataIndex : "commodity"
				}, {
					header : "规格",
					dataIndex : "specifications"
				}]
		}
	}
	
	LeaseContractMaterialsSelector.superclass.constructor.call(this, {
		configView : {
			title : "租借合同约定周材"
		},
		source : {
			url : __ctxPath + "/materials/getMaterialsLeaseContract.do",
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
Ext.extend(LeaseContractMaterialsSelector, Knight.ux.RelationSelector, {});