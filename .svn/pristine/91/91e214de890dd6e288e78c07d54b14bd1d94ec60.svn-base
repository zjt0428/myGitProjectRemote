var DepartmentView = function(a) {
	Ext.apply(this, a);
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var actionItems = [];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var datagrid_config = {
		store : {
			sortField : "userId",
			sortDir : "asc",
			id : "userId",
			fields : [ "userId", "userTypeName", "username", "fullname", "email", "department", "createTime", "status", "keyFlag" ]
		},
		rowAction : {
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 30,
			renderer : function(n) {
				var o = "";
				if (n == "1") {
					o += '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					o += '<img title="禁用" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
				return o;
			}
		}, {
			header : "帐户类型",
			dataIndex : "userTypeName",
			width : 80
		}, {
			header : "账号",
			dataIndex : "username",
			width : 60
		}, {
			header : "用户名",
			dataIndex : "fullname",
			width : 60
		}, {
			header : "邮箱",
			dataIndex : "email",
			width : 120
		}, {
			header : "所属部门",
			dataIndex : "department",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.depName;
				}
			},
			width : 60
		} ]
	};

	var tbarItems = [ {
		iconCls : "btn-refresh",
		text : "刷新",
		handler : this.departmentReload.createDelegate(this)
	}, {
		text : "展开",
		iconCls : "btn-expand",
		handler : this.expandAll.createDelegate(this)
	}, {
		text : "收起",
		iconCls : "btn-collapse",
		handler : this.collapseAll.createDelegate(this)
	} ];

	this.departmentTree = new Ext.tree.TreePanel({
		region : "west",
		title : "部门信息显示",
		collapsible : true,
		autoScroll : true,
		split : true,
		height : 800,
		width : 180,
		tbar : new Ext.Toolbar({
			items : tbarItems
		}),
		loader : new Ext.tree.TreeLoader({
			url : __ctxPath + "/system/listDepartment.do"
		}),
		root : new Ext.tree.AsyncTreeNode({
			id : 0,
			expanded : true
		}),
		rootVisible : false,
		listeners : {
			click : this.departmentOnclick.createDelegate(this),
			contextmenu : this.showRightMenu.createDelegate(this)
		}
	});
	new Ext.tree.TreeSorter(this.departmentTree, {
	    dir: "asc",
	    property: "sortField",
	    caseSensitive: true
	});
	var menuItems = [];
	if (isGranted("_DepartmentAdd")) {
		menuItems.push({
			text : "新建部门",
			iconCls : "menu-add",
			handler : this.createDepartment.createDelegate(this)
		});
	}
	if (isGranted("_DepartmentEdit")) {
		menuItems.push({
			text : "修改部门信息",
			iconCls : "menu-edit",
			handler : this.editDepartment.createDelegate(this)
		});
	}
	if (isGranted("_DepartmentDel")) {
		menuItems.push({
			text : "删除部门",
			iconCls : "menu-del",
			handler : this.deleteDepartment.createDelegate(this)
		});
	}
	this.departmentMenu = new Ext.menu.Menu({
		items : menuItems
	});
	this.selectDepartment = null;
	DepartmentView.superclass.constructor.call(this, Ext.apply({
		id : "DepartmentView",
		title : "部门信息",
		iconCls : "menu-set-department",
		url : __ctxPath + "/system/selectAppUser.do",
		base_params : this.params,
		items : [ this.departmentTree ],
		datagrid_config : datagrid_config,
		datagrid_view : {
			title : "用户基本信息"
		}
	}, a));
};
Ext.extend(DepartmentView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-grid-del",
			qtip : "删除",
			hidden : true,
			handler : this.deleteAppUser
		});
		actionItems.push({
			iconCls : "btn-grid-edit",
			qtip : "编辑",
			hidden : true,
			handler : this.editAppUser
		});
	},
	rendererRowActionItems : function(action, record) {
		if (record.data.userId != "1") {
			if (isGranted("_AppUserDel")) {
				action[0].hidden = false;
			}
			if (isGranted("_AppUserEdit")) {
				action[1].hidden = false;
			}
		}
	},
	departmentReload : function() {
		this.departmentTree.root.reload();
	},
	expandAll : function() {
		this.departmentTree.expandAll();
	},
	collapseAll : function() {
		this.departmentTree.collapseAll();
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
	editAppUser : function(a) {
		var showikeyable = false;
		if (a.keyFlag == "1") {
			showikeyable = true;
		}
		var appUser = this.loadAppUser(a, {
			resetPasswordable : true,
			showRoleable : true,
			saveable : true,
			showikeyable : showikeyable
		});
		appUser.getForm().findField("appUser.username").setReadOnly(true);
		appUser.show();
	},
	deleteAppUser : function(a) {
		Ext.Msg.confirm("删除操作", "你确定要删除该用户吗?", function(b) {
			if (b == "yes") {
				Ext.Ajax.request({
					url : __ctxPath + "/system/multiDelAppUser.do",
					method : "post",
					params : {
						ids : a.userId
					},
					success : function(d) {
						var resp = Ext.util.JSON.decode(d.responseText);
						if (d.msg) {
							$toast(d.msg);
						}
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this),
					failure : function() {
						$toast("用户删除失败");
					}
				});
			}
		}.createDelegate(this));
	},
	departmentOnclick : function(b) {
		this.dataGridPanel.getStore().baseParams = {
			depId : b.id
		};
		this.dataGridPanel.getStore().load();
	},
	showRightMenu : function(n, o) {
		this.selectDepartment = new Ext.tree.TreeNode({
			id : n.id,
			text : n.text
		});
		this.departmentMenu.showAt(o.getXY());
	},
	createDepartment : function() {
		new DepartmentForm({
			parentId : this.selectDepartment.id
		}, {
			callback : function() {
				this.departmentTree.root.reload();
			}.createDelegate(this)
		}).show();
	},
	editDepartment : function() {
		var depId = this.selectDepartment.id;
		if (!(depId > 0)) {
			$toast("总公司不能修改！");
			return;
		}
		new DepartmentForm({
			depId : depId
		}, {
			callback : function() {
				this.departmentTree.root.reload();
			}.createDelegate(this)
		}).show();
	},
	deleteDepartment : function() {
		var depId = this.selectDepartment.id;
		if (!(depId > 0)) {
			$toast("总公司不能被删除");
			return;
		}
		Ext.Msg.confirm("删除操作", "你确定删除部门?", function(p) {
			if (p == "yes") {
				$request({
					url : __ctxPath + "/system/removeDepartment.do",
					params : {
						depId : depId
					},
					success : function(q, s) {
						$toast("删除成功!");
						this.departmentTree.root.reload();
					}.createDelegate(this)
				});
			}
		}.createDelegate(this));
	}
});
