var EquipInspectSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "备案编号",
		name : "Q_equipInspectSchema.equipDiary.recordId_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_equipInspectSchema.equipDiary.projectName_S_LK"
	}, {
		lable : "巡检时间",
		width : 90,
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_inspectDate_DL_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipInspectListViewField
		},
		columns : [ {
			width : 60,
			header : "状态",
			dataIndex : "statusName"
		}, {
			header : "巡检编号",
			dataIndex : "inspectSerial"
		}, {
			header : "备案编号",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "巡检时间",
			dataIndex : "inspectDate"
		}, {
			header : "巡检结果",
			dataIndex : "inspectResultName"
		} ],
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
				header : "巡检编号",
				dataIndex : "inspectSerial"
			}, {
				header : "备案编号",
				dataIndex : "equipInspectSchema",
				renderer : function(n) {
					return n.equipDiary.recordId;
				}
			}, {
				header : "项目名称",
				dataIndex : "equipInspectSchema",
				renderer : function(n) {
					return n.equipDiary.projectName;
				}
			} ]
		};
	}
	EquipInspectSelector.superclass.constructor.call(this, {
		configView : {
			title : "设备巡检选择"
		},
		source : {
			url : __ctxPath + "/equip/listEquipInspect.do",
			base_params : this.params,
			search_config : {
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
Ext.extend(EquipInspectSelector, Knight.ux.RelationSelector, {});