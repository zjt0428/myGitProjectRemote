var AppRoleView = function() {
	var generalItems = [ {
		lable : "角色名称",
		name : "Q_roleName_S_LK"
	}, {
		lable : "角色描述",
		name : "Q_roleDesc_S_LK"
	} ];
	var actionItems = [];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "roleId",
			sortDir : "asc",
			id : "roleId",
			fields : [ "roleId", "roleName", "roleDesc", "status", "isDefaultIn", "roleType","roleDepartment" ]
		},
		rowAction : {
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 30,
			renderer : function(c) {
				var d = "";
				if (c == "1") {
					d += '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					d += '<img title="禁用" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
				return d;
			}
		}, {
			header : "角色名称",
			dataIndex : "roleName",
			width : 100
		}, {
			header : "角色描述",
			dataIndex : "roleDesc",
			width : 200
		}, {
			header : "角色类型",
			dataIndex : "roleType",
			width : 100,
			renderer : function(c) {
				if (c == "1") {
					return "领导角色";
				} else {
					return "普通角色";
				}
			}
		},{
			header : "所属部门",
			dataIndex : "roleDepartment",
			width : 150
		} ]
	};
	AppRoleView.superclass.constructor.call(this, {
		id : "AppRoleView",
		title : "角色列表",
		iconCls : "menu-set-role",
		url : __ctxPath + "/system/listAppRole.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	});
};
Ext.extend(AppRoleView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-grid-del",
			hidden : true,
			text : "删除",
			handler : this.removeAppRole
		});
		actionItems.push({
			iconCls : "btn-grid-edit",
			hidden : true,
			text : "编辑",
			handler : this.editAppRole
		});
		actionItems.push({
			iconCls : "btn-set-grant",
			hidden : true,
			text : "授权",
			handler : this.grantAppRole
		});
		actionItems.push({
			iconCls : "btn-set-grant",
			hidden : true,
			text : "数据权限",
			handler : this.grantDepartment
		});
		actionItems.push({
			iconCls : "btn-set-grant",
			hidden : true,
			text : "设备权限",
			handler : this.grantEquipPermission
		});
		actionItems.push({
			iconCls : "btn-set-grant",
			hidden : true,
			text : "劳务权限",
			handler : this.grantLabourPermission
		});
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AppRoleAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "添加角色",
				handler : this.addAppRole.createDelegate(this)
			});
		}
		if (isGranted("_AppRoleDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除角色",
				handler : this.deleteAppRole.createDelegate(this)
			});
		}
		return tbarItems;
	},
	rendererRowActionItems : function(action, record) {
		if (record.data.roleId != -1) {
			if (isGranted("_AppRoleDel")) {
				action[0].hidden = false;
			}
			if (isGranted("_AppRoleEdit")) {
				action[1].hidden = false;
			}
			if (isGranted("_AppRoleGrant")) {
				action[2].hidden = false;
			}
			if (isGranted("_AppRoleGrant")) {
				action[3].hidden = false;
			}
			if (isGranted("_AppRoleGrant")) {
				action[4].hidden = false;
			}
			if (isGranted("_AppRoleGrant")) {
				action[5].hidden = false;
			}
		}
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的角色信息！";
		var msg2 = "您确认要【" + op + "】所选的角色信息吗？";
		var msg3 = "成功【" + op + "】所选的角色信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	removeAppRole : function(a) {
		Ext.Msg.confirm("信息确认", "您确认要删除该记录吗？", function(c) {
			if (c == "yes") {
				Ext.Ajax.request({
					url : __ctxPath + "/system/multiDelAppRole.do",
					params : {
						ids : a.roleId
					},
					method : "post",
					success : function() {
						$toast("成功删除所选记录！");
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}
		}.createDelegate(this));
	},
	editAppRole : function(a) {
		new AppRoleForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	grantAppRole : function(a) {
		new RoleGrantRightView(a.roleId, a.roleName);
	},
	grantDepartment : function(a) {
		new RoleGrantDepartmentView(a.roleId, a.roleName);
	},
	grantEquipPermission : function(a) {
		new RoleGrantEquipPermissionView(a.roleId, a.roleName);
	},
	grantLabourPermission : function(a) {
		new RoleGrantLabourPermissionView(a.roleId, a.roleName);
	},
	addAppRole : function() {
		new AppRoleForm(null, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	deleteAppRole : function() {
		this.speciallyGridAction(this.dataGridPanel, "roleId", __ctxPath + "/system/multiDelAppRole.do", "删除", function(a) {
			if (a.isDefaultIn == "0" || -1 == a.roleId) {
				$toast(a.roleName + "无法删除！");
				return false;
			}
			return true;
		}.createDelegate(this));
	}
});