var TeamsAccountSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "班组名称",
		name : "Q_teams_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "班组负责人",
		name : "Q_practiName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : TeamsAccountListViewField
		},
		columns : [ {
			width : 40,
			header : "付款情况",
			dataIndex : "fundStatusName"
		}, {
			header : "结算编号",
			dataIndex : "teamsAccountSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "班组负责人",
			dataIndex : "practiName"
		}, {
			header : "班组名称",
			dataIndex : "teams"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选人员",
			single : this.single,
			collect : true,
			fields : TeamsAccountListViewField,
			columns : [ {
				header : "班组负责人",
				dataIndex : "practiName"
			}, {
				header : "班组名称",
				dataIndex : "teams"
			} ]
		};
	}
	TeamsAccountSelector.superclass.constructor.call(this, {
		configView : {
			title : "班组核算"
		},
		source : {
			url : __ctxPath + "/dispatch/listTeamsAccount.do",
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
Ext.extend(TeamsAccountSelector, Knight.ux.RelationSelector, {});