var ProjectUserListView = function(a) {
	Ext.apply(this, a);
	this.params = this.params ? this.params : {};
	this.params.Q_userType_S_EQ = "2";
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "用户账号",
			name : "Q_username_S_LK"
		}, {
			lable : "用户姓名",
			name : "Q_fullname_S_LK"
		},{
			lable : "移动电话",
			name : "Q_mobile_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAppUser
	} ];
	var tbarItems = null;
	var datagrid_config = {
		store : {
			sortField : "userId",
			sortDir : "asc",
			id : "userId",
			fields : [ "userId",  "username", "fullname", "department", "createTime", "status","mobile"]
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "userId",
			dataIndex : "userId",
			hidden : true
		}, {
			header : "状态",
			dataIndex : "status",
			width : 30,
			renderer : function(f) {
				if (f == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="禁用" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			header : "账号",
			dataIndex : "username",
			width : 60
		}, {
			header : "用户名",
			dataIndex : "fullname",
			width : 60
		},{
			header : "移动电话",
			dataIndex : "mobile",
			width : 60
		}, {
			header : "创建时间",
			dataIndex : "createTime"
		} ]
	};
	ProjectUserListView.superclass.constructor.call(this, Ext.apply({
		id : "ProjectUserListView",
		title : "项目用户",
		iconCls : "menu-set-user",
		url : __ctxPath + "/system/listAppUser.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ProjectUserListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			hidden : true,
			iconCls : "btn-grid-edit",
			qtip : "编辑",
			handler : this.editAppUser
		});
		actionItems.push({
			hidden : true,
			iconCls : "btn-computer-key",
			qtip : "分配IKEY",
			handler : this.sendAppUserIKey
		});
		actionItems.push({
			hidden : true,
			text : "授权",
			iconCls : "btn-set-grant",
			qtip : "合同授权",
			handler : this.contractGranted
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		if (isGranted("_AppUserEdit") && 1 != record.data.userId) {
			action[1].hidden = false;
		}
		if (isGranted("_AppUserGranted") && 1 != record.data.userId) {
			action[3].hidden = false;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AppUserAdd")) {
			tbarItems.push({
				text : "添加用户",
				iconCls : "btn-set-adduser",
				handler : this.addAppUser.createDelegate(this)
			});
		}
		if (isGranted("_AppUserDel")) {
			tbarItems.push({
				iconCls : "btn-set-deluser",
				text : "删除用户",
				handler : this.delAppUser.createDelegate(this)
			});
		}
		if (isGranted("_AppUserResetPwd")) {
			tbarItems.push({
				iconCls : "btn-password",
				text : "恢复密码",
				handler : this.resetAppUserPassword.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的用户信息！";
		var msg2 = "您确认要【" + op + "】所选的用户信息吗？";
		var msg3 = "成功【" + op + "】所选的用户信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadAppUser : function(a, b) {
		var showikeyable = false;
		if (a && a.keyFlag == "1") {
			showikeyable = true;
		}
		return new AppUserForm(a, Ext.apply({
			showikeyable : showikeyable,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}, b || {}));
	},
	readAppUser : function(a) {
		var showikeyable = false;
		if (a.keyFlag == "1") {
			showikeyable = true;
		}
		this.loadAppUser(a, {
			showikeyable : showikeyable
		}).show();
	},
	editAppUser : function(a) {
		var showikeyable = false;
		var resetPasswordable = true;
		var appUserRolesdisable = false;
		if (a.keyFlag == "1") {
			showikeyable = true;
		}
		if (1 == a.userId) {
			resetPasswordable = false;
			appUserRolesdisable = true;
		}
		var appUser = this.loadAppUser(a, {
			resetPasswordable : resetPasswordable,
			appUserRolesdisable : appUserRolesdisable,
			showRoleable : true,
			saveable : true,
			showikeyable : showikeyable
		});
		appUser.getForm().findField("appUser.username").setReadOnly(true);
		appUser.show();
	},
	sendAppUserIKey : function(a) {
		new AppUserKeyFormWin({
			userId : a.userId,
			username : a.fullname
		}).show();
	},
	addAppUser : function() {
		this.loadAppUser({
			userType : "0",
			userTypeName : "系统用户"
		}, {
			showRoleable : true,
			saveable : true
		}).show();
	},
	delAppUser : function() {
		this.speciallyGridAction(this.dataGridPanel, "userId", __ctxPath + "/system/multiDelAppUser.do", "删除", function(a) {
			if (1 == a.userId) {
				$toast("超级管理员无法删除！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	resetAppUserPassword : function() {
		this.speciallyGridAction(this.dataGridPanel, "userId", __ctxPath + "/system/multiResetPwdAppUser.do", "恢复", function(a) {
			if (1 == a.userId) {
				$toast("超级管理员密码不在此重置！");
				return false;
			}
			return true;
		}.createDelegate(this));
	}
});