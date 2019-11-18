var ConstructOperationSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_project.projectName_S_LK"
	}, {
		lable : "备案编号",
		name : "Q_equipment.recordId_S_LK"
	}, {
		lable : "班组长",
		name : "Q_teams_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ConstructOperationListViewField
		},
		columns : [ {
			width : 60,
			header : "楼号",
			dataIndex : "buildingNum"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.recordId;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(a, b, c) {
				return a.equipGenericName;
			}
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "project",
			renderer : function(a, b, c) {
				return a.address;
			}
		}, {
			header : "班组长",
			dataIndex : "teams"
		}, {
			header : "使用单位",
			dataIndex : "paEntName"
		}, {
			header : "施工作业时间",
			dataIndex : "constructDate"
		}, {
			header : "费用合计",
			dataIndex : "summary"
		}, {
			header : "余额",
			dataIndex : "remainderAmount"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选信息",
			single : this.single,
			collect : true,
			fields : ConstructOperationListViewField,
			columns : [ {
				header : "备案编号",
				dataIndex : "equipment",
				renderer : function(a, b, c) {
					return a.recordId;
				}
			}, {
				header : "设备名称",
				dataIndex : "equipment",
				renderer : function(a, b, c) {
					return a.equipGenericName;
				}
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function(a, b, c) {
					return a.projectName;
				}
			} ]
		};
	}
	ConstructOperationSelector.superclass.constructor.call(this, {
		configView : {
			title : "施工作业选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listWithSetConstructOperation.do",
			base_params : this.params,
			current_params : this.current_params,
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
Ext.extend(ConstructOperationSelector, Knight.ux.RelationSelector, {});