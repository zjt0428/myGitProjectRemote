var EquipActivateSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
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
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipActivateListViewField
		},
		columns : [ {
			header : "启用编号",
			dataIndex : "activateSerial"
		}, {
			header : "启用日期",
			dataIndex : "activateDate"
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
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		} ],
	};
	EquipActivateSelector.superclass.constructor.call(this, {
		configView : {
			title : "启用信息"
		},
		source : {
			url : __ctxPath + "/equip/listEquipActivate.do",
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
Ext.extend(EquipActivateSelector, Knight.ux.RelationSelector, {});