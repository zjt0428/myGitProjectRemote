var ContractMaterialsSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "承租单位",
		name : "Q_paEntName_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ContractMaterialsListViewField
		},
		columns : [ {
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			header : "合同流水号",
			dataIndex : "contractNumber"
		},  {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "承租单位",
			dataIndex : "paEntName"
		}, {
			header : "合同类型",
			dataIndex : "contractCategoryName"
		}]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选合同信息",
			single : this.single,
			collect : true,
			fields : ContractMaterialsListViewField,
			columns : [ {
				header : "合同编号",
				dataIndex : "contractSerial"
			}, {
				header : "项目名称",
				dataIndex : "projectName"
			}, {
				width : 120,
				header : "承租单位",
				dataIndex : "paEntName"
			} ]
		};
	}
	ContractMaterialsSelector.superclass.constructor.call(this, {
		configView : {
			title : "周材合同选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listContractMaterials.do",
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
};
Ext.extend(ContractMaterialsSelector, Knight.ux.RelationSelector, {});