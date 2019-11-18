var AppUserSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, a.params || {});
	// ====================================this.searchPanel===============================================//
	var generalItems = [ {
		lable : "姓名",
		name : "Q_fullname_S_LK"
	}, {
		lable : "登陆账号",
		name : "Q_username_S_LK"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : ["userId", "userTypeName", "username", "fullname", "email", "department", "createTime", "status", "keyFlag","mobile"]
		},
		columns : [ {
			header : "用户姓名",
			dataIndex : "fullname"
		},{
			header : "登录账号",
			dataIndex : "username"
		},{
			header : "电话",
			dataIndex : "mobile"
		}/*, {
			header : "开工日期",
			dataIndex : "startPlanDate"
		}, {
			header : "峻工日期",
			dataIndex : "endPlanDate"
		}*/ ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选人员",
			single : this.single,
			collect : true,
			fields : ["userId", "userTypeName", "username", "fullname", "email", "department", "createTime", "status", "keyFlag"],
			columns : [ {
				header : "账号",
				dataIndex : "username"
			}, {
				header : "姓名",
				dataIndex : "fullname"
			} ]
		};
	}
	var searchActionItems = [];
	AppUserSelector.superclass.constructor.call(this, {
		configView : {
			title : "用户管理选择"
		},
		source : {
			url : __ctxPath + "/system/listAppUser.do",
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
Ext.extend(AppUserSelector, Knight.ux.RelationSelector, {});