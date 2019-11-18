var EquipMaintSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "备案编号",
		name : "Q_equipMaintSchema.equipDiary.recordId_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_equipMaintSchema.equipDiary.projectName_S_LK"
	}, {
		lable : "保养时间",
		width : 90,
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_maintDate_DL_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipMaintListViewField
		},
		columns : [ {
			width : 60,
			header : "状态",
			dataIndex : "statusName"
		}, {
			header : "保养编号",
			dataIndex : "maintSerial"
		}, {
			header : "保养级别",
			dataIndex : "equipMaintSchema",
			renderer : function(n) {
				return n.maintTypeName;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipMaintSchema",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipMaintSchema",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "保养结果",
			dataIndex : "maintResultName"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : EquipMaintListViewField,
			columns : [ {
				header : "备案编号",
				dataIndex : "equipMaintSchema",
				renderer : function(n) {
					return n.equipDiary.recordId;
				}
			}, {
				header : "保养级别",
				dataIndex : "equipMaintSchema",
				renderer : function(n) {
					return n.maintTypeName;
				}
			}, {
				header : "项目名称",
				dataIndex : "equipMaintSchema",
				renderer : function(n) {
					return n.equipDiary.projectName;
				}
			} ]
		};
	}
	EquipMaintSelector.superclass.constructor.call(this, {
		configView : {
			title : "设备维保选择"
		},
		source : {
			url : __ctxPath + "/equip/listEquipMaint.do",
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
Ext.extend(EquipMaintSelector, Knight.ux.RelationSelector, {});