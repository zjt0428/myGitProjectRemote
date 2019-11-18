var ContractApplicationSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	//this.params.Q_delFlag_S_EQ = "1";
	//this.params.Q_status_S_LE = "4";
	//this.params["Q_arrangeType_S_EQ"] = "0";
	Ext.apply(this.params, a.params || {});
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	var genericCombo = $initComboBoxField("设备名称", "Q_equipGeneric_S_EQ", "equipGeneric", {
		width : 100,
		lable : "设备名称",
		allowBlank : true
	});
	var specificCombo = $initComboBoxField("设备型号", "Q_equipSpecific_S_EQ", "equipSpecific", {
		width : 100,
		lable : "设备型号",
		allowBlank : true
	});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "业务申请编号",
		name : "Q_arrangeSerial_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "承租单位",
		name : "Q_customerName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ContractArrangeSelectorListViewField
		},
		columns : [ {
			header : "业务申请编号",
			dataIndex : "arrangeSerial"
		},{
			header : "所属省份",
			dataIndex : "provinceName"
		},{
			header : "承租单位",
			dataIndex : "customerName"
		},{
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "所属公司",
			dataIndex : "corpName"
		}],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : ContractLeaseSelectorListViewField,
			columns : [ {
				width : 80,
				header : "备案编号",
				dataIndex : "recordId"
			}, {
				width : 80,
				header : "出厂编号",
				dataIndex : "exwSerial"
			}, {
				width : 80,
				header : "设备名称",
				dataIndex : "equipGenericName"
			} ]
		};
	}
	ContractApplicationSelector.superclass.constructor.call(this, {
		configView : {
			title : "业务申请选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listContractArrange.do",
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
Ext.extend(ContractApplicationSelector, Knight.ux.RelationSelector, {});