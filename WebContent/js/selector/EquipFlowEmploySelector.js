var EquipFlowEmploySelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_equipFlow.flowState_S_GE"] = "2";
//	this.params["Q_equipFlow.flowState_S_LE"] = "4";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	if (!this.searchDisenable) {
		var genericCombo = $initComboBoxField("设备名称", "Q_equipFlow.equipment.equipGeneric_S_EQ", "equipGeneric", {
			width : 100,
			lable : "设备名称",
			editable : true,
			allowBlank : true
		});
		var equipSpecificCombo = $initComboBoxField("规格型号",
				"Q_equipFlow.equipment.equipSpecific_S_EQ", "equipSpecific", {
					width : 100,
					lable : "设备型号",
					editable : true,
					allowBlank : true
				});
		var generalItems = [ {
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		}, equipSpecificCombo,genericCombo ,{
			lable : "设备自编号",
			name : "Q_equipFlow.equipment.equipSerial_S_LK"
		},{
			lable : "楼号",
			name : "Q_equipFlow.equipment.buildingNum_S_LK"
		}]
	}
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipInstallListViewField
		},
		columns : [ {
			header : "备案编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.exwSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSpecificName;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "楼号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.buildingNum;
			}
		}, {
			header : "生产厂家",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipVender;
			}
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : EquipInstallListViewField,
			columns : [ {
				header : "使用编号",
				dataIndex : "equipFlow",
				renderer : function(n) {
					if (n.equipEmploy) {
						return n.equipEmploy.employSerial;
					}
					return null;
				}
			}, {
				header : "备案编号",
				dataIndex : "equipFlow",
				renderer : function(n) {
					return n.equipDiary.recordId;
				}
			}, {
				header : "设备名称",
				dataIndex : "equipFlow",
				renderer : function(n) {
					return n.equipDiary.equipGenericName;
				}
			} ]
		};
	}
	EquipFlowEmploySelector.superclass.constructor.call(this, {
		configView : {
			title : "使用设备信息"
		},
		source : {
			url : __ctxPath + "/equip/listEquipInstall.do?applyforState=3",
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
Ext.extend(EquipFlowEmploySelector, Knight.ux.RelationSelector, {});