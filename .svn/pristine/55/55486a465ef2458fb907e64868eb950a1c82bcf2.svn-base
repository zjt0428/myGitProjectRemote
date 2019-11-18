var IndexPage = function() {
	this.north = new Ext.Panel({
		region : "north",
		contentEl : "app-header",
		height : 70
	});
	this.west = new Ext.Panel({
		region : "west",
		title : "导航",
		iconCls : "menu-idx-navigation",
		split : true,
		width : 180,
		autoScroll : true,
		layout : "accordion",
		collapsible : true,
		collapsed : false,
		items : []
	});
	var themestore = new Array([ "ext-all", "缺省浅蓝" ], [ "ext-all-css04", "灰白主题" ], [ "ext-all-css05", "绿色主题" ], [ "ext-all-css03", "粉红主题" ], [ "xtheme-tp", "灰色主题" ], [ "xtheme-default2", "灰蓝主题" ], [ "xtheme-default16", "绿色主题" ], [ "xtheme-access", "Access风格" ]);
	this.indexPageUserName = new Ext.Toolbar.TextItem("欢迎您,[<a href='<%=basePath%>/logout.do'>注销</a>]");
	this.indexPageDepName = new Ext.Toolbar.TextItem("所在部门：--");
	this.indexPageCorpName = new Ext.Toolbar.TextItem("所属单位：--");
	var southbbaritems = [ {
		text : "在线用户",
		iconCls : "menu-idx-onlineUser",
		handler : this.showOnlineUser.createDelegate(this)
	}, "-", this.indexPageUserName, "-", this.indexPageDepName, "-", this.indexPageCorpName, "-", {
		id : "messageTip",
		hidden : true,
		width : 50,
		height : 20,
		handler : this.showMessageTip.createDelegate(this)
	}, "->", {
		xtype : "tbtext",
		text : '技术支持 <a href=http://www.risit.com.cn/ target="_blank">厦门中塔日升信息科技有限公司</a>'
	}, /*"-", {
		pressed : false,
		text : "便签",
		iconCls : "menu-idx-tipsTile",
		handler : this.showPersonalTips.createDelegate(this)
	},*/ "-", {
		pressed : false,
		text : "与我们联系",
		handler : function() {
			$toast("联系我们", "电话：400 9988 621<br/>网址：http://www.risit.com.cn/");
		}
	}, "-", {
		text : "收展",
		iconCls : "btn-expand",
		handler : this.expandOrCollapsedToppanel.createDelegate(this)
	}, /*"-", {
		xtype : "combo",
		mode : "local",
		editable : false,
		value : "切换皮肤",
		width : 100,
		triggerAction : "all",
		store : themestore,
		listeners : {
			"select" : this.selectTheme.createDelegate(this)
		}
	} */];
	this.south = new Ext.Panel({
		region : "south",
		height : 1,
		border : true,
		bbar : southbbaritems
	});
	var scrollerMenu = new Ext.ux.TabScrollerMenu({
		menuPrefixText : "标签页",
		maxText : 15,
		pageSize : 5
	});
	var closeMenu = new Ext.ux.TabCloseMenu({
		closeTabText : "关闭当前页面",
		closeOtherTabsText : "关闭其他页面",
		closeAllTabsText : "关闭所有页面"
	});
	this.center = new Ext.TabPanel({
		id : "centerTabPanel",
		region : "center",
		activeTab : 0,
		minTabWidth : 75,
		enableTabScroll : true,
		border : false,
		defaults : {
			autoScroll : true,
			closable : true
		},
		plugins : [ closeMenu, scrollerMenu ],
		items : []
	});
	IndexPage.superclass.constructor.call(this, {
		layout : "border",
		items : [ this.north, this.west, this.center, this.south ],
		listeners : {
			afterrender : this.loadafterrender.createDelegate(this)
		}
	});
};
Ext.extend(IndexPage, Ext.Viewport, {
	setDelayedTask : function() {
		var freshMessageTip = function() {
			Ext.Ajax.request({
				url : __ctxPath + "/info/countInMessage.do",
				method : "POST",
				success : function(e, f) {
					var resp = Ext.util.JSON.decode(e.responseText);
					var count = resp.count;
					var d = Ext.getCmp("messageTip");
					var g = Ext.getCmp("messageWindows");
					if (count > 0 && g == null) {
						d.setText('<div style="height:25px;"><img src="' + __ctxPath + '/img/newpm.gif" style="height:12px;"/>你有<strong style="color: red;">' + count + "</strong>信息</div>");
						soundManager.play("msgSound");
						d.show();
					} else {
						d.hide();
					}
				}.createDelegate(this)
			});
		}
		//setInterval("CalConv()", 1000); // 首页时间显示
		setTimeout(function() {
			this.indexPageUserName.setText('<img src="' + __ctxPath + '/img/index/bottom_user.png" />欢迎您：' + curUserInfo.fullname + '，[<a href="logout.do">注销</a>]');
			if (curUserInfo.depName) {
				this.indexPageDepName.setText("所在部门：" + curUserInfo.depName);
			} else {
				this.indexPageDepName.hide();
			}
			if (curUserInfo.corpInfo) {
				this.indexPageCorpName.setText("所属单位：" + curUserInfo.corpInfo.corpName);
			} else {
				this.indexPageCorpName.hide();
			}
			soundManager = new SoundManager();
			soundManager.url = __ctxPath + "/js/sound/swf/";
			soundManager.beginDelayedInit();
			soundManager.debugMode = false;
			soundManager.consoleOnly = false;
			soundManager.onload = function() {
				soundManager.createSound({
					id : "msgSound",
					url : __ctxPath + "/js/sound/mp3/msg.mp3"
				});
				setInterval(freshMessageTip, 600000);
			}.createDelegate(this);
		}.createDelegate(this), 1000);
	},
	loadafterrender : function() {
		var westPanel = this.west;
		Ext.Ajax.request({
			url : __ctxPath + "/panelTreeMenu.do",
			success : function(response, options) {
				var arr = eval(response.responseText);
				var __activedPanelId = getCookie("__activedPanelId");
				for ( var i = 0; i < arr.length; i++) {
					var doc = strToDom(arr[i].subXml);
					var root = doc.documentElement || doc;
					var panel = new Ext.tree.TreePanel({
						id : arr[i].id,
						title : arr[i].text,
						iconCls : arr[i].iconCls,
						layout : "fit",
						animate : true,
						border : false,
						autoScroll : true,
//						collapsed : true,
						loader : new knight.ux.TreeXmlLoader({
							preloadChildren : true
						}),
						root : new Ext.tree.AsyncTreeNode({
							text : root.tagName,
							xmlNode : root
						}),
						listeners : {
							"click" : App.clickNode
						},
						rootVisible : false,
					});
					westPanel.add(panel);
					panel.on("expand", function(p) {
						var expires = new Date();
						expires.setDate(expires.getDate() + 30);
						setCookie("__activedPanelId", p.id, expires, __ctxPath);
					});
					if (arr[i].id == __activedPanelId) {
						westPanel.layout.activeItem = panel;
					}
					navigateAccordion.push(arr[i].id);
				}
				westPanel.doLayout();
				var b = Ext.getCmp("centerTabPanel");
				var n = b.add(new AppNavigationView());
				b.activate();
			}
		});
		this.setDelayedTask();
	},
	logoutSystem : function() {
		App.Logout();
	},
	showOnlineUser : function() {
		OnlineUserSelector.getView().show();
	},
	showMessageTip : function() {
		var a = Ext.getCmp("messageTip");
		var b = Ext.getCmp("messageWindows");
		if (b == null) {
			new MessageWindows().show();
		}
		a.hide();
	},
	showPersonalTips : function() {
		App.clickTopTab("PersonalTipsView");
	},
	expandOrCollapsedToppanel : function() {
		if (this.north.collapsed) {
			this.north.expand(true);
		} else {
			this.north.collapse(true);
		}
	},
	selectTheme : function(d, b, c) {
		if (d.value != "") {
			var a = new Date();
			a.setDate(a.getDate() + 300);
			setCookie("theme", d.value, a, __ctxPath);
			Ext.util.CSS.swapStyleSheet("theme", __ctxPath + "/ext3.4/resources/css/" + d.value + ".css");
		}
	}
});