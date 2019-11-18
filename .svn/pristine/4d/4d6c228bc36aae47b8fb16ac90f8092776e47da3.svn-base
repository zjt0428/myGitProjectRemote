var BaseDepotJoinUserSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params.Q_delFlag_S_EQ = "1";
//	this.params.Q_status_S_LE = "4";
	Ext.apply(this.params, a.params || {});

	// ====================================this.searchPanel===============================================//
	var fields = ["joinId","depotName","linkman","address","description","depotId"];
	var generalItems = [{
		lable : "仓库名称",
		name : "depotName"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : fields
		},
		columns : [{
			header : "仓库名称",
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
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选设备",
			single : this.single,
			collect : true,
			fields : fields,
			columns : [ {
				width : 80,
				header : "仓库名称",
				dataIndex : "depotName"
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
	BaseDepotJoinUserSelector.superclass.constructor.call(this, {
		configView : {
			title : this.outDepot==true?"调出仓库":this.inDepot==true?"调入仓库":"基地仓库选择"
		},
		source : {
			url : __ctxPath + "/materials/listPermissionBaseDepot.do",
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
Ext.extend(BaseDepotJoinUserSelector, Knight.ux.RelationSelector, {});