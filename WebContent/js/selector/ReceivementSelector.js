var ReceivementSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = this.params ? this.params : {};
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "关联业务编号",
		name : "Q_relateSerial_S_LK"
	}, {
		lable : "回款日期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_receiveDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_receiveDate_S_LE"
	} ];
	var fields = [ "receivementId", "relateId", "relateSerial", "relateModule", "relateModuleName", "periods", "receivement", "receiveDate", "alreadyReceivement", "issueInvoice", "invoiceType", "invoiceTypeName", "remark", "status",
			"statusName", "invoiceFlag" ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "receivementId",
			sortDir : "asc",
			id : "receivementId",
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
			header : "预计回款额",
			dataIndex : "receivement"
		}, {
			width : 80,
			header : "回款日期",
			dataIndex : "receiveDate"
		}, {
			width : 50,
			header : "已回金额",
			dataIndex : "alreadyReceivement"
		}, {
			width : 50,
			header : "回款状态",
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
				header : "预计回款额",
				dataIndex : "receivement"
			}, {
				width : 50,
				header : "已回金额",
				dataIndex : "alreadyReceivement"
			} ]
		};
	}
	ReceivementSelector.superclass.constructor.call(this, {
		configView : {
			title : "回款计划选择"
		},
		source : {
			url : __ctxPath + "/archive/listReceivement.do",
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
Ext.extend(ReceivementSelector, Knight.ux.RelationSelector, {});