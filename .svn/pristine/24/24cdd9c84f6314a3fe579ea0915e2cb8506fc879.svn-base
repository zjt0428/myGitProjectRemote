var EquipEmploySelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "使用编号",
		name : "Q_employSerial_S_LK"
	}, {
		lable : "调度单号",
		name : "Q_equipFlow.dispatch.dispatchSerial_S_LK"
	}, {
		lable : "备案编号",
		name : "Q_equipFlow.equipDiary.recordId_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : EquipFlowListViewField
		},
		columns : [ {
			header : "使用编号",
			dataIndex : "employSerial"
		}, {
			header : "调度单号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.dispatch.dispatchSerial;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "启用日期",
			dataIndex : "employDate"
		} ],
	};
	EquipEmploySelector.superclass.constructor.call(this, {
		configView : {
			title : "使用告知"
		},
		source : {
			url : __ctxPath + "/equip/listEquipEmploy.do",
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
Ext.extend(EquipEmploySelector, Knight.ux.RelationSelector, {});