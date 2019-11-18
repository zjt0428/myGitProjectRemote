var DispatchSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params.Q_delFlag_S_EQ = "1";
//	this.params.Q_effective_S_EQ = "1";//显示非失效的
//	this.params.Q_applyforState_S_EQ = "3";
	
	this.params.QUERY_FILTER = "dispatch_un_logisticTran";
	if(!isGranted("__ALL")) {
		this.params["QVO_vo.permissionFlag_S_LK"] = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	
	var generalItems = [ {
		lable : "进场时间",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_startPlanDate_S_GE"
	}, {
		lable : "至",
		editable : false,
		xtype : "datefield",
		format : "Y-m-d",
		name : "Q_startPlanDate_S_LE"
	}, {
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
			fields : DispatchListViewField
		},
		columns : [{
			header : "调度状态",
			dataIndex : "effective",
			renderer : function(n){
				switch (n) {
					case "1":
						return "未失效"
						break;
					case "0":
						return "已失效"
						break;					
				}
			}
		}, {
			header : "调度主题",
			dataIndex : "dispatchTheme"
		}, {
			header : "调度单号",
			dataIndex : "dispatchSerial"
		}, {
			header : "调度人员",
			dataIndex : "userName"
		}, {
			header : "发货仓库",
			dataIndex : "deliveryEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目地址",
			dataIndex : "receiveAddress"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选调度",
			single : this.single,
			collect : true,
			fields : DispatchListViewField,
			columns : [ {
				width : 80,
				header : "调度主题",
				dataIndex : "dispatchTheme"
			}, {
				width : 80,
				header : "计划进场时间",
				dataIndex : "startPlanDate"
			} ]
		};
	}
	DispatchSelector.superclass.constructor.call(this, {
		configView : {
			title : this.title ? this.title : "调度选择"
		},
		source : {
			url : __ctxPath + "/dispatch/listByTransStatusDispatch.do",
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
Ext.extend(DispatchSelector, Knight.ux.RelationSelector, {});