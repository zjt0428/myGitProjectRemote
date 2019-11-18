var EquipDismantleSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "拆卸编号",
		name : "Q_dismantleSerial_S_LK"
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
			header : "拆卸编号",
			dataIndex : "dismantleSerial"
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
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "进场时间",
			dataIndex : "startdisDate"
		}, {
			header : "退场时间",
			dataIndex : "enddisDate"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : EquipDismantleListViewField,
			columns : [ {
				header : "拆卸编号",
				dataIndex : "dismantleSerial"
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
				header : "项目名称",
				dataIndex : "equipFlow",
				renderer : function(n) {
					return n.equipDiary.projectName;
				}
			} ]
		};
	}
	EquipDismantleSelector.superclass.constructor.call(this, {
		configView : {
			title : "拆卸选择"
		},
		source : {
			url : __ctxPath + "/equip/listEquipDismantle.do",
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
Ext.extend(EquipDismantleSelector, Knight.ux.RelationSelector, {});