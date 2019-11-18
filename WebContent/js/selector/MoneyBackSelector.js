var MoneyBackSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "还款单号",
		name : "Q_backSerial_S_LK"
	}, {
		lable : "还款人员",
		name : "Q_practiName_S_LK"
	}, {
		lable : "还款日期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_backDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_backDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "backId",
			sortDir : "asc",
			id : "backId",
			fields : MoneyBackListViewField
		},
		columns : [ {
			width : 50,
			header : "还款单号",
			dataIndex : "backSerial"
		}, {
			width : 80,
			header : "还款人员",
			dataIndex : "practiName"
		}, {
			width : 80,
			header : "还款日期",
			dataIndex : "backDate"
		}, {
			width : 80,
			header : "还款金额",
			dataIndex : "backAmount"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : MoneyBackListViewField,
			columns : [ {
				width : 50,
				header : "还款单号",
				dataIndex : "backSerial"
			}, {
				width : 80,
				header : "还款日期",
				dataIndex : "backDate"
			}, {
				width : 80,
				header : "还款金额",
				dataIndex : "backAmount"
			} ]
		};
	}
	MoneyBackSelector.superclass.constructor.call(this, {
		configView : {
			title : "还款选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listMoneyBack.do",
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
Ext.extend(MoneyBackSelector, Knight.ux.RelationSelector, {});