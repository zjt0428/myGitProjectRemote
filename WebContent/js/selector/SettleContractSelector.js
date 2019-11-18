var SettleContractSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	// ====================================this.searchPanel===============================================//
	var fundStatusCombo = $initComboBoxField("款项状态", "Q_fundStatus_S_EQ", "FUND_PLAN_STATUS", {
		width : 80,
		lable : "款项状态",
		allowBlank : true
	});
	var generalItems = [ fundStatusCombo, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "合同编号",
		name : "Q_contractNo_S_LK"
	}, {
		lable : "结算周期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_endSettleDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_startSettleDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "settleId",
			sortDir : "desc",
			id : "settleId",
			fields : SettleContractListViewField
		},
		columns : [ {
			width : 60,
			header : "款项状态",
			dataIndex : "fundStatusName"
		}, {
			width : 60,
			header : "结算编号",
			dataIndex : "settleSerial"
		}, {
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractSerial"
		},{
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractNo"
		}, {
			header : "工地负责人",
			dataIndex : "sitesPrincipal"
		}, {
			header : "承租方",
			dataIndex : "paEntName"
		}, {
			header : "租金总计",
			dataIndex : "settleAmount",
			align : "right",
			renderer : function(a, b, c) {
				return Ext.util.Format.number(c.data.settleAmount, "0.00");
			}
		}, {
			header : "已收金额",
			dataIndex : "finishedAmount",
			align : "right",
			renderer : function(a, b, c) {
				return Ext.util.Format.number(c.data.finishedAmount, "0.00");
			}
		}, {
			header : "剩余金额",
			dataIndex : "balanceAmount",
			align : "right",
			renderer : function(a, b, c) {
				return Ext.util.Format.number((c.data.balanceAmount), "0.00");
			}
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "结算开始时间",
			dataIndex : "startSettleDate"
		}, {
			header : "截止时间",
			dataIndex : "endSettleDate"
		} ]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : SettleContractListViewField,
			columns : [ {
				width : 60,
				header : "结算编号",
				dataIndex : "settleSerial"
			}, {
				width : 100,
				header : ContractLeaseFormConfigure.contractSerialHeader,
				dataIndex : "contractSerial"
			}, {
				width : 100,
				header : "承租方",
				dataIndex : "paEntName"
			}, {
				width : 100,
				header : "项目名称",
				dataIndex : "projectName"
			} ]
		};
	}
	SettleContractSelector.superclass.constructor.call(this, {
		configView : {
			title : "结算选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listSettleContract.do",
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
Ext.extend(SettleContractSelector, Knight.ux.RelationSelector, {});