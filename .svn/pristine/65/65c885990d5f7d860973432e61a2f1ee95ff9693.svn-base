var DispatchComponDiarySelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "调度主题",
		name : "Q_dispatchTheme_S_LK"
	}, {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : DispatchListViewField
		},
		columns : [ {
			width : 40,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : "调度主题",
			dataIndex : "dispatchTheme"
		}, {
			header : "计划进场时间",
			dataIndex : "startPlanDate"
		}, {
			width : 150,
			header : "项目名称",
			dataIndex : "projectName"
		} ],
	};
	// =============================================this.favoritesPanel=======================================================//
	var target = {
		title : "调度零配件选择",
		single : this.single,
		url : __ctxPath + "/equip/listComponDiary.do",
		parent : "dispatch",
		fields : ComponDiaryListViewField,
		columns : [ {
			header : "零配件编号",
			dataIndex : "componSerial"
		}, {
			header : "零配件名称",
			dataIndex : "componGenericName"
		}, {
			width : 30,
			header : "调度数量",
			dataIndex : "counts"
		} ]
	};
	DispatchComponDiarySelector.superclass.constructor.call(this, {
		configView : {
			title : "调度零配件选择"
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
Ext.extend(DispatchComponDiarySelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		var params = Ext.apply({
			"Q_dispatchId_L_EQ" : data.dispatchId
		}, this.target_params || {});
		this.targetPanel.getStore().reload({
			params : params
		});
	}
});