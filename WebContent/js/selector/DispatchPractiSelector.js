var DispatchPractiSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		width : 80,
		lable : "调度主题",
		name : "Q_dispatchTheme_S_LK"
	}, {
		width : 80,
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			sortField : "dispatchId",
			sortDir : "asc",
			id : "dispatchId",
			fields : DispatchListViewField
		},
		columns : [ {
			width : 75,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			width : 80,
			header : "调度主题",
			dataIndex : "dispatchTheme"
		}, {
			width : 100,
			header : "计划进场时间",
			dataIndex : "startPlanDate"
		}, {
			width : 90,
			header : "项目名称",
			dataIndex : "projectName"
		} ],
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = {
		title : "调度人员选择",
		single : this.single,
		url : __ctxPath + "/dispatch/listPractiDispatch.do",
		parent : "dispatch",
		fields : DispatchPractiListViewField,
		columns : [ {
			header : "从业工种",
			dataIndex : "practitioner",
			renderer : function(n) {
				return n.kindWorkName;
			}
		}, {
			header : "企业人员",
			dataIndex : "practitioner",
			renderer : function(n) {
				return n.practiName;
			}
		}, {
			header : "联系方式",
			dataIndex : "practitioner",
			renderer : function(n) {
				return n.mobile;
			}
		}, {
			header : "预计进场时间",
			dataIndex : "startDate"
		} ]
	};
	DispatchPractiSelector.superclass.constructor.call(this, {
		configView : {
			title : "调度人员选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listDispatch.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : false,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(DispatchPractiSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		this.targetPanel.getStore().reload({
			params : {
				"Q_dispatchId_L_EQ" : data.dispatchId
			}
		});
	}
});