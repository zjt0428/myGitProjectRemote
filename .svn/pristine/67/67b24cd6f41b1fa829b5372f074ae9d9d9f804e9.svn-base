var EquipDetectSelector = function(a) {
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
			fields : EquipDetectListViewField
		},
		columns : [ {
			header : "检测编号",
			dataIndex : "detectSerial"
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
		}, {
			header : "检测单位",
			dataIndex : "detectEntName"
		}, {
			header : "检测费用",
			dataIndex : "detectAmount",
			renderer : function(a) {
				return Ext.util.Format.number(a, "0.00");
			}
		}, {
			header : "应付金额",
			dataIndex : "balanceAmount",
			renderer : function(a, b, c) {
				return Ext.util.Format.number(a, "0.00");
			}
		}, {
			header : "已付金额",
			dataIndex : "paymentAmount",
			renderer : function(a) {
				return Ext.util.Format.number(a, "0.00");
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
			fields : EquipDetectListViewField,
			columns : [ {
				header : "检测编号",
				dataIndex : "detectSerial"
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
	EquipDetectSelector.superclass.constructor.call(this, {
		configView : {
			title : "设备检测选择"
		},
		source : {
			url : __ctxPath + "/equip/listEquipDetect.do",
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
Ext.extend(EquipDetectSelector, Knight.ux.RelationSelector, {});