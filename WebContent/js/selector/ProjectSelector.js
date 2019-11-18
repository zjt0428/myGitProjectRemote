var ProjectSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "项目名称",
		name : "Q_projectName_S_LK"
	}, {
		lable : "项目所属地",
		name : "Q_address_S_LK"
	}, {
		lable : "计划开工日期",
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
	} ];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ProjectListViewField
		},
		columns : [ {
			header : "项目编号",
			dataIndex : "projectSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目所属地",
			dataIndex : "address"
		}, {
			header : "施工单位",
			dataIndex : "unCustomName"
		}, {
			header : "所属部门",
			dataIndex : "department",
			renderer : function(n){
				return n.depName;
			}
		}, {
			header : "开工日期",
			dataIndex : "startPlanDate"
		}, {
			header : "峻工日期",
			dataIndex : "endPlanDate"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选项目",
			single : this.single,
			collect : true,
			fields : ProjectListViewField,
			columns : [ {
				header : "项目编号",
				dataIndex : "projectSerial"
			}, {
				header : "项目名称",
				dataIndex : "projectName"
			} ]
		};
	}
	var searchActionItems = [];
	if (isGranted("_ProjectAdd")) {
		searchActionItems.push({
			xtype : "button",
			iconCls : "menu-business-practi",
			text : "新增项目",
			handler : this.fireBusinessEvent.createDelegate(this, [ "ProjectListView", ListViewButtonsId.projectAdd ])
		});
	}
	ProjectSelector.superclass.constructor.call(this, {
		configView : {
			title : "项目选择"
		},
		source : {
			url : __ctxPath + "/archive/listProject.do",
			base_params : this.params,
			search_config : {
				searchActionItems : searchActionItems,
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
Ext.extend(ProjectSelector, Knight.ux.RelationSelector, {});