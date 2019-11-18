var LogisticsBacksportSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "物流单号",
		name : "Q_backsportSerial_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "运输单位",
		name : "Q_backsportEntName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : LogisticsBacksportListViewField
		},
		columns : [ {
			header : "物流单号",
			dataIndex : "backsportSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			width : 120,
			header : "收货地址",
			dataIndex : "address"
		}, {
			width : 45,
			header : "发货人",
			dataIndex : "deliveryMan"
		}, {
			header : "发货时间",
			dataIndex : "deliveryDate"
		}, {
			header : "签收时间",
			dataIndex : "signDate"
		}, {
			header : "运输单位",
			dataIndex : "backsportEntName"
		}, {
			header : "运输费用",
			dataIndex : "backsportAmount"
		}, {
			header : "已付金额",
			dataIndex : "finishedAmount"
		}, {
			header : "余额",
			dataIndex : "remainderAmount"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选物流信息",
			single : this.single,
			collect : true,
			fields : LogisticsBacksportListViewField,
			columns : [ {
				header : "物流单号",
				dataIndex : "backsportSerial"
			}, {
				header : "项目名称",
				dataIndex : "projectName"
			}, {
				width : 120,
				header : "收货地址",
				dataIndex : "address"
			} ]
		};
	}
	LogisticsBacksportSelector.superclass.constructor.call(this, {
		configView : {
			title : "物流信息选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listLogisticsBacksport.do",
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
Ext.extend(LogisticsBacksportSelector, Knight.ux.RelationSelector, {});