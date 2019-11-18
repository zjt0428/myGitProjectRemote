var PractiInsuranceSouthView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_insureId_L_EQ = -1;
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "CONTRACT_APPLYFOR_STATUS", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		   generalItems = [ applyforStatusCombo, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "合同编号",
			name : "Q_contractNo_S_LK"
		}, {
			lable : "承租方",
			name : "Q_paEntName_S_LK"
		}, {
			lable : "出租方",
			name : "Q_pbEntName_S_LK"
		}, {
			xtype : "datefield",
			format :"Y-m-d",
			lable : "签订时间",
			name : "Q_signingTime_S_GE",
			editable : false
		}, {
			xtype : "datefield",
			format :"Y-m-d",
			lable : "至",
			name : "Q_signingTime_S_LE",
			editable : false
		}];
	}
	var datagrid_config = {
			delayed_load : true,
		store : {
			fields : PractiInsuranceSouthViewField
		},
		columns : [ {
			header : "状态",
			dataIndex : "applyforStateName",
		}, {
			header : "合同编号",
			dataIndex : "contractNo",
		}, {
			header : "项目名称",
			dataIndex : "projectName",
		}, {
			header : "签订时间",
			dataIndex : "signingTime",
		}, {
			header : "合同金额",
			dataIndex : "contractAmount",
		}, {
			header : "合同设备数",
			dataIndex : "equipCount",
		}, {
			header : "承租方",
			dataIndex : "paEntName",
		}, {
			header : "出租方",
			dataIndex : "pbEntName",
		}]
	};
	PractiInsuranceSouthView.superclass.constructor.call(this, Ext.apply({
		id : "PractiInsuranceSouthView",
		title : "服务合同",
		iconCls : "menu-business-equip",
		url : __ctxPath + "/archive/contractListPractiInsurance.do",
		base_params : this.params,
		search_config : {
//			collapsed : true,
//			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PractiInsuranceSouthView, Knight.ux.SearchGridPanel, {
});