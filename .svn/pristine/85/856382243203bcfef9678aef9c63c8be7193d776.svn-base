var EquipFlowInstallSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_flowState_S_GE"] = "2";
	if(!isGranted("__ALL")) {
		this.params["QVO_contractLease.permissionFlag_S_LK"] = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, a.params || {});
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
		lable : "设备自编号",
		name : "Q_equipment.equipSerial_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipFlowListViewField
		},
		columns : [ {
			header : "安装编号",
			dataIndex : "equipInstall",
			renderer : function(n) {
				return n.installSerial;
			}
		}, {
			width : 60,
			header : "楼号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.buildingNum;
			}
		}, {
			width : 80,
			header : "出厂编号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.exwSerial;
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
		}, {
			header : "规格型号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSerial;
			}
		}, {
			header : "合同编号",
			dataIndex : "contractLease",
			renderer : function(n) {
				return n.contractNo;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.projectName;
			}
		},{
			header : "验收日期",
			dataIndex : "verifyDate"
		},{
			header : "安装时间",
			dataIndex : "equipInstall",
			renderer : function(n) {
				return n.startinDate
			}
		},{
			header : "安装班组",
			dataIndex : "equipInstall",
			renderer : function(n) {
				return n.principal
			}
		}, {
			hidden:true,
			header : "承租单位",
			dataIndex : "contractLease",
			renderer : function(n) {
				return n.paEntName;
			}
		}, {
			hidden:true,
			header : "租赁单位",
			dataIndex : "contractLease",
			renderer : function(n) {
				return n.pbEntName;
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
				header : "安装编号",
				dataIndex : "equipInstall",
				renderer : function(n) {
					return n.installSerial;
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
	EquipFlowInstallSelector.superclass.constructor.call(this, {
		configView : {
			title : this.title1==true?"拆卸设备信息":"安装设备信息"
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
Ext.extend(EquipFlowInstallSelector, Knight.ux.RelationSelector, {});