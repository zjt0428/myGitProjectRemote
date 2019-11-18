var PractiCertSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_qstate_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var kindWorkCombo = $initComboBoxField("从业工种", "Q_practiKindwork_S_EQ", "kindWork", {
		width : 75,
		lable : "从业工种",
		allowBlank : true
	});
	var qstateCombo = $initSimpleComboBoxField("状态", "Q_qstate_S_EQ", [ [ "", "全部" ], [ "1", "有效" ], [ "2", "注销" ], [ "4", "过期" ] ], {
		width : 60,
		lable : "状态",
		allowBlank : true
	});
	var generalItems = [ qstateCombo, kindWorkCombo, {
		lable : "资质证书编号",
		name : "Q_certNum_S_LK"
	}, {
		lable : "所属人员",
		name : "Q_practitioner.practiName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : PractiCertListViewField
		},
		columns : [ {
			header : "",
			dataIndex : "qstate",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="有效" src="' + __ctxPath + '/img/flag/round_001.png"/>';
				} else if (n == "2") {
					return '<img title="注销" src="' + __ctxPath + '/img/flag/round_004.png"/>';
				} else if (n == "4") {
					return '<img title="过期" src="' + __ctxPath + '/img/flag/round_002.png"/>';
				} else {
					return '<img title="未知" src="' + __ctxPath + '/img/flag/round_005.png"/>';
				}
			}
		}, {
			header : "证书编号",
			dataIndex : "certNum"
		}, {
			header : "所属人员",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.practiName;
				}
			}
		}, {
			header : "身份证号",
			dataIndex : "practitioner",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.idCard;
				}
			}
		}, {
			header : "从业工种",
			dataIndex : "practiKindworkName"
		}, {
			header : "注册类型及等级",
			dataIndex : "specialtyTypeName"
		}, {
			header : "发证单位",
			dataIndex : "awardDepart"
		}, {
			header : "有效截止日期",
			dataIndex : "effectDate"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选面板",
			single : this.single,
			collect : true,
			fields : PractiCertListViewField,
			columns : [ {
				header : "从业工种",
				dataIndex : "practiKindworkName"
			}, {
				header : "注册类型及等级",
				dataIndex : "specialtyTypeName"
			}, {
				header : "发证单位",
				dataIndex : "awardDepart"
			}, {
				header : "有效截止日期",
				dataIndex : "effectDate"
			} ]
		};
	}
	PractiCertSelector.superclass.constructor.call(this, {
		configView : {
			title : "企业人员资质"
		},
		source : {
			url : __ctxPath + "/archive/listPractiCert.do",
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
Ext.extend(PractiCertSelector, Knight.ux.RelationSelector, {});