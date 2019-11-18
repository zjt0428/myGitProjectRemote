var EquipLostHandleSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	//this.params.Q_status_S_LE = "4";
	//this.params.Q_status_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	var genericCombo = $initComboBoxField("设备名称", "Q_equipGeneric_S_EQ", "equipGeneric", {
		width : 100,
		lable : "设备名称",
		allowBlank : true
	});
	var specificCombo = $initComboBoxField("设备名称", "Q_equipSpecific_S_EQ", "equipSpecific", {
		width : 100,
		lable : "设备型号",
		allowBlank : true
	});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "备案编号",
		name : "Q_recordId_S_LK"
	}, {
		lable : "设备自编号",
		name : "Q_equipSerial_S_LK"
	},{
		lable : "楼号",
		name : "Q_buildingNum_S_LK"
	}, {
		lable : "归属仓库",
		name : "Q_storeName_S_LK"
	}, {
		lable : "出厂编号",
		name : "Q_exwSerial_S_LK"
	}, genericCombo, specificCombo,{
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
			header : "状态",
			width : 40,
			dataIndex : "statusName"
		}, {
			header : "归属仓库",
			dataIndex : "storeName"
		}, {
			header : "楼号",
			dataIndex : "buildingNum"
		},{
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		},{
			header : "生产厂家",
			dataIndex : "equipVender"//增加生产厂家
		}, {
			header : "设备自编号",
			dataIndex : "equipSerial"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			header : "规格型号",
			dataIndex : "equipSpecificName"
		}, {
			header : "采购日期",
			dataIndex : "purchaseDate"
		}, {
			header : "报废日期",
			dataIndex : "scrapDate"
		}, {
			header : "产权单位",
			dataIndex : "propertyName"
		}],
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
	EquipLostHandleSelector.superclass.constructor.call(this, {
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
Ext.extend(EquipLostHandleSelector, Knight.ux.RelationSelector, {});