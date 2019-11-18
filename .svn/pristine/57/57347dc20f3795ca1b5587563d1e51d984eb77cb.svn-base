Ext.ns("App");
var systemConfig = new Object();
var curUserInfo = new Object();
var navigateAccordion = new Array();

function IsNum(s) {
	if(s!=null){
		var r,re;
		re = /\d*/i; //\d表示数字,*表示匹配多个数字
		r = s.match(re);
		return (r==s)?true:false;
	}
	return false;
}
function isGranted(a) {
	if (curUserInfo.rights.indexOf("__ALL") != -1) {
		return true;
	}
	if (curUserInfo.rights.indexOf(a) != -1) {
		return true;
	}
	return false;
}
function isCorpAppUser() {
	if (Ext.isEmpty(curUserInfo.corpInfo) || Ext.isEmpty(curUserInfo.corpInfo.corpId)) {
		return false;
	}
	return true;
}
function mustCurUserCorpId() {
	return curUserInfo.corpId ? curUserInfo.corpId : -1;
}
function parserCurUserExtendsInfo() {
	if (curUserInfo.appUserExtends && curUserInfo.appUserExtends[RelationModule.practitioner.relateModule]) {
		curUserInfo.practitioner = curUserInfo.appUserExtends[RelationModule.practitioner.relateModule];
		if (curUserInfo.practitioner.corpInfo) {
			curUserInfo.corpInfo = curUserInfo.practitioner.corpInfo;
		}
	}
}
App.init = function() {
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = __ctxPath + "/ext3.4/resources/images/default/s.gif";
	setTimeout(function() {
		Ext.get("loading").remove();
		Ext.get("loading-mask").fadeOut({
			remove : true
		});
	}, 1000);
	Ext.util.Observable.observeClass(Ext.data.Connection);
	Ext.data.Connection.on("requestcomplete", function(c, d, b) {
		if (d && d.getResponseHeader) {
			if (d.getResponseHeader("__timeout")) {
				$toast("操作已经超时，请重新登录!");
				window.location.href = __ctxPath + "/indexsrc.jsp?randId=" + parseInt(1000 * Math.random());
			}
			if (d.getResponseHeader("__forbidden")) {
				$toast("系统访问权限提示：", "你目前没有权限访问：{0}", b.url);
			}
		}
	});
	Ext.Ajax.request({
		url : __ctxPath + "/system/getCurrentAppUser.do?random=" + Math.random(),
		method : "Get",
		success : function(d, g) {
			var f = Ext.util.JSON.decode(d.responseText);
			Ext.apply(curUserInfo, f.user);
			parserCurUserExtendsInfo();
			Ext.apply(systemConfig, f.systemConfig);
			initPortletCfg();
			var b = Ext.getCmp("centerTabPanel");
			//var n = b.add(new AppHomeView());
			var n = b.add(new AppNavigationView());
			b.activate();
		
		}
	});
	new IndexPage();
};
App.clickTopTab = function(id, params, precall, callback) {
	if (precall != null) {
		precall.call(this);
	}
	// alert(id);
	var center = Ext.getCmp("centerTabPanel");
	var tabItem = center.getItem(id);
	if (tabItem == null) {
		$ImportJs(id, function(view) {
			if (view.getXTypes() == "component/box/container/panel/window") {
				if (!isGranted("_" + id + "Add")) {
					view.destroy();
					Ext.Msg.alert("操作错误", "无操作权限!");
					return;
				}
				view.show();
			} else {
				tabItem = center.add(view);
				center.activate(tabItem);
			}
		}, params);
	} else {
		if (callback != null) {
			callback.call(this);
		}
		center.activate(tabItem);
	}
	return tabItem;
};
App.MyDesktopClickTopTab = function(id, params, precall, callback) {
	if (precall != null) {
		precall.call(this);
	}
	var center = Ext.getCmp("centerTabPanel");
	var tabItem = center.getItem(id);
	if (tabItem == null) {
		$ImportJs(id, function(view) {
			tabItem = center.add(view);
			tabs.activate(tabItem);
		}, params);
	} else {
		center.remove(tabItem);
		var str = "new " + id;
		if (params != null) {
			str += "(params);";
		} else {
			str += "();";
		}
		var view = eval(str);
		tabItem = center.add(view);
		center.activate(tabItem);
	}
};
App.clickNode = function(a) {
	if (a.id == null || a.id == "" || a.id.indexOf("xnode") == 0) {
		return;
	}
	App.clickTopTab(a.id, {
		menuClicked : true
	});
};
App.MyDesktopClick = function() {
	var a = Ext.getCmp("MyDesktop");
	a.expand(true);
	App.clickTopTab("AppHomeView");
	App.clickTopTab("AppNavigationView");
};
App.Logout = function() {
	Ext.Ajax.request({
		url : __ctxPath + "/logout.do"
	});
};
App.getContentPanel = function() {
	var a = Ext.getCmp("centerTabPanel");
	return a;
};
App.removeTab = function(a) {
	var b = App.getContentPanel();
	var c = b.getItem(a);
	if (c != null) {
		b.remove(c, true);
	}
};
App.activateTab = function(a) {
	var b = App.getContentPanel();
	b.activate(a);
};
App.appNavigationSelector = function(id,menus) {
	for (var i = 0; i < navigateAccordion.length; i++) {
		Ext.getCmp(navigateAccordion[i]).hide();
	}
	var preAccordion = null;
	for (var i = 0; i < menus.length; i++) {
		if (navigateAccordion.indexOf(menus[i].id) >= 0) {
			var accordion = Ext.getCmp(menus[i].id);
			if (preAccordion == null) {
				preAccordion = accordion;
			}
			accordion.show();
			//App.clickTopTab(test[id.split("-")[1]]);
		}
	}
	if (preAccordion != null) {
		preAccordion.expand(true);
	}
};
Ext.onReady(App.init);
