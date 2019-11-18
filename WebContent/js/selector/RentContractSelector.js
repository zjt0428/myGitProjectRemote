var RentContractSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
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
		lable : "结算周期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_endRentDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_startRentDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : RentContractListViewField
		},
		columns : [ {
			width : 60,
			header : "款项状态",
			dataIndex : "fundStatusName"
		}, {
			width : 60,
			header : "结算编号",
			dataIndex : "rentSerial"
		}, {
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractSerial"
		}, {
			header : "承租方",
			dataIndex : "paEntName"
		}, {
			header : "承包人",
			dataIndex : "pbEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "结算开始时间",
			dataIndex : "startRentDate"
		}, {
			header : "截止时间",
			dataIndex : "endRentDate"
		} ]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : RentContractListViewField,
			columns : [ {
				width : 60,
				header : "结算编号",
				dataIndex : "rentSerial"
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
	RentContractSelector.superclass.constructor.call(this, {
		configView : {
			title : "代租结算选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listRentContract.do",
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
Ext.extend(RentContractSelector, Knight.ux.RelationSelector, {});