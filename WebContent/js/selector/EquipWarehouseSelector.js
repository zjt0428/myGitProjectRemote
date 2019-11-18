var EquipWarehouseSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	if(!isGranted("__ALL")) {
		this.params['QVO_equipFlow.contractLease.permissionFlag_S_LK'] = curUserInfo.dataPermission;
	}
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "备案编号",
		name : "Q_equipFlow.equipDiary.recordId_S_LK"
	}, {
		lable : "出厂编号",
		name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_equipFlow.equipDiary.projectName_S_LK"
	}, {
		lable : "设备自编号",
		name : "Q_equipFlow.equipDiary.equipSerial_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipWarehouseListViewField
		},
		columns : [ {
			header : "入库编号",
			dataIndex : "warehouseSerial"
		}, {
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
			header : "设备型号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSpecificName;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "合同编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.contractLease.contractNo;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		} ],
	};
	EquipWarehouseSelector.superclass.constructor.call(this, {
		configView : {
			title : this.title!=null?this.title:"入库选择"
		},
		source : {
			url : __ctxPath + "/equip/listEquipWarehouse.do",
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
		}
	});
};
Ext.extend(EquipWarehouseSelector, Knight.ux.RelationSelector, {});