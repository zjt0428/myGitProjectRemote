var EquipRepairSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	//this.params.Q_delFlag_S_EQ = "1";
	/*this.params.Q_status_S_LE = "4";*/
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
	var generalItems = [ {}];
/*	var generalItems = [ {
		lable : "备案编号",
		name : "Q_recordId_S_LK"
	}, {
		lable : "当前项目",
		name : "Q_projectName_S_LK"
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
	} ];*/
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipRepairListViewField
		},
		columns : [  {
			width : 60,
			header : "状态",
			dataIndex : "statusName"
		}, {
			header : "楼号",
			dataIndex : "buildingNum"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "故障描述",
			dataIndex : "phenomenon"
		}, {
			header : "申报人",
			dataIndex : "userName"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "维修方案",
			dataIndex : "schemaName"
		}, {
			header : "解决日期",
			dataIndex : "repairDate"
		}, {
			header : "维修结果",
			dataIndex : "repairResultName"
		}, {
			header : "维修人员",
			dataIndex : "repairMan"
		}, {
			header : "维修费用",
			dataIndex : "repairAmount"
		}, {
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "备注",
			dataIndex : "remark"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : EquipRepairListViewField,
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
	EquipRepairSelector.superclass.constructor.call(this, {
		configView : {
			title : "维修选择"
		},
		source : {
			url : __ctxPath + "/equip/listEquipRepair.do",
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
Ext.extend(EquipRepairSelector, Knight.ux.RelationSelector, {});