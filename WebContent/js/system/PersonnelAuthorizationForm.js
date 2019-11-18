var PersonnelAuthorizationForm = function(a) {
	Ext.apply(this, a);
	this.params =  {};
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = null;
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "userId",
			sortDir : "asc",
			id : "userId",
			fields : [ "userId",  "username", "fullname", "createTime", "status","phone","joinId" ]
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
			dataIndex : "phone",
			width : 60
		},]
	};
	PersonnelAuthorizationForm.superclass.constructor.call(this, Ext.apply({
		id : "PersonnelAuthorizationForm",
		title : "人员授权",
		iconCls : "menu-set-user",
		url : __ctxPath + "/archive/listOnStoreStoreHouse.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PersonnelAuthorizationForm, Knight.ux.SearchGridPanel, {
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
				text : "移除",
				handler : this.delAppUser.createDelegate(this)
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
	addAppUser : function() {
		new AppUserSelector({
			params : {
				"Q_status_SN_EQ": "1"	
			},
			collectEnable : true,
					callback : function(d) {
						var e = Array();
						for (var i = 0; i < d.length; i++) {
							e.push(d[i].data.userId);
						}
						$request({
							params : {
								storeId : this.storeId,
								ids : e,
							},
							url : __ctxPath + "/archive/importUserStoreHouse.do",
							success : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						});
					}.createDelegate(this)
		}).show();
	},
	delAppUser : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【移除】的记录！");
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "joinId", __ctxPath + "/archive/removeUserStoreHouse.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	},
});