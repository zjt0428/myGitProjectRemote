Ext.ns("App");
App.TreeLoader = Ext.extend(Ext.ux.tree.XmlTreeLoader, {
	processAttributes : function(a) {
		if (a.tagName == "Function") {
			a.leaf = true;
		} else {
			if (a.tagName == "Item") {
				a.loaded = true;
				a.expanded = true;
			} else {
				if (a.tagName == "Items") {
					a.loaded = true;
					a.expanded = true;
				}
			}
		}
	}
});
var RoleGrantRightView = function(c, a) {
	var b = new Ext.ux.tree.CheckTreePanel({
		title : "为角色[" + a + "]授权",
		id : "roleGrantView",
		iconCls : "menu-set-grant",
		autoScroll : true,
		rootVisible : false,
		loader : new App.TreeLoader({
			dataUrl : __ctxPath + "/system/grantXmlAppRole.do"
		}),
		root : new Ext.tree.AsyncTreeNode({
			expanded : true
		}),
		tools : [ {
			id : "refresh",
			qtip : "重新加载树",
			handler : function() {
				Ext.getCmp("roleGrantView").getRootNode().reload();
			}
		} ]
	});
	var d = new Ext.Window({
		id : "RoleGrantView",
		title : "角色授权设置",
		width : 600,
		height : 450,
		modal : true,
		layout : "fit",
		plain : true,
		bodyStyle : "padding:5px;",
		buttonAlign : "center",
		items : [ b ],
		listeners : {
			afterlayout : function() {
				Ext.Ajax.request({
					url : __ctxPath + "/system/getAppRole.do",
					method : "POST",
					params : {
						roleId : c
					},
					success : function(e, g) {
						var resp = Ext.util.JSON.decode(e.responseText);
						var rights = resp.data[0].rights
						if (!Ext.isEmpty(rights)) {
							var task = new Ext.util.DelayedTask(function() {
								if (b.body && b.body.id) {
									b.setValue(rights);
									if (Ext.isEmpty(b.getValue().toString())) {
										task.delay(10);
									}
								} else {
									task.delay(10);
								}
							});
							task.delay(10);
						}
					},
					failure : function(e, f) {
						$toast("加载权限出错！");
					},
					scope : this
				});
			}
		},
		buttons : [ {
			text : "保存",
			iconCls : "btn-save",
			handler : function() {
				Ext.MessageBox.show({
					msg : "请稍等，正在提交操作中...",
					progressText : "请求中...",
					width : 300,
					wait : true,
					icon : "ext-load-wait",
					waitConfig : {
						interval : 500
					}
				});
				Ext.Ajax.request({
					url : __ctxPath + "/system/grantAppRole.do",
					method : "POST",
					params : {
						roleId : c,
						rights : b.getValue().toString()
					},
					success : function(e, f) {
						Ext.MessageBox.hide();
						$toast("你已经成功为角色[<b>" + a + "</b>]进行了授权");
						Ext.getCmp("RoleGrantView").close();
					},
					failure : function(e, f) {
						Ext.MessageBox.hide();
						$toast("授权出错，请联系管理员！");
					},
					scope : this
				});
			}
		}, {
			text : "取消",
			iconCls : "btn-cancel",
			handler : function() {
				Ext.getCmp("RoleGrantView").close();
			}
		} ]
	});
	d.show();
};