var PublicPanelViewItems = [ "MessagePanelView", "AnnounceUserPanelView", "MemoPanelView" ];
var AppHomeShowView = function() {
	var items = [];
	this.portalPanel = {
		id : "AppHomeShowViewPortlet",
		xtype : "panel",
		region : "center",
		layout:"fit",
		items : [ {
			split:true,
	         border:true,
	         html:'<iframe id="mediasArea" name="ifocus" src="/emms/home/show.html" style="width:100%; height:100%;" frameborder="0"></iframe>'
		} ]
	};
//	 this.homeHtml=Ext.create("Ext.panel.Panel",{
//         split:true,
//         border:true,
//         html:'<iframe id="mediasArea" name="ifocus" src="/emms/home/index.html" style="width:100%; height:100%;" frameborder="0"></iframe>'
//     });
	AppHomeShowView.superclass.constructor.call(this, {
		id : "AppHomeShowView",
		iconCls : "menu-idx-home",
		title : "待办事项",
		closable : false,
		layout : "fit",
		defaults : {
			padding : "0 5 0 0"
		},
		tbar : this.toolbar,
		items : this.portalPanel
	});
};
Ext.extend(AppHomeShowView, Ext.Panel, {
	uploadTerminalFile : function(relateModule) {
		var uploadDialog = $createUploadDialog({
			file_cat : "OTHERS"
		});
	},
	initHomePortletItem : function(id) {
		for ( var panelId in PortletItemCfg.defaults) {
			if (id == panelId) {
				return new IndexPagePortlet(PortletItemCfg.defaults[panelId]);
			}
		}
		for ( var panelId in PortletItemCfg.lefts) {
			if (id == panelId) {
				return new IndexPagePortlet(PortletItemCfg.lefts[panelId]);
			}
		}
		for ( var panelId in PortletItemCfg.rights) {
			if (id == panelId) {
				return new IndexPagePortlet(PortletItemCfg.rights[panelId]);
			}
		}
		return null;
	},
	savePortalLayout : function() {
		curUserInfo.portalConfig = [];
		var items = Ext.getCmp("AppHomeShowViewPortlet").items;
		for (var i = 0; i < items.length; i++) {
			var v = items.itemAt(i);
			for (var j = 0; j < v.items.length; j++) {
				var m = v.items.itemAt(j);
				var portalItem = new PortalItem(m.id, i, j);
				curUserInfo.portalConfig.push(portalItem);
			}
		}
		$request({
			url : __ctxPath + "/system/saveIndexDisplay.do",
			params : {
				items : Ext.encode(curUserInfo.portalConfig)
			}
		});
	}
});
var PortalItem = function(a, b, c) {
	this.panelId = a;
	this.column = b;
	this.row = c;
};
var PortletItemCfg = null;

function initPortletItemParams(params, param, values) {
	if (values.length == 0) {
		return;
	}
	if (Ext.isEmpty(params[param])) {
		params[param] = values.join(",");
		return;
	}
	params[param] = params[param] + "," + values.join(",");
};
