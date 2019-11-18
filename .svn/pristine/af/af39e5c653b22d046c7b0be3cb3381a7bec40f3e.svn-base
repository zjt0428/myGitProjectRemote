var EquipTSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_status_S_LE = "4";
	Ext.apply(this.params, a.params || {});
	var specificCombo = $initComboBoxField("设备名称", "Q_equipSpecific_S_EQ", "equipSpecific", {
		width : 100,
		lable : "设备型号",
		allowBlank : true
	});
	var businessStatusCombo = $initComboBoxField("业务状态", "Q_businessStatus_S_EQ", "EQUIP_BUSINESS_STATUS", {
		width : 75,
		lable : "业务状态",
		allowBlank : true
	});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "备案编号",
		name : "Q_recordId_S_LK"
	}, {
		lable : "当前项目",
		name : "Q_projectName_S_LK"
	},{
		lable : "楼号",
		name : "Q_buildingNum_S_LK"
	},{
		lable : "出厂编号",
		name : "Q_exwSerial_S_LK"
	}, specificCombo,businessStatusCombo,{
		xtype : "checkboxgroup",
		width : 85,
		items : [ {
			boxLabel : "过滤已报废",
			name : "Q_equipStatus_S_NEQ",
			inputValue : "2"
		} ]
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipmentListViewField
		},
		columns : [ {
			header : "业务状态",
			width : 50,
			dataIndex : "businessStatusName"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		},{
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "规格型号",
			dataIndex : "equipSpecificName"
		}, {
			header : "当前项目",
			dataIndex : "projectName"
		}, {
			header : "楼号",
			dataIndex : "buildingNum"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : EquipmentListViewField,
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
	EquipTSelector.superclass.constructor.call(this, {
		configView : {
			title : "设备选择"
		},
		source : {
			url : __ctxPath + "/archive/listEquipment.do",
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
Ext.extend(EquipTSelector, Knight.ux.RelationSelector, {});