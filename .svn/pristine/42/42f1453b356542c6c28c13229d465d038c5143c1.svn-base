var BorrowSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "借用编号",
		name : "Q_borrowSerial_S_LK"
	}, {
		lable : "借用时间",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_borrowDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_borrowDate_S_LE"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "borrowId",
			sortDir : "asc",
			id : "borrowId",
			fields : BorrowListViewField
		},
		columns : [ {
			width : 40,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			width : 80,
			header : "借用单号",
			dataIndex : "borrowSerial"
		}, {
			width : 80,
			header : "借用主题",
			dataIndex : "borrowTheme"
		}, {
			width : 80,
			header : "借出单位",
			dataIndex : "outrelateName"
		}, {
			width : 80,
			header : "借用单位",
			dataIndex : "inrelateName"
		}, {
			width : 80,
			header : "借用时间",
			dataIndex : "borrowDate"
		}, {
			width : 80,
			header : "归还时间",
			dataIndex : "returnDate"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选内容",
			single : this.single,
			collect : true,
			fields : BorrowListViewField,
			columns : [ {
				width : 80,
				header : "借用单号",
				dataIndex : "borrowSerial"
			}, {
				width : 80,
				header : "借用时间",
				dataIndex : "borrowDate"
			}, {
				width : 80,
				header : "归还时间",
				dataIndex : "returnDate"
			} ]
		};
	}
	BorrowSelector.superclass.constructor.call(this, {
		configView : {
			title : "借用选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listBorrow.do",
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
Ext.extend(BorrowSelector, Knight.ux.RelationSelector, {});