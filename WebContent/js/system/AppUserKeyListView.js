var AppUserKeyListView = function(a) {
	Ext.apply(this, a);
	this.params = this.params ? this.params : {}
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "IKEY序列号",
			name : "Q_keySerial_S_LK"
		}, {
			lable : "用户名称",
			name : "Q_appUser.fullname_S_LK"
		}, {
			lable : "有效日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_expirationTime_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_expirationTime_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAppUserKey
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			sortField : "keyId",
			sortDir : "desc",
			id : "keyId",
			fields : [ "keyId", "appUser", "keyStatus", "keySerial", "distributeTime", "validPeriodTime", "expirationTime", "updateTime", "project" ]
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "IKEY",
			dataIndex : "keyId",
			hidden : true
		}, {
			header : "",
			dataIndex : "keyStatus",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="有效" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="注销" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			header : "用户名",
			dataIndex : "appUser",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.username;
				}
			}
		}, {
			header : "用户名称",
			dataIndex : "appUser",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.fullname;
				}
			}
		}, {
			header : "序列号",
			dataIndex : "keySerial"
		}, {
			header : "发放时间",
			dataIndex : "distributeTime"
		}, {
			header : "生效时间",
			dataIndex : "validPeriodTime"
		}, {
			header : "到期时间",
			dataIndex : "expirationTime"
		}, {
			header : "修改时间",
			dataIndex : "updateTime"
		}, {
			header : "所属项目",
			dataIndex : "project",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.projectName;
				}
			}
		} ]
	};
	AppUserKeyListView.superclass.constructor.call(this, Ext.apply({
		id : "AppUserKeyListView",
		title : "用户IKEY信息",
		iconCls : "menu-system-ikey",
		url : __ctxPath + "/system/listAppUserKey.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AppUserKeyListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AppUserKeyEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAppUserKey.createDelegate(this)
			});
		}
		if (isGranted("_AppUserKeyForbidden")) {
			tbarItems.push({
				iconCls : "btn-head-forbidden",
				text : "禁用",
				handler : this.forbiddenAppUserKey.createDelegate(this)
			});
		}
		if (isGranted("_AppUserKeyRecover")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "恢复",
				handler : this.recoverAppUserKey.createDelegate(this)
			});
		}
		if (isGranted("_AppUserKeyDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.multiDelAppUserKey.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的IKEY信息！";
		var msg2 = "您确认要【" + op + "】所选的IKEY信息吗？";
		var msg3 = "成功【" + op + "】所选的IKEY信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readAppUserKey : function(a) {
		new AppUserKeyLogWin(a).show();
	},
	editAppUserKey : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new AppUserKeyFormWin(a[0].data).show();
	},
	forbiddenAppUserKey : function() {
		this.speciallyGridAction(this.dataGridPanel, "keyId", __ctxPath + "/system/multiForbiddenAppUserKey.do", "停用");
	},
	recoverAppUserKey : function() {
		this.speciallyGridAction(this.dataGridPanel, "keyId", __ctxPath + "/system/recoverAppUserKey.do", "恢复");
	},
	multiDelAppUserKey : function() {
		this.speciallyGridAction(this.dataGridPanel, "keyId", __ctxPath + "/system/multiDelAppUserKey.do", "删除");
	}
});

var AppUserKeyLogWin = function(a) {
	Ext.apply(this, a || {});
	this.store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath + "/system/listLogAppUserKey.do"
		}),
		reader : new Ext.data.JsonReader({
			root : "result",
			totalProperty : "totalCounts",
			id : "logid",
			fields : [ "logid", "userId", "fullname", "distributeTime", "validPeriodTime", "expirationTime", "updateUsername" ]
		})
	});
	this.store.setBaseParam("Q_keyId_L_EQ", this.keyId);
	this.store.load({
		params : {
			start : 0,
			limit : 25
		}
	});
	var a = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), {
			header : "用户名称",
			dataIndex : "fullname"
		}, {
			header : "发放时间",
			dataIndex : "distributeTime"
		}, {
			header : "生效时间",
			dataIndex : "validPeriodTime"
		}, {
			header : "到期时间",
			dataIndex : "expirationTime"
		}, {
			header : "修改人",
			dataIndex : "updateUsername"
		} ],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});
	var gridPanel = new Ext.grid.GridPanel({
		store : this.store,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		cm : a,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		bbar : new Ext.PagingToolbar({
			pageSize : 25,
			store : this.store,
			displayInfo : true,
			displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
			emptyMsg : "当前没有记录"
		})
	});
	AppUserKeyLogWin.superclass.constructor.call(this, {
		layout : "fit",
		width : 560,
		height : 280,
		border : false,
		maximizable : true,
		modal : true,
		plain : true,
		items : [ gridPanel ]
	});
};
Ext.extend(AppUserKeyLogWin, Ext.Window, {});
