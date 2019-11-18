var SettleContractEquipListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params.Q_settleId_L_EQ = -1;
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = null;
//	if (!this.searchDisenable) {
//		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "CONTRACT_APPLYFOR_STATUS", {
//			width : 80,
//			lable : "状态",
//			allowBlank : true
//		});
//		   generalItems = [ applyforStatusCombo, {
//			lable : "项目名称",
//			name : "Q_projectName_S_LK"
//		}, {
//			lable : "合同编号",
//			name : "Q_contractNo_S_LK"
//		}, {
//			lable : "承租方",
//			name : "Q_paEntName_S_LK"
//		}, {
//			lable : "出租方",
//			name : "Q_pbEntName_S_LK"
//		}, {
//			xtype : "datefield",
//			format :"Y-m-d",
//			lable : "签订时间",
//			name : "Q_signingTime_S_GE",
//			editable : false
//		}, {
//			xtype : "datefield",
//			format :"Y-m-d",
//			lable : "至",
//			name : "Q_signingTime_S_LE",
//			editable : false
//		}];
//	}
	var datagrid_config = {
			delayed_load : true,
		store : {
			fields : SettleContractEquipListViewField
		},
		columns : [ {
			header : "设备名称",
			dataIndex : "equipGenericName",
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial",
		}, {
			header : "设备自编号",
			dataIndex : "equipSerial",
		}, {
			header : "设备费用",
			dataIndex : "equipSummary",
		}, {
			header : "加节费用",
			dataIndex : "componSummary",
		}, {
			header : "进退场费",
			dataIndex : "itemSummary",
		}, {
			header : "操作人员工资",
			dataIndex : "operatorSummary",
		}, {
			header : "安全监控",
			dataIndex : "safeSummary",
		}, {
			header : "其他费用",
			dataIndex : "otherSummary",
		}]
	};
	SettleContractEquipListView.superclass.constructor.call(this, Ext.apply({
		id : "SettleContractEquipListView",
		title : "结算设备明细",
		iconCls : "menu-business-equip",
		url : __ctxPath + "/dispatch/equipListSettleContract.do",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SettleContractEquipListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的用户信息！";
		var msg2 = "您确认要【" + op + "】所选的用户信息吗？";
		var msg3 = "成功【" + op + "】所选的用户信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
});