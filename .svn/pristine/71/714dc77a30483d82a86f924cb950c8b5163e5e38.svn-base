var InstalmentSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = this.params ? this.params : {};
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "关联业务编号",
		name : "Q_relateSerial_S_LK"
	}, {
		lable : "付款日期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_payDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_payDate_S_LE"
	} ];
	var fields = [ "instalmentId", "relateId", "relateSerial", "relateModule", "relateModuleName", "periods", "payment", "payDate", "alreadyPayment", "remark", "status", "statusName" ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "instalmentId",
			sortDir : "asc",
			id : "instalmentId",
			fields : fields
		},
		columns : [ {
			width : 30,
			header : "期数",
			dataIndex : "periods"
		}, {
			width : 80,
			header : "关联业务编号",
			dataIndex : "relateSerial"
		}, {
			width : 80,
			header : "关联业务模块",
			dataIndex : "relateModuleName"
		}, {
			width : 50,
			header : "预计付款额",
			dataIndex : "payment"
		}, {
			width : 80,
			header : "付款日期",
			dataIndex : "payDate"
		}, {
			width : 50,
			header : "已付金额",
			dataIndex : "alreadyPayment"
		}, {
			width : 50,
			header : "付款状态",
			dataIndex : "statusName"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : fields,
			columns : [ {
				width : 30,
				header : "期数",
				dataIndex : "periods"
			}, {
				width : 50,
				header : "预计付款额",
				dataIndex : "payment"
			}, {
				width : 50,
				header : "已付金额",
				dataIndex : "alreadyPayment"
			} ]
		};
	}
	InstalmentSelector.superclass.constructor.call(this, {
		configView : {
			title : "付款计划选择"
		},
		source : {
			url : __ctxPath + "/archive/listInstalment.do",
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
Ext.extend(InstalmentSelector, Knight.ux.RelationSelector, {});