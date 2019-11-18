var MoneyLendSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		width : 80,
		lable : "借款单号",
		name : "Q_lendSerial_S_LK"
	}, {
		width : 80,
		lable : "借款人员",
		name : "Q_practiName_S_LK"
	}, {
		lable : "借款日期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_lendDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_lendDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "lendId",
			sortDir : "desc",
			id : "lendId",
			fields : MoneyLendListViewField
		},
		columns : [ {
			width : 50,
			header : "还款状态",
			dataIndex : "lendbackStatusName"
		}, {
			width : 50,
			header : "借款单号",
			dataIndex : "lendSerial"
		}, {
			width : 80,
			header : "借款人员",
			dataIndex : "practiName"
		}, {
			width : 80,
			header : "借款日期",
			dataIndex : "lendDate"
		}, {
			width : 80,
			header : "借款金额",
			dataIndex : "lendAmount"
		}, {
			width : 80,
			header : "已还金额",
			dataIndex : "backAmount"
		}, {
			width : 80,
			header : "未还金额",
			dataIndex : "lendbackStatus",
			renderer : function(value, metadata, record) {
				if ("0" == value) {
					return "<font face='宋体' color='red'>" + (record.get("lendAmount") - record.get("backAmount")) + "</font>";
				} else {
					return record.get("lendAmount") - record.get("backAmount");
				}
			}
		} ]
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选单号",
			single : this.single,
			collect : true,
			fields : MoneyLendListViewField,
			columns : [ {
				width : 50,
				header : "借款单号",
				dataIndex : "lendSerial"
			}, {
				width : 80,
				header : "借款人员",
				dataIndex : "practiName"
			}, {
				width : 80,
				header : "借款金额",
				dataIndex : "lendAmount"
			} ]
		};
	}
	MoneyLendSelector.superclass.constructor.call(this, {
		configView : {
			title : "借款单选择"
		},
		source : {
			url : __ctxPath + "/fund/listMoneyLend.do",
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
Ext.extend(MoneyLendSelector, Knight.ux.RelationSelector, {});