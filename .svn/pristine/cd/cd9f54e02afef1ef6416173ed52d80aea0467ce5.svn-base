var CarSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "额定载重量",
		name : "Q_nominalLoad_BD_EQ"
	}, {
		lable : "司机",
		name : "Q_driver_S_LK"
	}, {
		lable : "车牌号",
		name : "Q_licensePlate_S_LK"
	},{
		lable : "品牌型号",
		name : "Q_sedan_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : CarListViewField
		},
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 30,
			renderer : function(n) {
				return n == "0" ? "<font color='red'>在用</font>" : "闲置";
			}
		}, {
			header : "产权归属",
			dataIndex : "propertyBelong",
			renderer : function(n) {
				return n == "0" ? "租赁" : "自有";
			}
		}, {
			header : "产权人",
			dataIndex : "propertyName"
		}, {
			header : "车号",
			dataIndex : "licensePlate"
		}, {
			header : "车型",
			dataIndex : "sedan"
		}, {
			header : "额定载重量",
			dataIndex : "nominalLoad"
		}, {
			header : "司机",
			dataIndex : "driver"
		} ]
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选车辆",
			single : this.single,
			collect : true,
			fields : CarListViewField,
			columns : [ {
				header : "车号",
				dataIndex : "licensePlate"
			}, {
				header : "车型",
				dataIndex : "sedan"
			}, {
				header : "额定载重量",
				dataIndex : "nominalLoad"
			}, {
				header : "司机",
				dataIndex : "driver"
			} ]
		};
	}
	var searchActionItems = [];
	if (isGranted("_CarAdd")) {
		searchActionItems.push({
			xtype : "button",
			iconCls : "menu-business-practi",
			text : "新增车辆",
			handler : this.fireBusinessEvent.createDelegate(this, [ "CarListView", ListViewButtonsId.carAdd ])
		});
	}
	CarSelector.superclass.constructor.call(this, {
		configView : {
			title : "车辆选择"
		},
		source : {
			url : __ctxPath + "/archive/listCar.do",
			base_params : this.params,
			search_config : {
				searchActionItems : searchActionItems,
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
Ext.extend(CarSelector, Knight.ux.RelationSelector, {});