var StoreHouseSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "仓库名称",
		name : "Q_storeName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : StoreHouseListViewField
		},
		columns : [ {
			header : "仓库编号",
			dataIndex : "storeSerial"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "仓库地址",
			dataIndex : "address"
		}, {
			header : "仓库面积",
			dataIndex : "area"
		}, {
			header : "仓管负责人",
			dataIndex : "linker"
		} ]
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选仓库",
			single : this.single,
			collect : true,
			fields : StoreHouseListViewField,
			columns : [ {
				header : "仓库编号",
				dataIndex : "storeSerial"
			}, {
				header : "仓库名称",
				dataIndex : "storeName"
			}, {
				header : "仓库地址",
				dataIndex : "address"
			} ]
		};
	}
	StoreHouseSelector.superclass.constructor.call(this, {
		configView : {
			title : "仓库选择"
		},
		source : {
			url : __ctxPath + "/archive/listByUserStoreHouse.do",
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
			datagrid_config : datagrid_config,
			dbclickConfirm : true
		},
		target : target
	});
};
Ext.extend(StoreHouseSelector, Knight.ux.RelationSelector, {});