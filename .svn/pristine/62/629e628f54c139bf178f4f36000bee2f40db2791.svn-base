var MaterialsDispatchSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "调度单号",
		name : "Q_dispatchSerial_S_LK"
	}, {
		lable : "工程名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "仓库名称",
		name : "Q_storeName_S_LK"
	},{
		lable : "制单时间",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_applyDate_S_GE"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields :  MaterialsDispatchListViewField
		},
		columns : [ {
			header : "调度状态",
			dataIndex : "effectiveName"
		}, {
			header : "调度人员",
			dataIndex : "userName"
		}, {
			header : "调度单号",
			dataIndex : "dispatchSerial"
		}, {
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			header : "工程名称",
			dataIndex : "projectName"
		},  {
			header : "调度日期",
			dataIndex : "applyDate"
		}, {
			header : "运输车辆",
			dataIndex : "vehicleNum"
		}, {
			header : "运输人员",
			dataIndex : "vehiclePerson"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "库位",
			dataIndex : "storageLocation"
		}]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选物流信息",
			single : this.single,
			collect : true,
			fields :  MaterialsDispatchListViewField,
			columns : [ {
				header : "状态",
				dataIndex : "applyforStateName"
			}, {
				header : "调度单号",
				dataIndex : "dispatchSerial"
			}, {
				header : "工程名称",
				dataIndex : "projectName"
			},  {
				header : "制单时间",
				dataIndex : "applyDate"
			}, {
				header : "承租单位",
				dataIndex : "pbEntName"
			}, {
				header : "仓库名称",
				dataIndex : "pbEntName"
			}, {
				header : "库位",
				dataIndex : "storageLocation"
			}, {
				header : "运费",
				dataIndex : "tranportAmount"
			}]
		};
	}
	MaterialsDispatchSelector.superclass.constructor.call(this, {
		configView : {
			title : "发货调度选择"
		},
		source : {
			url : __ctxPath + "/materials/listMaterialsDispatch.do",
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
Ext.extend(MaterialsDispatchSelector, Knight.ux.RelationSelector, {});