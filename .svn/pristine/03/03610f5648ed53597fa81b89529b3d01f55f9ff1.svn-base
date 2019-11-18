var BaseLocationSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
//	this.params.Q_status_S_LE = "4";
	Ext.apply(this.params, a.params || {});

	// ====================================this.searchPanel===============================================//
	var generalItems = [{
		lable : "库位名称",
		name : "Q_locationName_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : BaseLocationListViewField
		},
		columns : [{
			header : "库位编码",
			dataIndex : "locationSerial"
		}, {
			header : "库位名称",
			dataIndex : "locationName"
		}, {
			header : "所属仓库",
			dataIndex : "depotName"
		}, {
			header : "联系人",
			dataIndex : "linkman"
		}, {
			header : "地址",
			dataIndex : "address"
		}, {
			header : "描述",
			dataIndex : "description"
		}]
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : BaseLocationListViewField,
			columns : [ {
				width : 80,
				header : "库位名称",
				dataIndex : "locationName"
			}, {
				width : 80,
				header : "联系人",
				dataIndex : "linkman"
			}, {
				width : 80,
				header : "地址",
				dataIndex : "address"
			} ]
		};
	}
	BaseLocationSelector.superclass.constructor.call(this, {
		configView : {
			title : "基地库位选择"
		},
		source : {
			url : __ctxPath + "/materials/listBaseLocation.do",
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
Ext.extend(BaseLocationSelector, Knight.ux.RelationSelector, {});