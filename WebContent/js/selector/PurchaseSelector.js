var PurchaseSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "采购编号",
		name : "Q_purchaseSerial_S_LK"
	}, {
		lable : "采购人员",
		name : "Q_purchaserName_S_LK"
	}, {
		lable : "采购日期",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_purchaseDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_purchaseDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "purchaseId",
			sortDir : "asc",
			id : "purchaseId",
			fields : PurchaseListViewField
		},
		columns : [ {
			header : "采购单号",
			dataIndex : "purchaseSerial"
		}, {
			header : "采购主题",
			dataIndex : "purchaseTheme"
		}, {
			header : "供应商",
			dataIndex : "supplierName"
		}, {
			header : "采购人",
			dataIndex : "purchaserName"
		}, {
			header : "采购金额",
			dataIndex : "purchaseAmount"
		}, {
			header : "采购时间",
			dataIndex : "purchaseDate"
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
			fields : PurchaseListViewField,
			columns : [ {
				width : 80,
				header : "采购单号",
				dataIndex : "purchaseSerial"
			}, {
				width : 80,
				header : "采购主题",
				dataIndex : "purchaseTheme"
			}, {
				width : 80,
				header : "采购人",
				dataIndex : "purchaserName"
			} ]
		};
	}
	PurchaseSelector.superclass.constructor.call(this, {
		configView : {
			title : "采购选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listPurchase.do",
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
Ext.extend(PurchaseSelector, Knight.ux.RelationSelector, {});