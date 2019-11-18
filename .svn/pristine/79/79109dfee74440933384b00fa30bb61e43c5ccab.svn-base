var EquipFlowDismantleSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	if(!isGranted("__ALL")) {
		this.params['QVO_contractLease.permissionFlag_S_LK'] = curUserInfo.dataPermission;
	}
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "备案编号",
		name : "Q_equipDiary.recordId_S_LK"
	}, {
		lable : "出厂编号",
		name : "Q_equipDiary.exwSerial_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_equipDiary.projectName_S_LK"
	}, {
		lable : "拆卸编号",
		name : "Q_equipDismantle.dismantleSerial_S_LK"
	}, {
		lable : "设备自编号",
		name : "Q_equipment.equipSerial_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipFlowListViewField
		},
		columns : [ {
			header : "楼号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.buildingNum;
			}
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
			header : "规格型号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "合同编号",
			dataIndex : "contractLease",
			renderer : function(n) {
				return n.contractNo;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSerial;
			}
		}, {
			header : "生产厂家",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipVender;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.address;
			}
		} ]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : EquipFlowListViewField,
			columns : [ {
				header : "拆卸编号",
				dataIndex : "equipEmploy",
				renderer : function(n) {
					return n.dismantleSerial;
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
	EquipFlowDismantleSelector.superclass.constructor.call(this, {
		configView : {
			title : "拆卸设备信息"
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
Ext.extend(EquipFlowDismantleSelector, Knight.ux.RelationSelector, {});