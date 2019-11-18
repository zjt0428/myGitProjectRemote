var RoleGrantDepartmentView = function(c, a) {
	var b = new Ext.ux.tree.CheckTreePanel({
		title : "为角色[" + a + "]授权",
		id : "RoleGrantDepartmentView",
		iconCls : "menu-set-grant",
		autoScroll : true,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
			url : __ctxPath + "/system/grantListDepartment.do?opt=1"
		}),
		root : new Ext.tree.AsyncTreeNode({
			expanded : true
		}),
		tools : [ {
			id : "refresh",
			qtip : "重新加载树",
			handler : function() {
				Ext.getCmp("RoleGrantDepartmentView").getRootNode().reload();
			}
		} ]
	});
	var d = new Ext.Window({
		id : "RoleGrantDepartmentView",
		title : "数据权限设置",
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
						var rights = resp.data[0].dataPermission
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
				var arr =  b.getValue();
				var pd = [];
				for(var i=0;i<arr.length;i++) {
					var node = b.getNodeById(arr[i]);
					if(node.leaf) {
						continue;
					}else{
						var unCheck = false;
						var count = 0;
						node.eachChild(function(d) {
							if(!d.attributes.checked) {		//判断是否存在未勾选的子节点
								count++;
								unCheck = true;
							}
						});
						if(unCheck && count != node.childNodes.length) {	
							pd.push(arr[i]); 
						}else{
							node.eachChild(function(d) {
								pd.push(d.attributes.id); 
							});
						}
					}
				}
				for(var j=0;j<pd.length;j++) {
					arr.remove(pd[j]);
				}
				Ext.Ajax.request({
					url : __ctxPath + "/system/grantPermissionAppRole.do",
					method : "POST",
					params : {
						type : "data",
						roleId : c,
						permission :arr.toString()
					},
					success : function(e, f) {
						Ext.MessageBox.hide();
						$toast("你已经成功为角色[<b>" + a + "</b>]进行了授权");
						Ext.getCmp("RoleGrantDepartmentView").close();
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
				Ext.getCmp("RoleGrantDepartmentView").close();
			}
		} ]
	});
	d.show();
};