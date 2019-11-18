var ProjectDepotInitSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "施工单位",
		name : "Q_unCustomName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ProjectDepotInitListViewField
		},
		columns : [ {
			header : "项目编号",
			width : 50,
			dataIndex : "projectSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		},{
			header : "施工单位",
			dataIndex : "unCustomName"
		}, {
			header : "地址",
			dataIndex : "address"
		}, {
			header : "库存",
			dataIndex : "total"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : EquipmentListViewField,
			columns : [ {
				width : 80,
				header : "备案编号",
				dataIndex : "recordId"
			}, {
				width : 80,
				header : "出厂编号",
				dataIndex : "exwSerial"
			}, {
				width : 80,
				header : "设备名称",
				dataIndex : "equipGenericName"
			} ]
		};
	}
	ProjectDepotInitSelector.superclass.constructor.call(this, {
		configView : {
			title : "项目仓库选择"
		},
		source : {
			url : __ctxPath + "/materials/listProjectDepotInit.do",
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
Ext.extend(ProjectDepotInitSelector, Knight.ux.RelationSelector, {});