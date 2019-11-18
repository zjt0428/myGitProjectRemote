var DispatchEquipSelector = function(a) {
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
		title : "<font style=\'font-size:13px\' color=red>调度设备选取</font>",
		width : 320,
		single : this.single,
		url : __ctxPath + "/dispatch/listEquipDispatch.do",
		parent : "dispatch",
		fields : DispatchEquipListViewField,
		columns : [ {
			dataIndex : "workStatus",
			width : 40,
			renderer : function(n) {
				if (n == "0") {
					return '未安装';
				} else if (n == "1") {
					return '已安装';
				} else {
					return '已拆卸';
				}
			}
		}, {
			header : "楼号",
			dataIndex : "buildingNum"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "设备类别",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipCategoryName;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			width : 100,
			header : "预计进场时间",
			dataIndex : "startDate"
		} ]
	};
	DispatchEquipSelector.superclass.constructor.call(this, {
		configView : {
			title : "调度设备选择(请双击调度信息/点击箭头 选取已调度设备信息)"
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
Ext.extend(DispatchEquipSelector, Knight.ux.RelationSelector, {
	targetRowdbReload : function(data) {
		var params = Ext.apply({
			"Q_dispatchId_L_EQ" : data.dispatchId
		}, this.target_params || {});
		this.targetPanel.getStore().reload({
			params : params
		});
	}
});