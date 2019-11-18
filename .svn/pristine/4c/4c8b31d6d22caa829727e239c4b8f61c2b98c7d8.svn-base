var ContractMaterialsSecondSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
//	this.params.Q_applyforState_S_NEQ = "7";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var contractCategoryCombo = $initComboBoxField("合同", "Q_contractCategory_S_EQ", "contractCategory", {
		width : 110,
//		lable : "合同类型",
		allowBlank : true
	});
	
	var departmentTreeCombo = new Knight.ux.TreeCombo({
		id : Ext.id(),
		width : 150,
		allowBlank : true,
		lable : "主管部门",
		name : "Q_competentDepartment_S_EQ",
		url : __ctxPath + "/system/listDepartment.do"
	});
	var generalItems = [ {
		lable : "出租单位",
		name : "Q_pbEntName_S_LK"
	},{
		lable : "承租单位",
		name : "Q_paEntName_S_LK"
	},departmentTreeCombo, {
		lable : "合同编号",
		name : "Q_contractSerial_S_LK"
	}, contractCategoryCombo, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	},{
		lable : "项目地址",
		xtype : "areaCompositeField",
		defaultMargins : "11 2 0 0",
		style : {
			marginLeft : "1030px"
		},
		skipLastItemMargin : false,
		provinceName :  "province",
		cityName : "city",
		countyName : "county"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ContractMaterialsListViewField
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			header : "出租单位",
			dataIndex : "pbEntName"
		},{
			header : "项目主管部门",
			dataIndex : "competentDepartment"
		}, {
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			width : 50,
			header : "合同流水号",
			dataIndex : "contractNumber"
		},  {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			width : 180,
			header : "项目地址",
			dataIndex : "address"
		}, {
			header : "承租单位",
			dataIndex : "paEntName"
		}, {
			width : 70,
			header : "合同类型",
			dataIndex : "contractCategoryName"
		}, {
			header : "签订时间",
			dataIndex : "sigingTime"
		}]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	var searchActionItems = [];
	if (this.collectEnable) {
		target = {
			width : 450,
			title : "已选合同信息",
			single : this.single,
			collect : true,
			rowNumWidth : 30,
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
		searchActionItems.push({
			xtype : "button",
			iconCls : "btn-ok",
			text : "一键全选",
			handler : this.selectAll.createDelegate(this)
		});
	}

	ContractMaterialsSecondSelector.superclass.constructor.call(this, {
		configView : {
			title : "周材合同选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listContractMaterials.do",
			base_params : this.params,
			search_config : {
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
Ext.extend(ContractMaterialsSecondSelector, Knight.ux.RelationSelector, {
	selectAll : function() {
		//获取查询条件 params
		var params = this.sourcePanel.ownerCt.searchPanel.getForm().getValues(false);
//		params.limit = this.sourcePanel.getStore().totalLength;
		Ext.apply(params,{
			"QUERY_ALL_WITHOUT_LIMIT" : "Y"
		});
		var datas = $ajaxSyncCall(__ctxPath + "/dispatch/listContractMaterials.do",params);
		var data= datas.result;
		for (var i = 0; i < data.length; i++) {
			this.addCollectStore(data[i]);
		}
	}
});