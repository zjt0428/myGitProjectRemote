var EquipFlowSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	if(!isGranted("__ALL")) {
		this.params["QVO_[contractLease.permissionFlag]_S_LK"] = curUserInfo.dataPermission
	}
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var genericCombo = $initComboBoxField("设备名称", "Q_equipment.equipGeneric_S_EQ", "equipGeneric", {
		width : 100,
		lable : "设备名称",
		editable : true,
		allowBlank : true
	});
	var equipSpecificCombo = $initComboBoxField("规格型号","Q_equipment.equipSpecific_S_EQ", "equipSpecific", {
		width : 100,
		lable : "设备型号",
		editable : true,
		allowBlank : true
	});
	var generalItems = [ {
		lable : "备案编号",
		name : "Q_equipDiary.recordId_S_LK"
	}, {
		lable : "出厂编号",
		name : "Q_equipDiary.exwSerial_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_equipDiary.projectName_S_LK"
	}, equipSpecificCombo,genericCombo ,{
		lable : "设备自编号",
		name : "Q_equipment.equipSerial_S_LK"
	},{
		lable : "楼号",
		name : "Q_equipment.buildingNum_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipFlowListViewField
		},
		columns : [ {
			header : "设备状态",
			dataIndex : "flowStateName"
		}, {
			header : "备案编号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "楼号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.buildingNum;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.equipSerial;
			}
		}, {
			header : "报废日期",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.scrapDate;
			}
		}, {
			header : "设备来源",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSourceName;
			}
		}]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : EquipInspectListViewField,
			columns : [ {
				header : "调度单号",
				dataIndex : "dispatch",
				renderer : function(n) {
					return n.dispatchSerial;
				}
			}, {
				header : "备案编号",
				dataIndex : "equipDiary",
				renderer : function(n) {
					return n.recordId;
				}
			}, {
				header : "设备名称",
				dataIndex : "equipDiary",
				renderer : function(n) {
					return n.equipGenericName;
				}
			} ]
		};
	}
	EquipFlowSelector.superclass.constructor.call(this, {
		configView : {
			title : "在用设备信息"
		},
		source : {
			url : __ctxPath + "/equip/listEquipFlow.do",
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
Ext.extend(EquipFlowSelector, Knight.ux.RelationSelector, {});