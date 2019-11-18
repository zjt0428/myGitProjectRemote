var PickupSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "领用编号",
		name : "Q_pickupSerial_S_LK"
	}, {
		lable : "领用人",
		name : "Q_recipients_S_LK"
	}, {
		lable : "领用日期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_pickupDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_pickupDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "pickupId",
			sortDir : "asc",
			id : "pickupId",
			fields : PickupListViewField
		},
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "pickupStatusName"
		}, {
			width : 80,
			header : "领用单号",
			dataIndex : "pickupSerial"
		}, {
			width : 80,
			header : "领用人",
			dataIndex : "recipients"
		}, {
			header : "应付金额",
			dataIndex : "pickupAmount"
		}, {
			header : "已付金额",
			dataIndex : "paidAmount"
		}, {
			header : "合计金额",
			dataIndex : "totalAmount"
		}, {
			width : 80,
			header : "领用时间",
			dataIndex : "pickupDate"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : PickupListViewField,
			columns : [ {
				width : 80,
				header : "领用单号",
				dataIndex : "pickupSerial"
			}, {
				width : 80,
				header : "领用人",
				dataIndex : "recipients"
			}, {
				width : 80,
				header : "领用时间",
				dataIndex : "pickupDate"
			} ]
		};
	}
	PickupSelector.superclass.constructor.call(this, {
		configView : {
			title : "领用选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listPickup.do",
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
Ext.extend(PickupSelector, Knight.ux.RelationSelector, {});