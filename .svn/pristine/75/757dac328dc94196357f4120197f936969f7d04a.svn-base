var OnlineUserSelector = {
	getView : function(d, c) {
		var a = this.initPanel(c);
		var b = new Ext.Window({
			title : "选择在线用户",
			iconCls : "menu-set-user",
			width : 440,
			height : 420,
			border : false,
			layout : "fit",
			items : [ a ],
			modal : true,
			buttonAlign : "center",
			buttons : [ {
				text : "确认",
				iconCls : "btn-panel-ok",
				scope : "true",
				handler : function() {
					var f = Ext.getCmp("contactGrid");
					var h = f.getSelectionModel().getSelections();
					var j = "";
					var g = "";
					for ( var e = 0; e < h.length; e++) {
						if (e > 0) {
							j += ",";
							g += ",";
						}
						j += h[e].data.userId;
						g += h[e].data.fullname;
					}
					if (d != null) {
						d.call(this, j, g);
					}
					b.close();
				}
			}, {
				text : "关闭",
				iconCls : "btn-panel-cancel",
				handler : function() {
					b.close();
				}
			} ]
		});
		return b;
	},
	initPanel : function(c) {
		var f = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : __ctxPath + "/system/onlineAppUser.do"
			}),
			reader : new Ext.data.JsonReader({
				root : "result",
				totalProperty : "totalCounts",
				id : "id",
				fields : [ {
					name : "userId",
					type : "int"
				}, "fullname", "sex","moblieFlag" ]
			}),
			remoteSort : true
		});
		f.setDefaultSort("id", "desc");
		f.load();
		var a = null;
		if (c) {
			var a = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
		} else {
			a = new Ext.grid.CheckboxSelectionModel();
		}
		var g = new Ext.grid.ColumnModel({
			columns : [ a, new Ext.grid.RowNumberer(), {
				header : "用户名",
				dataIndex : "fullname",
				renderer : function(k, l, j) {
					var m = j.data.sex;
					if (m == "1") {
						return '<img src="' + __ctxPath + '/img/flag/man.png"/>&nbsp;' + k;
					} else {
						return '<img src="' + __ctxPath + '/img/flag/women.png"/>&nbsp;' + k;
					}
				},
				width : 60
			},{
				width : 50,
				header : "登录口",
				dataIndex : "moblie",
				renderer : function(k, l, j) {
					var m = j.data.moblieFlag;
					if (m == "1") {
						return "电脑端";
					} else if(m == "2") {
						return "app端";
					} else {
						return "小程序端";
					}
				}
			} ],
			defaults : {
				sortable : true,
				menuDisabled : true,
				width : 120
			},
			listeners : {
				hiddenchange : function(j, k, l) {
					saveConfig(k, l);
				}
			}
		});
		var b = new Ext.tree.TreePanel({
			id : "treePanels",
			title : "按部门分类 ",
			iconCls : "menu-personal-dep",
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + "/system/listDepartment.do"
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			autoScroll : true,
			rootVisible : false,
			listeners : {
				"click" : this.clickNode
			}
		});
		var i = new Ext.tree.TreePanel({
			id : "rolePanel",
			iconCls : "menu-personal-role",
			title : "按角色分类 ",
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + "/system/treeAppRole.do"
			}),
			autoScroll : true,
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				"click" : this.clickRoleNode
			}
		});
		var n = new Ext.Panel({
			id : "pcPanel",
			iconCls : "menu-personal-user",
			title : "所有电脑端人员  ",
			listeners : {
				"expand" : this.clickPcPanel
			}
		});
		var m = new Ext.Panel({
			id : "appPanel",
			iconCls : "menu-personal-user",
			title : "所有app端人员  ",
			listeners : {
				"expand" : this.clickAppPanel
			}
		});
		var r = new Ext.Panel({
			id : "miniProgramPanel",
			iconCls : "menu-personal-user",
			title : "所有小程序端人员  ",
			listeners : {
				"expand" : this.clickMiniProgramPanel
			}
		});
		var d = new Ext.Panel({
			id : "onlinePanel",
			iconCls : "menu-personal-user",
			title : "所有在线人员  ",
			listeners : {
				"expand" : this.clickOnlinePanel
			}
		});
		var h = new Ext.grid.GridPanel({
			id : "contactGrid",
			height : 345,
			store : f,
			shim : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			cm : g,
			sm : a,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			}
		});
		var e = new Ext.Panel({
			id : "contactPanel",
			width : 500,
			height : 500,
			layout : "border",
			border : false,
			items : [ {
				region : "west",
				split : true,
				header : false,
				collapsible : true,
				width : 190,
				layout : "accordion",
				items : [ b, i, n, m, r, d ]
			}, {
				region : "center",
				layout : "fit",
				width : 260,
				items : [ h ]
			} ]
		});
		return e;
	},
	clickNode : function(b) {
		if (b != null) {
			var c = Ext.getCmp("contactGrid");
			var a = c.getStore();
			a.proxy.conn.url = __ctxPath + "/system/onlineAppUser.do";
			a.baseParams = {
				depId : b.id
			};
			a.load();
		}
	},
	clickRoleNode : function(b) {
		if (b != null) {
			var c = Ext.getCmp("contactGrid");
			var a = c.getStore();
			a.baseParams = {
				roleId : b.id
			};
			a.proxy.conn.url = __ctxPath + "/system/onlineAppUser.do";
			a.load();
		}
	},
	clickPcPanel : function() {
		var b = Ext.getCmp("contactGrid");
		var a = b.getStore();
		a.baseParams = {
			depId : null,
			roleId : null,
			moblieFlag : "1"
		};
		a.proxy.conn.url = __ctxPath + "/system/onlineAppUser.do";
		a.load();
	},
	clickAppPanel : function() {
		var b = Ext.getCmp("contactGrid");
		var a = b.getStore();
		a.baseParams = {
			depId : null,
			roleId : null,
			moblieFlag : "2"
		};
		a.proxy.conn.url = __ctxPath + "/system/onlineAppUser.do";
		a.load();
	},
	clickMiniProgramPanel : function() {
		var b = Ext.getCmp("contactGrid");
		var a = b.getStore();
		a.baseParams = {
			depId : null,
			roleId : null,
			moblieFlag : "3"
		};
		a.proxy.conn.url = __ctxPath + "/system/onlineAppUser.do";
		a.load();
	},
	clickOnlinePanel : function() {
		var b = Ext.getCmp("contactGrid");
		var a = b.getStore();
		a.baseParams = {
			depId : null,
			roleId : null
		};
		a.proxy.conn.url = __ctxPath + "/system/onlineAppUser.do";
		a.load();
	}
};