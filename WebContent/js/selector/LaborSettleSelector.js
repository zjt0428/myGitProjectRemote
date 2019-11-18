var LaborSettleSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_applyforState_S_EQ = "3";
	this.params.Q_payState_S_EQ = "0";
	Ext.apply(this.params, a.params || {});
	Ext.apply(this, {
		laborSettId : Ext.id()
	});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "合同编号",
		name : "Q_contractNo_S_LK"
	}, {
		lable : "承租方",
		name : "Q_paEntName_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "项目经理",
		name : "Q_leaseProjectHead_S_LK"
	}, {
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		lable : "结算时间",
		name : "Q_startSettleDate_S_GE"
	}, {
		lable : "至",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_startSettleDate_S_LE"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : LaborSettleListViewField
		},
		columns : [ {
			header : "合同编号",
			dataIndex : "contractNo"
		}, {
			header : "承租方",
			dataIndex : "paEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "结算开始时间",
			dataIndex : "startSettleDate"
		}, {
			header : "截止时间",
			dataIndex : "endSettleDate"
		}, {
			header : "工地项目经理",
			dataIndex : "leaseProjectHead"
		}, {
			header : "结算金额",
			dataIndex : "settleAmount"
		}, {
			header : "结余",
			dataIndex : "afterTaxAmount"
		}, {
			header : "创建时间",
			dataIndex : "startSettleDate"
		}, {
			header : "结算状态",
			dataIndex : "startSettleDate"
		}, {
			header : "支付状态",
			dataIndex : "payStateName"
		}, {
			header : "已付金额",
			dataIndex : "paidAmount"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选人员",
			single : this.single,
			collect : true,
			fields : LaborSettleListViewField,
			columns : [ {
				header : "合同编号",
				dataIndex : "contractNo"
			}, {
				header : "承租方",
				dataIndex : "paEntName"
			}, {
				header : "项目名称",
				dataIndex : "projectName"
			}, {
				header : "结算开始时间",
				dataIndex : "startSettleDate"
			}, {
				header : "截止时间",
				dataIndex : "endSettleDate"
			}, {
				header : "工地项目经理",
				dataIndex : "leaseProjectHead"
			}, {
				header : "结算金额",
				dataIndex : "settleAmount"
			}, {
				header : "结余",
				dataIndex : "afterTaxAmount"
			}, {
				header : "创建时间",
				dataIndex : "startSettleDate"
			}, {
				header : "结算状态",
				dataIndex : "startSettleDate"
			}, {
				header : "支付状态",
				dataIndex : "payStateName"
			}, {
				header : "已付金额",
				dataIndex : "paidAmount"
			}]
		};
	}
	LaborSettleSelector.superclass.constructor.call(this, {
		configView : {
			title : this.title ? this.title : "劳务结算单选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listLaborSettle.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems,
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
Ext.extend(LaborSettleSelector, Knight.ux.RelationSelector, {});